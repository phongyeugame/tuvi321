import React from "react"

interface ZodiacArtProps {
  chi: string
  className?: string
  opacity?: number
}

// 12 Con Giáp theo phong cách TRANH CẮT GIẤY NGHỆ THUẬT DÂN GIAN (Papercut Folk Art)
// Màu sắc chuẩn theo Ngũ Hành của 12 Địa Chi như ảnh mẫu:
// - Tỵ, Ngọ: Hỏa (Hồng / Đỏ Magenta #f472b6, #fb7185)
// - Dần, Mão: Mộc (Xanh lá non #4ade80, #22c55e)
// - Hợi, Tý: Thủy (Xanh lam / Sky Blue #38bdf8, #60a5fa)
// - Thân, Dậu: Kim (Xám tro / Bạc #9ca3af, #a8a29e)
// - Thìn, Tuất, Sửu, Mùi: Thổ (Vàng nghệ / Hoàng kim #eab308, #f59e0b)

export function ZodiacIllustration({ chi, className = "", opacity = 0.38 }: ZodiacArtProps) {
  switch (chi) {
    case "Tỵ": // Con Rắn - Tông Hồng Phấn Cắt Giấy (Hỏa)
      return (
        <svg
          viewBox="0 0 200 200"
          className={`${className} transition-transform duration-500 hover:scale-105`}
          style={{ opacity }}
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Thân rắn uốn lượn hình xoắn ốc chữ S phong cách cắt giấy */}
          <path
            d="M 100,20
               C 125,18 145,30 145,50
               C 145,68 128,80 110,88
               C 85,98 60,108 58,135
               C 56,162 82,185 115,185
               C 152,185 180,158 180,122
               C 180,95 160,82 148,92
               C 138,102 150,120 150,132
               C 150,150 132,162 112,162
               C 88,162 76,146 76,128
               C 76,110 95,100 120,90
               C 148,78 165,60 165,40
               C 165,15 132,2 98,6
               C 68,10 48,28 50,52
               C 52,70 70,78 80,68
               C 88,60 80,45 74,40
               C 70,36 82,22 100,20 Z"
            fill="#F472B6"
          />
          {/* Đầu rắn, mắt & lưỡi rắn uốn lượn */}
          <circle cx="132" cy="42" r="4.5" fill="#FFFFFF" />
          <circle cx="132" cy="42" r="2.5" fill="#9D174D" />
          <path d="M 145,46 Q 160,46 168,40 Q 172,44 165,48 Q 172,52 166,54" stroke="#BE185D" strokeWidth="2.5" strokeLinecap="round" fill="none" />
          
          {/* Họa tiết hoa mai & xoắn ốc khoét rỗng phong cách cắt giấy dân gian */}
          <circle cx="108" cy="45" r="5" fill="#FFFFFF" fillOpacity="0.85" />
          <circle cx="85" cy="102" r="6.5" fill="#FFFFFF" fillOpacity="0.85" />
          <path d="M 85,96 A 6,6 0 1,1 84.9,96" stroke="#F472B6" strokeWidth="2" fill="none" />
          <circle cx="68" cy="130" r="7.5" fill="#FFFFFF" fillOpacity="0.85" />
          <circle cx="95" cy="172" r="8" fill="#FFFFFF" fillOpacity="0.85" />
          <circle cx="135" cy="172" r="7.5" fill="#FFFFFF" fillOpacity="0.85" />
          <circle cx="165" cy="138" r="7" fill="#FFFFFF" fillOpacity="0.85" />
          
          {/* Cánh hoa khoét rỗng (Cutout petals) */}
          <path d="M 112,148 Q 112,138 120,144 Q 128,150 120,154 Z" fill="#FFFFFF" fillOpacity="0.85" />
          <path d="M 102,154 Q 94,148 102,142 Q 110,146 102,154 Z" fill="#FFFFFF" fillOpacity="0.85" />
        </svg>
      )

    case "Ngọ": // Con Ngựa - Tông Hồng Phấn / Magenta (Hỏa)
      return (
        <svg
          viewBox="0 0 200 200"
          className={`${className} transition-transform duration-500 hover:scale-105`}
          style={{ opacity }}
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Thân ngựa tung vó phi nước đại hướng về bên trái */}
          <path
            d="M 175,145
               C 165,115 138,102 110,105
               C 92,107 80,95 75,76
               C 70,62 65,48 50,38
               C 42,32 28,30 24,42
               C 20,52 30,65 38,76
               C 48,88 54,106 48,122
               C 44,132 30,146 25,162
               C 30,166 45,164 54,152
               C 62,138 70,128 84,132
               C 100,136 116,148 126,166
               C 132,174 142,176 148,168
               C 144,155 152,148 168,155
               C 178,160 188,154 182,140 Z"
            fill="#FB7185"
          />
          {/* Bờm ngựa lượn sóng & Đuôi ngựa bồng bềnh */}
          <path
            d="M 75,50 C 82,60 90,68 96,80 C 102,90 108,98 118,105"
            stroke="#FB7185"
            strokeWidth="9"
            strokeLinecap="round"
          />
          <path
            d="M 165,125 C 176,120 192,125 198,138 C 188,140 180,135 174,132"
            stroke="#FB7185"
            strokeWidth="8"
            strokeLinecap="round"
          />
          {/* Họa tiết hoa mai ngũ giác khoét rỗng trên thân & đùi ngựa */}
          <circle cx="102" cy="122" r="10" fill="#FFFFFF" fillOpacity="0.85" />
          <circle cx="102" cy="122" r="5" fill="#FB7185" />
          <circle cx="82" cy="115" r="5" fill="#FFFFFF" fillOpacity="0.8" />
          <circle cx="122" cy="115" r="5" fill="#FFFFFF" fillOpacity="0.8" />
          <circle cx="92" cy="138" r="4.5" fill="#FFFFFF" fillOpacity="0.8" />
          <circle cx="112" cy="138" r="4.5" fill="#FFFFFF" fillOpacity="0.8" />
          {/* Mắt ngựa */}
          <circle cx="42" cy="52" r="3.5" fill="#FFFFFF" />
          <circle cx="42" cy="52" r="2" fill="#881337" />
        </svg>
      )

    case "Mùi": // Con Dê - Tông Vàng Kim Cắt Giấy (Thổ)
      return (
        <svg
          viewBox="0 0 200 200"
          className={`${className} transition-transform duration-500 hover:scale-105`}
          style={{ opacity }}
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Sừng dê uốn cong vút ra sau và thân dê đứng khoan thai */}
          <path
            d="M 80,35
               C 95,18 120,20 132,36
               C 138,48 135,64 120,68
               C 110,70 102,62 105,52
               C 108,40 120,36 116,30
               C 110,26 96,26 86,38
               C 80,44 75,54 66,52
               C 56,48 48,36 38,46
               C 28,56 38,74 48,82
               C 60,90 70,94 76,108
               C 80,120 76,138 65,150
               C 60,158 64,168 74,168
               C 82,168 88,158 92,148
               C 104,150 118,154 134,166
               C 142,172 152,166 148,154
               C 145,142 150,134 160,136
               C 172,138 180,128 175,115
               C 168,96 148,88 124,90
               C 104,92 88,86 82,75 Z"
            fill="#EAB308"
          />
          {/* Chòm râu dê đặc trưng & mắt */}
          <path d="M 42,70 C 35,82 32,96 36,108" stroke="#EAB308" strokeWidth="6" strokeLinecap="round" />
          <circle cx="52" cy="56" r="3.5" fill="#FFFFFF" />
          <circle cx="52" cy="56" r="2" fill="#713F12" />
          {/* Hoa văn khoét rỗng hoa sen và cuộn mây */}
          <circle cx="112" cy="120" r="11" fill="#FFFFFF" fillOpacity="0.85" />
          <circle cx="112" cy="120" r="5" fill="#EAB308" />
          <circle cx="132" cy="124" r="6" fill="#FFFFFF" fillOpacity="0.8" />
          <circle cx="92" cy="122" r="6" fill="#FFFFFF" fillOpacity="0.8" />
          <path d="M 100,45 Q 112,42 118,52" stroke="#FFFFFF" strokeWidth="2.5" fill="none" />
        </svg>
      )

    case "Thân": // Con Khỉ - Tông Bạc / Xám Tro (Kim)
      return (
        <svg
          viewBox="0 0 200 200"
          className={`${className} transition-transform duration-500 hover:scale-105`}
          style={{ opacity }}
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Khỉ ngồi hướng bên trái, đuôi cong tròn nghệ thuật */}
          <path
            d="M 145,160
               C 150,140 140,124 130,114
               C 135,104 138,88 130,74
               C 124,60 112,50 96,50
               C 78,50 66,60 62,76
               C 56,90 62,106 70,116
               C 60,126 52,140 55,162
               C 58,172 70,175 80,168
               C 90,160 96,148 104,148
               C 112,148 118,158 128,168
               C 138,175 148,170 145,160 Z"
            fill="#9CA3AF"
          />
          {/* Đuôi khỉ uốn lượn vòng tròn phong cách tranh dân gian */}
          <path
            d="M 142,150 C 165,145 178,120 170,98 C 162,78 145,78 142,88 C 138,98 155,105 158,118 C 162,130 150,140 138,142"
            stroke="#9CA3AF"
            strokeWidth="8"
            strokeLinecap="round"
          />
          {/* Tai khỉ & Quả đào tiên trên tay */}
          <circle cx="125" cy="70" r="9" fill="#9CA3AF" />
          <circle cx="68" cy="70" r="9" fill="#9CA3AF" />
          <circle cx="85" cy="118" r="14" fill="#E5E7EB" fillOpacity="0.9" />
          {/* Mắt khỉ & Họa tiết hoa văn */}
          <circle cx="82" cy="70" r="3.5" fill="#FFFFFF" />
          <circle cx="82" cy="70" r="2" fill="#1F2937" />
          <circle cx="104" cy="138" r="7" fill="#FFFFFF" fillOpacity="0.85" />
          <circle cx="104" cy="138" r="3" fill="#9CA3AF" />
        </svg>
      )

    case "Dậu": // Con Gà - Tông Xám Bạc Cắt Giấy (Kim)
      return (
        <svg
          viewBox="0 0 200 200"
          className={`${className} transition-transform duration-500 hover:scale-105`}
          style={{ opacity }}
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Thân gà trống uy phong hướng sang phải, đuôi uốn vòm rực rỡ */}
          <path
            d="M 65,140
               C 60,110 75,90 92,82
               C 98,68 105,52 115,44
               C 122,38 132,40 135,48
               C 138,58 128,68 125,78
               C 138,85 150,96 155,115
               C 158,130 152,148 138,162
               C 128,172 112,175 100,165
               C 92,158 88,148 80,152
               C 74,155 68,150 65,140 Z"
            fill="#9CA3AF"
          />
          {/* Mào gà đỏ răng cưa & mỏ gà */}
          <path d="M 125,42 C 128,30 136,28 140,36 C 144,28 152,32 148,42" fill="#E11D48" />
          <path d="M 135,52 L 148,56 L 135,62 Z" fill="#F59E0B" />
          {/* Đuôi gà uốn cong vút nhiều lớp lông vũ khoét rỗng */}
          <path
            d="M 75,130
               C 50,120 30,95 38,65
               C 42,48 55,42 62,55
               C 50,70 52,90 70,105"
            stroke="#9CA3AF"
            strokeWidth="9"
            strokeLinecap="round"
          />
          <path
            d="M 70,140 C 45,135 25,120 28,95 C 32,80 44,78 48,90"
            stroke="#9CA3AF"
            strokeWidth="7"
            strokeLinecap="round"
          />
          {/* Họa tiết cánh gà khoét rỗng hoa văn nan quạt */}
          <ellipse cx="112" cy="120" rx="15" ry="22" fill="#FFFFFF" fillOpacity="0.85" />
          <path d="M 112,102 L 112,138 M 104,108 L 120,132 M 120,108 L 104,132" stroke="#9CA3AF" strokeWidth="2.5" />
          <circle cx="125" cy="54" r="2.5" fill="#1F2937" />
        </svg>
      )

    case "Tuất": // Con Chó - Tông Vàng Cắt Giấy (Thổ)
      return (
        <svg
          viewBox="0 0 200 200"
          className={`${className} transition-transform duration-500 hover:scale-105`}
          style={{ opacity }}
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Chó ngồi hướng trái, đuôi cong ngược lên lưng */}
          <path
            d="M 140,165
               C 145,142 135,125 125,115
               C 130,100 130,85 122,72
               C 115,60 102,52 88,52
               C 72,52 62,62 58,78
               C 52,92 58,108 68,118
               C 58,128 50,145 52,165
               C 55,175 68,178 78,170
               C 88,162 95,150 105,150
               C 115,150 120,160 130,170
               C 138,175 142,172 140,165 Z"
            fill="#EAB308"
          />
          {/* Tai chó vểnh & Đuôi chó cong tròn hình bông hoa */}
          <path d="M 65,65 C 55,52 60,40 72,45 C 80,48 78,60 70,68" fill="#CA8A04" />
          <path
            d="M 135,152 C 158,145 168,125 162,105 C 155,90 142,92 140,102 C 138,110 148,116 150,128 C 152,138 142,146 132,148"
            stroke="#EAB308"
            strokeWidth="9"
            strokeLinecap="round"
          />
          {/* Vòng cổ chuông đồng & Mắt */}
          <path d="M 68,102 Q 85,110 102,102" stroke="#B45309" strokeWidth="5" strokeLinecap="round" />
          <circle cx="85" cy="115" r="5" fill="#EF4444" />
          <circle cx="75" cy="74" r="3.5" fill="#FFFFFF" />
          <circle cx="75" cy="74" r="2" fill="#713F12" />
          {/* Họa tiết khoét rỗng hoa mai */}
          <circle cx="95" cy="138" r="9" fill="#FFFFFF" fillOpacity="0.85" />
          <circle cx="95" cy="138" r="4.5" fill="#EAB308" />
        </svg>
      )

    case "Hợi": // Con Lợn - Tông Xanh Lam / Sky Blue (Thủy)
      return (
        <svg
          viewBox="0 0 200 200"
          className={`${className} transition-transform duration-500 hover:scale-105`}
          style={{ opacity }}
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Chú lợn béo tròn hướng sang phải theo tranh Đông Hồ & Cắt giấy */}
          <path
            d="M 45,130
               C 42,95 65,75 95,70
               C 125,65 155,75 168,95
               C 178,110 175,128 165,142
               C 152,158 135,168 105,168
               C 72,168 50,155 45,130 Z"
            fill="#38BDF8"
          />
          {/* Mõm lợn hếch & Tai lợn to bản */}
          <ellipse cx="168" cy="115" rx="10" ry="14" fill="#0284C7" />
          <circle cx="166" cy="112" r="2" fill="#FFFFFF" />
          <circle cx="166" cy="118" r="2" fill="#FFFFFF" />
          <path d="M 132,75 C 135,60 148,58 152,68 C 155,78 145,85 138,82" fill="#0284C7" />
          {/* Đuôi lợn xoắn lò xo hình số 8 & 4 chân ngắn xinh */}
          <path d="M 52,118 C 35,115 28,102 36,92 C 45,85 52,95 44,105 C 38,112 45,122 55,125" stroke="#38BDF8" strokeWidth="5" fill="none" />
          <rect x="75" y="160" width="12" height="18" rx="4" fill="#0284C7" />
          <rect x="130" y="160" width="12" height="18" rx="4" fill="#0284C7" />
          {/* Họa tiết vòng xoáy âm dương & cánh hoa khoét rỗng trên lưng lợn */}
          <circle cx="108" cy="118" r="15" fill="#FFFFFF" fillOpacity="0.88" />
          <circle cx="108" cy="118" r="8" fill="#38BDF8" />
          <path d="M 108,110 A 8,8 0 0,1 108,126" fill="#0284C7" />
          <circle cx="80" cy="112" r="5" fill="#FFFFFF" fillOpacity="0.8" />
          <circle cx="136" cy="112" r="5" fill="#FFFFFF" fillOpacity="0.8" />
          {/* Mắt lợn */}
          <circle cx="145" cy="98" r="3.5" fill="#FFFFFF" />
          <circle cx="145" cy="98" r="2" fill="#0C4A6E" />
        </svg>
      )

    case "Tý": // Con Chuột - Tông Xanh Lam / Sky Blue (Thủy)
      return (
        <svg
          viewBox="0 0 200 200"
          className={`${className} transition-transform duration-500 hover:scale-105`}
          style={{ opacity }}
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Chuột ngồi hướng sang phải, đuôi dài uốn cong mềm mại */}
          <path
            d="M 55,145
               C 50,115 72,95 95,90
               C 118,85 142,95 155,115
               C 162,125 160,140 148,155
               C 135,168 118,172 90,172
               C 68,172 58,160 55,145 Z"
            fill="#38BDF8"
          />
          {/* Đầu nhọn, mũi chuột & tai tròn */}
          <path d="M 148,110 L 175,120 L 152,132 Z" fill="#38BDF8" />
          <circle cx="175" cy="120" r="3" fill="#0284C7" />
          <circle cx="128" cy="85" r="14" fill="#0284C7" />
          <circle cx="128" cy="85" r="8" fill="#FFFFFF" fillOpacity="0.8" />
          {/* Đuôi chuột uốn dài vút lên lưng hình chữ S */}
          <path
            d="M 60,150 C 35,140 18,115 25,85 C 32,58 58,52 65,70 C 70,85 52,98 42,115"
            stroke="#38BDF8"
            strokeWidth="7"
            strokeLinecap="round"
            fill="none"
          />
          {/* Mắt chuột & Râu */}
          <circle cx="150" cy="112" r="3" fill="#FFFFFF" />
          <circle cx="150" cy="112" r="1.5" fill="#0C4A6E" />
          <path d="M 168,118 Q 185,114 192,110 M 168,122 Q 185,124 192,128" stroke="#0284C7" strokeWidth="2" />
          {/* Họa tiết hoa văn khoét rỗng */}
          <circle cx="102" cy="132" r="10" fill="#FFFFFF" fillOpacity="0.85" />
          <circle cx="102" cy="132" r="5" fill="#38BDF8" />
          <circle cx="82" cy="135" r="5" fill="#FFFFFF" fillOpacity="0.8" />
          <circle cx="122" cy="135" r="5" fill="#FFFFFF" fillOpacity="0.8" />
        </svg>
      )

    case "Sửu": // Con Trâu - Tông Vàng Kim / Amber (Thổ)
      return (
        <svg
          viewBox="0 0 200 200"
          className={`${className} transition-transform duration-500 hover:scale-105`}
          style={{ opacity }}
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Trâu đứng sừng sững hướng sang phải, sừng cong vút cung trăng */}
          <path
            d="M 45,135
               C 42,105 65,88 95,85
               C 120,82 145,90 160,110
               C 172,125 168,145 152,160
               C 138,172 118,175 90,175
               C 62,175 48,160 45,135 Z"
            fill="#EAB308"
          />
          {/* Cặp sừng trâu uốn cong vĩ đại hình trăng khuyết */}
          <path
            d="M 142,95
               C 145,60 128,32 95,25
               C 85,22 88,14 100,16
               C 142,22 168,55 162,95 Z"
            fill="#CA8A04"
          />
          {/* Mõm trâu & Mắt */}
          <ellipse cx="168" cy="125" rx="8" ry="12" fill="#CA8A04" />
          <circle cx="145" cy="105" r="3.5" fill="#FFFFFF" />
          <circle cx="145" cy="105" r="2" fill="#713F12" />
          {/* Đuôi trâu có chùm lông & Chân trâu vững chãi */}
          <path d="M 50,125 C 32,130 25,148 30,165" stroke="#CA8A04" strokeWidth="5" strokeLinecap="round" />
          <rect x="75" y="168" width="14" height="16" rx="4" fill="#CA8A04" />
          <rect x="130" y="168" width="14" height="16" rx="4" fill="#CA8A04" />
          {/* Họa tiết khoét rỗng hoa sen & cuộn mây */}
          <circle cx="108" cy="130" r="14" fill="#FFFFFF" fillOpacity="0.88" />
          <circle cx="108" cy="130" r="7" fill="#EAB308" />
          <circle cx="82" cy="126" r="6" fill="#FFFFFF" fillOpacity="0.8" />
          <circle cx="132" cy="128" r="6" fill="#FFFFFF" fillOpacity="0.8" />
        </svg>
      )

    case "Dần": // Con Hổ - Tông Xanh Lá Cây Tươi (Mộc)
      return (
        <svg
          viewBox="0 0 200 200"
          className={`${className} transition-transform duration-500 hover:scale-105`}
          style={{ opacity }}
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Hổ dũng mãnh bước đi hướng sang trái, đuôi cong chữ S */}
          <path
            d="M 160,140
               C 162,110 140,92 115,88
               C 92,85 70,95 55,115
               C 45,128 48,145 62,160
               C 76,172 98,175 125,175
               C 152,175 158,160 160,140 Z"
            fill="#4ADE80"
          />
          {/* Đầu hổ & Tai tròn */}
          <circle cx="50" cy="112" r="20" fill="#22C55E" />
          <circle cx="40" cy="95" r="7" fill="#16A34A" />
          <circle cx="60" cy="95" r="7" fill="#16A34A" />
          {/* Chữ "Vương" (王) trên trán hổ & Mắt hổ */}
          <path d="M 46,98 H 54 M 47,103 H 53 M 45,108 H 55 M 50,98 V 108" stroke="#FFFFFF" strokeWidth="1.8" />
          <circle cx="42" cy="115" r="3" fill="#FFFFFF" />
          <circle cx="42" cy="115" r="1.5" fill="#14532D" />
          {/* Đuôi hổ vểnh cao lượn sóng */}
          <path
            d="M 155,135 C 178,130 190,110 182,88 C 176,72 160,75 158,85 C 155,95 168,102 168,115"
            stroke="#4ADE80"
            strokeWidth="8"
            strokeLinecap="round"
          />
          {/* Vằn hổ cắt giấy khoét rỗng nghệ thuật */}
          <path d="M 90,95 L 96,115 L 88,125 M 115,95 L 122,118 L 112,130 M 138,105 L 142,125" stroke="#FFFFFF" strokeWidth="4" strokeLinecap="round" />
          <circle cx="105" cy="142" r="8" fill="#FFFFFF" fillOpacity="0.85" />
          <circle cx="105" cy="142" r="4" fill="#4ADE80" />
        </svg>
      )

    case "Mão": // Con Mèo - Tông Xanh Lá Cây Tươi (Mộc)
      return (
        <svg
          viewBox="0 0 200 200"
          className={`${className} transition-transform duration-500 hover:scale-105`}
          style={{ opacity }}
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Mèo ngồi ngoan ngoãn hướng sang trái, đuôi cong ôm sát thân */}
          <path
            d="M 140,165
               C 145,142 135,122 125,112
               C 130,98 128,82 120,70
               C 112,58 98,52 85,52
               C 70,52 60,62 55,78
               C 50,92 56,108 65,118
               C 55,128 48,145 50,165
               C 52,175 66,178 75,170
               C 85,162 92,150 102,150
               C 112,150 118,160 128,170
               C 136,175 142,172 140,165 Z"
            fill="#4ADE80"
          />
          {/* Tai mèo hình tam giác vểnh cao & Râu mèo */}
          <path d="M 68,62 L 60,40 L 78,50 Z" fill="#22C55E" />
          <path d="M 98,50 L 112,40 L 108,62 Z" fill="#22C55E" />
          <path d="M 52,85 Q 35,80 28,76 M 52,90 Q 35,92 26,96" stroke="#16A34A" strokeWidth="2" strokeLinecap="round" />
          {/* Đuôi mèo uốn cong tròn quanh chân */}
          <path
            d="M 135,152 C 158,145 168,125 160,105 C 152,90 140,92 138,102 C 136,110 146,116 148,128 C 150,138 138,148 128,150"
            stroke="#4ADE80"
            strokeWidth="8"
            strokeLinecap="round"
          />
          {/* Mắt mèo tinh anh & Họa tiết hoa mai khoét rỗng */}
          <circle cx="75" cy="74" r="4" fill="#FFFFFF" />
          <circle cx="75" cy="74" r="2" fill="#14532D" />
          <circle cx="95" cy="132" r="10" fill="#FFFFFF" fillOpacity="0.88" />
          <circle cx="95" cy="132" r="5" fill="#4ADE80" />
          <circle cx="75" cy="135" r="5" fill="#FFFFFF" fillOpacity="0.8" />
          <circle cx="115" cy="135" r="5" fill="#FFFFFF" fillOpacity="0.8" />
        </svg>
      )

    case "Thìn": // Con Rồng - Tông Vàng Kim Cổ Điển (Thổ)
    default:
      return (
        <svg
          viewBox="0 0 200 200"
          className={`${className} transition-transform duration-500 hover:scale-105`}
          style={{ opacity }}
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Rồng thời Lý uốn khúc hình sin chữ S, đầu ngẩng cao nhả ngọc */}
          <path
            d="M 50,155
               C 38,130 52,108 78,105
               C 104,100 124,85 118,65
               C 112,48 128,34 145,38
               C 162,42 168,58 158,76
               C 145,96 118,114 128,136
               C 135,152 158,155 172,142
               C 182,132 188,140 180,152
               C 168,172 138,175 115,165
               C 88,152 68,168 50,155 Z"
            fill="#EAB308"
          />
          {/* Mào rồng, sừng hươu, râu rồng & Hạt ngọc minh châu */}
          <path d="M 155,42 Q 178,30 188,45 Q 170,56 160,52" fill="#CA8A04" />
          <path d="M 166,62 Q 188,70 180,84" stroke="#CA8A04" strokeWidth="4.5" strokeLinecap="round" />
          <circle cx="185" cy="76" r="7" fill="#EF4444" fillOpacity="0.9" />
          {/* Vây lưng rồng hình ngọn lửa nhấp nhô */}
          <path
            d="M 128,58 L 135,48 L 135,62 M 115,75 L 122,66 L 124,80 M 96,95 L 104,86 L 108,100 M 68,112 L 76,104 L 78,118"
            stroke="#B45309"
            strokeWidth="3.5"
            strokeLinecap="round"
          />
          {/* Mắt rồng & Vảy rồng khoét rỗng hoa sen */}
          <circle cx="148" cy="48" r="4" fill="#FFFFFF" />
          <circle cx="148" cy="48" r="2.5" fill="#713F12" />
          <circle cx="105" cy="118" r="8" fill="#FFFFFF" fillOpacity="0.85" />
          <circle cx="105" cy="118" r="4" fill="#EAB308" />
          <circle cx="138" cy="148" r="6" fill="#FFFFFF" fillOpacity="0.8" />
        </svg>
      )
  }
}

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
