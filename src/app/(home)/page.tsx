import { metamorphous } from "@/lib/font";
import Image from "next/image";

export default function Home() {
  return (
    <div className="flex flex-col text-white w-full min-h-screen overflow-hidden">
      {/* Section 1 */}
      <section className="flex flex-col relative py-10 px-6 md:py-12 md:px-16 gap-10">
        <header className="flex flex-col md:flex-row items-center gap-4 md:gap-6 z-10">
          {/* Gambar logo yang responsif */}
          <Image
            src="next.svg"
            width={180}
            height={150}
            alt="logo"
            className="w-[120px] h-auto md:w-[180px]"
          />
          <div className="text-center md:text-left">
            {/* Judul responsif yang berubah ukuran sesuai dengan ukuran layar */}
            <h1
              className={`${metamorphous.className} text-[32px] md:text-[64px]`}
            >
              KamiSedia
            </h1>
            <h2 className="text-[24px] md:text-[40px]">
              Website Hukum Terlengkap dan Terpercaya
            </h2>
          </div>
        </header>

        <div className="flex z-10 flex-col md:flex-row justify-between gap-6 md:gap-16">
          {/* Text responsif dengan lebar 50% pada layar besar */}
          <p className="md:w-1/2">
            Tetap up to date dengan berita hukum terkini tanpa takut dengan
            berita palsu dengan KamiSedia
          </p>
          {/* Gambar responsif dengan lebar penuh pada perangkat kecil dan ukuran maksimal di perangkat besar */}
          <Image
            src="/reading_newspaper.jpg"
            width={600}
            height={0}
            alt="reading newspaper"
            className="rounded-md w-full max-w-[600px] h-auto"
          />
        </div>

        {/* Gambar latar belakang dengan objek yang menutupi seluruh area */}
        <Image
          src="/law.jpg"
          alt="background"
          fill={true}
          className="object-cover absolute top-0 left-0 right-0 bottom-0 w-full h-full -z-10"
        />
      </section>

      {/* Section 2 */}
      <section className="flex flex-col md:flex-row bg-[#FF2E2E] py-10 px-6 md:py-12 md:px-16 justify-between gap-6 md:gap-0">
        <Image
          src="/gavel.jpg"
          height={0}
          width={550}
          alt="home-image"
          className="rounded-md w-full max-w-[550px] h-auto"
        />
        <div className="self-center w-full md:w-1/2">
          <h1 className="font-bold text-2xl md:text-4xl mb-4">
            Berita Faktual yang Terpercaya
          </h1>
          <p className="text-sm md:text-base">
            KamiSedia menyajikan berita hukum terkini yang akurat dan
            terpercaya. Dengan tim redaksi berpengalaman, kami memastikan setiap
            informasi yang disajikan telah melalui proses verifikasi ketat.
          </p>
        </div>
      </section>

      {/* Section 3 */}
      <section className="flex flex-col-reverse md:flex-row py-10 px-6 md:py-12 md:px-16 text-black justify-between gap-6 md:gap-0">
        <div className="w-full md:w-1/2 self-center">
          <h1 className="font-bold text-2xl md:text-4xl mb-4">
            Selalu Update dengan Informasi Hukum Terkini
          </h1>
          <p className="text-sm md:text-base">
            Dengan pembaruan rutin dan analisis mendalam, kami memastikan Anda
            mendapatkan informasi terbaru tentang perubahan hukum, peraturan
            baru, dan kasus-kasus penting.
          </p>
        </div>
        <Image
          src="/reading-news-2.jpg"
          height={0}
          width={550}
          alt="lawyer-image"
          className="rounded-md w-full max-w-[550px] h-auto"
        />
      </section>

      {/* Section 4 */}
      <section className="flex flex-col md:flex-row bg-[#FF2E2E] py-10 px-6 md:py-12 md:px-16 gap-6 md:gap-0">
        <Image
          src="/lawyer.jpg"
          height={0}
          width={675}
          alt="home-image"
          className="rounded-md w-full max-w-[670px] h-auto mb-4 md:mb-0 md:mr-4"
        />
        <div className="md:w-1/2 self-center">
          <h1 className="font-bold text-2xl md:text-4xl mb-2">
            Meningkatkan Literasi Hukum dan Memberikan Konsultasi Praktis
          </h1>
          <p className="text-sm md:text-base">
            KamiSedia bertujuan untuk meningkatkan literasi hukum masyarakat dan
            menyediakan layanan konsultasi hukum online yang praktis.
          </p>
        </div>
      </section>

      {/* Section 5 */}
      <section className="flex flex-col-reverse md:flex-row text-black py-10 px-6 md:py-12 md:px-16 gap-6 md:gap-0">
        <div className="w-full md:w-1/2 self-center">
          <h1 className="font-bold text-2xl md:text-4xl mb-2">
            Memahami Hukum dengan Mudah dan Praktis
          </h1>
          <p className="text-sm md:text-base">
            KamiSedia menyajikan berita hukum terkini yang akurat dan
            terpercaya.
          </p>
        </div>
        <Image
          src="/gavel-cuff.jpg"
          height={0}
          width={675}
          alt="home-image"
          className="rounded-md w-full max-w-[670px] h-auto"
        />
      </section>
    </div>
  );
}
