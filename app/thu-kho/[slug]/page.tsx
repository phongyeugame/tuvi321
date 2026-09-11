import React from "react"
import { getPostBySlug, getAllPosts } from "@/lib/mdx"
import { MDXRemote } from "next-mdx-remote/rsc"
import { notFound } from "next/navigation"

export async function generateStaticParams() {
  const posts = getAllPosts("thu-kho")
  return posts.map((post) => ({
    slug: post.slug,
  }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  try {
    const post = getPostBySlug(resolvedParams.slug, "thu-kho")
    return {
      title: `${post.meta.title} | Tra Cứu Tử Vi`,
      description: post.meta.excerpt,
    }
  } catch (error) {
    return { title: "Không tìm thấy bài viết" }
  }
}

export default async function PostPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  let post;
  try {
    post = getPostBySlug(resolvedParams.slug, "thu-kho")
  } catch (error) {
    notFound()
  }

  return (
    <article className="container mx-auto px-4 py-12 max-w-3xl">
      <div className="mb-10 text-center">
        <h1 className="text-3xl md:text-5xl font-serif font-bold text-gold mb-4 leading-tight">
          {post.meta.title}
        </h1>
        <p className="text-muted text-sm">
          Đăng ngày: {new Date(post.meta.publishedAt).toLocaleDateString("vi-VN")}
        </p>
      </div>

      <div className="prose prose-invert prose-gold max-w-none">
        <MDXRemote source={post.content} />
      </div>
    </article>
  )
}
