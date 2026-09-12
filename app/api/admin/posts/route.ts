import { NextResponse } from "next/server"
import { verifyAdminSession } from "@/lib/admin-auth"
import { prisma } from "@/lib/prisma"

export async function GET(request: Request) {
  const isAuth = await verifyAdminSession()
  if (!isAuth) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const { searchParams } = new URL(request.url)
  const folder = searchParams.get("folder")
  const slug = searchParams.get("slug")

  try {
    // If specific post requested
    if (folder && slug) {
      const post = await prisma.post.findUnique({
        where: {
          folder_slug: { folder, slug },
        },
      })
      if (!post) {
        return NextResponse.json({ error: "Post not found" }, { status: 404 })
      }
      return NextResponse.json({
        folder: post.folder,
        slug: post.slug,
        meta: {
          title: post.title,
          excerpt: post.excerpt,
          publishedAt: post.publishedAt.toISOString().split("T")[0],
          category: post.category,
          image: post.image,
        },
        content: post.content,
      })
    }

    // Otherwise, list all posts across folders
    const posts = await prisma.post.findMany({
      orderBy: { publishedAt: "desc" },
    })

    const allPosts = posts.map((post) => ({
      folder: post.folder,
      slug: post.slug,
      meta: {
        title: post.title,
        excerpt: post.excerpt,
        publishedAt: post.publishedAt.toISOString().split("T")[0],
        category: post.category,
        image: post.image,
      },
      content: post.content,
    }))

    return NextResponse.json({ posts: allPosts })
  } catch (error) {
    console.error("Error fetching posts:", error)
    return NextResponse.json({ error: "Failed to fetch posts" }, { status: 500 })
  }
}

export async function POST(request: Request) {
  const isAuth = await verifyAdminSession()
  if (!isAuth) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  try {
    const { folder, slug, title, excerpt, content, publishedAt, category, image } = await request.json()

    if (!folder || !slug || !title) {
      return NextResponse.json({ error: "Thiếu thông tin bắt buộc" }, { status: 400 })
    }

    const publishedDate = publishedAt ? new Date(publishedAt) : new Date()

    await prisma.post.create({
      data: {
        folder,
        slug,
        title,
        excerpt: excerpt || "",
        content: content || "",
        category: category || null,
        image: image || null,
        publishedAt: isNaN(publishedDate.getTime()) ? new Date() : publishedDate,
      },
    })

    return NextResponse.json({ success: true, message: "Tạo bài viết thành công" })
  } catch (error) {
    console.error("Error creating post:", error)
    return NextResponse.json({ error: "Lỗi lưu bài viết vào cơ sở dữ liệu" }, { status: 500 })
  }
}

export async function PUT(request: Request) {
  const isAuth = await verifyAdminSession()
  if (!isAuth) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  try {
    const { folder, slug, title, excerpt, content, publishedAt, category, image } = await request.json()

    if (!folder || !slug || !title) {
      return NextResponse.json({ error: "Thiếu thông tin bắt buộc" }, { status: 400 })
    }

    const publishedDate = publishedAt ? new Date(publishedAt) : new Date()

    await prisma.post.upsert({
      where: {
        folder_slug: { folder, slug },
      },
      update: {
        title,
        excerpt: excerpt || "",
        content: content || "",
        category: category || null,
        image: image || null,
        publishedAt: isNaN(publishedDate.getTime()) ? new Date() : publishedDate,
      },
      create: {
        folder,
        slug,
        title,
        excerpt: excerpt || "",
        content: content || "",
        category: category || null,
        image: image || null,
        publishedAt: isNaN(publishedDate.getTime()) ? new Date() : publishedDate,
      },
    })

    return NextResponse.json({ success: true, message: "Cập nhật bài viết thành công" })
  } catch (error) {
    console.error("Error updating post:", error)
    return NextResponse.json({ error: "Lỗi cập nhật bài viết trong cơ sở dữ liệu" }, { status: 500 })
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

    await prisma.post.deleteMany({
      where: { folder, slug },
    })

    return NextResponse.json({ success: true, message: "Xóa bài viết thành công" })
  } catch (error) {
    console.error("Error deleting post:", error)
    return NextResponse.json({ error: "Lỗi xóa bài viết khỏi cơ sở dữ liệu" }, { status: 500 })
  }
}
