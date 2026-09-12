// Kích thước SVG cố định chuẩn tỷ lệ 776:1280 của ảnh mẫu (1.5x: 1164 × 1920)
export const SVG_WIDTH = 1164;
export const SVG_HEIGHT = 1920;

// Lề ngoài bàn cờ: 0 (các ô cung chạm viền ngoài như ảnh in ấn truyền thống)
export const BOARD_PADDING = 0;

// Kích thước mỗi ô Cung (4 cột × 4 hàng)
export const PALACE_WIDTH = 291; // 1164 / 4
export const PALACE_HEIGHT = 480; // 1920 / 4

// Kích thước & Tọa độ khối Thiên Bàn Trung Tâm (chiếm 2x2 ô ở giữa: Hàng 1-2, Cột 1-2)
export const CENTER_WIDTH = 582; // 291 * 2
export const CENTER_HEIGHT = 960; // 480 * 2
export const CENTER_X = 291;
export const CENTER_Y = 480;

// Bảng màu giao diện chuẩn truyền thống Tử Vi
export const CHART_THEME = {
  background: "#FAF6EE", // Nền giấy ngà / kem cổ điển ấm
  boardBorder: "#8B3A3A", // Viền khung nâu đỏ đậm
  palaceBorder: "#8B3A3A", // Đường viền nét đứt phân chia cung
  cellHeaderBg: "#FFFFFF", // Nền hộp tên cung trắng mờ
  centerBg: "#FFFDF9", // Nền Thiên Bàn trung tâm
  tagText: "#FFFFFF",
  textColorDark: "#1E1E1E",
  textColorMuted: "#555555",
  accentRed: "#DC2626",
  accentBlue: "#1D4ED8",
  accentGreen: "#15803D",
  accentGold: "#D97706",
};

// Vị trí chuẩn của 12 Địa Chi theo bàn cờ Tử Vi Bắc Phái (Chiều kim đồng hồ)
// Góc trên-trái là Tỵ (col: 0, row: 0) -> Ngọ -> Mùi -> Thân -> Dậu -> Tuất -> Hợi (góc dưới-phải: 3,3) -> Tý -> Sửu -> Dần -> Mão -> Thìn
export const TRADITIONAL_PALACE_LAYOUT: Record<
  string,
  { col: number; row: number; pastelBg: string; tagBg: string; zodiacAnimal: string }
> = {
  // Hàng 1 (Trên cùng)
  "Tỵ": { col: 0, row: 0, pastelBg: "#FAF4F6", tagBg: "#C93B50", zodiacAnimal: "Rắn" },
  "Ngọ": { col: 1, row: 0, pastelBg: "#FCF0F2", tagBg: "#D9534F", zodiacAnimal: "Ngựa" },
  "Mùi": { col: 2, row: 0, pastelBg: "#FDF8ED", tagBg: "#D9822B", zodiacAnimal: "Dê" },
  "Thân": { col: 3, row: 0, pastelBg: "#F3F4F6", tagBg: "#6C757D", zodiacAnimal: "Khỉ" },

  // Cột phải (Hàng 2 & 3)
  "Dậu": { col: 3, row: 1, pastelBg: "#F4F4F5", tagBg: "#6C757D", zodiacAnimal: "Gà" },
  "Tuất": { col: 3, row: 2, pastelBg: "#FDF7EB", tagBg: "#D9822B", zodiacAnimal: "Chó" },

  // Hàng 4 (Dưới cùng)
  "Hợi": { col: 3, row: 3, pastelBg: "#EFF6FC", tagBg: "#2C5282", zodiacAnimal: "Lợn" },
  "Tý": { col: 2, row: 3, pastelBg: "#EFF7FD", tagBg: "#0284C7", zodiacAnimal: "Chuột" },
  "Sửu": { col: 1, row: 3, pastelBg: "#FDF8ED", tagBg: "#D9822B", zodiacAnimal: "Trâu" },
  "Dần": { col: 0, row: 3, pastelBg: "#F0FDF4", tagBg: "#2E7D32", zodiacAnimal: "Hổ" },

  // Cột trái (Hàng 2 & 3)
  "Mão": { col: 0, row: 2, pastelBg: "#F0FDF4", tagBg: "#2E7D32", zodiacAnimal: "Mèo" },
  "Thìn": { col: 0, row: 1, pastelBg: "#FDF8ED", tagBg: "#D9822B", zodiacAnimal: "Rồng" },
};
