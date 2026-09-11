import { NextResponse } from "next/server"
import fs from "fs"
import path from "path"
import matter from "gray-matter"
import { verifyAdminSession } from "@/lib/admin-auth"

const contentDir = path.join(process.cwd(), "content")

export async function GET(request: Request) {
  const isAuth = await verifyAdminSession()
  if (!isAuth) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const { searchParams } = new URL(request.url)
  const folder = searchParams.get("folder")
  const slug = searchParams.get("slug")

  // If specific post requested
  if (folder && slug) {
    const filePath = path.join(contentDir, folder, `${slug}.mdx`)
    if (!fs.existsSync(filePath)) {
      return NextResponse.json({ error: "Post not found" }, { status: 404 })
    }
    const fileContent = fs.readFileSync(filePath, "utf-8")
    const { data, content } = matter(fileContent)
    return NextResponse.json({ folder, slug, meta: data, content })
  }

  // Otherwise, list all posts across folders
  const categories = ["cung-chuc", "sao", "thu-kho"]
  const allPosts: any[] = []

  for (const cat of categories) {
    const catPath = path.join(contentDir, cat)
    if (fs.existsSync(catPath)) {
      const files = fs.readdirSync(catPath).filter((f) => f.endsWith(".mdx"))
      for (const file of files) {
        const fileSlug = file.replace(/\.mdx$/, "")
        const raw = fs.readFileSync(path.join(catPath, file), "utf-8")
        const { data, content } = matter(raw)
        allPosts.push({
          folder: cat,
          slug: fileSlug,
          meta: data,
          content,
        })
      }
    }
  }

  return NextResponse.json({ posts: allPosts })
}

export async function POST(request: Request) {
  const isAuth = await verifyAdminSession()
  if (!isAuth) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  try {
    const { folder, slug, title, excerpt, content, publishedAt } = await request.json()

    if (!folder || !slug || !title) {
      return NextResponse.json({ error: "Thiếu thông tin bắt buộc" }, { status: 400 })
    }

    const folderPath = path.join(contentDir, folder)
    if (!fs.existsSync(folderPath)) {
      fs.mkdirSync(folderPath, { recursive: true })
    }

    const filePath = path.join(folderPath, `${slug}.mdx`)
    const fileData = matter.stringify(content || "", {
      title,
      excerpt: excerpt || "",
      publishedAt: publishedAt || new Date().toISOString().split("T")[0],
    })

    fs.writeFileSync(filePath, fileData, "utf-8")
    return NextResponse.json({ success: true, message: "Tạo bài viết thành công" })
  } catch (error) {
    return NextResponse.json({ error: "Lỗi lưu bài viết" }, { status: 500 })
  }
}

export async function PUT(request: Request) {
  const isAuth = await verifyAdminSession()
  if (!isAuth) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  try {
    const { folder, slug, title, excerpt, content, publishedAt } = await request.json()

    if (!folder || !slug || !title) {
      return NextResponse.json({ error: "Thiếu thông tin bắt buộc" }, { status: 400 })
    }

    const folderPath = path.join(contentDir, folder)
    const filePath = path.join(folderPath, `${slug}.mdx`)

    const fileData = matter.stringify(content || "", {
      title,
      excerpt: excerpt || "",
      publishedAt: publishedAt || new Date().toISOString().split("T")[0],
    })

    fs.writeFileSync(filePath, fileData, "utf-8")
    return NextResponse.json({ success: true, message: "Cập nhật bài viết thành công" })
  } catch (error) {
    return NextResponse.json({ error: "Lỗi cập nhật bài viết" }, { status: 500 })
  }
}

export async function DELETE(request: Request) {
  const isAuth = await verifyAdminSession()
  if (!isAuth) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  try {
    const { folder, slug } = await request.json()
    if (!folder || !slug) {
      return NextResponse.json({ error: "Thiếu folder hoặc slug" }, { status: 400 })
    }

    const filePath = path.join(contentDir, folder, `${slug}.mdx`)
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath)
    }

    return NextResponse.json({ success: true, message: "Xóa bài viết thành công" })
  } catch (error) {
    return NextResponse.json({ error: "Lỗi xóa bài viết" }, { status: 500 })
  }
}
