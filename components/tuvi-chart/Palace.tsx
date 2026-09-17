import React from "react";
import { PalaceData } from "./types";
import { PalaceHeader } from "./PalaceHeader";
import { StarList } from "./StarList";
import { ZodiacIcon, getChiTextColor } from "@/components/zodiac/ZodiacIcon";

interface PalaceProps {
  palace: PalaceData;
  x: number;
  y: number;
  width: number;
  height: number;
  isSelected?: boolean;
  onSelect?: () => void;
  bgOnly?: boolean;
  contentOnly?: boolean;
}

// Icon Con Ngựa Vàng nhỏ cho Tứ Hóa
function MiniHorseSvg({ x, y }: { x: number; y: number }) {
  return (
    <g transform={`translate(${x}, ${y}) scale(0.48)`}>
      <path
        d="M19 5c-.5-1-1.5-1.5-2.5-1.5-.7 0-1.5.3-2 .8L12.5 6 10 5C8.5 5 7 6 6.5 7.5L5 12l2 1 1-2 1.5 1-1.5 4h2l1.5-3 2 1.5V20h2v-6.5l2-1.5 1 2 2-1-1.5-4.5c1-.5 1.5-1.5 1.5-2.5 0-.7-.3-1.5-.8-2L19 5z"
        fill="#D97706"
      />
    </g>
  );
}

