import React from "react";
import { StarItem, STAR_COLORS } from "./types";

interface StarProps {
  star: StarItem;
  x: number;
  y: number;
  align?: "left" | "center" | "right";
  isMajor?: boolean;
}

// Lấy mã màu chuẩn của sao theo ảnh mẫu và nguyên tắc phong thủy
function getStarColor(star: StarItem): string {
  if (star.colorType) return star.colorType;

  // 1. Chính tinh: Phân theo Ngũ Hành
  if (star.category === "main") {
    switch (star.nguHanh) {
      case "Hỏa":
        return "#DC2626"; // Đỏ tươi (Thái Dương, Liêm Trinh)
      case "Thủy":
        return "#0284C7"; // Xanh dương đậm (Vũ Khúc, Phá Quân, Thiên Đồng, Thái Âm, Tham Lang, Cự Môn, Thiên Tướng)
      case "Mộc":
        return "#15803D"; // Xanh lá cây (Thiên Cơ, Thiên Lương)
      case "Thổ":
        return "#B45309"; // Nâu vàng / Hổ phách (Tử Vi, Thiên Phủ)
      case "Kim":
      default:
        return "#1D4ED8"; // Xanh đậm / Kim (Thất Sát)
    }
  }

  const name = star.name;

  // 2. Cát Tinh
  if (star.category === "auspicious") {
    if (
      name.includes("Khôi") ||
      name.includes("Việt") ||
      name.includes("Mã") ||
      name.includes("Loan") ||
      name.includes("Hỷ") ||
      name.includes("Đường phù") ||
      name.includes("Quốc ấn")
    ) {
      return "#DC2626"; // Đỏ nổi bật
    }
    if (name.includes("Lộc tồn") || name.includes("Lộc Tồn") || name.includes("Phượng các") || name.includes("Tả phù") || name.includes("Hữu bật") || name.includes("Hoa cái")) {
      return "#B45309"; // Nâu vàng cam
    }
    if (name.includes("Hóa khoa") || name.includes("Hóa Khoa") || name.includes("Hóa quyền") || name.includes("Hóa Quyền") || name.includes("Văn khúc") || name.includes("Thanh long") || name.includes("Tam thai") || name.includes("Bát tọa") || name.includes("Thiên quý")) {
      return "#0284C7"; // Xanh lam
    }
    if (name.includes("Hóa lộc") || name.includes("Hóa Lộc") || name.includes("Đào hoa") || name.includes("Giải thần") || name.includes("Long đức")) {
      return "#15803D"; // Xanh lá
    }
    return "#334155"; // Xám đen tinh tế
  }

  // 3. Sát/Hung Tinh
  if (star.category === "inauspicious" || star.category === "annual") {
    if (
      name.includes("Kình") ||
      name.includes("Đà") ||
      name.includes("Không") ||
      name.includes("Kiếp") ||
      name.includes("Hỏa") ||
      name.includes("Linh") ||
      name.includes("Hình") ||
      name.includes("Tuế") ||
      name.includes("Phá") ||
      name.includes("Tang") ||
      name.includes("Hổ") ||
      name.includes("Khốc") ||
      name.includes("Hư") ||
      name.includes("Điếu khách") ||
      name.includes("Phi liêm") ||
      name.includes("Đại hao") ||
      name.includes("Tiểu hao") ||
      name.includes("Đầu quân")
    ) {
      return "#DC2626"; // Đỏ cảnh báo
    }
    if (name.includes("Hóa kỵ") || name.includes("Hóa Kỵ")) {
      return "#0284C7"; // Xanh đậm cho Hóa Kỵ
    }
    if (name.includes("Lưu hà")) {
      return "#0284C7"; // Cyan cho Lưu Hà
    }
    return "#475569";
  }

  return "#1E293B";
}

export function Star({ star, x, y, align = "left", isMajor = false }: StarProps) {
  const color = getStarColor(star);
  const textAnchor = align === "center" ? "middle" : align === "right" ? "end" : "start";

  // Level 1: Chính Tinh
  if (isMajor) {
    return (
      <text
        x={x}
        y={y}
        textAnchor={textAnchor}
        fill={color}
        fontSize="15"
        fontWeight="800"
        fontFamily="var(--font-serif), 'Playfair Display', serif"
        letterSpacing="0.3"
      >
        {star.name.toUpperCase()}
        {star.brightness && (
          <tspan fontSize="12" fontWeight="700" dx="3">
            ({star.brightness})
          </tspan>
        )}
      </text>
    );
  }

  const name = star.name;
  const isItalic = name.includes("Hỏa") || name.includes("Linh") || name.includes("Văn xương") || name.includes("Khôi");
  const isBold =
    star.category === "inauspicious" ||
    name.includes("Khôi") ||
    name.includes("Việt") ||
    name.includes("Mã") ||
    name.includes("Lộc tồn") ||
    name.includes("Hóa");

  // Xử lý sao Lưu Niên có tiền tố "L." (In chữ L. màu đỏ đậm)
  if (name.startsWith("L.")) {
    const mainPart = name.slice(2);
    return (
      <text
        x={x}
        y={y}
        textAnchor={textAnchor}
        fill={color}
        fontSize="11.5"
        fontWeight="700"
        fontFamily="var(--font-sans), 'Inter', sans-serif"
      >
        <tspan fill="#DC2626" fontWeight="800">L.</tspan>
        {mainPart}
      </text>
    );
  }

  return (
    <text
      x={x}
      y={y}
      textAnchor={textAnchor}
      fill={color}
      fontSize="11.5"
      fontWeight={isBold ? "700" : "500"}
      fontStyle={isItalic ? "italic" : "normal"}
      fontFamily="var(--font-sans), 'Inter', sans-serif"
    >
      {name}
    </text>
  );
}
