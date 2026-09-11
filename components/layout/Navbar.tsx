"use client"

import React, { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Menu, X, ArrowRight, ShieldCheck } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileMenuOpen(false)
  }, [pathname])

  const navLinks = [
    { name: "Tra Cứu", href: "/tra-cuu" },
    { name: "Xem Tuổi", href: "/xem-tuoi/vo-chong" },
    { name: "Cung Chức", href: "/cung-chuc" },
    { name: "Các Sao", href: "/sao" },
    { name: "Thư Kho", href: "/thu-kho" },
  ]

  return (
    <>
      <nav
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
          isScrolled ? "glass py-3 border-b border-border/40 shadow-lg shadow-black/50" : "bg-transparent py-5"
        )}
      >
        <div className="container mx-auto px-4 md:px-6 max-w-6xl">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center space-x-2.5">
              <span className="text-2xl font-serif font-bold text-gradient tracking-wider">
                TỬ VI
              </span>
            </Link>

            {/* Desktop Nav */}
            <div className="hidden md:flex items-center space-x-6">
              {navLinks.map((link) => {
                const isActive = pathname === link.href || pathname.startsWith(`${link.href}/`)
                return (
                  <Link
                    key={link.name}
                    href={link.href}
                    className={cn(
                      "text-sm font-medium transition-colors hover:text-gold relative py-1",
                      isActive ? "text-gold font-semibold" : "text-foreground/90"
                    )}
                  >
                    {link.name}
                    {isActive && (
                      <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-gold rounded-full" />
                    )}
                  </Link>
                )
              })}

              {/* Đăng Nhập Admin Button */}
              <Link
                href="/admin"
                className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-secondary/90 hover:bg-gold/15 text-muted hover:text-gold border border-border hover:border-gold/40 text-xs font-medium transition-all hover:scale-105"
                title="Đăng nhập tài khoản quản trị viên"
              >
                <ShieldCheck size={14} className="text-gold" />
                <span>Đăng Nhập Admin</span>
              </Link>

              <Link
                href="/tra-cuu"
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-gold/10 hover:bg-gold text-gold hover:text-black border border-gold/30 text-xs font-semibold uppercase tracking-wider transition-all duration-300 hover:scale-105"
              >
                <span>Lập Lá Số</span>
                <ArrowRight size={14} />
              </Link>
            </div>

            {/* Mobile Menu Toggle Button */}
            <button
              type="button"
              className="md:hidden p-2 rounded-xl bg-secondary/80 border border-border text-foreground hover:text-gold focus:outline-none focus:ring-2 focus:ring-gold/50"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Toggle mobile menu"
            >
              {isMobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Drawer & Backdrop */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 bg-black/80 backdrop-blur-md z-40 md:hidden"
              onClick={() => setIsMobileMenuOpen(false)}
            />

            {/* Drawer */}
            <motion.div
              initial={{ y: "-100%", opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: "-100%", opacity: 0 }}
              transition={{ type: "spring", damping: 28, stiffness: 280 }}
              className="fixed top-0 left-0 right-0 z-50 glass border-b border-gold/30 px-6 pt-24 pb-8 md:hidden rounded-b-3xl shadow-2xl"
            >
              <div className="flex flex-col space-y-4">
                {navLinks.map((link) => {
                  const isActive = pathname === link.href || pathname.startsWith(`${link.href}/`)
                  return (
                    <Link
                      key={link.name}
                      href={link.href}
                      className={cn(
                        "text-lg font-serif py-2.5 px-4 rounded-xl transition-colors flex items-center justify-between",
                        isActive
                          ? "bg-gold/15 text-gold font-bold border border-gold/30"
                          : "text-foreground hover:text-gold hover:bg-white/5"
                      )}
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      <span>{link.name}</span>
                      <ArrowRight size={16} className="opacity-50" />
                    </Link>
                  )
                })}

                <div className="pt-4 border-t border-border/50 flex flex-col gap-3">
                  <Link
                    href="/tra-cuu"
                    className="w-full py-3 rounded-xl bg-gold text-black font-semibold text-center flex items-center justify-center gap-2 shadow-lg shadow-gold/20"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <span>Lập Lá Số Tử Vi Ngay</span>
                    <ArrowRight size={16} />
                  </Link>

                  <Link
                    href="/admin"
                    className="w-full py-2.5 rounded-xl bg-secondary/70 border border-border text-xs text-muted text-center flex items-center justify-center gap-1.5 hover:text-gold transition-colors"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <ShieldCheck size={14} className="text-gold" />
                    <span>Quản Trị Viên (Admin)</span>
                  </Link>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}
