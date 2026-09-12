import React from "react";
import { StarItem } from "./types";
import { Star } from "./Star";

interface StarListProps {
  majorStars: StarItem[];
  auspiciousStars: StarItem[];
  inauspiciousStars: StarItem[];
  triet?: boolean;
  tuan?: boolean;
  x: number; // Tọa độ X bắt đầu của Palace
  y: number; // Tọa độ Y bắt đầu của Palace
  width: number; // Chiều rộng Palace
  height: number; // Chiều cao Palace
}

export function StarList({
  majorStars,
  auspiciousStars,
  inauspiciousStars,
  triet = false,
  tuan = false,
  x,
  y,
  width,
}: StarListProps) {
  const majorCount = majorStars.length;
  // Khu vực hiển thị Chính Tinh (căn giữa)
  const majorY = y + 68;

  // Cột sao phụ
  const subStarStartY = majorCount >= 2 ? y + 104 : y + 96;
  const lineHeight = 19;
  const maxStarsPerColumn = 13;

  const leftPadding = 14;
  const rightPadding = 14;

  const leftColX = x + leftPadding;
  const rightColX = x + width - rightPadding;

  // Phân tách Sát Tinh thông thường và Sao Lưu Niên (có tiền tố L.)
  const normalHungStars = inauspiciousStars.filter((s) => !s.name.startsWith("L."));
  const luuHungStars = inauspiciousStars.filter((s) => s.name.startsWith("L."));

  // Lắp ghép danh sách cột phải có kèm huy hiệu TRIỆT / TUẦN
  type RightColItem =
    | { type: "star"; star: StarItem }
    | { type: "triet" }
    | { type: "tuan" };

  const rightColItems: RightColItem[] = [];
  normalHungStars.forEach((star) => rightColItems.push({ type: "star", star }));
  if (triet) rightColItems.push({ type: "triet" });
  if (tuan) rightColItems.push({ type: "tuan" });
  luuHungStars.forEach((star) => rightColItems.push({ type: "star", star }));

  return (
    <g className="star-list-group select-none">
      {/* 1. Chính tinh (Ở giữa đầu ô cung, xếp dọc nếu 2 sao như ảnh mẫu) */}
      {majorCount > 0 ? (
        majorStars.map((star, idx) => {
          let starY = majorY;
          if (majorCount === 2) {
            starY = idx === 0 ? majorY - 11 : majorY + 11;
          }
          return (
            <Star
              key={`${star.name}-${idx}`}
              star={star}
              x={x + width / 2}
              y={starY}
              align="center"
              isMajor={true}
            />
          );
        })
      ) : (
        <text
          x={x + width / 2}
          y={majorY}
          textAnchor="middle"
          fill="#94a3b8"
          fontSize="11.5"
          fontStyle="italic"
          fontFamily="var(--font-serif), 'Playfair Display', serif"
        >
          (Vô Chính Diệu)
        </text>
      )}

      {/* 2. Cát Tinh (Cột bên trái) */}
      {auspiciousStars.slice(0, maxStarsPerColumn).map((star, idx) => (
        <Star
          key={`cat-${star.name}-${idx}`}
          star={star}
          x={leftColX}
          y={subStarStartY + idx * lineHeight}
          align="left"
        />
      ))}

      {/* 3. Sát Tinh & Sao xấu & Triệt/Tuần (Cột bên phải) */}
      {rightColItems.slice(0, maxStarsPerColumn).map((item, idx) => {
        const itemY = subStarStartY + idx * lineHeight;
        if (item.type === "triet") {
          return (
            <g key={`badge-triet-${idx}`} className="triet-badge">
              <rect
                x={rightColX - 44}
                y={itemY - 14}
                width={44}
                height={19}
                rx={4}
                fill="#0284c7"
              />
              <text
                x={rightColX - 22}
                y={itemY}
                textAnchor="middle"
                fill="#FFFFFF"
                fontSize="9.5"
                fontWeight="800"
                letterSpacing="0.6"
                fontFamily="var(--font-sans), 'Inter', sans-serif"
              >
                TRIỆT
              </text>
            </g>
          );
        }

        if (item.type === "tuan") {
          return (
            <g key={`badge-tuan-${idx}`} className="tuan-badge">
              <rect
                x={rightColX - 44}
                y={itemY - 14}
                width={44}
                height={19}
                rx={4}
                fill="#16a34a"
              />
              <text
                x={rightColX - 22}
                y={itemY}
                textAnchor="middle"
                fill="#FFFFFF"
                fontSize="9.5"
                fontWeight="800"
                letterSpacing="0.6"
                fontFamily="var(--font-sans), 'Inter', sans-serif"
              >
                TUẦN
              </text>
            </g>
          );
        }

        return (
          <Star
            key={`hung-${item.star.name}-${idx}`}
            star={item.star}
            x={rightColX}
            y={itemY}
            align="right"
          />
        );
      })}
    </g>
  );
}

