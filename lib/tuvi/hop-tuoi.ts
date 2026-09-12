import { CAN, CHI, getCanChiNam } from "./can-chi";
import { getNguHanhNapAm } from "./cung-menh";

export type NguHanh = "Kim" | "Mộc" | "Thủy" | "Hỏa" | "Thổ";

export interface ThongTinNguoi {
  namSinh: number;
  gioiTinh: "Nam" | "Nu";
  canChi: string;
  can: string;
  chi: string;
  napAm: string;
  nguHanhNapAm: NguHanh;
  cungPhi: string;
  cungQuai: string;
  hanhCungPhi: NguHanh;
  nhomBatTrach: "Đông Tứ Mệnh" | "Tây Tứ Mệnh";
}

export interface KetQuaTru {
  ten: string;
  diem: number;
  diemToiDa: number;
  danhGia: "Đại Cát" | "Cát" | "Bình Hòa" | "Hung" | "Đại Hung";
  tieuDeNhanh: string;
  chiTiet: string[];
  phanTichChuyenSau: string;
}

export interface DuThanBatTrach {
  ten: "Sinh Khí" | "Diên Niên" | "Thiên Y" | "Phục Vị" | "Tuyệt Mạng" | "Ngũ Quỷ" | "Lục Sát" | "Họa Hại";
  loai: "Cát" | "Hung";
  nguHanh: NguHanh;
  yNghia: string;
}

export interface HoaGiaiChiTiet {
  nguyenNhan: string;
  phuongPhapSinhCon: string;
  phuongPhapHuongNha: {
    huongCuaChinh: string;
    huongBep: string;
    huongPhongNgu: string;
    huongBanTho: string;
  };
  daoVoChong: string;
}

export interface KetQuaHopTuoi {
  chong: ThongTinNguoi;
  vo: ThongTinNguoi;
  tongDiem: number;
  xepHang: "Đại Cát" | "Cát Khởi Sắc" | "Bình Hòa" | "Cần Hóa Giải";
  loiTongKet: string;
  duThan: DuThanBatTrach;
  nguHanhTru: KetQuaTru;
  thienCanTru: KetQuaTru;
  diaChiTru: KetQuaTru;
  cungPhiTru: KetQuaTru;
  cungNienMenhTru: KetQuaTru;
  hoaGiai: HoaGiaiChiTiet;
}

// 1. Trích xuất ngũ hành từ Nạp Âm
export function extractNguHanh(napAm: string): NguHanh {
  if (napAm.includes("Kim")) return "Kim";
  if (napAm.includes("Mộc")) return "Mộc";
  if (napAm.includes("Thủy")) return "Thủy";
  if (napAm.includes("Hỏa")) return "Hỏa";
  return "Thổ";
}

// 2. Tính Cung Phi Bát Trạch chính xác (Nam/Nữ, tiền 2000 và hậu 2000)
export function getCungPhiBatTrach(namSinh: number, gioiTinh: "Nam" | "Nu"): {
  cung: string;
  quai: string;
  hanh: NguHanh;
  nhom: "Đông Tứ Mệnh" | "Tây Tứ Mệnh";
} {
  // Tính tổng các chữ số năm sinh đến 1 chữ số
  let sum = namSinh
    .toString()
    .split("")
    .reduce((acc, digit) => acc + parseInt(digit, 10), 0);
  while (sum > 9) {
    sum = sum
      .toString()
      .split("")
      .reduce((acc, digit) => acc + parseInt(digit, 10), 0);
  }

  let soCung = 0;
  if (namSinh < 2000) {
    if (gioiTinh === "Nam") {
      soCung = (10 - sum) % 9;
      if (soCung <= 0) soCung += 9;
    } else {
      soCung = (sum + 5) % 9;
      if (soCung === 0) soCung = 9;
    }
  } else {
    // Từ năm 2000 trở đi
    if (gioiTinh === "Nam") {
      soCung = (9 - sum) % 9;
      if (soCung <= 0) soCung += 9;
    } else {
      soCung = (sum + 6) % 9;
      if (soCung > 9) soCung -= 9;
      if (soCung === 0) soCung = 9;
    }
  }

  // Chuyển đổi số Cung Trung Cung (số 5)
  // Nam quy về Khôn (2), Nữ quy về Cấn (8)
  if (soCung === 5) {
    soCung = gioiTinh === "Nam" ? 2 : 8;
  }

  const mapCung: Record<number, { cung: string; quai: string; hanh: NguHanh; nhom: "Đông Tứ Mệnh" | "Tây Tứ Mệnh" }> = {
    1: { cung: "Khảm", quai: "Khảm Thủy", hanh: "Thủy", nhom: "Đông Tứ Mệnh" },
    2: { cung: "Khôn", quai: "Khôn Thổ", hanh: "Thổ", nhom: "Tây Tứ Mệnh" },
    3: { cung: "Chấn", quai: "Chấn Mộc", hanh: "Mộc", nhom: "Đông Tứ Mệnh" },
    4: { cung: "Tốn", quai: "Tốn Mộc", hanh: "Mộc", nhom: "Đông Tứ Mệnh" },
    6: { cung: "Càn", quai: "Càn Kim", hanh: "Kim", nhom: "Tây Tứ Mệnh" },
    7: { cung: "Đoài", quai: "Đoài Kim", hanh: "Kim", nhom: "Tây Tứ Mệnh" },
    8: { cung: "Cấn", quai: "Cấn Thổ", hanh: "Thổ", nhom: "Tây Tứ Mệnh" },
    9: { cung: "Ly", quai: "Ly Hỏa", hanh: "Hỏa", nhom: "Đông Tứ Mệnh" },
  };

  return mapCung[soCung] || mapCung[1];
}

