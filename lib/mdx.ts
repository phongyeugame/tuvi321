import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

const contentDirectory = path.join(process.cwd(), 'content')

export function getPostBySlug(slug: string, folder: string) {
  const realSlug = slug.replace(/\.mdx$/, '')
  const fullPath = path.join(contentDirectory, folder, `${realSlug}.mdx`)
  const fileContents = fs.readFileSync(fullPath, 'utf8')
  const { data, content } = matter(fileContents)

  return { slug: realSlug, meta: data, content }
}

export function getAllPosts(folder: string) {
  const folderPath = path.join(contentDirectory, folder)
  if (!fs.existsSync(folderPath)) return []

  const slugs = fs.readdirSync(folderPath)
  const posts = slugs
    .filter((slug) => slug.endsWith('.mdx'))
    .map((slug) => getPostBySlug(slug, folder))
    .sort((post1, post2) => (post1.meta.publishedAt > post2.meta.publishedAt ? -1 : 1))
  
  return posts
}
