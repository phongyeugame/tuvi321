import { prisma } from "./prisma"
import fs from "fs"
import path from "path"
import matter from "gray-matter"

const contentDirectory = path.join(process.cwd(), "content")

export interface PostItem {
  slug: string
  meta: {
    title: string
    excerpt?: string
    publishedAt: string
    category?: string | null
    image?: string | null
  }
  content: string
}

export async function getPostBySlug(slug: string, folder: string): Promise<PostItem> {
  const realSlug = slug.replace(/\.mdx$/, "")

  try {
    const post = await prisma.post.findUnique({
      where: {
        folder_slug: {
          folder,
          slug: realSlug,
        },
      },
    })

    if (post) {
      return {
        slug: post.slug,
        meta: {
          title: post.title,
          excerpt: post.excerpt || "",
          publishedAt: post.publishedAt.toISOString().split("T")[0],
          category: post.category,
          image: post.image,
        },
        content: post.content,
      }
    }
  } catch (error) {
    // Fallback to local files if database is empty or not yet connected
  }

  // Fallback to local files
  const fullPath = path.join(contentDirectory, folder, `${realSlug}.mdx`)
  const fileContents = fs.readFileSync(fullPath, "utf8")
  const { data, content } = matter(fileContents)

  return { slug: realSlug, meta: data as any, content }
}

export async function getAllPosts(folder: string): Promise<PostItem[]> {
  try {
    const posts = await prisma.post.findMany({
      where: { folder },
      orderBy: { publishedAt: "desc" },
    })

    if (posts.length > 0) {
      return posts.map((post) => ({
        slug: post.slug,
        meta: {
          title: post.title,
          excerpt: post.excerpt || "",
          publishedAt: post.publishedAt.toISOString().split("T")[0],
          category: post.category,
          image: post.image,
        },
        content: post.content,
      }))
    }
  } catch (error) {
    // Fallback to local files if database is empty or not yet connected
  }

  // Fallback to local files
  const folderPath = path.join(contentDirectory, folder)
  if (!fs.existsSync(folderPath)) return []

  const slugs = fs.readdirSync(folderPath)
  const posts = slugs
    .filter((slug) => slug.endsWith(".mdx"))
    .map((slug) => {
      const realSlug = slug.replace(/\.mdx$/, "")
      const fullPath = path.join(folderPath, slug)
      const fileContents = fs.readFileSync(fullPath, "utf8")
      const { data, content } = matter(fileContents)
      return { slug: realSlug, meta: data as any, content }
    })
    .sort((post1, post2) => (post1.meta.publishedAt > post2.meta.publishedAt ? -1 : 1))

  return posts
}