export function Palace({
  palace,
  x,
  y,
  width,
  height,
  isSelected = false,
  onSelect,
  bgOnly = false,
  contentOnly = false,
}: PalaceProps) {
  const isMenh = palace.name === "MỆNH";

  // Nếu chỉ render nền để tối ưu phân lớp Layering (nền -> đường nối -> nội dung)
  if (bgOnly) {
    return (
      <rect
        key={`bg-${palace.id}`}
        x={x}
        y={y}
        width={width}
        height={height}
        fill={palace.pastelBgColor || "#FAF6EE"}
        fillOpacity={isMenh ? 0.98 : 0.9}
      />
    );
  }

  // Tọa độ phần Tứ Hóa (4 hàng xếp dọc phía dưới)
  const phiTinhDividerY = y + height - 100;
  const phiTinhRow1Y = phiTinhDividerY + 16;
  const phiTinhRow2Y = phiTinhDividerY + 31;
  const phiTinhRow3Y = phiTinhDividerY + 46;
  const phiTinhRow4Y = phiTinhDividerY + 61;

  // Tọa độ phần Chân Ô
  const footerDividerY = y + height - 34;
  const footerCenterY = footerDividerY + 21;

  return (
    <g
      id={`palace-${palace.id}`}
      className="palace-cell cursor-pointer transition-all duration-200 select-none"
      onClick={onSelect}
    >
      {/* 1. Nền ô cung (Màu pastel dịu nhẹ theo Địa Chi - bỏ qua nếu contentOnly vì đã render ở background-layer) */}
      {!contentOnly && (
        <rect
          x={x}
          y={y}
          width={width}
          height={height}
          fill={palace.pastelBgColor || "#FAF6EE"}
          fillOpacity={isMenh ? 0.98 : 0.9}
        />
      )}

      {/* 2. Đường viền nét đứt màu nâu đỏ ngăn cách các cung */}
      <rect
        x={x}
        y={y}
        width={width}
        height={height}
        fill="none"
        stroke="#8B3A3A"
        strokeWidth={isSelected ? 2 : 1}
        strokeDasharray="2 3"
        strokeOpacity={isSelected ? 1 : 0.55}
      />

      {/* 3. Hình Con Giáp Watermark nạp từ /public/zodiac/ tô màu bằng CSS mask */}
      <foreignObject
        x={x}
        y={y}
        width={width}
        height={height}
        className="pointer-events-none select-none overflow-hidden"
        aria-hidden="true"
      >
        <div className="w-full h-full flex items-end justify-center pb-2 overflow-hidden">
          <ZodiacIcon
            chi={palace.earthlyBranch || palace.branch}
            className={`w-[85%] h-[85%] opacity-40 ${getChiTextColor(palace.earthlyBranch || palace.branch)}`}
          />
        </div>
      </foreignObject>

      {/* 4. Header Ô Cung */}
      <PalaceHeader palace={palace} x={x} y={y} width={width} />

      {/* 5. Danh Sách Sao (Chính tinh, Cát tinh, Sát tinh & Huy hiệu Triệt / Tuần) */}
      <StarList
        majorStars={palace.majorStars}
        auspiciousStars={palace.auspiciousStars}
        inauspiciousStars={palace.inauspiciousStars}
        triet={palace.triet}
        tuan={palace.tuan}
        x={x}
        y={y}
        width={width}
        height={height}
      />

      {/* 6. Phần Tứ Hóa Phi Tinh (4 hàng xếp dọc bên dưới) */}
      <g className="palace-phi-tinh select-none">
        <line
          x1={x + 10}
          y1={phiTinhDividerY}
          x2={x + width - 10}
          y2={phiTinhDividerY}
          stroke="#8B3A3A"
          strokeWidth="0.8"
          strokeDasharray="2 2.5"
          strokeOpacity="0.4"
        />

        {/* Hàng 1: Hóa Lộc */}
        {palace.transformations.isTuLoc ? (
          <text
            x={x + 12}
            y={phiTinhRow1Y}
            fontSize="10"
            fontFamily="var(--font-sans), 'Inter', sans-serif"
          >
            <tspan fill="#dc2626" fontWeight="800">Tự </tspan>
            <tspan fill="#b91c1c" fontStyle="italic" fontWeight="700">Hóa lộc</tspan>
          </text>
        ) : (
          <g>
            <text
              x={x + 12}
              y={phiTinhRow1Y}
              fontSize="10"
              fill="#0284c7"
              fontStyle="italic"
              fontWeight="600"
              fontFamily="var(--font-sans), 'Inter', sans-serif"
            >
              Hóa lộc
            </text>
            <MiniHorseSvg x={x + 52} y={phiTinhRow1Y - 9} />
            <text
              x={x + 65}
              y={phiTinhRow1Y}
              fontSize="10"
              fill="#64748b"
              fontFamily="var(--font-sans), 'Inter', sans-serif"
            >
              {palace.transformations.loc || "Mệnh"}
            </text>
          </g>
        )}

        {/* Hàng 2: Hóa Quyền */}
        {palace.transformations.isTuQuyen ? (
          <text
            x={x + 12}
            y={phiTinhRow2Y}
            fontSize="10"
            fontFamily="var(--font-sans), 'Inter', sans-serif"
          >
            <tspan fill="#dc2626" fontWeight="800">Tự </tspan>
            <tspan fill="#b91c1c" fontStyle="italic" fontWeight="700">Hóa quyền</tspan>
          </text>
        ) : (
          <g>
            <text
              x={x + 12}
              y={phiTinhRow2Y}
              fontSize="10"
              fill="#0284c7"
              fontStyle="italic"
              fontWeight="600"
              fontFamily="var(--font-sans), 'Inter', sans-serif"
            >
              Hóa quyền
            </text>
            <MiniHorseSvg x={x + 63} y={phiTinhRow2Y - 9} />
            <text
              x={x + 76}
              y={phiTinhRow2Y}
              fontSize="10"
              fill="#64748b"
              fontFamily="var(--font-sans), 'Inter', sans-serif"
            >
              {palace.transformations.quyen || "Thiên di"}
            </text>
          </g>
        )}

        {/* Hàng 3: Hóa Khoa */}
        {palace.transformations.isTuKhoa ? (
          <text
            x={x + 12}
            y={phiTinhRow3Y}
            fontSize="10"
            fontFamily="var(--font-sans), 'Inter', sans-serif"
          >
            <tspan fill="#dc2626" fontWeight="800">Tự </tspan>
            <tspan fill="#b91c1c" fontStyle="italic" fontWeight="700">Hóa khoa</tspan>
          </text>
        ) : (
          <g>
            <text
              x={x + 12}
              y={phiTinhRow3Y}
              fontSize="10"
              fill="#0284c7"
              fontStyle="italic"
              fontWeight="600"
              fontFamily="var(--font-sans), 'Inter', sans-serif"
            >
              Hóa khoa
            </text>
            <MiniHorseSvg x={x + 58} y={phiTinhRow3Y - 9} />
            <text
              x={x + 71}
              y={phiTinhRow3Y}
              fontSize="10"
              fill="#64748b"
              fontFamily="var(--font-sans), 'Inter', sans-serif"
            >
              {palace.transformations.khoa || "Phụ mẫu"}
            </text>
          </g>
        )}

        {/* Hàng 4: Hóa Kỵ */}
        {palace.transformations.isTuKy ? (
          <text
            x={x + 12}
            y={phiTinhRow4Y}
            fontSize="10"
            fontFamily="var(--font-sans), 'Inter', sans-serif"
          >
            <tspan fill="#dc2626" fontWeight="800">Tự </tspan>
            <tspan fill="#b91c1c" fontStyle="italic" fontWeight="700">Hóa kỵ</tspan>
          </text>
        ) : (
          <g>
            <text
              x={x + 12}
              y={phiTinhRow4Y}
              fontSize="10"
              fill="#0284c7"
              fontStyle="italic"
              fontWeight="600"
              fontFamily="var(--font-sans), 'Inter', sans-serif"
            >
              Hóa kỵ
            </text>
            <MiniHorseSvg x={x + 47} y={phiTinhRow4Y - 9} />
            <text
              x={x + 60}
              y={phiTinhRow4Y}
              fontSize="10"
              fill="#64748b"
              fontFamily="var(--font-sans), 'Inter', sans-serif"
            >
              {palace.transformations.ky || "Tử tức"}
            </text>
          </g>
        )}
      </g>


      {/* 8. Chân Ô Cung: 3 Cột — "Năm [Chi]" | "[Vòng Tràng Sinh: Trường sinh...]" | "Tháng [số]" */}
      <g className="palace-footer select-none">
        <line
          x1={x + 10}
          y1={footerDividerY}
          x2={x + width - 10}
          y2={footerDividerY}
          stroke="#8B3A3A"
          strokeWidth="1"
          strokeDasharray="2 3"
          strokeOpacity="0.4"
        />

        {/* Hộp Trái: Năm Chi (VD: Năm Mão) */}
        <rect
          x={x + 10}
          y={footerDividerY + 6}
          width={64}
          height={20}
          rx={3}
          fill="#FFFFFF"
          stroke="#cbd5e1"
          strokeWidth="0.8"
        />
        <text
          x={x + 42}
          y={footerCenterY}
          textAnchor="middle"
          fontSize="10.5"
          fontWeight="600"
          fill="#64748b"
          fontFamily="var(--font-sans), 'Inter', sans-serif"
        >
          {palace.annualStemBranch || `Năm ${palace.branch}`}
        </text>

        {/* Giữa: Vòng Tràng Sinh (Trường sinh, Bệnh, Suy, Mộ...) */}
        <text
          x={x + width / 2}
          y={footerCenterY}
          textAnchor="middle"
          fontSize="12.5"
          fontWeight="800"
          fill="#1e293b"
          fontFamily="var(--font-serif), 'Playfair Display', serif"
        >
          {palace.lifeStage || "Trường sinh"}
        </text>

        {/* Hộp Phải: Tháng (VD: Tháng 7) */}
        <rect
          x={x + width - 68}
          y={footerDividerY + 6}
          width={58}
          height={20}
          rx={3}
          fill="#FFFFFF"
          stroke="#cbd5e1"
          strokeWidth="0.8"
        />
        <text
          x={x + width - 39}
          y={footerCenterY}
          textAnchor="middle"
          fontSize="10.5"
          fontWeight="600"
          fill="#64748b"
          fontFamily="var(--font-sans), 'Inter', sans-serif"
        >
          Tháng {palace.monthNumber ?? 1}
        </text>
      </g>
    </g>
  );
}
