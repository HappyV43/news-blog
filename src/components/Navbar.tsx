"use client";
import Image from "next/image";
import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { metamorphous, roboto } from "@/lib/font";

export default function Navbar() {
  const currentPath = usePathname();
  return (
    <header className="bg-[#C10505] text-white">
      <div className="flex justify-center items-center">
        {/* Container for logo and title */}
        <div className="flex gap-4 border-b-2 w-[1200px] max-w-full justify-center">
          <Image src={"next.svg"} width={50} height={35} alt="logo-web" />
          <h1 className={`${metamorphous.className} text-[32px]`}>KamiSedia</h1>
        </div>
      </div>
      <nav>
        {/* Center the navigation links */}
        <div className={`${roboto.className} flex justify-center gap-8 mx-4`}>
          <Link
            href="/"
            className={
              currentPath === "/"
                ? "border-b-[3px] border-gray-900 font-bold"
                : ""
            }
          >
            Home
          </Link>

          <Link
            href="/edukasi-hukum"
            className={
              currentPath === "/edukasi-hukum"
                ? "border-b-[3px] border-gray-900 font-bold"
                : ""
            }
          >
            Edukasi Hukum
          </Link>
          <Link
            href="/about-us"
            className={
              currentPath === "/about-us"
                ? "border-b-[3px] border-gray-900 font-bold"
                : ""
            }
          >
            About us
          </Link>
          <Link
            href="/contact-us"
            className={
              currentPath === "/contact-us"
                ? "border-b-[3px] border-gray-900 font-bold"
                : ""
            }
          >
            Contact us
          </Link>
        </div>
      </nav>
    </header>
  );
}
