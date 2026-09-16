import { NguHanh, TuViChartData, PalaceData, ChartLineItem } from "./types";
import {
  NGU_HANH_COLORS,
  getNguHanhColor,
  TRADITIONAL_PALACE_LAYOUT,
  BOARD_PADDING,
  PALACE_WIDTH,
  PALACE_HEIGHT,
  CENTER_X,
  CENTER_Y,
  CENTER_WIDTH,
  CENTER_HEIGHT,
} from "./constants";
import { LaSoTuVi } from "@/lib/tuvi/types";

// 1. Trích xuất Ngũ Hành từ chuỗi văn bản (VD: "Bạch Lạp Kim" -> "Kim", "Mộc tam cục" -> "Mộc")
export function extractNguHanhFromString(str?: string): NguHanh {
  if (!str) return "Kim";
  const s = str.toLowerCase();
  if (s.includes("kim")) return "Kim";
  if (s.includes("mộc") || s.includes("moc")) return "Mộc";
  if (s.includes("thủy") || s.includes("thuy")) return "Thủy";
  if (s.includes("hỏa") || s.includes("hoa")) return "Hỏa";
  if (s.includes("thổ") || s.includes("tho")) return "Thổ";
  return "Kim";
}

// 2. Tra cứu Ngũ Hành của Tam Hợp Địa Chi theo Tử Vi học & Kinh Dịch:
// - Thân - Tý - Thìn: Tam hợp THỦY cục
// - Dần - Ngọ - Tuất: Tam hợp HỎA cục
// - Tỵ - Dậu - Sửu: Tam hợp KIM cục
// - Hợi - Mão - Mùi: Tam hợp MỘC cục
export function getTamHopNguHanh(branch: string): NguHanh {
  const b = branch.trim();
  if (["Thân", "Tý", "Thìn"].includes(b)) return "Thủy";
  if (["Dần", "Ngọ", "Tuất"].includes(b)) return "Hỏa";
  if (["Tỵ", "Dậu", "Sửu"].includes(b)) return "Kim";
  if (["Hợi", "Mão", "Mùi"].includes(b)) return "Mộc";
  return "Thủy";
}

// 3. Tra cứu Ngũ Hành bản cung của 12 Địa Chi:
// - Dần, Mão: MỘC
// - Tỵ, Ngọ: HỎA
// - Thân, Dậu: KIM
// - Hợi, Tý: THỦY
// - Thìn, Tuất, Sửu, Mùi: THỔ
export function getBranchNguHanh(branch: string): NguHanh {
  const b = branch.trim();
  if (["Dần", "Mão"].includes(b)) return "Mộc";
  if (["Tỵ", "Ngọ"].includes(b)) return "Hỏa";
  if (["Thân", "Dậu"].includes(b)) return "Kim";
  if (["Hợi", "Tý"].includes(b)) return "Thủy";
  if (["Thìn", "Tuất", "Sửu", "Mùi"].includes(b)) return "Thổ";
  return "Thổ";
}

// 4. Hàm cốt lõi xác định Ngũ Hành của đường nối theo dữ liệu lá số thực tế
export function getLineNguHanh(
  line: Partial<ChartLineItem>,
  chart?: TuViChartData | LaSoTuVi
): NguHanh {
  if (line.nguHanh) return line.nguHanh;
  if (line.element) return extractNguHanhFromString(line.element);

  if (!chart) return "Kim";

  // Nếu là TuViChartData
  if ("user" in chart && "palaces" in chart) {
    if (line.type === "tam-hop") {
      const menhPalace = chart.palaces.find(
        (p) => p.isMenh || p.name.includes("MỆNH")
      );
      if (menhPalace) return getTamHopNguHanh(menhPalace.branch);
    }
    if (line.type === "xung-chieu") {
      return extractNguHanhFromString(chart.user.menh);
    }
    if (line.type === "than-cu") {
      const thanPalace = chart.palaces.find((p) => p.isThan);
      if (thanPalace) return getBranchNguHanh(thanPalace.branch);
      return extractNguHanhFromString(chart.user.chuThan);
    }
    if (line.type === "cuc") {
      return extractNguHanhFromString(chart.user.cuc);
    }
  }

  // Nếu là LaSoTuVi
  if ("cung" in chart && "cungMenh" in chart) {
    if (line.type === "tam-hop") {
      return getTamHopNguHanh(chart.cungMenh);
    }
    if (line.type === "xung-chieu") {
      return extractNguHanhFromString(chart.nguHanh);
    }
    if (line.type === "than-cu") {
      return getBranchNguHanh(chart.cungThan);
    }
    if (line.type === "cuc") {
      return extractNguHanhFromString(chart.cuc);
    }
  }

  return "Kim";
}

