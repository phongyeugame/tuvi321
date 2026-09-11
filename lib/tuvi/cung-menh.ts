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
  const canIndex = CAN.indexOf(can);
  
  let valCan = 0;
  if (canIndex === 0 || canIndex === 5) valCan = 1; // Giáp, Kỷ
  else if (canIndex === 1 || canIndex === 6) valCan = 2; // Ất, Canh
  else if (canIndex === 2 || canIndex === 7) valCan = 3; // Bính, Tân
  else if (canIndex === 3 || canIndex === 8) valCan = 4; // Đinh, Nhâm
  else if (canIndex === 4 || canIndex === 9) valCan = 5; // Mậu, Quý

  const chiIndex = CHI.indexOf(viTriMenh);
  let valChi = 0;
  if ([0,1,6,7].includes(chiIndex)) valChi = 1; // Tý Sửu Ngọ Mùi
  else if ([2,3,8,9].includes(chiIndex)) valChi = 2; // Dần Mão Thân Dậu
  else if ([4,5,10,11].includes(chiIndex)) valChi = 3; // Thìn Tỵ Tuất Hợi

  let cucVal = valCan + valChi;
  if (cucVal > 5) cucVal -= 5;

  switch (cucVal) {
    case 1: return { ten: "Kim Tứ Cục", so: 4 };
    case 2: return { ten: "Thuỷ Nhị Cục", so: 2 };
    case 3: return { ten: "Hoả Lục Cục", so: 6 };
    case 4: return { ten: "Thổ Ngũ Cục", so: 5 };
    case 5: return { ten: "Mộc Tam Cục", so: 3 };
    default: return { ten: "Mộc Tam Cục", so: 3 };
  }
}
