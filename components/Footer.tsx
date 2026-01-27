"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import { Mail, Instagram, Facebook } from "lucide-react";

export default function Footer() {
  return (
    <motion.footer
      className="py-12 bg-gray-100"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.5 }}
    >
      <div className="container mx-auto px-4 md:px-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 mb-8">
          {/* Quick Links */}
          <div className="text-center">
            <h3 className="text-lg font-bold text-primary mb-4">
              Brzi linkovi
            </h3>
            <div className="space-y-2">
              <Link
                href="/"
                className="block hover:text-primary transition-colors"
              >
                Početna
              </Link>
              <Link
                href="/proizvodi"
                className="block hover:text-primary transition-colors"
              >
                Ženske čarape
              </Link>
              <Link
                href="/kontakt"
                className="block hover:text-primary transition-colors"
              >
                Kontakt
              </Link>
              <Link
                href="/korpa"
                className="block hover:text-primary transition-colors"
              >
                Korpa
              </Link>
            </div>
          </div>

          {/* Contact Info */}
          <div className="text-center">
            <h3 className="text-lg font-bold text-primary mb-4">Kontakt</h3>
            <div className="space-y-3 text-center">
              <a
                href="mailto:zenskecarapebg@gmail.com"
                className="flex items-center gap-2 hover:text-primary transition-colors justify-center"
              >
                <Mail className="w-5 h-5" />
                <span>zenskecarapebg@gmail.com</span>
              </a>
            </div>
          </div>

          {/* Social Media */}
          <div className="text-center">
            <h3 className="text-lg font-bold text-primary mb-4">Pratite nas</h3>
            <div className="flex gap-4 justify-center">
              <a
                href="https://www.instagram.com/zenske_carape_bg"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center w-10 h-10 rounded-full bg-primary text-white hover:bg-primary/80 transition-colors"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a
                href="https://www.tiktok.com/@zenske_carape_bg"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center w-10 h-10 rounded-full bg-primary text-white hover:bg-primary/80 transition-colors"
              >
                <svg
                  className="w-5 h-5"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" />
                </svg>
              </a>
              <a
                href="https://www.facebook.com/share/1EutJgwsv6/?mibextid=wwXIfr"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center w-10 h-10 rounded-full bg-primary text-white hover:bg-primary/80 transition-colors"
              >
                <Facebook className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>

        <div className="flex flex-col md:flex-row justify-center items-center text-center gap-2 md:gap-10 border-t border-gray-300 pt-6">
          <p>
            &copy; {new Date().getFullYear()} Ženske Čarape. Sva prava zadržana.
          </p>
          <a
            href="https://www.manikamwebsolutions.com/"
            target="_blank"
            rel="noopener noreferrer"
          >
            izrada sajta:{" "}
            <span className="font-bold text-primary">ManikamWebSolutions</span>
          </a>
        </div>
      </div>
    </motion.footer>
  );
}
