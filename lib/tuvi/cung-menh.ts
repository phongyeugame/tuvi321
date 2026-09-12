import { CHI } from "./can-chi";

export function getViTriCungMenh(thangAm: number, gioSinhIndex: number): string {
  // Tính Cung Mệnh: Từ cung Dần (index 2) đếm thuận đến tháng sinh, rồi đếm nghịch đến giờ sinh
  // Tý=0, Sửu=1, Dần=2...
  let menhIndex = (2 + thangAm - 1 - gioSinhIndex) % 12;
  if (menhIndex < 0) menhIndex += 12;
  return CHI[menhIndex];
}

export function getViTriCungThan(thangAm: number, gioSinhIndex: number): string {
  // Tính Cung Thân: Từ cung Dần đếm thuận đến tháng sinh, rồi đếm THUẬN đến giờ sinh
  let thanIndex = (2 + thangAm - 1 + gioSinhIndex) % 12;
  return CHI[thanIndex];
}

const NAP_AM_60: Record<string, string> = {
  "Giáp Tý": "Hải Trung Kim", "Ất Sửu": "Hải Trung Kim",
  "Bính Dần": "Lư Trung Hỏa", "Đinh Mão": "Lư Trung Hỏa",
  "Mậu Thìn": "Đại Lâm Mộc", "Kỷ Tỵ": "Đại Lâm Mộc",
  "Canh Ngọ": "Lộ Bàng Thổ", "Tân Mùi": "Lộ Bàng Thổ",
  "Nhâm Thân": "Kiếm Phong Kim", "Quý Dậu": "Kiếm Phong Kim",
  "Giáp Tuất": "Sơn Đầu Hỏa", "Ất Hợi": "Sơn Đầu Hỏa",
  "Bính Tý": "Giản Hạ Thủy", "Đinh Sửu": "Giản Hạ Thủy",
  "Mậu Dần": "Thành Đầu Thổ", "Kỷ Mão": "Thành Đầu Thổ",
  "Canh Thìn": "Bạch Lạp Kim", "Tân Tỵ": "Bạch Lạp Kim",
  "Nhâm Ngọ": "Dương Liễu Mộc", "Quý Mùi": "Dương Liễu Mộc",
  "Giáp Thân": "Tuyền Trung Thủy", "Ất Dậu": "Tuyền Trung Thủy",
  "Bính Tuất": "Ốc Thượng Thổ", "Đinh Hợi": "Ốc Thượng Thổ",
  "Mậu Tý": "Tích Lịch Hỏa", "Kỷ Sửu": "Tích Lịch Hỏa",
  "Canh Dần": "Tùng Bách Mộc", "Tân Mão": "Tùng Bách Mộc",
  "Nhâm Thìn": "Trường Lưu Thủy", "Quý Tỵ": "Trường Lưu Thủy",
  "Giáp Ngọ": "Sa Trung Kim", "Ất Mùi": "Sa Trung Kim",
  "Bính Thân": "Sơn Hạ Hỏa", "Đinh Dậu": "Sơn Hạ Hỏa",
  "Mậu Tuất": "Bình Địa Mộc", "Kỷ Hợi": "Bình Địa Mộc",
  "Canh Tý": "Bích Thượng Thổ", "Tân Sửu": "Bích Thượng Thổ",
  "Nhâm Dần": "Kim Bạch Kim", "Quý Mão": "Kim Bạch Kim",
  "Giáp Thìn": "Phúc Đăng Hỏa", "Ất Tỵ": "Phúc Đăng Hỏa",
  "Bính Ngọ": "Thiên Hà Thủy", "Đinh Mùi": "Thiên Hà Thủy",
  "Mậu Thân": "Đại Trạch Thổ", "Kỷ Dậu": "Đại Trạch Thổ",
  "Canh Tuất": "Thoa Xuyến Kim", "Tân Hợi": "Thoa Xuyến Kim",
  "Nhâm Tý": "Tang Đố Mộc", "Quý Sửu": "Tang Đố Mộc",
  "Giáp Dần": "Đại Khê Thủy", "Ất Mão": "Đại Khê Thủy",
  "Bính Thìn": "Sa Trung Thổ", "Đinh Tỵ": "Sa Trung Thổ",
  "Mậu Ngọ": "Thiên Thượng Hỏa", "Kỷ Mùi": "Thiên Thượng Hỏa",
  "Canh Thân": "Thạch Lựu Mộc", "Tân Dậu": "Thạch Lựu Mộc",
  "Nhâm Tuất": "Đại Hải Thủy", "Quý Hợi": "Đại Hải Thủy",
};

export function getNguHanhNapAm(canChiNam: string): string {
  return NAP_AM_60[canChiNam] || "Hải Trung Kim";
}

export function getCuc(viTriMenh: string, canNam: string): { ten: string; so: number } {
  const can = canNam.split(" ")[0];
  const CAN = ["Giáp", "Ất", "Bính", "Đinh", "Mậu", "Kỷ", "Canh", "Tân", "Nhâm", "Quý"];
  const canIndex = CAN.indexOf(can) !== -1 ? CAN.indexOf(can) : 0;

  // Ngũ Hổ Độn: Khởi Can Dần theo Can Năm
  // Giáp/Kỷ khởi Bính Dần (2), Ất/Canh khởi Mậu Dần (4), Bính/Tân khởi Canh Dần (6), Đinh/Nhâm khởi Nhâm Dần (8), Mậu/Quý khởi Giáp Dần (0)
  const baseCanDan = ((canIndex % 5) * 2 + 2) % 10;

  const chiIndex = CHI.indexOf(viTriMenh) !== -1 ? CHI.indexOf(viTriMenh) : 2;
  const stepsFromDan = (chiIndex - 2 + 12) % 12;
  const canMenhIndex = (baseCanDan + stepsFromDan) % 10;

  const canChiMenh = `${CAN[canMenhIndex]} ${viTriMenh}`;
  const napAm = NAP_AM_60[canChiMenh] || "Bình Địa Mộc";

  if (napAm.includes("Thủy")) return { ten: "Thuỷ Nhị Cục", so: 2 };
  if (napAm.includes("Mộc")) return { ten: "Mộc Tam Cục", so: 3 };
  if (napAm.includes("Kim")) return { ten: "Kim Tứ Cục", so: 4 };
  if (napAm.includes("Thổ")) return { ten: "Thổ Ngũ Cục", so: 5 };
  if (napAm.includes("Hỏa")) return { ten: "Hoả Lục Cục", so: 6 };

  return { ten: "Mộc Tam Cục", so: 3 };
}
