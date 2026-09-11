import React from "react"
import Link from "next/link"
import { getAllPosts } from "@/lib/mdx"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/Card"
import { ScrollReveal } from "@/components/ui/ScrollReveal"

export const metadata = {
  title: "Luận Giải Các Sao | Tra Cứu Tử Vi",
  description: "Tìm hiểu chi tiết về 14 chính tinh và hệ thống phụ tinh trong Tử Vi Đẩu Số.",
}

export default function SaoPage() {
  const posts = getAllPosts("sao")

  return (
    <div className="container mx-auto px-4 py-12 max-w-5xl">
      <ScrollReveal>
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-gold mb-4">Luận Giải Các Sao</h1>
          <p className="text-muted max-w-2xl mx-auto">
            Hệ thống 14 chính tinh và các phụ tinh mang ý nghĩa sâu sắc quyết định vận trình, tính cách và công danh của đương số.
          </p>
        </div>
      </ScrollReveal>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {posts.map((post, index) => (
          <ScrollReveal key={post.slug} delay={index * 0.1}>
            <Link href={`/sao/${post.slug}`} className="block h-full">
              <Card hoverGlow className="h-full flex flex-col cursor-pointer transition-all">
                <CardHeader>
                  <CardTitle className="text-xl">{post.meta.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted text-sm line-clamp-3">
                    {post.meta.excerpt}
                  </p>
                </CardContent>
              </Card>
            </Link>
          </ScrollReveal>
        ))}
      </div>
    </div>
  )
}