// 3. Ma trận 64 quẻ Bát Trạch kết hợp Chồng - Vợ
const BAT_TRACH_MATRIX: Record<string, Record<string, DuThanBatTrach["ten"]>> = {
  "Càn": {
    "Càn": "Phục Vị", "Đoài": "Sinh Khí", "Cấn": "Thiên Y", "Khôn": "Diên Niên",
    "Khảm": "Lục Sát", "Chấn": "Ngũ Quỷ", "Tốn": "Họa Hại", "Ly": "Tuyệt Mạng"
  },
  "Khôn": {
    "Càn": "Diên Niên", "Đoài": "Thiên Y", "Cấn": "Sinh Khí", "Khôn": "Phục Vị",
    "Khảm": "Tuyệt Mạng", "Chấn": "Họa Hại", "Tốn": "Ngũ Quỷ", "Ly": "Lục Sát"
  },
  "Cấn": {
    "Càn": "Thiên Y", "Đoài": "Diên Niên", "Cấn": "Phục Vị", "Khôn": "Sinh Khí",
    "Khảm": "Ngũ Quỷ", "Chấn": "Tuyệt Mạng", "Tốn": "Lục Sát", "Ly": "Họa Hại"
  },
  "Đoài": {
    "Càn": "Sinh Khí", "Đoài": "Phục Vị", "Cấn": "Diên Niên", "Khôn": "Thiên Y",
    "Khảm": "Họa Hại", "Chấn": "Lục Sát", "Tốn": "Tuyệt Mạng", "Ly": "Ngũ Quỷ"
  },
  "Khảm": {
    "Càn": "Lục Sát", "Đoài": "Họa Hại", "Cấn": "Ngũ Quỷ", "Khôn": "Tuyệt Mạng",
    "Khảm": "Phục Vị", "Chấn": "Thiên Y", "Tốn": "Sinh Khí", "Ly": "Diên Niên"
  },
  "Ly": {
    "Càn": "Tuyệt Mạng", "Đoài": "Ngũ Quỷ", "Cấn": "Họa Hại", "Khôn": "Lục Sát",
    "Khảm": "Diên Niên", "Chấn": "Sinh Khí", "Tốn": "Thiên Y", "Ly": "Phục Vị"
  },
  "Chấn": {
    "Càn": "Ngũ Quỷ", "Đoài": "Lục Sát", "Cấn": "Tuyệt Mạng", "Khôn": "Họa Hại",
    "Khảm": "Thiên Y", "Chấn": "Phục Vị", "Tốn": "Diên Niên", "Ly": "Sinh Khí"
  },
  "Tốn": {
    "Càn": "Họa Hại", "Đoài": "Tuyệt Mạng", "Cấn": "Lục Sát", "Khôn": "Ngũ Quỷ",
    "Khảm": "Sinh Khí", "Chấn": "Diên Niên", "Tốn": "Phục Vị", "Ly": "Thiên Y"
  }
};

const DU_THAN_INFO: Record<DuThanBatTrach["ten"], { loai: "Cát" | "Hung"; nguHanh: NguHanh; yNghia: string }> = {
  "Sinh Khí": {
    loai: "Cát",
    nguHanh: "Mộc",
    yNghia: "Thượng cát. Thuộc sao Tham Lang, chủ về cung tài lộc dồi dào, sinh sôi nảy nở, đường con cái rạng rỡ đỗ đạt, gia đạo vinh hoa phú quý."
  },
  "Diên Niên": {
    loai: "Cát",
    nguHanh: "Kim",
    yNghia: "Thượng cát. Thuộc sao Vũ Khúc (Phước Đức), chủ về hòa khí gắn kết bền chặt, vợ chồng bách niên giai lão, tình cảm nồng thắm sắc son, các mối quan hệ xã hội thịnh vượng."
  },
  "Thiên Y": {
    loai: "Cát",
    nguHanh: "Thổ",
    yNghia: "Trung cát. Thuộc sao Cự Môn, chủ về trường thọ, sức khỏe khang kiện, tiêu trừ bệnh tật, thường xuyên có quý nhân che chở phù trợ trong hoạn nạn."
  },
  "Phục Vị": {
    loai: "Cát",
    nguHanh: "Mộc",
    yNghia: "Thứ cát. Thuộc sao Tả Phù, chủ về sự ổn định, bình an nội tâm, củng cố sức mạnh gia đạo, công danh thi cử thăng tiến vững vàng, tài chính yên ấm."
  },
  "Tuyệt Mạng": {
    loai: "Hung",
    nguHanh: "Kim",
    yNghia: "Đại hung. Thuộc sao Phá Quân, chủ về sự ly tán, duyên nợ gãy gánh hoặc một trong hai dễ ốm đau suy nhược, tài lộc trắc trở, cần phương pháp phong thủy và tích đức hóa giải."
  },
  "Ngũ Quỷ": {
    loai: "Hung",
    nguHanh: "Hỏa",
    yNghia: "Đại hung. Thuộc sao Liêm Trinh, chủ về hỏa khí xáo động, gia đạo hay sinh cãi vã, thị phi bên ngoài, dễ gặp tiểu nhân quấy phá hoặc tổn hao tài lộc bất ngờ."
  },
  "Lục Sát": {
    loai: "Hung",
    nguHanh: "Thủy",
    yNghia: "Thứ hung. Thuộc sao Văn Khúc, chủ về sát khí ám hại, bất hòa tình cảm, nghi kỵ ghen tuông, công việc làm ăn dễ bị đình trệ nếu không biết nhẫn nhịn."
  },
  "Họa Hại": {
    loai: "Hung",
    nguHanh: "Thổ",
    yNghia: "Thứ hung. Thuộc sao Lộc Tồn, chủ về tai bay vạ gió, hao tài nhỏ lẻ, chuyện vụn vặt không tên làm phiền lòng, vợ chồng dễ tranh chấp từ những bất đồng nhỏ."
  }
};

