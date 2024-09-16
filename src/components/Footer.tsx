"use client";
import Image from "next/image";
import React from "react";

export default function Footer() {
  return (
    <footer className="bg-[#B51E1E]">
      {/* Kontainer Utama Footer */}
      <div className="flex flex-col md:flex-row justify-between items-center px-6 md:px-16 lg:px-24 py-4">
        {/* Section 1: Logo dan Nama */}
        <section className="flex flex-col items-center md:items-start mb-6 md:mb-0">
          <Image src="/vercel.svg" width={76} height={64} alt="logo" />
          <div className="text-white mt-4 text-center md:text-left">
            <h1 className="text-xl font-semibold">KamiSedia</h1>
            <p className="text-sm">Fakultas Hukum & Komunikasi</p>
          </div>
        </section>

        {/* Section 2: Alamat Universitas */}
        <section className="text-center md:text-left text-white">
          <h2 className="text-lg font-bold">
            Soegijapranata Catholic University
          </h2>
          <p className="text-sm">
            Jl. Pawiyatan Luhur IV/1, Bendan Duwur, Semarang, Jawa Tengah 50234
          </p>
        </section>
      </div>

      {/* Copyright Section */}
      <div className="bg-[#9B1717] py-4 text-center text-white text-sm">
        © {new Date().getFullYear()} KamiSedia. All rights reserved.
      </div>
    </footer>
  );
}