// 4.5. Hàm tính tọa độ điểm neo trên mép biên hướng vào Thiên Bàn của mỗi cung
// Đảm bảo đường nối KHÔNG ĐƯỢC CHỌC VÀO TRONG LÁ SỐ làm che chữ hay đè lên sao/con giáp
export function getPalaceBorderAnchor(palace: PalaceData): { x: number; y: number } {
  const branch = palace.branch?.trim() || "";
  switch (branch) {
    // Hàng 0 (Trên cùng): Tỵ, Ngọ, Mùi, Thân -> Neo tại mép dưới của cung (y = CENTER_Y = 480)
    case "Tỵ":
      return { x: CENTER_X, y: CENTER_Y }; // (291, 480)
    case "Ngọ":
      return { x: CENTER_X + PALACE_WIDTH / 2, y: CENTER_Y }; // (436.5, 480)
    case "Mùi":
      return { x: CENTER_X + PALACE_WIDTH * 1.5, y: CENTER_Y }; // (727.5, 480)
    case "Thân":
      return { x: CENTER_X + CENTER_WIDTH, y: CENTER_Y }; // (873, 480)

    // Cột 3 (Bên phải): Dậu, Tuất -> Neo tại mép trái của cung (x = 873)
    case "Dậu":
      return { x: CENTER_X + CENTER_WIDTH, y: CENTER_Y + PALACE_HEIGHT / 2 }; // (873, 720)
    case "Tuất":
      return { x: CENTER_X + CENTER_WIDTH, y: CENTER_Y + PALACE_HEIGHT * 1.5 }; // (873, 1200)

    // Hàng 3 (Dưới cùng): Dần, Sửu, Tý, Hợi -> Neo tại mép trên của cung (y = 1440)
    case "Hợi":
      return { x: CENTER_X + CENTER_WIDTH, y: CENTER_Y + CENTER_HEIGHT }; // (873, 1440)
    case "Tý":
      return { x: CENTER_X + PALACE_WIDTH * 1.5, y: CENTER_Y + CENTER_HEIGHT }; // (727.5, 1440)
    case "Sửu":
      return { x: CENTER_X + PALACE_WIDTH / 2, y: CENTER_Y + CENTER_HEIGHT }; // (436.5, 1440)
    case "Dần":
      return { x: CENTER_X, y: CENTER_Y + CENTER_HEIGHT }; // (291, 1440)

    // Cột 0 (Bên trái): Thìn, Mão -> Neo tại mép phải của cung (x = 291)
    case "Mão":
      return { x: CENTER_X, y: CENTER_Y + PALACE_HEIGHT * 1.5 }; // (291, 1200)
    case "Thìn":
      return { x: CENTER_X, y: CENTER_Y + PALACE_HEIGHT / 2 }; // (291, 720)

    default:
      return {
        x: BOARD_PADDING + palace.gridCol * PALACE_WIDTH + PALACE_WIDTH / 2,
        y: BOARD_PADDING + palace.gridRow * PALACE_HEIGHT + PALACE_HEIGHT / 2,
      };
  }
}