// 4. Phân tích Ngũ Hành Bản Mệnh (Mệnh Nạp Âm)
function phanTichNguHanh(chong: NguHanh, vo: NguHanh, napAmChong: string, napAmVo: string): KetQuaTru {
  const cap = `${chong} - ${vo}`;
  let diem = 1.0;
  let danhGia: KetQuaTru["danhGia"] = "Bình Hòa";
  let tieuDeNhanh = "";
  let phanTichChuyenSau = "";

  const SINH_MAP: Record<NguHanh, NguHanh> = {
    Mộc: "Hỏa",
    Hỏa: "Thổ",
    Thổ: "Kim",
    Kim: "Thủy",
    Thủy: "Mộc",
  };

  const KHAC_MAP: Record<NguHanh, NguHanh> = {
    Mộc: "Thổ",
    Thổ: "Thủy",
    Thủy: "Hỏa",
    Hỏa: "Kim",
    Kim: "Mộc",
  };

  if (SINH_MAP[chong] === vo) {
    diem = 2.0;
    danhGia = "Đại Cát";
    tieuDeNhanh = `Chồng ${chong} tương sinh Vợ ${vo} (Chồng sinh Vợ)`;
    phanTichChuyenSau = `Theo nguyên lý sinh khắc của Ngũ Hành, Chồng mang mệnh ${chong} sinh dưỡng cho Vợ mang mệnh ${vo}. Người chồng luôn là chỗ dựa vững chãi, biết che chở, chiều chuộng và nhường nhịn vợ. Vợ được nạp khí của chồng nên tâm trạng tươi vui, sức khỏe hanh thông. Cuộc sống hôn nhân gia tăng vượng khí, tài lộc dồi dào, thuận hòa từ trong ra ngoài.`;
  } else if (SINH_MAP[vo] === chong) {
    diem = 2.0;
    danhGia = "Đại Cát";
    tieuDeNhanh = `Vợ ${vo} tương sinh Chồng ${chong} (Vợ sinh Chồng)`;
    phanTichChuyenSau = `Vợ mang mệnh ${vo} tương sinh cho Mệnh ${chong} của Chồng. Đây là thế "Vượng Phu Ích Tử" kinh điển trong cổ thư phong thủy. Người vợ tháo vát, biết thu vén việc nhà, hỗ trợ đắc lực cho sự nghiệp và công danh của người chồng. Gia đình trong ấm ngoài êm, con cái hiếu thuận và tài lộc ngày một hưng vượng.`;
  } else if (chong === vo) {
    if (chong === "Thổ") {
      diem = 1.8;
      danhGia = "Cát";
      tieuDeNhanh = "Lưỡng Thổ tương sinh - Đất đai tầng tầng lớp lớp";
      phanTichChuyenSau = `Hai vợ chồng cùng mang hành Thổ (Lưỡng Thổ thành sơn). Tính cách cả hai đều chân thành, điềm tĩnh, trung hậu và trọng chữ tín. Sự kết hợp này mang lại nền tảng gia đạo cực kỳ vững chắc, tài sản tích lũy bền bỉ qua năm tháng, gia quy nề nếp.`;
    } else if (chong === "Mộc") {
      diem = 1.6;
      danhGia = "Cát";
      tieuDeNhanh = "Lưỡng Mộc thành lâm - Cây cối sum suê che chở nhau";
      phanTichChuyenSau = `Hai vợ chồng cùng mang hành Mộc (Lưỡng Mộc thành lâm). Cây cối đứng cạnh nhau tạo thành rừng rậm rạp, cùng nhau vươn lên đón ánh dương. Hai người đồng điệu về chí hướng và sở thích, dễ dàng san sẻ và cùng nhau xây dựng cơ đồ từ hai bàn tay trắng.`;
    } else if (chong === "Hỏa") {
      diem = 1.4;
      danhGia = "Bình Hòa";
      tieuDeNhanh = "Lưỡng Hỏa tương đồng - Nhiệt huyết nhưng cần kiềm chế nóng nảy";
      phanTichChuyenSau = `Hai vợ chồng cùng mang hành Hỏa (Lưỡng Hỏa thành viêm). Cả hai đều nhiệt huyết, thẳng thắn, làm việc quyết đoán và yêu thương nồng nàn. Tuy nhiên, ngọn lửa lớn quá dễ bùng phát xung đột khi xảy ra bất đồng ý kiến. Cần một người biết lùi một bước để biển rộng trời cao.`;
    } else if (chong === "Kim") {
      diem = 1.3;
      danhGia = "Bình Hòa";
      tieuDeNhanh = "Lưỡng Kim tương ngộ - Cần mềm mỏng tránh va đập cứng rắn";
      phanTichChuyenSau = `Hai vợ chồng cùng mang hành Kim (Lưỡng Kim kiếm khuyết). Kim khí sắc bén, cả hai đều có cá tính độc lập, cương trực và tự tôn cao. Trong làm ăn rất quyết đoán, nhưng trong hôn nhân cần học cách nói lời dịu dàng, tránh cãi vã chấp nhặt vụn vặt.`;
    } else {
      diem = 1.3;
      danhGia = "Bình Hòa";
      tieuDeNhanh = "Lưỡng Thủy tương phùng - Nước chảy mênh mông cần định hướng chung";
      phanTichChuyenSau = `Hai vợ chồng cùng mang hành Thủy (Lưỡng Thủy thành giang). Dòng nước hòa vào nhau thành biển lớn, hai người đều thông minh, linh hoạt, giàu lòng trắc ẩn. Tuy nhiên cảm xúc đôi lúc bấp bênh, cần một kế hoạch tài chính và mục tiêu gia đình dài hạn để luôn giữ được sự an định.`;
    }
  } else if (KHAC_MAP[chong] === vo) {
    diem = 0.8;
    danhGia = "Hung";
    tieuDeNhanh = `Chồng ${chong} khắc Vợ ${vo} (Khắc thuận)`;
    phanTichChuyenSau = `Theo phong thủy hôn nhân: "Chồng khắc vợ thì thuận, vợ khắc chồng thì nghịch". Người chồng mang mệnh ${chong} khắc chế mệnh ${vo} của vợ là thế chế ước tự nhiên của gia trưởng, người chồng có xu hướng nắm quyền quyết định. Tuy nhiên, nếu áp đặt quá mức dễ khiến người vợ cảm thấy cô đơn, ức chế. Nên chọn sinh con mang hành trung hòa hoặc bài trí phong thủy để gia đạo luôn hòa hợp.`;
  } else {
    // Vợ khắc Chồng
    diem = 0.4;
    danhGia = "Đại Hung";
    tieuDeNhanh = `Vợ ${vo} khắc Chồng ${chong} (Khắc nghịch)`;
    phanTichChuyenSau = `Mệnh Vợ (${vo}) khắc chế Mệnh Chồng (${chong}). Trong cổ thư đây là thế nghịch hành, người vợ thường có cá tính mạnh mẽ lấn át người chồng, khiến chồng cảm thấy bị lép vế hoặc công danh gặp nhiều trở lực. Cặp đôi cần hết sức tôn trọng không gian riêng của nhau, người vợ nên khéo léo vun vén để giữ thể diện cho chồng. Rất cần hóa giải bằng năm sinh con trung hòa ngũ hành.`;
  }

  return {
    ten: "Ngũ Hành Bản Mệnh (Mệnh Nạp Âm)",
    diem,
    diemToiDa: 2,
    danhGia,
    tieuDeNhanh,
    chiTiet: [
      `Chồng sinh năm: ${napAmChong} (Hành ${chong})`,
      `Vợ sinh năm: ${napAmVo} (Hành ${vo})`,
      `Mối quan hệ Ngũ Hành: ${tieuDeNhanh}`,
    ],
    phanTichChuyenSau,
  };
}

