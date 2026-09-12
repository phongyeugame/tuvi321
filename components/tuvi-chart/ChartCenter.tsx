import { UserChartInfo, TuViChartData } from "./types";

interface ChartCenterProps {
  user: UserChartInfo;
  metadata?: TuViChartData["metadata"];
  x: number;
  y: number;
  width: number;
  height: number;
}

export function ChartCenter({ user, metadata, x, y, width, height }: ChartCenterProps) {
  const centerX = x + width / 2;
  const centerY = y + height / 2;
  const title = metadata?.title || "LÁ SỐ TỬ VI";
  const subtitle = metadata?.subtitle || "NGUYỄN QUỐC TRƯỞNG - 0865.341.434";

  // Tọa độ các khối nội dung bên trong Thiên Bàn
  const headerY = y + 42;
  const dividerHeaderY = y + 96;

  // Bảng thông tin 16 dòng
  const infoStartY = dividerHeaderY + 32;
  const infoLineHeight = 31;
  const col1X = x + 28;

  // Thanh Điểm lá số
  const scoreDividerY = y + 625;
  const scoreBarY = scoreDividerY + 20;

  // Bảng ma trận chỉ số 4x4
  const matrixStartY = scoreBarY + 45;
  const matrixColWidth = (width - 56) / 4;

  return (
    <g id="chart-center" className="chart-center select-none">
      {/* 1. Nền Thiên Bàn trung tâm */}
      <rect
        x={x}
        y={y}
        width={width}
        height={height}
        fill="#FFFDF9"
      />

      {/* 2. Đường viền nét đứt màu nâu đỏ */}
      <rect
        x={x}
        y={y}
        width={width}
        height={height}
        fill="none"
        stroke="#8B3A3A"
        strokeWidth="1"
        strokeDasharray="2 3"
        strokeOpacity="0.6"
      />

      {/* 3.1. Các đường chỉ đỏ mảnh hướng tâm (Trục xung chiếu xuyên tâm theo phong cách truyền thống) */}
      <g className="radial-rays pointer-events-none" opacity="0.22" stroke="#DC2626" strokeWidth="0.8" strokeDasharray="3 3">
        <line x1={x} y1={y} x2={x + width} y2={y + height} />
        <line x1={x + width} y1={y} x2={x} y2={y + height} />
        <line x1={centerX} y1={y} x2={centerX} y2={y + height} />
        <line x1={x} y1={centerY} x2={x + width} y2={centerY} />
        <line x1={x + width * 0.25} y1={y} x2={x + width * 0.75} y2={y + height} />
        <line x1={x + width * 0.75} y1={y} x2={x + width * 0.25} y2={y + height} />
        <line x1={x} y1={y + height * 0.25} x2={x + width} y2={y + height * 0.75} />
        <line x1={x} y1={y + height * 0.75} x2={x + width} y2={y + height * 0.25} />
      </g>

      {/* 3.2. Vòng Tròn Họa Tiết Cổ Điển Nghệ Thuật Nền (Celestial Mandala Ornament) */}
      <g opacity="0.16" transform={`translate(${centerX}, ${centerY - 10})`}>
        {/* Vòng tròn kép lớn */}
        <circle cx="0" cy="0" r="230" fill="none" stroke="#D97706" strokeWidth="2.5" />
        <circle cx="0" cy="0" r="218" fill="none" stroke="#D97706" strokeWidth="1" strokeDasharray="5 4" />
        <circle cx="0" cy="0" r="175" fill="none" stroke="#D97706" strokeWidth="1.5" />
        <circle cx="0" cy="0" r="110" fill="none" stroke="#D97706" strokeWidth="1" />
        <circle cx="0" cy="0" r="45" fill="none" stroke="#D97706" strokeWidth="1.5" />

        {/* Các cánh hoa văn Bát Quái / Thái Cực uốn lượn cổ điển */}
        <path
          d="M 0,-175 C 60,-175 60,-45 0,-45 C -60,-45 -60,-175 0,-175 Z"
          fill="none"
          stroke="#D97706"
          strokeWidth="1.5"
        />
        <path
          d="M 0,175 C 60,175 60,45 0,45 C -60,45 -60,175 0,175 Z"
          fill="none"
          stroke="#D97706"
          strokeWidth="1.5"
        />
        <path
          d="M -175,0 C -175,60 -45,60 -45,0 C -45,-60 -175,-60 -175,0 Z"
          fill="none"
          stroke="#D97706"
          strokeWidth="1.5"
        />
        <path
          d="M 175,0 C 175,60 45,60 45,0 C 45,-60 175,-60 175,0 Z"
          fill="none"
          stroke="#D97706"
          strokeWidth="1.5"
        />

        {/* Chữ thương hiệu chìm chính giữa như ảnh mẫu */}
        <text
          x="0"
          y="-20"
          textAnchor="middle"
          fill="#D97706"
          fontSize="36"
          fontWeight="900"
          letterSpacing="3"
          opacity="0.85"
          fontFamily="var(--font-serif), 'Playfair Display', serif"
        >
          GIA TỘC VIỆT
        </text>
        <text
          x="0"
          y="22"
          textAnchor="middle"
          fill="#DC2626"
          fontSize="34"
          fontWeight="900"
          letterSpacing="1"
          opacity="0.95"
          fontFamily="var(--font-sans), 'Inter', sans-serif"
        >
          {metadata?.adminPhone ? metadata.adminPhone.replace(/(\d{4})(\d{3})(\d{3})/, "$1.$2.$3") : "0865.341.434"}
        </text>
        <text
          x="0"
          y="56"
          textAnchor="middle"
          fill="#D97706"
          fontSize="24"
          fontStyle="italic"
          fontWeight="600"
          opacity="0.75"
          fontFamily="var(--font-serif), 'Playfair Display', serif"
        >
          Feng shui
        </text>
      </g>

      {/* 4. Tiêu đề Thiên Bàn (LÁ SỐ TỬ VI) */}
      <text
        x={centerX}
        y={headerY}
        textAnchor="middle"
        fill="#3f1a1a"
        fontSize="21"
        fontWeight="900"
        fontFamily="var(--font-serif), 'Playfair Display', serif"
        letterSpacing="4"
      >
        {title}
      </text>

      <text
        x={centerX}
        y={headerY + 28}
        textAnchor="middle"
        fill="#DC2626"
        fontSize="17"
        fontWeight="800"
        fontFamily="var(--font-serif), 'Playfair Display', serif"
        letterSpacing="1.2"
      >
        {subtitle}
      </text>

      {/* Đường phân cách Header kèm hoa văn quả trám giữa */}
      <line
        x1={x + 30}
        y1={dividerHeaderY}
        x2={centerX - 15}
        y2={dividerHeaderY}
        stroke="#8B3A3A"
        strokeWidth="1"
        strokeDasharray="4 3"
        strokeOpacity="0.45"
      />
      <rect
        x={centerX - 5}
        y={dividerHeaderY - 5}
        width="10"
        height="10"
        fill="#8B3A3A"
        transform={`rotate(45 ${centerX} ${dividerHeaderY})`}
        fillOpacity="0.6"
      />
      <line
        x1={centerX + 15}
        y1={dividerHeaderY}
        x2={x + width - 30}
        y2={dividerHeaderY}
        stroke="#8B3A3A"
        strokeWidth="4 3"
        strokeOpacity="0.45"
      />

      {/* 5. Bảng Thông Tin Đương Số (Nhãn bên trái - Giá trị bên phải theo đúng ảnh mẫu) */}
      <g className="user-info-rows" fontSize="12" fontFamily="var(--font-sans), 'Inter', sans-serif">
        {/* Dòng 1: Họ Tên */}
        <text x={x + 28} y={infoStartY} fill="#4b5563">Họ Tên:</text>
        <text x={x + width - 28} y={infoStartY} textAnchor="end" fill="#b91c1c" fontWeight="800" fontSize="13.5" fontFamily="var(--font-serif), 'Playfair Display', serif">
          {user.name}
        </text>

        {/* Dòng 2: Âm Dương */}
        <text x={x + 28} y={infoStartY + infoLineHeight} fill="#4b5563">Âm Dương:</text>
        <text x={x + width - 28} y={infoStartY + infoLineHeight} textAnchor="end" fill="#111827" fontWeight="600">
          {user.amDuong}
        </text>

        {/* Dòng 3: Tuổi */}
        <text x={x + 28} y={infoStartY + infoLineHeight * 2} fill="#4b5563">Tuổi:</text>
        <text x={x + width - 28} y={infoStartY + infoLineHeight * 2} textAnchor="end" fill="#111827" fontWeight="600">
          {user.stemsBranches.year}, 26 tuổi (thời điểm lập lá số)
        </text>

        {/* Dòng 4: Ngày Sinh */}
        <text x={x + 28} y={infoStartY + infoLineHeight * 3} fill="#4b5563">Ngày Sinh:</text>
        <text x={x + width - 28} y={infoStartY + infoLineHeight * 3} textAnchor="end" fill="#111827">
          ngày {user.lunarDate} âm - {user.solarDate} dương
        </text>

        {/* Dòng 5: Can Chi */}
        <text x={x + 28} y={infoStartY + infoLineHeight * 4} fill="#4b5563">Can Chi:</text>
        <text x={x + width - 28} y={infoStartY + infoLineHeight * 4} textAnchor="end" fill="#111827">
          ngày {user.stemsBranches.day}, tháng {user.stemsBranches.month}, năm {user.stemsBranches.year}
        </text>

        {/* Dòng 6: Sinh Giờ */}
        <text x={x + 28} y={infoStartY + infoLineHeight * 5} fill="#4b5563">Sinh Giờ:</text>
        <text x={x + width - 28} y={infoStartY + infoLineHeight * 5} textAnchor="end" fill="#111827">
          {user.birthHour}
        </text>

        {/* Dòng 7: Cục */}
        <text x={x + 28} y={infoStartY + infoLineHeight * 6} fill="#4b5563">Cục:</text>
        <text x={x + width - 28} y={infoStartY + infoLineHeight * 6} textAnchor="end" fill="#15803d" fontWeight="700">
          {user.cuc} {user.menhKhacCuc ? `(${user.menhKhacCuc})` : ""}
        </text>

        {/* Dòng 8: Bản Mệnh */}
        <text x={x + 28} y={infoStartY + infoLineHeight * 7} fill="#4b5563">Bản Mệnh:</text>
        <text x={x + width - 28} y={infoStartY + infoLineHeight * 7} textAnchor="end" fill="#b45309" fontWeight="700">
          {user.menh}
        </text>

        {/* Dòng 9: Căn Tính */}
        <text x={x + 28} y={infoStartY + infoLineHeight * 8} fill="#4b5563">Cầm Tinh:</text>
        <text x={x + width - 28} y={infoStartY + infoLineHeight * 8} textAnchor="end" fill="#111827">
          {user.camTinh || "Con rắn xuất tướng tinh con thỏ"}
        </text>

        {/* Dòng 10: *Chủ Mệnh */}
        <text x={x + 28} y={infoStartY + infoLineHeight * 9} fill="#4b5563">*Chủ Mệnh:</text>
        <text x={x + width - 28} y={infoStartY + infoLineHeight * 9} textAnchor="end" fill="#b91c1c" fontWeight="700">
          {user.chuMenh || "Vũ Khúc"}
        </text>

        {/* Dòng 11: *Chủ Thân */}
        <text x={x + 28} y={infoStartY + infoLineHeight * 10} fill="#4b5563">*Chủ Thân:</text>
        <text x={x + width - 28} y={infoStartY + infoLineHeight * 10} textAnchor="end" fill="#1d4ed8" fontWeight="700">
          {user.chuThan || "Thiên Cơ"}
        </text>

        {/* Dòng 12: Con Nhà */}
        <text x={x + 28} y={infoStartY + infoLineHeight * 11} fill="#4b5563">Con Nhà:</text>
        <text x={x + width - 28} y={infoStartY + infoLineHeight * 11} textAnchor="end" fill="#111827">
          {user.conNha || "Con nhà BẠCH ĐẾ (trường thành)"}
        </text>

        {/* Dòng 13: Độ Mạng */}
        <text x={x + 28} y={infoStartY + infoLineHeight * 12} fill="#4b5563">Độ Mạng:</text>
        <text x={x + width - 28} y={infoStartY + infoLineHeight * 12} textAnchor="end" fill="#111827">
          {user.doMang || "Ông Quan Đế độ mạng"}
        </text>

        {/* Dòng 14: Cân Lượng */}
        <text x={x + 28} y={infoStartY + infoLineHeight * 13} fill="#4b5563">Cân Lượng:</text>
        <text x={x + width - 28} y={infoStartY + infoLineHeight * 13} textAnchor="end" fill="#111827">
          {user.canLuong || "4 lượng 0 chỉ"}
        </text>

        {/* Dòng 15: Hạn Năm */}
        <text x={x + 28} y={infoStartY + infoLineHeight * 14} fill="#4b5563">Hạn Năm:</text>
        <text x={x + width - 28} y={infoStartY + infoLineHeight * 14} textAnchor="end" fill="#b91c1c" fontWeight="700">
          {user.hanNam || "Bính Ngọ (2026)"}
        </text>

        {/* Dòng 16: Lập Lúc */}
        <text x={x + 28} y={infoStartY + infoLineHeight * 15} fill="#4b5563">Lập Lúc:</text>
        <text x={x + width - 28} y={infoStartY + infoLineHeight * 15} textAnchor="end" fill="#64748b" fontSize="11">
          {user.lapLuc || "10:32 phút, ngày 26/04/2026"}
        </text>
      </g>

      {/* 6. Thanh Progress Bar Điểm Lá Số */}
      <g className="score-section">
        <line
          x1={x + 24}
          y1={scoreDividerY}
          x2={x + width - 24}
          y2={scoreDividerY}
          stroke="#8B3A3A"
          strokeWidth="0.8"
          strokeDasharray="3 3"
          strokeOpacity="0.4"
        />

        <text
          x={col1X}
          y={scoreBarY + 13}
          fill="#374151"
          fontSize="12"
          fontWeight="600"
          fontFamily="var(--font-sans), 'Inter', sans-serif"
        >
          Điểm lá số:
        </text>

        {/* Khung thanh điểm */}
        <rect
          x={col1X + 80}
          y={scoreBarY}
          width={width - 128}
          height={18}
          rx={3}
          fill="#e2e8f0"
          stroke="#cbd5e1"
          strokeWidth="0.8"
        />

        {/* Thanh màu xanh navy */}
        <rect
          x={col1X + 80}
          y={scoreBarY}
          width={((width - 128) * Math.min(100, Math.max(10, user.diemLaSo || 75))) / 100}
          height={18}
          rx={3}
          fill="#1e40af"
        />

        {/* Số % ở giữa thanh */}
        <text
          x={col1X + 80 + (width - 128) / 2}
          y={scoreBarY + 13}
          textAnchor="middle"
          fill="#FFFFFF"
          fontSize="11"
          fontWeight="800"
          fontFamily="var(--font-sans), 'Inter', sans-serif"
        >
          {user.diemLaSo || 75}%
        </text>
      </g>

      {/* 7. Bảng Ma Trận Chỉ Số 4×4 */}
      <g
        className="matrix-section"
        fontSize="10.5"
        fontFamily="var(--font-sans), 'Inter', sans-serif"
      >
        <line
          x1={x + 24}
          y1={matrixStartY - 10}
          x2={x + width - 24}
          y2={matrixStartY - 10}
          stroke="#cbd5e1"
          strokeWidth="0.8"
        />

        {/* Cột 1 */}
        <text x={x + 24} y={matrixStartY + 6} fill="#4b5563">
          Mệnh:<tspan fill="#dc2626" fontWeight="700">1.7</tspan>
        </text>
        <text x={x + 24} y={matrixStartY + 26} fill="#4b5563">
          Quan lộc:<tspan fill="#dc2626" fontWeight="700">-8</tspan>
        </text>
        <text x={x + 24} y={matrixStartY + 46} fill="#4b5563">
          Tài bạch:<tspan fill="#dc2626" fontWeight="700">3.3</tspan>
        </text>

        {/* Cột 2 */}
        <text x={x + 24 + matrixColWidth} y={matrixStartY + 6} fill="#4b5563">
          Phụ mẫu:<tspan fill="#dc2626" fontWeight="700">6.7</tspan>
        </text>
        <text x={x + 24 + matrixColWidth} y={matrixStartY + 26} fill="#4b5563">
          Nô bộc:<tspan fill="#dc2626" fontWeight="700">-10</tspan>
        </text>
        <text x={x + 24 + matrixColWidth} y={matrixStartY + 46} fill="#4b5563">
          Tử tức:<tspan fill="#dc2626" fontWeight="700">12.4</tspan>
        </text>

        {/* Cột 3 */}
        <text x={x + 24 + matrixColWidth * 2} y={matrixStartY + 6} fill="#4b5563">
          Phúc đức:<tspan fill="#dc2626" fontWeight="700">3.6</tspan>
        </text>
        <text x={x + 24 + matrixColWidth * 2} y={matrixStartY + 26} fill="#4b5563">
          Thiên di:<tspan fill="#dc2626" fontWeight="700">-7</tspan>
        </text>
        <text x={x + 24 + matrixColWidth * 2} y={matrixStartY + 46} fill="#4b5563">
          Thu thê:<tspan fill="#dc2626" fontWeight="700">14.4</tspan>
        </text>

        {/* Cột 4 */}
        <text x={x + 24 + matrixColWidth * 3} y={matrixStartY + 6} fill="#4b5563">
          Điền trạch:<tspan fill="#dc2626" fontWeight="700">0</tspan>
        </text>
        <text x={x + 24 + matrixColWidth * 3} y={matrixStartY + 26} fill="#4b5563">
          Tật ách:<tspan fill="#dc2626" fontWeight="700">10</tspan>
        </text>
        <text x={x + 24 + matrixColWidth * 3} y={matrixStartY + 46} fill="#4b5563">
          Huynh đệ:<tspan fill="#dc2626" fontWeight="700">-1</tspan>
        </text>

        {/* Hàng 4: 2 mục lớn theo đúng ảnh mẫu */}
        <text x={x + 24} y={matrixStartY + 68} fill="#4b5563">
          Mệnh Kim khắc Cục <tspan fill="#15803d" fontWeight="700">Mộc:</tspan>
          <tspan fill="#dc2626" fontWeight="700">-2</tspan>
        </text>
        <text x={x + 24 + matrixColWidth * 2} y={matrixStartY + 68} fill="#4b5563">
          Âm Dương thuận lý:<tspan fill="#dc2626" fontWeight="700">1.5</tspan>
        </text>
      </g>
    </g>
  );
}
