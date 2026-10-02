import { LuanGiai, Cung } from "@/lib/tuvi/types";

export interface MockPalaceLuanGiai {
  ten: string;
  chinhTinhTuaThu: string;
  catTinhHoiTu: string[];
  hungSatTinh: string[];
  loiKhuyen: string;
  danhGiaTongQuan: "tot" | "kha" | "trung-binh" | "xau";
}

export const MOCK_LUAN_GIAI_12_CUNG: Record<string, MockPalaceLuanGiai> = {
  "Mệnh": {
    ten: "Mệnh",
    chinhTinhTuaThu: "Thiên Phủ (M)",
    catTinhHoiTu: ["Tấu Thư", "Ân Quang", "Thiên Quý", "Hoa Cái", "Thiên Quan"],
    hungSatTinh: ["Bạch Hổ", "Thiên Khốc"],
    loiKhuyen:
      "Bản mệnh vững vàng, tính cách đôn hậu bao dung, có tư chất lãnh đạo và quản lý tài chính xuất sắc. Cần chú trọng phát huy thế mạnh làm việc cẩn trọng, tránh chủ quan tự mãn khi thời cơ đến. Tích cực làm việc thiện và tu dưỡng tâm tính sẽ giúp hoá giải hung tinh, hậu vận hưng vượng lâu bền.",
    danhGiaTongQuan: "tot",
  },
  "Phụ Mẫu": {
    ten: "Phụ Mẫu",
    chinhTinhTuaThu: "Thái Âm (V)",
    catTinhHoiTu: ["Văn Xương", "Thiên Khôi", "Phong Cáo", "Thiên Phúc"],
    hungSatTinh: ["Đà La"],
    loiKhuyen:
      "Cha mẹ là người hiền lành, có học thức và hết lòng chăm lo, định hướng tương lai cho con cái. Đôi khi có sự bất đồng quan điểm giữa các thế hệ do khác biệt góc nhìn cuộc sống. Đương số nên nhẫn nại lắng nghe, giữ tròn đạo hiếu và thể hiện sự quan tâm thường xuyên để gia đạo luôn ấm êm thuận hòa.",
    danhGiaTongQuan: "kha",
  },
  "Phúc Đức": {
    ten: "Phúc Đức",
    chinhTinhTuaThu: "Tử Vi (M), Thiên Tướng (M)",
    catTinhHoiTu: ["Tả Phù", "Hữu Bật", "Tam Thai", "Bát Tọa", "Giải Thần"],
    hungSatTinh: ["Địa Kiếp"],
    loiKhuyen:
      "Dòng họ có phúc ấm sâu dày, tổ tiên nhiều đời tích đức giúp con cháu đời sau hưởng nhiều may mắn, thọ trường. Trong họ tộc có nhiều người đỗ đạt cao hoặc giữ vị trí quan trọng ngoài xã hội. Nên thường xuyên chăm sóc mồ mả gia tiên, năng làm việc thiện để bồi đắp nguồn cội phúc đức trường tồn.",
    danhGiaTongQuan: "tot",
  },
  "Điền Trạch": {
    ten: "Điền Trạch",
    chinhTinhTuaThu: "Cự Môn (Đ)",
    catTinhHoiTu: ["Hóa Quyền", "Thanh Long", "Đào Hoa", "Đường Phù"],
    hungSatTinh: ["Tang Môn", "Kình Dương"],
    loiKhuyen:
      "Đường nhà đất bất động sản từ trung vận trở đi mới phát triển mạnh mẽ và tích lũy được cơ ngơi khang trang bề thế. Giai đoạn đầu mua bán nhà cửa cần cẩn trọng kỹ lưỡng về giấy tờ pháp lý để tránh tranh chấp, thị phi không đáng có. Giữ gìn nơi ở sạch sẽ, phong thủy thông thoáng sẽ chiêu tài tụ khí gia tăng hưng vượng.",
    danhGiaTongQuan: "trung-binh",
  },
  "Quan Lộc": {
    ten: "Quan Lộc",
    chinhTinhTuaThu: "Thái Dương (M), Hóa Lộc",
    catTinhHoiTu: ["Hóa Khoa", "Quốc Ấn", "Long Trì", "Phượng Các", "Bác Sỹ"],
    hungSatTinh: ["Thiên Hình"],
    loiKhuyen:
      "Công danh sáng lạng, dễ đạt được chức vụ quản lý cấp cao hoặc thành công vang dội trong lĩnh vực chuyên môn, kinh doanh. Rất phù hợp với các công việc đòi hỏi tầm nhìn chiến lược, phát triển đối ngoại và khả năng đàm phán thuyết phục. Nên giữ vững nguyên tắc chính trực, tránh làm việc quá sức ảnh hưởng sức khỏe.",
    danhGiaTongQuan: "tot",
  },
  "Nô Bộc": {
    ten: "Nô Bộc",
    chinhTinhTuaThu: "Tham Lang (Đ)",
    catTinhHoiTu: ["Thiên Mã", "Giải Thần", "Thiên Hỷ"],
    hungSatTinh: ["Tiểu Hao", "Hỏa Tinh", "Linh Tinh"],
    loiKhuyen:
      "Bạn bè đồng nghiệp đông đảo, giao thiệp rộng rãi nhiều tầng lớp trong xã hội và thường nhận được sự tương trợ lúc khởi nghiệp. Tuy nhiên cần biết chọn bạn mà chơi, không nên quá tin tưởng giao phó tài chính trọng đại cho người mới quen. Tránh bảo lãnh nợ nần hoặc hùn vốn mạo hiểm để không bị tổn thất bất ngờ.",
    danhGiaTongQuan: "trung-binh",
  },
  "Thiên Di": {
    ten: "Thiên Di",
    chinhTinhTuaThu: "Thất Sát (M)",
    catTinhHoiTu: ["Thiên Mã", "Lộc Tồn", "Bác Sỹ", "Nguyệt Đức"],
    hungSatTinh: ["Thiên Sứ", "Địa Không"],
    loiKhuyen:
      "Số xuất ngoại, đi xa làm ăn, lập nghiệp hoặc công tác thường gặt hái nhiều tài lộc và danh tiếng hơn là bó buộc ở quê nhà. Môi trường mới đem lại nhiều vận hội đổi đời nhưng cũng đòi hỏi sự thích ứng linh hoạt trước biến động xã hội. Chú ý giữ gìn an toàn khi di chuyển đường dài và luôn tìm hiểu kỹ văn hóa địa phương.",
    danhGiaTongQuan: "kha",
  },
  "Tật Ách": {
    ten: "Tật Ách",
    chinhTinhTuaThu: "Liêm Trinh (H), Phá Quân (H)",
    catTinhHoiTu: ["Thiên Hỷ", "Thiên Phúc", "Nguyệt Đức", "Hóa Khoa"],
    hungSatTinh: ["Bệnh Phù", "Kiếp Sát"],
    loiKhuyen:
      "Cần chú ý chăm sóc hệ tiêu hóa, dạ dày và đường hô hấp, tránh thói quen thức khuya hay lao lực kéo dài. May mắn có các cát tinh cứu giải hội chiếu nên thường gặp thầy gặp thuốc, tai qua nạn khỏi lúc ốm đau. Nên rèn luyện thể thao đều đặn, duy trì chế độ dinh dưỡng thanh đạm và khám sức khỏe định kỳ để luôn an tâm.",
    danhGiaTongQuan: "trung-binh",
  },
  "Tài Bạch": {
    ten: "Tài Bạch",
    chinhTinhTuaThu: "Vũ Khúc (V), Hóa Lộc",
    catTinhHoiTu: ["Lộc Tồn", "Kim Dư", "Hỷ Thần", "Phúc Tinh"],
    hungSatTinh: ["Đại Hao"],
    loiKhuyen:
      "Tiền tài dồi dào, có đầu óc nhạy bén về thị trường và nguồn thu nhập phong phú từ nhiều kênh khác nhau. Càng về hậu vận tài sản tích lũy càng tăng trưởng vững bền theo thời gian. Nên xây dựng kế hoạch quản lý dòng tiền bài bản, tránh chi tiêu cảm tính hoặc đầu tư theo phong trào nhất thời để dòng vốn luôn sinh sôi.",
    danhGiaTongQuan: "tot",
  },
  "Tử Tức": {
    ten: "Tử Tức",
    chinhTinhTuaThu: "Thiên Đồng (V)",
    catTinhHoiTu: ["Văn Khúc", "Thiên Khôi", "Đường Phù", "Thiên Đức"],
    hungSatTinh: ["Phục Binh"],
    loiKhuyen:
      "Con cái thông minh, ngoan ngoãn, hiếu thuận và có chí hướng tiến thủ trong học tập, sự nghiệp sau này. Khi nuôi dạy con nên chú trọng lắng nghe tâm lý, làm bạn đồng hành cùng con thay vì áp đặt cứng nhắc. Tạo điều kiện cho con phát triển năng khiếu tự nhiên sẽ giúp con sớm thành tài và làm rạng danh dòng tộc.",
    danhGiaTongQuan: "kha",
  },
  "Phu Thê": {
    ten: "Phu Thê",
    chinhTinhTuaThu: "Thiên Lương (M)",
    catTinhHoiTu: ["Hồng Loan", "Thiên Đức", "Phúc Đức", "Nguyệt Đức"],
    hungSatTinh: ["Cô Thần", "Quả Tú"],
    loiKhuyen:
      "Người hôn phối đứng đắn, nhân hậu, chu đáo và là chỗ dựa tinh thần vô cùng vững chắc cho gia đình. Đôi khi tính cách có phần nguyên tắc hoặc trầm tính khiến cuộc sống có lúc thiếu sự sôi nổi lãng mạn. Vợ chồng cần cởi mở chia sẻ, bao dung và tôn trọng không gian riêng để ngọn lửa hôn nhân luôn bền chặt keo sơn.",
    danhGiaTongQuan: "kha",
  },
  "Huynh Đệ": {
    ten: "Huynh Đệ",
    chinhTinhTuaThu: "Thiên Cơ (V)",
    catTinhHoiTu: ["Tướng Quân", "Thai Phụ", "Hóa Khoa", "Thanh Long"],
    hungSatTinh: ["Tuần Không"],
    loiKhuyen:
      "Anh chị em hòa thuận, tài năng và biết hỗ trợ đùm bọc lẫn nhau trong những lúc khó khăn hoạn nạn. Mọi người đều có chí tự lập, không ai ỷ lại vào gia đình. Dù mỗi người lập nghiệp ở phương trời riêng nhưng tình cảm ruột thịt luôn gắn bó khăng khít, luôn là hậu phương tin cậy của nhau.",
    danhGiaTongQuan: "tot",
  },
};