// 5. Phân tích Thiên Can
function phanTichThienCan(canChong: string, canVo: string): KetQuaTru {
  let diem = 1.0;
  let danhGia: KetQuaTru["danhGia"] = "Bình Hòa";
  let tieuDeNhanh = "";
  let phanTichChuyenSau = "";

  // Ngũ Hợp
  const NGU_HOP: Record<string, string> = {
    "Giáp": "Kỷ", "Kỷ": "Giáp",
    "Ất": "Canh", "Canh": "Ất",
    "Bính": "Tân", "Tân": "Bính",
    "Đinh": "Nhâm", "Nhâm": "Đinh",
    "Mậu": "Quý", "Quý": "Mậu",
  };

  // Tứ Xung của Can (trực xung đối kháng)
  const CAN_TRUC_XUNG: Record<string, string> = {
    "Giáp": "Canh", "Canh": "Giáp",
    "Ất": "Tân", "Tân": "Ất",
    "Bính": "Nhâm", "Nhâm": "Bính",
    "Đinh": "Quý", "Quý": "Đinh",
  };

  // Can tương khắc (Kim khắc Mộc, Mộc khắc Thổ, Thổ khắc Thủy, Thủy khắc Hỏa, Hỏa khắc Kim)
  const CAN_HANH: Record<string, NguHanh> = {
    "Giáp": "Mộc", "Ất": "Mộc",
    "Bính": "Hỏa", "Đinh": "Hỏa",
    "Mậu": "Thổ", "Kỷ": "Thổ",
    "Canh": "Kim", "Tân": "Kim",
    "Nhâm": "Thủy", "Quý": "Thủy",
  };

  const hanhCanChong = CAN_HANH[canChong];
  const hanhCanVo = CAN_HANH[canVo];

  if (NGU_HOP[canChong] === canVo) {
    diem = 2.0;
    danhGia = "Đại Cát";
    tieuDeNhanh = `Thiên Can Ngũ Hợp: ${canChong} hợp ${canVo}`;
    phanTichChuyenSau = `Thiên Can của hai vợ chồng đạt thế "Ngũ Hợp" đại cát trong Bát Tự chi thuật (${canChong} hợp ${canVo}). Thiên Can đại diện cho khí vận trời ban, tính cách bề ngoài và mối liên kết tâm linh. Ngũ Hợp tượng trưng cho duyên tiền định, hai người vừa gặp đã có cảm giác thân quen, tâm ý tương thông, dễ dàng thấu hiểu và sẻ chia mọi hỷ nộ ái ố trong cuộc đời.`;
  } else if (CAN_TRUC_XUNG[canChong] === canVo) {
    diem = 0.4;
    danhGia = "Đại Hung";
    tieuDeNhanh = `Thiên Can Trực Xung: ${canChong} xung ${canVo}`;
    phanTichChuyenSau = `Thiên Can của hai người phạm vào thế Trực Xung (${canChong} xung ${canVo}). Thiên Can xung chiếu dễ dẫn đến những bất đồng quan điểm đột ngột về phong cách sống, cách đối nhân xử thế hoặc kế hoạch lớn. Cả hai thường có cái tôi cao, lúc tranh luận dễ không kiềm chế được lời nói làm tổn thương đối phương. Cần thực hành hạnh lắng nghe và nhẫn nhịn.`;
  } else if (hanhCanChong === hanhCanVo) {
    diem = 1.3;
    danhGia = "Bình Hòa";
    tieuDeNhanh = `Thiên Can Đồng Khí: Cùng mang hành ${hanhCanChong}`;
    phanTichChuyenSau = `Thiên Can hai người cùng mang hành ${hanhCanChong}, tính cách có nhiều nét tương đồng, dễ tìm được tiếng nói chung trong các công việc thường nhật. Tuy nhiên vì cùng một tính cách nên đôi lúc thiếu đi sự bù trừ mềm mỏng cho nhau.`;
  } else {
    diem = 1.2;
    danhGia = "Bình Hòa";
    tieuDeNhanh = `Thiên Can Bình Hòa: ${canChong} và ${canVo} không xung không khắc`;
    phanTichChuyenSau = `Thiên Can của Chồng (${canChong}) và Vợ (${canVo}) ở thế bình hòa tự nhiên, không tương sinh vượt trội nhưng cũng không phạm phải xung sát. Đây là trạng thái trung dung, sự gắn kết hôn nhân phụ thuộc lớn vào sự vun đắp tình cảm và thấu hiểu thực tế của hai người.`;
  }

  return {
    ten: "Thiên Can Hợp Khắc",
    diem,
    diemToiDa: 2,
    danhGia,
    tieuDeNhanh,
    chiTiet: [
      `Can Chồng: ${canChong} (Hành ${hanhCanChong})`,
      `Can Vợ: ${canVo} (Hành ${hanhCanVo})`,
      `Quan hệ: ${tieuDeNhanh}`,
    ],
    phanTichChuyenSau,
  };
}