// 5. Tính toán danh sách đường nối trên toàn bàn cờ SVG Chart (1164x1920)
export function computeChartLines(
  chart: TuViChartData,
  viewBoxWidth = 1200,
  viewBoxHeight = 1200
): ChartLineItem[] {
  const lines: ChartLineItem[] = [];

  const menhPalace = chart.palaces.find(
    (p) => p.isMenh || p.name.includes("MỆNH")
  );
  const taiBachPalace = chart.palaces.find((p) =>
    p.name.includes("TÀI BẠCH")
  );
  const quanLocPalace = chart.palaces.find((p) =>
    p.name.includes("QUAN LỘC")
  );
  const thienDiPalace = chart.palaces.find((p) =>
    p.name.includes("THIÊN DI")
  );
  const thanPalace = chart.palaces.find((p) => p.isThan);

  // A. Tam Hợp Mệnh (Mệnh - Tài Bạch - Quan Lộc) - Toàn bộ tam giác mang màu Ngũ Hành Tam Hợp Cục
  if (menhPalace && taiBachPalace && quanLocPalace) {
    const menhPt = getPalaceBorderAnchor(menhPalace);
    const taiPt = getPalaceBorderAnchor(taiBachPalace);
    const quanPt = getPalaceBorderAnchor(quanLocPalace);
    const tamHopElement = getTamHopNguHanh(menhPalace.branch);

    lines.push({
      id: "line-tamhop-menh-tai",
      name: "Tam Hợp: Mệnh ↔ Tài Bạch",
      source: `Mệnh (${menhPalace.branch})`,
      target: `Tài Bạch (${taiBachPalace.branch})`,
      from: menhPalace.branch,
      to: taiBachPalace.branch,
      type: "tam-hop",
      nguHanh: tamHopElement,
      element: tamHopElement.toLowerCase(),
      x1: menhPt.x,
      y1: menhPt.y,
      x2: taiPt.x,
      y2: taiPt.y,
      strokeWidth: 1.8,
      dashArray: "8 5",
      opacity: 0.55,
    });

    lines.push({
      id: "line-tamhop-tai-quan",
      name: "Tam Hợp: Tài Bạch ↔ Quan Lộc",
      source: `Tài Bạch (${taiBachPalace.branch})`,
      target: `Quan Lộc (${quanLocPalace.branch})`,
      from: taiBachPalace.branch,
      to: quanLocPalace.branch,
      type: "tam-hop",
      nguHanh: tamHopElement,
      element: tamHopElement.toLowerCase(),
      x1: taiPt.x,
      y1: taiPt.y,
      x2: quanPt.x,
      y2: quanPt.y,
      strokeWidth: 1.8,
      dashArray: "8 5",
      opacity: 0.55,
    });

    lines.push({
      id: "line-tamhop-quan-menh",
      name: "Tam Hợp: Quan Lộc ↔ Mệnh",
      source: `Quan Lộc (${quanLocPalace.branch})`,
      target: `Mệnh (${menhPalace.branch})`,
      from: quanLocPalace.branch,
      to: menhPalace.branch,
      type: "tam-hop",
      nguHanh: tamHopElement,
      element: tamHopElement.toLowerCase(),
      x1: quanPt.x,
      y1: quanPt.y,
      x2: menhPt.x,
      y2: menhPt.y,
      strokeWidth: 1.8,
      dashArray: "8 5",
      opacity: 0.55,
    });
  }

  // B. Trục Xung Chiếu Mệnh ↔ Thiên Di (Mang màu Ngũ Hành Bản Mệnh)
  if (menhPalace && thienDiPalace) {
    const menhPt = getPalaceBorderAnchor(menhPalace);
    const diPt = getPalaceBorderAnchor(thienDiPalace);
    const menhElement = extractNguHanhFromString(chart.user.menh);

    lines.push({
      id: "line-xungchieu-menh-di",
      name: "Xung Chiếu: Mệnh ↔ Thiên Di",
      source: `Mệnh (${menhPalace.branch})`,
      target: `Thiên Di (${thienDiPalace.branch})`,
      from: menhPalace.branch,
      to: thienDiPalace.branch,
      type: "xung-chieu",
      nguHanh: menhElement,
      element: menhElement.toLowerCase(),
      x1: menhPt.x,
      y1: menhPt.y,
      x2: diPt.x,
      y2: diPt.y,
      strokeWidth: 2.0,
      dashArray: "9 5",
      opacity: 0.60,
    });
  }

  // C. Trục Thân Cư (Mang màu Ngũ Hành Cung Thân)
  if (menhPalace && thanPalace && thanPalace.branch !== menhPalace.branch) {
    const menhPt = getPalaceBorderAnchor(menhPalace);
    const thanPt = getPalaceBorderAnchor(thanPalace);
    const thanElement = getBranchNguHanh(thanPalace.branch);

    lines.push({
      id: "line-thancu",
      name: `Thân Cư: Mệnh ↔ Thân (${thanPalace.name})`,
      source: `Mệnh (${menhPalace.branch})`,
      target: `Thân (${thanPalace.branch})`,
      from: menhPalace.branch,
      to: thanPalace.branch,
      type: "than-cu",
      nguHanh: thanElement,
      element: thanElement.toLowerCase(),
      x1: menhPt.x,
      y1: menhPt.y,
      x2: thanPt.x,
      y2: thanPt.y,
      strokeWidth: 1.8,
      dashArray: "7 4",
      opacity: 0.55,
    });
  }

  return lines;
}