/**
 * Trả về Luận Giải chuẩn cho một Cung:
 * - Nếu cung đã có sẵn `luanGiai` dạng object, dùng trực tiếp.
 * - Nếu chưa có hoặc là string, tổng hợp từ sao thực tế trên lá số kết hợp với template luận giải mẫu.
 */
export function getLuanGiaiForCung(cung: Partial<Cung>): LuanGiai {
  // 1. Nếu đã có object LuanGiai hợp lệ
  if (
    cung.luanGiai &&
    typeof cung.luanGiai === "object" &&
    "chinhTinhTuaThu" in cung.luanGiai &&
    "loiKhuyen" in cung.luanGiai
  ) {
    return cung.luanGiai as LuanGiai;
  }

  // 2. Tìm template theo tên cung (Mệnh, Phụ Mẫu, ...)
  const tenClean = (cung.ten || "Mệnh").trim();
  const template =
    MOCK_LUAN_GIAI_12_CUNG[tenClean] ||
    Object.values(MOCK_LUAN_GIAI_12_CUNG).find((item) =>
      tenClean.includes(item.ten)
    ) ||
    MOCK_LUAN_GIAI_12_CUNG["Mệnh"];

  // 3. Xử lý Chính Tinh Toạ Thủ thực tế nếu có
  let chinhTinhTuaThu = template.chinhTinhTuaThu;
  if (cung.chinhTinhChiTiet && cung.chinhTinhChiTiet.length > 0) {
    chinhTinhTuaThu = cung.chinhTinhChiTiet
      .map((s) => `${s.ten}${s.trangThai ? ` (${s.trangThai})` : ""}`)
      .join(", ");
  } else if (cung.chinhTinh && cung.chinhTinh.length > 0) {
    chinhTinhTuaThu = cung.chinhTinh.join(", ");
  } else if (cung.chinhTinhChiTiet && cung.chinhTinhChiTiet.length === 0) {
    chinhTinhTuaThu = "Vô Chính Diệu (mượn chính tinh cung đối chiếu)";
  }

  // 4. Xử lý Cát Tinh
  const catTinhHoiTu =
    cung.catTinh && cung.catTinh.length > 0
      ? cung.catTinh
      : template.catTinhHoiTu;

  // 5. Xử lý Hung Sát Tinh
  const hungSatTinh =
    cung.hungTinh && cung.hungTinh.length > 0
      ? cung.hungTinh
      : template.hungSatTinh;

  // 6. Xử lý Lời Khuyên
  let loiKhuyen = template.loiKhuyen;
  if (typeof cung.luanGiai === "string" && cung.luanGiai.length > 30) {
    loiKhuyen = cung.luanGiai;
  }

  // 7. Đánh giá tổng quan
  let danhGiaTongQuan = template.danhGiaTongQuan;
  if (cung.catTinh && cung.hungTinh) {
    const diff = cung.catTinh.length - cung.hungTinh.length;
    if (diff >= 3) danhGiaTongQuan = "tot";
    else if (diff >= 1) danhGiaTongQuan = "kha";
    else if (diff >= -1) danhGiaTongQuan = "trung-binh";
    else danhGiaTongQuan = "xau";
  }

  return {
    chinhTinhTuaThu,
    catTinhHoiTu,
    hungSatTinh,
    loiKhuyen,
    danhGiaTongQuan,
  };
}