// 6. Phân tích Địa Chi
function phanTichDiaChi(chiChong: string, chiVo: string): KetQuaTru {
  let diem = 1.0;
  let danhGia: KetQuaTru["danhGia"] = "Bình Hòa";
  let tieuDeNhanh = "";
  let phanTichChuyenSau = "";

  // Tam Hợp
  const TAM_HOP: Record<string, string[]> = {
    "Thân": ["Tý", "Thìn"], "Tý": ["Thân", "Thìn"], "Thìn": ["Thân", "Tý"],
    "Dần": ["Ngọ", "Tuất"], "Ngọ": ["Dần", "Tuất"], "Tuất": ["Dần", "Ngọ"],
    "Tỵ": ["Dậu", "Sửu"], "Dậu": ["Tỵ", "Sửu"], "Sửu": ["Tỵ", "Dậu"],
    "Hợi": ["Mão", "Mùi"], "Mão": ["Hợi", "Mùi"], "Mùi": ["Hợi", "Mão"],
  };

  // Lục Hợp (Nhị Hợp)
  const LUC_HOP: Record<string, string> = {
    "Tý": "Sửu", "Sửu": "Tý",
    "Dần": "Hợi", "Hợi": "Dần",
    "Mão": "Tuất", "Tuất": "Mão",
    "Thìn": "Dậu", "Dậu": "Thìn",
    "Tỵ": "Thân", "Thân": "Tỵ",
    "Ngọ": "Mùi", "Mùi": "Ngọ",
  };

  // Lục Xung (Trực xung)
  const LUC_XUNG: Record<string, string> = {
    "Tý": "Ngọ", "Ngọ": "Tý",
    "Sửu": "Mùi", "Mùi": "Sửu",
    "Dần": "Thân", "Thân": "Dần",
    "Mão": "Dậu", "Dậu": "Mão",
    "Thìn": "Tuất", "Tuất": "Thìn",
    "Tỵ": "Hợi", "Hợi": "Tỵ",
  };

  // Lục Hại
  const LUC_HAI: Record<string, string> = {
    "Tý": "Mùi", "Mùi": "Tý",
    "Sửu": "Ngọ", "Ngọ": "Sửu",
    "Dần": "Tỵ", "Tỵ": "Dần",
    "Mão": "Thìn", "Thìn": "Mão",
    "Thân": "Hợi", "Hợi": "Thân",
    "Dậu": "Tuất", "Tuất": "Dậu",
  };

  // Tự Hình
  const TU_HINH = ["Thìn", "Ngọ", "Dậu", "Hợi"];

  if (TAM_HOP[chiChong]?.includes(chiVo)) {
    diem = 2.0;
    danhGia = "Đại Cát";
    tieuDeNhanh = `Địa Chi Tam Hợp: ${chiChong} - ${chiVo}`;
    phanTichChuyenSau = `Địa Chi của vợ chồng thuộc nhóm "Tam Hợp" thượng cát (${chiChong} kết hợp cùng ${chiVo}). Địa Chi tượng trưng cho gốc rễ cội nguồn, nếp sinh hoạt hàng ngày, họ hàng nội ngoại và cách chi tiêu tài chính. Tam Hợp mang lại sự đồng lòng nhất trí cao độ, nếp nhà thuận hòa, vợ chồng cùng chung lưng đấu cật vượt qua mọi gian khó, gia sản sinh sôi nảy nở.`;
  } else if (LUC_HOP[chiChong] === chiVo) {
    diem = 2.0;
    danhGia = "Đại Cát";
    tieuDeNhanh = `Địa Chi Lục Hợp (Nhị Hợp): ${chiChong} hợp ${chiVo}`;
    phanTichChuyenSau = `Địa Chi của hai người thuộc thế "Lục Hợp" (Nhị Hợp tương thân). Đây là mối duyên hòa hợp thâm sâu và gắn bó son sắt bậc nhất. Hai vợ chồng như hình với bóng, biết nhường nhịn, tương kính như tân, luôn đặt cảm xúc của người kia lên trước, tạo nên tổ ấm ngập tràn hạnh phúc và sự an yên.`;
  } else if (LUC_XUNG[chiChong] === chiVo) {
    diem = 0.3;
    danhGia = "Đại Hung";
    tieuDeNhanh = `Địa Chi Lục Xung: ${chiChong} trực xung ${chiVo}`;
    phanTichChuyenSau = `Địa Chi hai người phạm thế "Lục Xung" chính diện (${chiChong} - ${chiVo}). Lục Xung biểu hiện cho sự va chạm nếp sống, tính cách đối lập, người thích tĩnh người ưa động hoặc thói quen gia đình khác biệt sâu sắc. Nếu không biết bao dung sẽ rất dễ xảy ra xung đột gay gắt, thậm chí ly tán. Cần chú trọng phương án hóa giải bằng tuổi sinh con và điều chỉnh phong thủy phòng ngủ.`;
  } else if (LUC_HAI[chiChong] === chiVo) {
    diem = 0.5;
    danhGia = "Hung";
    tieuDeNhanh = `Địa Chi Lục Hại: ${chiChong} hại ${chiVo}`;
    phanTichChuyenSau = `Địa Chi phạm thế "Lục Hại" (${chiChong} - ${chiVo}). Cổ nhân có câu: "Lục Hại tương tranh tâm bất an". Tình cảm bên ngoài tưởng như êm ấm nhưng bên trong dễ chất chứa nỗi niềm khó giãi bày, sinh ra tâm lý nghi kỵ ngấm ngầm hoặc hay gặp chuyện phiền toái từ phía họ hàng, người ngoài tác động vào. Hai vợ chồng cần tăng cường đối thoại thẳng thắn, chân thành.`;
  } else if (chiChong === chiVo && TU_HINH.includes(chiChong)) {
    diem = 0.8;
    danhGia = "Hung";
    tieuDeNhanh = `Địa Chi Tự Hình: Cùng tuổi ${chiChong}`;
    phanTichChuyenSau = `Cùng tuổi ${chiChong} phạm vào thế "Tự Hình" trong Bát Tự. Do cá tính giống hệt nhau, cùng bướng bỉnh hoặc cùng quá nhạy cảm nên khi giận dỗi thường có xu hướng tự dằn vặt bản thân hoặc chiến tranh lạnh kéo dài. Cả hai cần học cách mở lòng và chủ động làm lành trước.`;
  } else if (chiChong === chiVo) {
    diem = 1.4;
    danhGia = "Bình Hòa";
    tieuDeNhanh = `Địa Chi Đồng Tuổi: Cùng mang chi ${chiChong}`;
    phanTichChuyenSau = `Hai vợ chồng cùng tuổi ${chiChong}, đồng niên đồng chí hướng, thấu hiểu tâm sinh lý lứa tuổi và lối suy nghĩ của nhau. Cuộc sống bình hòa, ấm áp, ít khoảng cách thế hệ.`;
  } else {
    diem = 1.3;
    danhGia = "Bình Hòa";
    tieuDeNhanh = `Địa Chi Bình Hòa: ${chiChong} và ${chiVo} không xung không hại`;
    phanTichChuyenSau = `Địa Chi của Chồng (${chiChong}) và Vợ (${chiVo}) ở trạng thái trung dung, không xung khắc gay gắt cũng không tạo thành tam hợp hóa cục. Hạnh phúc hôn nhân hoàn toàn do hai người làm chủ và vun vén từng ngày.`;
  }

  return {
    ten: "Địa Chi Tương Hợp",
    diem,
    diemToiDa: 2,
    danhGia,
    tieuDeNhanh,
    chiTiet: [
      `Chi Chồng: ${chiChong}`,
      `Chi Vợ: ${chiVo}`,
      `Mối quan hệ Chi: ${tieuDeNhanh}`,
    ],
    phanTichChuyenSau,
  };
}

