"use client"

import React, { useState } from "react"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/Card"
import { Button } from "@/components/ui/Button"
import { ScrollReveal } from "@/components/ui/ScrollReveal"

export default function LamNhaPage() {
  const [birthYearInput, setBirthYearInput] = useState<string>("1990")
  const [targetYearInput, setTargetYearInput] = useState<string>(String(new Date().getFullYear()))
  const [result, setResult] = useState<any>(null)

  const handleCalculate = (e: React.FormEvent) => {
    e.preventDefault()
    const birthYear = parseInt(birthYearInput, 10) || 1990
    const targetYear = parseInt(targetYearInput, 10) || new Date().getFullYear()
    const age = targetYear - birthYear + 1
    // Tam tai check (basic)
    const isTamTai = age % 3 === 0
    // Kim lau check
    const kimLauMod = age % 9
    const isKimLau = [1, 3, 6, 8].includes(kimLauMod)
    // Hoang oc check
    const isHoangOc = [2, 4, 5].includes(age % 6)

    setResult({
      age,
      isTamTai,
      isKimLau,
      isHoangOc,
      canBuild: !isTamTai && !isKimLau && !isHoangOc,
    })
  }

  return (
    <div className="container mx-auto px-4 py-12 max-w-2xl">
      <ScrollReveal>
        <div className="text-center mb-10">
          <h1 className="text-3xl md:text-5xl font-serif font-bold text-gold mb-4">Xem Tuổi Làm Nhà</h1>
          <p className="text-muted">
            Tra cứu hạn Tam Tai, Kim Lâu, Hoang Ốc chính xác để chọn năm xây nhà vạn sự hanh thông.
          </p>
        </div>
      </ScrollReveal>

      <Card glass className="p-6">
        <form onSubmit={handleCalculate} className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-muted mb-2">Năm sinh gia chủ</label>
              <input
                type="text"
                inputMode="numeric"
                maxLength={4}
                value={birthYearInput}
                placeholder="VD: 1990"
                onChange={(e) => setBirthYearInput(e.target.value.replace(/\D/g, "").slice(0, 4))}
                className="w-full bg-background/50 border border-border rounded-lg px-4 py-3 text-foreground focus:outline-none focus:border-gold"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-muted mb-2">Năm dự kiến làm nhà</label>
              <input
                type="text"
                inputMode="numeric"
                maxLength={4}
                value={targetYearInput}
                placeholder={`VD: ${new Date().getFullYear()}`}
                onChange={(e) => setTargetYearInput(e.target.value.replace(/\D/g, "").slice(0, 4))}
                className="w-full bg-background/50 border border-border rounded-lg px-4 py-3 text-foreground focus:outline-none focus:border-gold"
              />
            </div>
          </div>

          <Button type="submit" size="lg" className="w-full">
            Kiểm Tra Hạn Làm Nhà
          </Button>
        </form>

        {result && (
          <div className="mt-8 pt-6 border-t border-border space-y-4">
            <h3 className="text-xl font-serif font-bold text-gold">
              Kết Quả Luận Đoán ({result.age} tuổi mụ)
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div className={`p-4 rounded-xl border ${result.isTamTai ? "bg-red-500/10 border-red-500/30 text-red-300" : "bg-green-500/10 border-green-500/30 text-green-300"}`}>
                <div className="font-semibold text-sm">Tam Tai</div>
                <div className="text-xs mt-1">{result.isTamTai ? "Phạm Tam Tai" : "Không phạm"}</div>
              </div>
              <div className={`p-4 rounded-xl border ${result.isKimLau ? "bg-red-500/10 border-red-500/30 text-red-300" : "bg-green-500/10 border-green-500/30 text-green-300"}`}>
                <div className="font-semibold text-sm">Kim Lâu</div>
                <div className="text-xs mt-1">{result.isKimLau ? "Phạm Kim Lâu" : "Không phạm"}</div>
              </div>
              <div className={`p-4 rounded-xl border ${result.isHoangOc ? "bg-red-500/10 border-red-500/30 text-red-300" : "bg-green-500/10 border-green-500/30 text-green-300"}`}>
                <div className="font-semibold text-sm">Hoang Ốc</div>
                <div className="text-xs mt-1">{result.isHoangOc ? "Phạm Hoang Ốc" : "Cung tốt"}</div>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-gold/10 border border-gold/30 text-center">
              <span className="font-semibold text-gold text-lg">
                {result.canBuild ? "Năm này rất tốt để khởi công xây nhà!" : "Năm này gia chủ nên mượn tuổi làm nhà để tránh phạm vận hạn."}
              </span>
            </div>
          </div>
        )}
      </Card>
    </div>
  )
}