// 6. Tính toán các tia chỉ hướng tâm xuyên qua bảng trung tâm Thiên Bàn (Radial Rays)
// Mỗi tia nối 2 cung đối diện nhau qua tâm Thiên Bàn và mang Ngũ Hành của cung đại diện
export function computeCenterRadialLines(
  x: number,
  y: number,
  width: number,
  height: number,
  chart: TuViChartData
): ChartLineItem[] {
  const centerX = x + width / 2;
  const centerY = y + height / 2;

  const findPalaceNguHanh = (branch: string): NguHanh => {
    const p = chart.palaces.find((item) => item.branch === branch);
    if (!p) return getBranchNguHanh(branch);
    if (p.isMenh || p.name.includes("MỆNH")) {
      return extractNguHanhFromString(chart.user.menh);
    }
    return getBranchNguHanh(branch);
  };

  // 1. Trục Góc Tây Bắc (Tỵ) ↔ Đông Nam (Hợi)
  const line1Element = findPalaceNguHanh("Tỵ");
  // 2. Trục Góc Đông Bắc (Thân) ↔ Tây Nam (Dần)
  const line2Element = findPalaceNguHanh("Dần");
  // 3. Trục Tung: Ngọ ↔ Tý
  const line3Element = findPalaceNguHanh("Ngọ");
  // 4. Trục Hoành: Mão ↔ Dậu
  const line4Element = findPalaceNguHanh("Mão");
  // 5. Trục Thìn ↔ Tuất
  const line5Element = findPalaceNguHanh("Thìn");
  // 6. Trục Sửu ↔ Mùi
  const line6Element = findPalaceNguHanh("Mùi");

  return [
    {
      id: "radial-ty-hoi",
      name: "Trục Xung Chiếu Tỵ ↔ Hợi",
      source: "Tỵ",
      target: "Hợi",
      type: "radial",
      nguHanh: line1Element,
      element: line1Element.toLowerCase(),
      x1: x,
      y1: y,
      x2: x + width,
      y2: y + height,
      strokeWidth: 1.2,
      dashArray: "6 4",
      opacity: 0.35,
    },
    {
      id: "radial-than-dan",
      name: "Trục Xung Chiếu Thân ↔ Dần",
      source: "Thân",
      target: "Dần",
      type: "radial",
      nguHanh: line2Element,
      element: line2Element.toLowerCase(),
      x1: x + width,
      y1: y,
      x2: x,
      y2: y + height,
      strokeWidth: 1.2,
      dashArray: "6 4",
      opacity: 0.35,
    },
    {
      id: "radial-ngo-ty",
      name: "Trục Xung Chiếu Ngọ ↔ Tý",
      source: "Ngọ",
      target: "Tý",
      type: "radial",
      nguHanh: line3Element,
      element: line3Element.toLowerCase(),
      x1: centerX,
      y1: y,
      x2: centerX,
      y2: y + height,
      strokeWidth: 1.2,
      dashArray: "6 4",
      opacity: 0.35,
    },
    {
      id: "radial-mao-dau",
      name: "Trục Xung Chiếu Mão ↔ Dậu",
      source: "Mão",
      target: "Dậu",
      type: "radial",
      nguHanh: line4Element,
      element: line4Element.toLowerCase(),
      x1: x,
      y1: centerY,
      x2: x + width,
      y2: centerY,
      strokeWidth: 1.2,
      dashArray: "6 4",
      opacity: 0.35,
    },
    {
      id: "radial-thin-tuat",
      name: "Trục Xung Chiếu Thìn ↔ Tuất",
      source: "Thìn",
      target: "Tuất",
      type: "radial",
      nguHanh: line5Element,
      element: line5Element.toLowerCase(),
      x1: x,
      y1: y + height * 0.25,
      x2: x + width,
      y2: y + height * 0.75,
      strokeWidth: 1.2,
      dashArray: "6 4",
      opacity: 0.35,
    },
    {
      id: "radial-suu-mui",
      name: "Trục Xung Chiếu Sửu ↔ Mùi",
      source: "Sửu",
      target: "Mùi",
      type: "radial",
      nguHanh: line6Element,
      element: line6Element.toLowerCase(),
      x1: x + width * 0.25,
      y1: y,
      x2: x + width * 0.75,
      y2: y + height,
      strokeWidth: 1.2,
      dashArray: "6 4",
      opacity: 0.35,
    },
  ];
}