// 7. Phân tích Cung Phi Bát Trạch (Du Thần)
function phanTichCungPhi(cungChong: string, cungVo: string): { ketQuaTru: KetQuaTru; duThan: DuThanBatTrach } {
  const tenDuThan = BAT_TRACH_MATRIX[cungChong]?.[cungVo] || "Phục Vị";
  const info = DU_THAN_INFO[tenDuThan];

  let diem = 1.0;
  let danhGia: KetQuaTru["danhGia"] = "Bình Hòa";

  switch (tenDuThan) {
    case "Sinh Khí":
      diem = 2.0;
      danhGia = "Đại Cát";
      break;
    case "Diên Niên":
      diem = 2.0;
      danhGia = "Đại Cát";
      break;
    case "Thiên Y":
      diem = 1.8;
      danhGia = "Cát";
      break;
    case "Phục Vị":
      diem = 1.6;
      danhGia = "Cát";
      break;
    case "Họa Hại":
      diem = 0.8;
      danhGia = "Hung";
      break;
    case "Lục Sát":
      diem = 0.6;
      danhGia = "Hung";
      break;
    case "Ngũ Quỷ":
      diem = 0.4;
      danhGia = "Đại Hung";
      break;
    case "Tuyệt Mạng":
      diem = 0.2;
      danhGia = "Đại Hung";
      break;
  }

  const phanTichChuyenSau = `Phối quẻ Cung Phi giữa Chồng cung ${cungChong} và Vợ cung ${cungVo} gặp được sao ${tenDuThan} (${info.nguHanh}). ${info.yNghia} Trong thuật phong thủy Bát Trạch, đây là một trong những yếu tố quyết định cốt lõi về tài vận, hậu vận và năng lượng cộng hưởng trường khí giữa hai vợ chồng khi sinh sống chung dưới một mái nhà.`;

  const ketQuaTru: KetQuaTru = {
    ten: "Cung Phi Bát Tự (Du Thần Bát Trạch)",
    diem,
    diemToiDa: 2,
    danhGia,
    tieuDeNhanh: `Gặp cung ${tenDuThan} (${info.loai === "Cát" ? "Cát Tinh" : "Hung Tinh"})`,
    chiTiet: [
      `Cung Chồng: ${cungChong}`,
      `Cung Vợ: ${cungVo}`,
      `Phối Cung sinh ra: ${tenDuThan} (${info.nguHanh}) - ${info.loai === "Cát" ? "Cát Lành" : "Hung Hại"}`,
    ],
    phanTichChuyenSau,
  };

  const duThan: DuThanBatTrach = {
    ten: tenDuThan,
    loai: info.loai,
    nguHanh: info.nguHanh,
    yNghia: info.yNghia,
  };

  return { ketQuaTru, duThan };
}

// 8. Phân tích Cung Niên Mệnh (Ngũ Hành của Cung Phi)
function phanTichCungNienMenh(hanhChong: NguHanh, hanhVo: NguHanh, cungChong: string, cungVo: string): KetQuaTru {
  let diem = 1.0;
  let danhGia: KetQuaTru["danhGia"] = "Bình Hòa";
  let tieuDeNhanh = "";
  let phanTichChuyenSau = "";

  const SINH_MAP: Record<NguHanh, NguHanh> = {
    Mộc: "Hỏa", Hỏa: "Thổ", Thổ: "Kim", Kim: "Thủy", Thủy: "Mộc",
  };
  const KHAC_MAP: Record<NguHanh, NguHanh> = {
    Mộc: "Thổ", Thổ: "Thủy", Thủy: "Hỏa", Hỏa: "Kim", Kim: "Mộc",
  };

  if (SINH_MAP[hanhChong] === hanhVo || SINH_MAP[hanhVo] === hanhChong) {
    diem = 2.0;
    danhGia = "Đại Cát";
    tieuDeNhanh = `Hành Cung Phi tương sinh (${hanhChong} - ${hanhVo})`;
    phanTichChuyenSau = `Cung Phi Chồng mang hành ${hanhChong}, Cung Phi Vợ mang hành ${hanhVo}, tương sinh tương hợp về mặt khí trường Bát Trạch. Điều này mang lại sự tương hỗ rất lớn trong vận hạn, giúp vợ chồng cùng nhau vượt qua những giai đoạn thăng trầm của đời sống kinh tế.`;
  } else if (hanhChong === hanhVo) {
    diem = 1.5;
    danhGia = "Cát";
    tieuDeNhanh = `Hành Cung Phi tương hòa (${hanhChong} đồng hành)`;
    phanTichChuyenSau = `Hai Cung Phi cùng mang hành ${hanhChong}, khí trường phong thủy hòa hợp, không bị triệt tiêu năng lượng của nhau. Gia đình bình yên, tài chính duy trì ổn định.`;
  } else if (KHAC_MAP[hanhChong] === hanhVo) {
    diem = 0.8;
    danhGia = "Hung";
    tieuDeNhanh = `Hành Cung Phi Chồng ${hanhChong} khắc Vợ ${hanhVo}`;
    phanTichChuyenSau = `Khí trường Cung Phi Chồng khắc chế Cung Phi Vợ. Chồng có xu hướng chi phối năng lượng trong nhà, đôi khi khiến trường khí của người vợ bị suy hao nếu nhà ở bài trí không hợp hướng. Nên dùng các vật phẩm phong thủy hoặc màu sắc trung hòa.`;
  } else {
    diem = 0.5;
    danhGia = "Đại Hung";
    tieuDeNhanh = `Hành Cung Phi Vợ ${hanhVo} khắc Chồng ${hanhChong}`;
    phanTichChuyenSau = `Cung Phi Vợ mang hành ${hanhVo} khắc Cung Phi Chồng mang hành ${hanhChong}. Khí trường của người chồng bị cản trở, cần bố trí hướng bếp và hướng ban thờ chuẩn phong thủy để bổ trợ sinh khí cho người trụ cột.`;
  }

  return {
    ten: "Cung Niên Mệnh (Hành Cung Phi)",
    diem,
    diemToiDa: 2,
    danhGia,
    tieuDeNhanh,
    chiTiet: [
      `Cung Chồng: ${cungChong} (Hành ${hanhChong})`,
      `Cung Vợ: ${cungVo} (Hành ${hanhVo})`,
      `Mối quan hệ Hành Cung: ${tieuDeNhanh}`,
    ],
    phanTichChuyenSau,
  };
}

