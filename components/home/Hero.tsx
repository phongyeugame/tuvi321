import React from "react"
import Link from "next/link"
import { Button } from "@/components/ui/Button"
import { ScrollReveal } from "@/components/ui/ScrollReveal"
import { Sparkles, ArrowRight } from "lucide-react"

export function Hero() {
  return (
    <section className="relative pt-20 pb-32 overflow-hidden">
      {/* Background decorations */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gold/5 rounded-full blur-3xl pointer-events-none" />
      
      <div className="container mx-auto px-4 md:px-6 relative z-10 max-w-4xl text-center">
        <ScrollReveal>
          <div className="inline-flex items-center bg-secondary/50 border border-border px-4 py-1.5 rounded-full mb-8">
            <span className="text-sm font-medium text-gold-light">
              Khám Phá Bản Mệnh Qua Tử Vi Đẩu Số
            </span>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={0.1}>
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-serif font-bold tracking-tight mb-8">
            Giải Mã Lá Số Tử Vi <br className="hidden md:block" />
            <span className="text-gradient">Của Riêng Bạn</span>
          </h1>
        </ScrollReveal>

        <ScrollReveal delay={0.2}>
          <p className="text-lg md:text-xl text-muted mb-10 max-w-2xl mx-auto">
            Công cụ tra cứu tử vi trực tuyến miễn phí, an sao chính xác tuyệt đối. 
            Luận giải chi tiết 12 cung bản mệnh, vận hạn cuộc đời, và đưa ra lời khuyên phong thuỷ hữu ích.
          </p>
        </ScrollReveal>

        <ScrollReveal delay={0.3}>
          <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6">
            <Link href="/tra-cuu">
              <Button size="lg" className="w-full sm:w-auto gap-2 group cursor-pointer">
                Lập Lá Số Ngay
                <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
            <Link href="/xem-tuoi/vo-chong">
              <Button variant="outline" size="lg" className="w-full sm:w-auto cursor-pointer">
                Xem Tuổi Vợ Chồng
              </Button>
            </Link>
          </div>
        </ScrollReveal>
      </div>
    </section>
  )
}
