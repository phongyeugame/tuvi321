import React from "react";
import { PalaceData } from "./types";
import { TRADITIONAL_PALACE_LAYOUT } from "./constants";

interface PalaceHeaderProps {
  palace: PalaceData;
  x: number;
  y: number;
  width: number;
}

export function PalaceHeader({ palace, x, y, width }: PalaceHeaderProps) {
  const isMenh = palace.name === "MỆNH";
  const tagBg = TRADITIONAL_PALACE_LAYOUT[palace.branch]?.tagBg || "#6C757D";
  const tagText = palace.stemBranchTag || palace.branch;

  // Tọa độ các thành phần header
  const headerY = y + 10;
  const tagX = x + 10;
  const tagWidth = tagText.length > 5 ? 50 : 42;
  const nameBoxX = tagX + tagWidth + 5;
  const nameTextWidth = palace.name.length * 8 + 18;

  return (
    <g className="palace-header select-none">
      {/* 1. Tag Can Chi góc trên-trái (Hình chữ nhật bo góc phong thủy) */}
      <rect
        x={tagX}
        y={headerY}
        width={tagWidth}
        height={22}
        rx={4}
        fill={tagBg}
      />
      <text
        x={tagX + tagWidth / 2}
        y={headerY + 15}
        textAnchor="middle"
        fill="#FFFFFF"
        fontSize="11"
        fontWeight="800"
        fontFamily="var(--font-sans), 'Inter', monospace"
      >
        {tagText}
      </text>

      {/* 2. Khung Tên Cung (Nền trắng, viền mảnh thanh lịch) */}
      <rect
        x={nameBoxX}
        y={headerY}
        width={nameTextWidth}
        height={22}
        rx={4}
        fill="#FFFFFF"
        stroke={isMenh ? "#dc2626" : "#cbd5e1"}
        strokeWidth="0.8"
      />
      <text
        x={nameBoxX + nameTextWidth / 2}
        y={headerY + 15}
        textAnchor="middle"
        fill={isMenh ? "#b91c1c" : "#1e1e1e"}
        fontSize="11.5"
        fontWeight={isMenh ? "900" : "800"}
        fontFamily="var(--font-sans), 'Inter', sans-serif"
        letterSpacing="0.4"
      >
        {palace.name}
      </text>

      {/* 3. Badge Cung THÂN (Nếu có) */}
      {palace.isThan && (
        <g>
          <rect
            x={nameBoxX + nameTextWidth + 4}
            y={headerY}
            width={34}
            height={22}
            rx={4}
            fill="#374151"
          />
          <text
            x={nameBoxX + nameTextWidth + 21}
            y={headerY + 15}
            textAnchor="middle"
            fill="#FFFFFF"
            fontSize="10.5"
            fontWeight="800"
            fontFamily="var(--font-sans), 'Inter', sans-serif"
          >
            Thân
          </text>
        </g>
      )}

      {/* 4. Hộp Số Đại Vận (Góc trên-phải) */}
      {palace.ageRange !== undefined && (
        <g>
          <rect
            x={x + width - 36}
            y={headerY}
            width={26}
            height={22}
            rx={4}
            fill="#FFFFFF"
            stroke="#cbd5e1"
            strokeWidth="0.8"
          />
          <text
            x={x + width - 23}
            y={headerY + 15}
            textAnchor="middle"
            fill="#78350f"
            fontSize="11"
            fontWeight="800"
            fontFamily="var(--font-sans), 'Inter', monospace"
          >
            {palace.ageRange}
          </text>
        </g>
      )}

      {/* 5. Đường phân cách Header nét đứt */}
      <line
        x1={x + 10}
        y1={y + 40}
        x2={x + width - 10}
        y2={y + 40}
        stroke="#8B3A3A"
        strokeWidth="1"
        strokeDasharray="2 3"
        strokeOpacity="0.4"
      />
    </g>
  );
}