// 9. Sinh phương pháp hóa giải chi tiết dựa trên phân tích
function taoPhuongPhapHoaGiai(
  chong: ThongTinNguoi,
  vo: ThongTinNguoi,
  duThan: DuThanBatTrach,
  tongDiem: number
): HoaGiaiChiTiet {
  // Tìm ngũ hành trung hòa cho Mệnh
  let hanhTrungHoa = "Hỏa";
  if ((chong.nguHanhNapAm === "Kim" && vo.nguHanhNapAm === "Mộc") || (chong.nguHanhNapAm === "Mộc" && vo.nguHanhNapAm === "Kim")) {
    hanhTrungHoa = "Thủy (Thủy sinh Mộc và Kim sinh Thủy, hóa giải Kim khắc Mộc)";
  } else if ((chong.nguHanhNapAm === "Mộc" && vo.nguHanhNapAm === "Thổ") || (chong.nguHanhNapAm === "Thổ" && vo.nguHanhNapAm === "Mộc")) {
    hanhTrungHoa = "Hỏa (Mộc sinh Hỏa, Hỏa sinh Thổ, bắc cầu dung dưỡng)";
  } else if ((chong.nguHanhNapAm === "Thổ" && vo.nguHanhNapAm === "Thủy") || (chong.nguHanhNapAm === "Thủy" && vo.nguHanhNapAm === "Thổ")) {
    hanhTrungHoa = "Kim (Thổ sinh Kim, Kim sinh Thủy, hóa giải Thổ khắc Thủy)";
  } else if ((chong.nguHanhNapAm === "Thủy" && vo.nguHanhNapAm === "Hỏa") || (chong.nguHanhNapAm === "Hỏa" && vo.nguHanhNapAm === "Thủy")) {
    hanhTrungHoa = "Mộc (Thủy sinh Mộc, Mộc sinh Hỏa, chuyển xung thành tương sinh)";
  } else if ((chong.nguHanhNapAm === "Hỏa" && vo.nguHanhNapAm === "Kim") || (chong.nguHanhNapAm === "Kim" && vo.nguHanhNapAm === "Hỏa")) {
    hanhTrungHoa = "Thổ (Hỏa sinh Thổ, Thổ sinh Kim, làm cầu nối êm thấm)";
  } else {
    hanhTrungHoa = `Tương sinh tự nhiên (${chong.nguHanhNapAm} và ${vo.nguHanhNapAm})`;
  }

  // Phương pháp Bát Trạch hóa giải
  let huongCuaChinh = "Hướng thuộc cung Cát của Chồng (Sinh Khí / Diên Niên / Thiên Y / Phục Vị).";
  let huongBep = "Tọa Hung Hướng Cát: Đặt bếp tại phương vị xấu để thiêu đốt hung khí, cửa miệng bếp quay về hướng lành của gia chủ.";
  let huongPhongNgu = "Đầu giường quay về hướng Thiên Y hoặc Phục Vị của Vợ để bồi bổ sức khỏe và giữ lửa hôn nhân.";
  let huongBanTho = "Tọa Cát Hướng Cát theo hướng phong thủy của người chồng (chủ gia đình).";

  if (duThan.ten === "Tuyệt Mạng") {
    huongBep = "Đặc trị Tuyệt Mạng: Cổ thư dạy 'Sinh Khí giáng Tuyệt Mạng'. Hãy đặt hướng bếp quay về hướng Sinh Khí của người chồng để tiêu trừ hoàn toàn sát khí của cung Tuyệt Mạng.";
  } else if (duThan.ten === "Ngũ Quỷ") {
    huongBep = "Đặc trị Ngũ Quỷ: 'Sinh Khí giáng Ngũ Quỷ'. Đặt hướng bếp quay về hướng Sinh Khí của gia chủ để dập tắt hỏa khí tai ương và thị phi.";
  } else if (duThan.ten === "Lục Sát") {
    huongBep = "Đặc trị Lục Sát: 'Diên Niên giáng Lục Sát'. Hướng bếp quay về cung Diên Niên của chủ nhà để bồi dưỡng hòa khí và sự gắn kết bền chặt.";
  } else if (duThan.ten === "Họa Hại") {
    huongBep = "Đặc trị Họa Hại: 'Phục Vị giáng Họa Hại'. Hướng bếp quay về cung Phục Vị giúp gia đạo yên ổn, tránh thất thoát tài lộc nhỏ lẻ.";
  }

  const nguyenNhan =
    tongDiem >= 7.5
      ? "Hai tuổi của vợ chồng rất hòa hợp, chỉ có một vài điểm lệch nhỏ về khí vận cần duy trì trường khí cát lành lâu bền."
      : "Giữa hai tuổi tồn tại điểm xung khắc về " +
        (duThan.loai === "Hung" ? `Cung Phi phạm ${duThan.ten}, ` : "") +
        "cần ứng dụng các bí pháp phong thủy truyền thống để chuyển hóa năng lượng tiêu cực thành cát tường.";

  const phuongPhapSinhCon = `Trong Bát Tự cổ truyền, con cái chính là báu vật kết nối và hóa giải xung khắc hiệu quả nhất giữa hai vợ chồng. Hai bạn nên ưu tiên sinh con vào những năm mang hành ${hanhTrungHoa}, đồng thời chi của con thuộc tam hợp hoặc lục hợp với bố mẹ. Đứa trẻ này khi sinh ra sẽ là cầu nối kỳ diệu, làm dịu đi mọi bất đồng và mang lại phúc lộc bất ngờ cho cả gia đình.`;

  const daoVoChong =
    "Cổ nhân từng dạy: 'Nhân định thắng thiên - Đức năng thắng số'. Mọi phép xem tuổi chỉ là tấm bản đồ dự báo trường khí, sự bền vững của một cuộc hôn nhân phụ thuộc 90% vào sự tu dưỡng, đức hy sinh và khả năng lắng nghe của mỗi người. Vợ chồng hãy luôn nhớ câu: 'Chồng giận thì vợ bớt lời, cơm sôi bớt lửa muôn đời không khê'. Cùng nhau tích phước làm thiện, phóng sinh giúp đời, gia đạo ắt vạn sự bình an.";

  return {
    nguyenNhan,
    phuongPhapSinhCon,
    phuongPhapHuongNha: {
      huongCuaChinh,
      huongBep,
      huongPhongNgu,
      huongBanTho,
    },
    daoVoChong,
  };
}

