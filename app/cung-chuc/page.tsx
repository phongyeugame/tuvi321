import React from "react"
import Link from "next/link"
import { getAllPosts } from "@/lib/mdx"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/Card"
import { ScrollReveal } from "@/components/ui/ScrollReveal"

export const metadata = {
  title: "Ý Nghĩa 12 Cung Chức | Tra Cứu Tử Vi",
  description: "Tìm hiểu chi tiết về ý nghĩa các cung chức trong lá số Tử Vi.",
}

export default function CungChucPage() {
  const posts = getAllPosts("cung-chuc")

  return (
    <div className="container mx-auto px-4 py-12 max-w-5xl">
      <ScrollReveal>
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-gold mb-4">Ý Nghĩa 12 Cung Chức</h1>
          <p className="text-muted max-w-2xl mx-auto">
            12 cung trên lá số Tử Vi tượng trưng cho 12 khía cạnh của cuộc đời mỗi con người.
            Hãy cùng khám phá ý nghĩa của từng cung.
          </p>
        </div>
      </ScrollReveal>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {posts.map((post, index) => (
          <ScrollReveal key={post.slug} delay={index * 0.1}>
            <Link href={`/cung-chuc/${post.slug}`} className="block h-full">
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
