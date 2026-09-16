"use client"

import React, { useState } from "react"
import { Card } from "@/components/ui/Card"
import { Button } from "@/components/ui/Button"
import { ScrollReveal } from "@/components/ui/ScrollReveal"

export default function SinhConPage() {
  const [fatherYearInput, setFatherYearInput] = useState<string>("1992")
  const [motherYearInput, setMotherYearInput] = useState<string>("1995")
  const [childYearInput, setChildYearInput] = useState<string>("2026")
  const [result, setResult] = useState<any>(null)

  const handleCalculate = (e: React.FormEvent) => {
    e.preventDefault()
    setResult({
      score: 8,
      conclusion: "Tuổi con và bố mẹ tương sinh về Ngũ hành và Thiên can, gia đình hưng vượng, con cái ngoan ngoãn hiếu thảo.",
    })
  }

  return (
    <div className="container mx-auto px-4 py-12 max-w-2xl">
      <ScrollReveal>
        <div className="text-center mb-10">
          <h1 className="text-3xl md:text-5xl font-serif font-bold text-gold mb-4">Xem Tuổi Sinh Con</h1>
          <p className="text-muted">
            Chọn năm sinh con hợp bản mệnh bố mẹ, mang lại phúc lộc và bình an cho gia đình.
          </p>
        </div>
      </ScrollReveal>

      <Card glass className="p-6">
        <form onSubmit={handleCalculate} className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-muted mb-2">Năm sinh bố</label>
              <input
                type="text"
                inputMode="numeric"
                maxLength={4}
                value={fatherYearInput}
                placeholder="VD: 1992"
                onChange={(e) => setFatherYearInput(e.target.value.replace(/\D/g, "").slice(0, 4))}
                className="w-full bg-background/50 border border-border rounded-lg px-4 py-3 text-foreground focus:outline-none focus:border-gold"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-muted mb-2">Năm sinh mẹ</label>
              <input
                type="text"
                inputMode="numeric"
                maxLength={4}
                value={motherYearInput}
                placeholder="VD: 1995"
                onChange={(e) => setMotherYearInput(e.target.value.replace(/\D/g, "").slice(0, 4))}
                className="w-full bg-background/50 border border-border rounded-lg px-4 py-3 text-foreground focus:outline-none focus:border-gold"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-muted mb-2">Năm dự sinh</label>
              <input
                type="text"
                inputMode="numeric"
                maxLength={4}
                value={childYearInput}
                placeholder="VD: 2026"
                onChange={(e) => setChildYearInput(e.target.value.replace(/\D/g, "").slice(0, 4))}
                className="w-full bg-background/50 border border-border rounded-lg px-4 py-3 text-foreground focus:outline-none focus:border-gold"
              />
            </div>
          </div>

          <Button type="submit" size="lg" className="w-full">
            Luận Giải Độ Hợp Tuổi
          </Button>
        </form>

        {result && (
          <div className="mt-8 pt-6 border-t border-border space-y-4">
            <h3 className="text-xl font-serif font-bold text-gold">
              Kết Quả Luận Giải Điểm Hợp: {result.score}/10
            </h3>
            <p className="text-muted leading-relaxed">
              {result.conclusion}
            </p>
          </div>
        )}
      </Card>
    </div>
  )
}
