"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

export default function HomePage() {
  const [stars, setStars] = useState([]);

  useEffect(() => {
    const generatedStars = Array.from({ length: 55 }, (_, index) => ({
      id: index,
      left: Math.random() * 100,
      top: Math.random() * 100,
      size: Math.random() * 4 + 2,
      delay: Math.random() * 5,
      duration: Math.random() * 3 + 2,
    }));

    setStars(generatedStars);
  }, []);

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#fffaf4] text-[#4b3a29]">

      {/* =========================================================
          FOND
      ========================================================== */}

      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,#fffefa_0%,#f8ecdc_48%,#e7d1ad_100%)]" />

      <div className="goldGlow absolute left-1/2 top-1/2 h-[650px] w-[650px] -translate-x-1/2 -translate-y-1/2 rounded-full" />

      <div className="absolute left-0 top-0 h-[45vh] w-[45vw] rounded-full bg-white/70 blur-[100px]" />

      <div className="absolute bottom-0 right-0 h-[45vh] w-[45vw] rounded-full bg-[#d9b778]/20 blur-[110px]" />

      {/* =========================================================
          ÉTOILES
      ========================================================== */}

      <div className="pointer-events-none absolute inset-0 z-10">
        {stars.map((star) => (
          <span
            key={star.id}
            className="absolute rounded-full bg-white shadow-[0_0_12px_rgba(255,255,255,1)]"
            style={{
              left: `${star.left}%`,
              top: `${star.top}%`,
              width: `${star.size}px`,
              height: `${star.size}px`,
              animation: `twinkle ${star.duration}s ease-in-out ${star.delay}s infinite`,
            }}
          />
        ))}
      </div>

      {/* =========================================================
          GRANDES FLEURS
      ========================================================== */}

      <div className="flower flower-left flower-white">
        <div className="petal p1" />
        <div className="petal p2" />
        <div className="petal p3" />
        <div className="petal p4" />
        <div className="petal p5" />
        <div className="flower-center" />
      </div>

      <div className="flower flower-left flower-champagne flower-small">
        <div className="petal p1" />
        <div className="petal p2" />
        <div className="petal p3" />
        <div className="petal p4" />
        <div className="petal p5" />
        <div className="flower-center" />
      </div>

      <div className="flower flower-right flower-white flower-large">
        <div className="petal p1" />
        <div className="petal p2" />
        <div className="petal p3" />
        <div className="petal p4" />
        <div className="petal p5" />
        <div className="flower-center" />
      </div>

      <div className="flower flower-right flower-champagne flower-small">
        <div className="petal p1" />
        <div className="petal p2" />
        <div className="petal p3" />
        <div className="petal p4" />
        <div className="petal p5" />
        <div className="flower-center" />
      </div>

      {/* =========================================================
          CONTENU PRINCIPAL
      ========================================================== */}

      <section className="relative z-30 flex min-h-screen w-full items-center justify-center px-6 py-12">

        <div className="flex w-full max-w-6xl flex-col items-center justify-center text-center">

          {/* ORNEMENT HAUT */}

          <div className="mb-7 flex w-full max-w-xl items-center justify-center gap-5">
            <span className="h-px flex-1 bg-gradient-to-r from-transparent via-[#c9a45d] to-[#c9a45d]" />

            <span className="text-3xl text-[#c49a4c]">✦</span>

            <span className="h-px flex-1 bg-gradient-to-l from-transparent via-[#c9a45d] to-[#c9a45d]" />
          </div>

          {/* NOMS */}

          <p className="text-base font-semibold uppercase tracking-[0.55em] text-[#9d7843] sm:text-xl">
            KADER & MARIAME
          </p>

          {/* TITRE */}

          <h1 className="mt-7 max-w-5xl font-serif text-5xl font-medium leading-[1.05] text-[#4e3a28] sm:text-7xl md:text-8xl lg:text-9xl">
            Bienvenue
            <br />

            <span className="goldText">
              dans nos souvenirs
            </span>
          </h1>

          {/* ALLIANCES */}

          <div className="relative mt-10 h-28 w-48">

            <div className="ring ring-left" />
            <div className="ring ring-right" />

            <div className="diamond diamond-left" />
            <div className="diamond diamond-right" />

          </div>

          {/* DATE */}

          <div className="mt-4">

            <div className="flex items-center justify-center gap-5">
              <span className="h-px w-16 bg-[#c8a45d]" />

              <p className="text-xl font-medium tracking-[0.25em] text-[#967447] sm:text-2xl">
                29 AOÛT 2026
              </p>

              <span className="h-px w-16 bg-[#c8a45d]" />
            </div>

          </div>

          {/* DESCRIPTION */}

          <p className="mx-auto mt-8 max-w-2xl text-base leading-8 text-[#766554] sm:text-lg md:text-xl">
            Vous êtes invités à partager avec nous les photos de cette
            merveilleuse journée.
            <br className="hidden sm:block" />
            Ensemble, créons l'album de nos plus beaux souvenirs. ❤️
          </p>

          {/* BOUTONS */}

          <div className="mt-10 flex w-full max-w-xl flex-col gap-4 sm:flex-row">

            <Link
              href="/upload"
              className="goldButton flex flex-1 items-center justify-center gap-3 rounded-full px-7 py-5 text-base font-bold tracking-wide text-white transition-all duration-300 hover:-translate-y-1 sm:text-lg"
            >
              <span className="text-2xl">📸</span>

              <span>
                AJOUTER MES PHOTOS
              </span>
            </Link>

            <Link
              href="/galerie"
              className="galleryButton flex flex-1 items-center justify-center gap-3 rounded-full px-7 py-5 text-base font-bold tracking-wide transition-all duration-300 hover:-translate-y-1 sm:text-lg"
            >
              <span className="text-2xl">💍</span>

              <span>
                VOIR LA GALERIE
              </span>
            </Link>

          </div>

          {/* BAS */}

          <div className="mt-10">

            <p className="text-2xl tracking-[0.6em] text-[#c09a57]">
              ✦ ✧ ✦
            </p>

            <p className="mt-3 text-xs font-medium uppercase tracking-[0.35em] text-[#9d8970]">
              Merci de partager notre bonheur
            </p>

          </div>

        </div>

      </section>

      {/* =========================================================
          STYLES
      ========================================================== */}

      <style jsx>{`

        /* -----------------------------
           LUMIÈRE CENTRALE
        ----------------------------- */

        .goldGlow {
          background: rgba(207, 168, 96, 0.15);
          filter: blur(100px);
          animation: glow 5s ease-in-out infinite;
        }

        @keyframes glow {
          0%,
          100% {
            transform: translate(-50%, -50%) scale(0.9);
            opacity: 0.55;
          }

          50% {
            transform: translate(-50%, -50%) scale(1.1);
            opacity: 0.9;
          }
        }

        /* -----------------------------
           TEXTE OR
        ----------------------------- */

        .goldText {
          background: linear-gradient(
            120deg,
            #8d6836,
            #d0ad67,
            #a67b3d,
            #e0c27f,
            #8e6837
          );

          background-size: 300% auto;

          -webkit-background-clip: text;
          background-clip: text;
          color: transparent;

          animation: goldMove 6s linear infinite;
        }

        @keyframes goldMove {
          0% {
            background-position: 0% center;
          }

          100% {
            background-position: 300% center;
          }
        }

        /* -----------------------------
           ÉTOILES
        ----------------------------- */

        @keyframes twinkle {
          0%,
          100% {
            opacity: 0.15;
            transform: scale(0.5);
          }

          50% {
            opacity: 1;
            transform: scale(1.5);
          }
        }

        /* -----------------------------
           ALLIANCES
        ----------------------------- */

        .ring {
          position: absolute;

          width: 92px;
          height: 92px;

          border-radius: 50%;

          border: 9px solid #c59a4e;

          box-shadow:
            inset 0 0 8px rgba(255, 255, 255, 0.9),
            0 0 12px rgba(171, 128, 55, 0.35),
            0 8px 20px rgba(96, 66, 28, 0.18);

          background: linear-gradient(
            135deg,
            #8e672e,
            #e3c77f,
            #a97832,
            #f1d995,
            #9b702f
          );

          -webkit-mask:
            radial-gradient(
              farthest-side,
              transparent calc(100% - 9px),
              #000 calc(100% - 8px)
            );

          mask:
            radial-gradient(
              farthest-side,
              transparent calc(100% - 9px),
              #000 calc(100% - 8px)
            );

          animation: ringFloat 4s ease-in-out infinite;
        }

        .ring-left {
          left: 20px;
          top: 15px;
          transform: rotate(-12deg);
        }

        .ring-right {
          right: 20px;
          top: 15px;
          transform: rotate(12deg);
          animation-delay: 1s;
        }

        @keyframes ringFloat {
          0%,
          100% {
            translate: 0 0;
          }

          50% {
            translate: 0 -8px;
          }
        }

        /* -----------------------------
           DIAMANTS
        ----------------------------- */

        .diamond {
          position: absolute;

          width: 12px;
          height: 12px;

          background: #fffaf0;

          transform: rotate(45deg);

          border: 2px solid #d7b86e;

          box-shadow:
            0 0 12px rgba(255, 255, 255, 0.9),
            0 0 20px rgba(207, 168, 96, 0.7);

          animation: diamondSparkle 2s ease-in-out infinite;
        }

        .diamond-left {
          left: 54px;
          top: 4px;
        }

        .diamond-right {
          right: 54px;
          top: 4px;
          animation-delay: 0.8s;
        }

        @keyframes diamondSparkle {
          0%,
          100% {
            opacity: 0.5;
            transform: rotate(45deg) scale(0.8);
          }

          50% {
            opacity: 1;
            transform: rotate(45deg) scale(1.3);
          }
        }

        /* -----------------------------
           FLEURS
        ----------------------------- */

        .flower {
          position: absolute;

          width: 260px;
          height: 260px;

          z-index: 15;

          filter:
            drop-shadow(0 25px 30px rgba(71, 47, 24, 0.18))
            drop-shadow(0 0 20px rgba(255, 255, 255, 0.4));

          animation: flowerFloat 6s ease-in-out infinite;
        }

        .flower-left {
          left: -100px;
          top: 8%;
        }

        .flower-right {
          right: -100px;
          bottom: 8%;
          animation-delay: 2s;
        }

        .flower-small {
          width: 170px;
          height: 170px;
        }

        .flower-left.flower-small {
          left: 5%;
          top: 70%;
          animation-delay: 1.5s;
        }

        .flower-right.flower-small {
          right: 5%;
          top: 12%;
          animation-delay: 2.5s;
        }

        .petal {
          position: absolute;

          left: 50%;
          top: 50%;

          width: 115px;
          height: 155px;

          transform-origin: center bottom;

          border-radius: 70% 70% 55% 55%;

          background:
            radial-gradient(
              ellipse at 35% 25%,
              rgba(255, 255, 255, 0.98),
              rgba(249, 241, 226, 0.95) 45%,
              rgba(220, 200, 169, 0.85)
            );

          box-shadow:
            inset 0 0 18px rgba(255, 255, 255, 0.8),
            0 5px 18px rgba(105, 75, 42, 0.12);

          transform:
            translate(-50%, -100%)
            rotate(var(--rotation));
        }

        .p1 {
          --rotation: 0deg;
        }

        .p2 {
          --rotation: 72deg;
        }

        .p3 {
          --rotation: 144deg;
        }

        .p4 {
          --rotation: 216deg;
        }

        .p5 {
          --rotation: 288deg;
        }

        .flower-champagne .petal {
          background:
            radial-gradient(
              ellipse at 35% 25%,
              #fffdf8,
              #ead9bd 48%,
              #c7a978
            );
        }

        .flower-center {
          position: absolute;

          left: 50%;
          top: 50%;

          width: 62px;
          height: 62px;

          transform: translate(-50%, -50%);

          border-radius: 50%;

          background:
            radial-gradient(
              circle at 35% 30%,
              #fff3c9,
              #d2a95e 45%,
              #8e632b
            );

          box-shadow:
            0 0 20px rgba(194, 153, 78, 0.45),
            inset 0 0 12px rgba(255, 255, 255, 0.7);
        }

        @keyframes flowerFloat {
          0%,
          100% {
            transform: translateY(0) rotate(0deg);
          }

          50% {
            transform: translateY(-16px) rotate(3deg);
          }
        }

        /* -----------------------------
           BOUTONS
        ----------------------------- */

        .goldButton {
          background:
            linear-gradient(
              120deg,
              #8f6935,
              #c6a15b,
              #9c7339,
              #d6b873
            );

          background-size: 250% auto;

          box-shadow:
            0 12px 30px rgba(125, 91, 42, 0.25);

          animation: buttonGold 5s linear infinite;
        }

        @keyframes buttonGold {
          0% {
            background-position: 0% center;
          }

          100% {
            background-position: 250% center;
          }
        }

        .galleryButton {
          border: 1px solid #cdb47e;

          background: rgba(255, 255, 255, 0.78);

          color: #87683c;

          box-shadow:
            0 10px 25px rgba(110, 80, 40, 0.08);

          backdrop-filter: blur(10px);
        }

        /* -----------------------------
           MOBILE
        ----------------------------- */

        @media (max-width: 768px) {

          .flower {
            width: 170px;
            height: 170px;
          }

          .flower-left {
            left: -90px;
            top: 10%;
          }

          .flower-right {
            right: -90px;
            bottom: 12%;
          }

          .flower-small {
            display: none;
          }

          .petal {
            width: 75px;
            height: 105px;
          }

          .flower-center {
            width: 42px;
            height: 42px;
          }

          .ring {
            width: 72px;
            height: 72px;
          }

          .rings {
            transform: scale(0.85);
          }
        }

      `}</style>

    </main>
  );
}
