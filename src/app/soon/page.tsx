// src/app/soon/page.tsx
import Image from "next/image";
import SoonForm from "./SoonForm";

export const metadata = {
  title: "Nland BV – Coming Soon",
  description: "A clean, natural coming-soon page.",
};

export default function MinimalNaturalComingSoon() {
  return (
    <main
      className="
        relative flex flex-col text-white
        min-h-[100svh] md:min-h-screen
        overflow-hidden
      "
    >
      {/* Arkaplan görseli */}
      <div className="absolute inset-0 -z-10">
        <Image
          src="/background.jpg"
          alt="Background"
          fill
          priority
          className="object-cover"
        />
      </div>

      {/* İçerik */}
      <section className="flex-1 flex flex-col items-center px-4 text-center">
        {/* geniş ekranlarda içeriği kontrol et (dağılmasın) */}
        <div className="w-full max-w-screen-xl mx-auto">
          {/* Nland logo */}
          <div className="mt-12 mb-6">
            <Image
              src="/nland-seffaf.png"
              alt="Nland BV Logo"
              width={340}
              height={120}
              className="mx-auto w-[234px] md:w-[306px]"
              priority
            />
          </div>

          <header className="flex flex-col items-center gap-3">
            <h1
              className="text-balance text-4xl md:text-5xl font-extrabold tracking-tight"
              style={{ textShadow: "0 2px 6px rgba(0,0,0,0.6)" }}
            >
              A natural experience{" "}
              <span className="opacity-95">is coming soon</span>
            </h1>

            <p
              className="max-w-2xl text-pretty text-base md:text-lg opacity-90 mx-auto"
              style={{
                color: "#f1f5f9",
                textShadow: "0 1px 4px rgba(0,0,0,0.6)",
              }}
            >
              Exclusively B2B — A new site is coming soon to showcase our
              products with clarity and transparency. Share your email to be the
              first notified.
            </p>
          </header>

          {/* Form */}
          <div className="mt-6 w-full max-w-xl mx-auto">
            <SoonForm />
          </div>

          {/* Ömer Baba logosu */}
          <div className="mt-8">
            <Image
              src="/logo-omerbaba.png"
              alt="Ömer Baba Logo"
              width={180}
              height={180}
              className="mx-auto"
            />
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer
        className="
          mt-auto pl-4
          pb-[calc(env(safe-area-inset-bottom,0)+1rem)]
          text-left text-xs opacity-90
        "
      >
        © {new Date().getFullYear()} Nland BV — “Nature Meets Harmony”
      </footer>
    </main>
  );
}