// Hàm tính tọa độ mép biên phía trong của 12 cung trên Bàn cờ HTML truyền thống (1000x1000)
export function getTraditionalBorderAnchor(
  branch: string,
  boardSize = 1000
): { x: number; y: number } {
  const cellSize = boardSize / 4; // 250px
  const c1 = cellSize; // 250
  const c2 = cellSize * 2; // 500
  const c3 = cellSize * 3; // 750

  switch (branch.trim()) {
    // Hàng 0: Tỵ, Ngọ, Mùi, Thân -> mép dưới (y = 250)
    case "Tỵ":
      return { x: c1, y: c1 }; // (250, 250)
    case "Ngọ":
      return { x: c1 + cellSize / 2, y: c1 }; // (375, 250)
    case "Mùi":
      return { x: c2 + cellSize / 2, y: c1 }; // (625, 250)
    case "Thân":
      return { x: c3, y: c1 }; // (750, 250)

    // Cột 3: Dậu, Tuất -> mép trái (x = 750)
    case "Dậu":
      return { x: c3, y: c1 + cellSize / 2 }; // (750, 375)
    case "Tuất":
      return { x: c3, y: c2 + cellSize / 2 }; // (750, 625)

    // Hàng 3: Hợi, Tý, Sửu, Dần -> mép trên (y = 750)
    case "Hợi":
      return { x: c3, y: c3 }; // (750, 750)
    case "Tý":
      return { x: c2 + cellSize / 2, y: c3 }; // (625, 750)
    case "Sửu":
      return { x: c1 + cellSize / 2, y: c3 }; // (375, 750)
    case "Dần":
      return { x: c1, y: c3 }; // (250, 750)

    // Cột 0: Thìn, Mão -> mép phải (x = 250)
    case "Mão":
      return { x: c1, y: c2 + cellSize / 2 }; // (250, 625)
    case "Thìn":
      return { x: c1, y: c1 + cellSize / 2 }; // (250, 375)

    default:
      return { x: boardSize / 2, y: boardSize / 2 };
  }
}