// 10. Hàm chính: Tính toán toàn diện độ hợp tuổi vợ chồng
export function xemTuoiVoChong(namChong: number, namVo: number): KetQuaHopTuoi {
  const canChiChong = getCanChiNam(namChong);
  const [canChong, chiChong] = canChiChong.split(" ");
  const napAmChong = getNguHanhNapAm(canChiChong);
  const nguHanhChong = extractNguHanh(napAmChong);
  const cungBatTrachChong = getCungPhiBatTrach(namChong, "Nam");

  const chong: ThongTinNguoi = {
    namSinh: namChong,
    gioiTinh: "Nam",
    canChi: canChiChong,
    can: canChong,
    chi: chiChong,
    napAm: napAmChong,
    nguHanhNapAm: nguHanhChong,
    cungPhi: cungBatTrachChong.cung,
    cungQuai: cungBatTrachChong.quai,
    hanhCungPhi: cungBatTrachChong.hanh,
    nhomBatTrach: cungBatTrachChong.nhom,
  };

  const canChiVo = getCanChiNam(namVo);
  const [canVo, chiVo] = canChiVo.split(" ");
  const napAmVo = getNguHanhNapAm(canChiVo);
  const nguHanhVo = extractNguHanh(napAmVo);
  const cungBatTrachVo = getCungPhiBatTrach(namVo, "Nu");

  const vo: ThongTinNguoi = {
    namSinh: namVo,
    gioiTinh: "Nu",
    canChi: canChiVo,
    can: canVo,
    chi: chiVo,
    napAm: napAmVo,
    nguHanhNapAm: nguHanhVo,
    cungPhi: cungBatTrachVo.cung,
    cungQuai: cungBatTrachVo.quai,
    hanhCungPhi: cungBatTrachVo.hanh,
    nhomBatTrach: cungBatTrachVo.nhom,
  };

  // Tính 5 Trụ
  const nguHanhTru = phanTichNguHanh(chong.nguHanhNapAm, vo.nguHanhNapAm, chong.napAm, vo.napAm);
  const thienCanTru = phanTichThienCan(chong.can, vo.can);
  const diaChiTru = phanTichDiaChi(chong.chi, vo.chi);
  const { ketQuaTru: cungPhiTru, duThan } = phanTichCungPhi(chong.cungPhi, vo.cungPhi);
  const cungNienMenhTru = phanTichCungNienMenh(chong.hanhCungPhi, vo.hanhCungPhi, chong.cungPhi, vo.cungPhi);

  // Tổng điểm trên thang 10
  const tongDiemRaw =
    nguHanhTru.diem +
    thienCanTru.diem +
    diaChiTru.diem +
    cungPhiTru.diem +
    cungNienMenhTru.diem;
  const tongDiem = Math.round(tongDiemRaw * 10) / 10;

  let xepHang: KetQuaHopTuoi["xepHang"] = "Bình Hòa";
  let loiTongKet = "";

  if (tongDiem >= 8.5) {
    xepHang = "Đại Cát";
    loiTongKet = `Tuổi Chồng ${chong.canChi} (${namChong}) và Vợ ${vo.canChi} (${namVo}) thuộc mức độ ĐẠI CÁT ĐẠI LỢI (${tongDiem}/10 điểm). Sự kết hợp tương sinh toàn diện từ Mệnh, Thiên Can, Địa Chi cho đến Bát Trạch Quái. Đây là cặp vợ chồng trăm năm hiếm có, duyên lành tự tiền kiếp, tài lộc vượng phát, gia đạo hưng thịnh, con cháu hiển đạt vinh hoa.`;
  } else if (tongDiem >= 7.0) {
    xepHang = "Cát Khởi Sắc";
    loiTongKet = `Tuổi Chồng ${chong.canChi} (${namChong}) và Vợ ${vo.canChi} (${namVo}) đạt mức CÁT KHỞI SẮC (${tongDiem}/10 điểm). Phần lớn các phương diện đều tương hỗ tốt lành, mang lại nền tảng gia đình vững vàng, công danh sự nghiệp cùng tiến bước. Một vài điểm bất đồng nhỏ chỉ là gia vị cho tình cảm thêm đậm đà.`;
  } else if (tongDiem >= 5.5) {
    xepHang = "Bình Hòa";
    loiTongKet = `Tuổi Chồng ${chong.canChi} (${namChong}) và Vợ ${vo.canChi} (${namVo}) ở mức BÌNH HÒA (${tongDiem}/10 điểm). Không quá xung khắc nhưng cũng có một vài yếu tố đòi hỏi sự nỗ lực từ cả hai phía. Hôn nhân này thịnh vượng hay không phụ thuộc phần lớn vào sự thấu hiểu, tôn trọng và nhường nhịn lẫn nhau trong cuộc sống thường nhật.`;
  } else {
    xepHang = "Cần Hóa Giải";
    loiTongKet = `Tuổi Chồng ${chong.canChi} (${namChong}) và Vợ ${vo.canChi} (${namVo}) có những điểm XUNG KHẮC (${tongDiem}/10 điểm). Khí trường đôi bên dễ có sự va chạm dẫn đến hiểu lầm, trắc trở tài lộc hoặc lục đục tình cảm. Tuy nhiên người xưa đã dạy "Vạn sự tại nhân", hoàn toàn có thể hóa giải triệt để bằng cách chọn năm sinh con hợp mệnh và bố trí phong thủy Bát Trạch chuẩn xác.`;
  }

  const hoaGiai = taoPhuongPhapHoaGiai(chong, vo, duThan, tongDiem);

  return {
    chong,
    vo,
    tongDiem,
    xepHang,
    loiTongKet,
    duThan,
    nguHanhTru,
    thienCanTru,
    diaChiTru,
    cungPhiTru,
    cungNienMenhTru,
    hoaGiai,
  };
}
