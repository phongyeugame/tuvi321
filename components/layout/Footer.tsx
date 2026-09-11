import React from "react"
import Link from "next/link"

export function Footer() {
  return (
    <footer className="border-t border-border bg-secondary mt-20">
      <div className="container mx-auto px-4 md:px-6 py-12 max-w-6xl">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-1">
            <Link href="/" className="inline-block mb-4">
              <span className="text-2xl font-serif font-bold text-gradient tracking-wider">
                TỬ VI
              </span>
            </Link>
            <p className="text-sm text-muted">
              Công cụ tra cứu tử vi trọn đời, an sao và luận giải chi tiết theo Tử Vi Đẩu Số.
            </p>
          </div>
          
          <div>
            <h4 className="font-serif text-gold font-semibold mb-4">Công Cụ</h4>
            <ul className="space-y-2 text-sm text-muted">
              <li><Link href="/tra-cuu" className="hover:text-gold transition-colors">Tra Cứu Lá Số</Link></li>
              <li><Link href="/xem-tuoi/vo-chong" className="hover:text-gold transition-colors">Xem Tuổi Vợ Chồng</Link></li>
              <li><Link href="/xem-tuoi/sinh-con" className="hover:text-gold transition-colors">Xem Tuổi Sinh Con</Link></li>
              <li><Link href="/xem-tuoi/lam-nha" className="hover:text-gold transition-colors">Xem Tuổi Làm Nhà</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-serif text-gold font-semibold mb-4">Kiến Thức</h4>
            <ul className="space-y-2 text-sm text-muted">
              <li><Link href="/cung-chuc" className="hover:text-gold transition-colors">Ý Nghĩa 12 Cung</Link></li>
              <li><Link href="/sao" className="hover:text-gold transition-colors">Luận Giải Các Sao</Link></li>
              <li><Link href="/thu-kho" className="hover:text-gold transition-colors">Thư Kho Tử Vi</Link></li>
            </ul>
          </div>
          
            <div>
              <h4 className="font-serif text-gold font-semibold mb-4">Thông Tin</h4>
              <ul className="space-y-2 text-sm text-muted">
                <li><Link href="/gioi-thieu" className="hover:text-gold transition-colors">Giới Thiệu</Link></li>
                <li><Link href="/lien-he" className="hover:text-gold transition-colors">Liên Hệ</Link></li>
                <li><Link href="/chinh-sach/bao-mat" className="hover:text-gold transition-colors">Chính Sách Bảo Mật</Link></li>
                <li><Link href="/admin" className="hover:text-gold transition-colors text-gold/80 flex items-center gap-1">Quản Trị (Admin)</Link></li>
              </ul>
            </div>
        </div>
        
        <div className="border-t border-border mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-muted">
            &copy; {new Date().getFullYear()} Tra Cứu Tử Vi. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}