// 7. Tính toán đường nối động cho Bàn Cờ HTML truyền thống (1000x1000)
export function computeTraditionalLines(
  data: LaSoTuVi,
  boardSize = 1000
): ChartLineItem[] {
  const lines: ChartLineItem[] = [];

  const menhCung = data.cung.find((c) => c.ten === "Mệnh");
  const taiBachCung = data.cung.find((c) => c.ten === "Tài Bạch");
  const quanLocCung = data.cung.find((c) => c.ten === "Quan Lộc");
  const thienDiCung = data.cung.find((c) => c.ten === "Thiên Di");
  const thanCung = data.cung.find((c) => c.isThan);

  const menhChi = menhCung?.viTri || data.cungMenh || "Dần";
  const taiChi = taiBachCung?.viTri || "Ngọ";
  const quanChi = quanLocCung?.viTri || "Tuất";
  const diChi = thienDiCung?.viTri || "Thân";
  const thanChi = thanCung?.viTri || data.cungThan || menhChi;

  const menhPt = getTraditionalBorderAnchor(menhChi, boardSize);
  const taiPt = getTraditionalBorderAnchor(taiChi, boardSize);
  const quanPt = getTraditionalBorderAnchor(quanChi, boardSize);
  const diPt = getTraditionalBorderAnchor(diChi, boardSize);
  const thanPt = getTraditionalBorderAnchor(thanChi, boardSize);

  const tamHopElement = getTamHopNguHanh(menhChi);
  const menhElement = extractNguHanhFromString(data.nguHanh);
  const thanElement = getBranchNguHanh(thanChi);

  // A. Xung chiếu Mệnh ↔ Thiên Di
  lines.push({
    id: "trad-line-menh-di",
    name: "Xung Chiếu: Mệnh ↔ Thiên Di",
    source: `Mệnh (${menhChi})`,
    target: `Thiên Di (${diChi})`,
    from: menhChi,
    to: diChi,
    type: "xung-chieu",
    nguHanh: menhElement,
    element: menhElement.toLowerCase(),
    x1: menhPt.x,
    y1: menhPt.y,
    x2: diPt.x,
    y2: diPt.y,
    strokeWidth: 2.0,
    dashArray: "8 5",
    opacity: 0.60,
  });

  // B. Tam Hợp: Mệnh ↔ Tài Bạch (Toàn bộ tam giác mang màu Ngũ Hành Tam Hợp Cục)
  lines.push({
    id: "trad-line-menh-tai",
    name: "Tam Hợp: Mệnh ↔ Tài Bạch",
    source: `Mệnh (${menhChi})`,
    target: `Tài Bạch (${taiChi})`,
    from: menhChi,
    to: taiChi,
    type: "tam-hop",
    nguHanh: tamHopElement,
    element: tamHopElement.toLowerCase(),
    x1: menhPt.x,
    y1: menhPt.y,
    x2: taiPt.x,
    y2: taiPt.y,
    strokeWidth: 1.8,
    dashArray: "7 5",
    opacity: 0.55,
  });

  // C. Tam Hợp: Tài Bạch ↔ Quan Lộc
  lines.push({
    id: "trad-line-tai-quan",
    name: "Tam Hợp: Tài Bạch ↔ Quan Lộc",
    source: `Tài Bạch (${taiChi})`,
    target: `Quan Lộc (${quanChi})`,
    from: taiChi,
    to: quanChi,
    type: "tam-hop",
    nguHanh: tamHopElement,
    element: tamHopElement.toLowerCase(),
    x1: taiPt.x,
    y1: taiPt.y,
    x2: quanPt.x,
    y2: quanPt.y,
    strokeWidth: 1.8,
    dashArray: "7 5",
    opacity: 0.55,
  });

  // D. Tam Hợp: Quan Lộc ↔ Mệnh
  lines.push({
    id: "trad-line-quan-menh",
    name: "Tam Hợp: Quan Lộc ↔ Mệnh",
    source: `Quan Lộc (${quanChi})`,
    target: `Mệnh (${menhChi})`,
    from: quanChi,
    to: menhChi,
    type: "tam-hop",
    nguHanh: tamHopElement,
    element: tamHopElement.toLowerCase(),
    x1: quanPt.x,
    y1: quanPt.y,
    x2: menhPt.x,
    y2: menhPt.y,
    strokeWidth: 1.8,
    dashArray: "7 5",
    opacity: 0.55,
  });

  // E. Thân cư (nếu khác Mệnh)
  if (thanChi !== menhChi) {
    lines.push({
      id: "trad-line-thancu",
      name: "Thân Cư",
      source: `Mệnh (${menhChi})`,
      target: `Thân (${thanChi})`,
      from: menhChi,
      to: thanChi,
      type: "than-cu",
      nguHanh: thanElement,
      element: thanElement.toLowerCase(),
      x1: menhPt.x,
      y1: menhPt.y,
      x2: thanPt.x,
      y2: thanPt.y,
      strokeWidth: 1.8,
      dashArray: "6 4",
      opacity: 0.55,
    });
  }

  return lines;
}
