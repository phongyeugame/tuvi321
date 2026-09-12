import React from "react"
import Link from "next/link"
import { getAllPosts } from "@/lib/mdx"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/Card"
import { ScrollReveal } from "@/components/ui/ScrollReveal"

export const metadata = {
  title: "Thư Kho Kiến Thức | Tra Cứu Tử Vi",
  description: "Tổng hợp các bài viết chuyên sâu về Tử Vi Đẩu Số, Phong Thủy và Cổ Học Đông Phương.",
}

export default async function ThuKhoPage() {
  const posts = await getAllPosts("thu-kho")

  return (
    <div className="container mx-auto px-4 py-12 max-w-5xl">
      <ScrollReveal>
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-gold mb-4">Thư Kho Kiến Thức</h1>
          <p className="text-muted max-w-2xl mx-auto">
            Tổng hợp cẩm nang, tài liệu và các bài nghiên cứu chuyên sâu về cổ học phương Đông và phương pháp giải đoán Tử Vi thực chiến.
          </p>
        </div>
      </ScrollReveal>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {posts.map((post, index) => (
          <ScrollReveal key={post.slug} delay={index * 0.1}>
            <Link href={`/thu-kho/${post.slug}`} className="block h-full">
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
