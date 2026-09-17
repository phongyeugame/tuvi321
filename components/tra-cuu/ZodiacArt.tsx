import React from "react"

// Biểu tượng Con Ngựa Vàng nhỏ bên cạnh Hóa Lộc, Hóa Quyền, Hóa Khoa, Hóa Kỵ
export function MiniHorseIcon({ className = "w-3 h-3 inline-block" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="#D97706">
      <path d="M19 5c-.5-1-1.5-1.5-2.5-1.5-.7 0-1.5.3-2 .8L12.5 6 10 5C8.5 5 7 6 6.5 7.5L5 12l2 1 1-2 1.5 1-1.5 4h2l1.5-3 2 1.5V20h2v-6.5l2-1.5 1 2 2-1-1.5-4.5c1-.5 1.5-1.5 1.5-2.5 0-.7-.3-1.5-.8-2L19 5z" />
    </svg>
  )
}

// Logo Rồng Phong Thủy Vàng Hoàng Đạo Trung Tâm Thiên Bàn (Giống 100% mẫu ảnh Gia Tộc Việt)
export function CentralFengShuiSeal({
  adminName,
  phone,
  className = ""
}: {
  adminName: string
  phone: string
  className?: string
}) {
  return (
    <div className={`relative flex items-center justify-center select-none pointer-events-none ${className}`}>
      <svg viewBox="0 0 320 320" className="w-full h-full max-w-[300px] max-h-[300px] animate-pulse-slow">
        {/* Vòng Tròn Rồng Uốn Lượn Toàn Thân (Ouroboros Dragon Ring) */}
        <path
          d="M 160, 20
             C 80, 20 20, 80 20, 160
             C 20, 240 80, 300 160, 300
             C 240, 300 300, 240 300, 160
             C 300, 80 240, 20 160, 20 Z
             M 160, 52
             C 220, 52 268, 100 268, 160
             C 268, 220 220, 268 160, 268
             C 100, 268 52, 220 52, 160
             C 52, 100 100, 52 160, 52 Z"
          fill="#D97706"
          fillOpacity="0.32"
        />

        {/* Đầu Rồng & Móng Rồng Phong Thủy sắc sảo viền cung */}
        <path
          d="M 160, 22
             C 115, 22 65, 55 42, 95
             C 20, 135 28, 185 58, 220
             C 88, 255 138, 275 188, 265
             C 238, 255 278, 215 282, 165
             C 285, 115 255, 65 215, 40
             C 210, 52 225, 75 230, 100
             C 240, 135 228, 175 200, 202
             C 172, 230 130, 238 95, 222
             C 60, 205 45, 165 52, 128
             C 60, 92 88, 62 122, 48
             C 135, 44 148, 32 160, 22 Z"
          fill="#E58C0A"
          fillOpacity="0.55"
        />

        {/* Vây Lưng Gai Rồng & Bờm Bay */}
        <path
          d="M 52, 92 Q 28, 98 38, 118 Q 50, 106 52, 92 Z
             M 32, 142 Q 12, 158 26, 172 Q 40, 156 32, 142 Z
             M 46, 196 Q 34, 220 54, 232 Q 62, 212 46, 196 Z
             M 92, 250 Q 96, 274 120, 274 Q 116, 254 92, 250 Z"
          fill="#B45309"
          fillOpacity="0.65"
        />

        {/* Cung chữ uốn lượn phong thủy theo vòng tròn: GIA TỘC VIỆT / THẦY NGUYỄN QUỐC TRƯỞNG */}
        <path id="curveBrand" d="M 60,155 A 100,100 0 0,1 260,155" fill="none" />
        <text className="font-serif font-black text-[21px] md:text-[24px] fill-amber-800 tracking-wider uppercase">
          <textPath href="#curveBrand" startOffset="50%" textAnchor="middle">
            {adminName}
          </textPath>
        </text>

        {/* Số điện thoại Hotline Đỏ Rực Nổi Bật Chính Giữa Vòng Rồng */}
        <text
          x="160"
          y="166"
          textAnchor="middle"
          className="font-sans font-black text-[27px] md:text-[30px] fill-red-600 tracking-tight"
          style={{ filter: "drop-shadow(0 1px 3px rgba(255,255,255,0.9))" }}
        >
          {phone}
        </text>

        {/* Chữ thư pháp nghệ thuật feng shui bên dưới */}
        <text
          x="160"
          y="196"
          textAnchor="middle"
          className="font-serif italic text-[18px] md:text-[20px] fill-amber-700 font-bold"
        >
          feng shui
        </text>
      </svg>
    </div>
  )
}
