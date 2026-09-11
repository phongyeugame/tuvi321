import React from "react"
import Link from "next/link"
import { ScrollReveal } from "@/components/ui/ScrollReveal"
import { ArrowUpRight } from "lucide-react"

export function ToolsBentoGrid() {
  const tools = [
    {
      title: "Xem Tuổi Vợ Chồng",
      tag: "Hôn Nhân & Hòa Hợp",
      description: "Luận giải căn duyên tiền định, ngũ hành sinh khắc, thiên can địa chi và cung phi bát tự chi tiết giữa hai tuổi.",
      href: "/xem-tuoi/vo-chong",
      image: "/images/tools/vo-chong.svg",
      colSpan: "col-span-1 md:col-span-2",
      isWide: true,
    },
    {
      title: "Xem Tuổi Làm Nhà",
      tag: "Phong Thủy Dương Trạch",
      description: "Tra cứu hạn Tam Tai, Kim Lâu, Hoang Ốc chính xác giúp gia chủ khởi công vạn sự hanh thông.",
      href: "/xem-tuoi/lam-nha",
      image: "/images/tools/lam-nha.svg",
      colSpan: "col-span-1",
      isWide: false,
    },
    {
      title: "Xem Tuổi Sinh Con",
      tag: "Tử Tức & Gia Đạo",
      description: "Chọn năm sinh con hợp bản mệnh bố mẹ, mang lại phúc lộc và bình an viên mãn cho gia đình.",
      href: "/xem-tuoi/sinh-con",
      image: "/images/tools/sinh-con.svg",
      colSpan: "col-span-1",
      isWide: false,
    },
    {
      title: "Ý Nghĩa 12 Cung",
      tag: "Cung Vị Bản Mệnh",
      description: "Khám phá bản đồ vận mệnh 12 cung chức: Mệnh, Thân, Quan Lộc, Tài Bạch, Thiên Di, Phu Thê...",
      href: "/cung-chuc",
      image: "/images/tools/12-cung.svg",
      colSpan: "col-span-1 md:col-span-2",
      isWide: true,
    },
    {
      title: "Luận Giải Các Sao",
      tag: "Chính Tinh & Phụ Tinh",
      description: "Tra cứu ý nghĩa 14 chính tinh (Tử Vi, Thiên Cơ, Thái Dương...) cùng toàn bộ hệ thống bàng tinh đắc hãm.",
      href: "/sao",
      image: "/images/tools/cac-sao.svg",
      colSpan: "col-span-1 md:col-span-2",
      isWide: true,
    },
    {
      title: "Thư Kho Kiến Thức",
      tag: "Kinh Điển Cổ Học",
      description: "Hệ thống bài viết cẩm nang giải đoán Tử Vi Đẩu Số thực chiến từ căn bản tới chuyên sâu.",
      href: "/thu-kho",
      image: "/images/tools/thu-kho.svg",
      colSpan: "col-span-1",
      isWide: false,
    },
  ]

  return (
    <section className="py-24 bg-secondary/30 relative overflow-hidden">
      {/* Subtle background ambient glows */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-gold/5 blur-[120px] pointer-events-none rounded-full" />
      <div className="absolute bottom-10 right-10 w-[400px] h-[300px] bg-amber-500/5 blur-[100px] pointer-events-none rounded-full" />

      <div className="container mx-auto px-4 md:px-6 max-w-6xl relative z-10">
        <ScrollReveal>
          <div className="text-center mb-16">
            <div className="inline-flex items-center px-4 py-1 rounded-full bg-gold/10 border border-gold/20 text-gold text-xs font-semibold mb-4 tracking-wider uppercase">
              Cẩm Nang & Công Cụ
            </div>
            <h2 className="text-3xl md:text-5xl font-serif font-bold mb-4">
              <span className="text-gradient">Công Cụ Trợ Giúp</span>
            </h2>
            <p className="text-muted max-w-2xl mx-auto text-base">
              Hệ thống cung cấp các công cụ tra cứu Tử Vi, phong thủy và vận mệnh chuyên sâu 
              với luận đoán chuẩn xác.
            </p>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {tools.map((tool, index) => (
            <ScrollReveal 
              key={tool.title} 
              delay={index * 0.08}
              className={tool.colSpan}
            >
              <Link href={tool.href} className="block h-full group">
                <div className="h-full rounded-2xl glass border border-border group-hover:border-gold/60 group-hover:shadow-[0_0_35px_rgba(212,175,55,0.22)] transition-all duration-500 overflow-hidden flex flex-col">
                  {tool.isWide ? (
                    // Wide Card layout: 2 columns on desktop
                    <div className="flex flex-col md:flex-row h-full">
                      {/* Image side */}
                      <div className="relative w-full md:w-1/2 h-52 md:h-auto min-h-[220px] overflow-hidden bg-black/50">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img 
                          src={tool.image} 
                          alt={tool.title}
                          className="w-full h-full object-cover object-center group-hover:scale-108 transition-transform duration-700 ease-out"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t md:bg-gradient-to-r from-transparent via-black/20 to-[#0A0A0A]/90" />
                        
                        {/* Tag badge (clean without leading icon) */}
                        <div className="absolute top-4 left-4 inline-flex items-center px-3 py-1 rounded-full bg-black/80 backdrop-blur-md border border-gold/30 text-gold text-xs font-medium">
                          <span>{tool.tag}</span>
                        </div>
                      </div>

                      {/* Content side */}
                      <div className="p-6 md:p-8 flex flex-col justify-between md:w-1/2 flex-grow bg-[#0A0A0A]/60">
                        <div>
                          <div className="flex items-center justify-between gap-3 mb-3">
                            <h3 className="text-xl md:text-2xl font-serif font-bold text-foreground group-hover:text-gold transition-colors">
                              {tool.title}
                            </h3>
                            <div className="w-8 h-8 rounded-full bg-gold/10 border border-gold/30 flex items-center justify-center text-gold group-hover:bg-gold group-hover:text-black group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all shrink-0">
                              <ArrowUpRight size={16} />
                            </div>
                          </div>
                          <p className="text-muted text-sm leading-relaxed mb-6">
                            {tool.description}
                          </p>
                        </div>

                        <div className="flex items-center text-xs font-semibold text-gold tracking-wider uppercase gap-1 group-hover:translate-x-1 transition-transform">
                          <span>Khám phá ngay</span>
                          <span>→</span>
                        </div>
                      </div>
                    </div>
                  ) : (
                    // Regular Card layout: vertical stack
                    <div className="flex flex-col h-full">
                      {/* Image header */}
                      <div className="relative w-full h-48 sm:h-52 overflow-hidden bg-black/50">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img 
                          src={tool.image} 
                          alt={tool.title}
                          className="w-full h-full object-cover object-center group-hover:scale-108 transition-transform duration-700 ease-out"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-[#0A0A0A]/30 to-transparent" />
                        
                        {/* Tag badge (clean without leading icon) */}
                        <div className="absolute top-4 left-4 inline-flex items-center px-3 py-1 rounded-full bg-black/80 backdrop-blur-md border border-gold/30 text-gold text-xs font-medium">
                          <span>{tool.tag}</span>
                        </div>
                      </div>

                      {/* Content bottom */}
                      <div className="p-6 flex flex-col justify-between flex-grow bg-[#0A0A0A]/60">
                        <div>
                          <div className="flex items-center justify-between gap-3 mb-2">
                            <h3 className="text-lg font-serif font-bold text-foreground group-hover:text-gold transition-colors">
                              {tool.title}
                            </h3>
                            <div className="w-8 h-8 rounded-full bg-gold/10 border border-gold/30 flex items-center justify-center text-gold group-hover:bg-gold group-hover:text-black group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all shrink-0">
                              <ArrowUpRight size={16} />
                            </div>
                          </div>
                          <p className="text-muted text-sm leading-relaxed mb-4">
                            {tool.description}
                          </p>
                        </div>

                        <div className="flex items-center text-xs font-semibold text-gold tracking-wider uppercase gap-1 group-hover:translate-x-1 transition-transform pt-2">
                          <span>Khám phá ngay</span>
                          <span>→</span>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </Link>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  )
}
