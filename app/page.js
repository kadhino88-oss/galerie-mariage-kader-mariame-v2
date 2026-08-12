"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

export default function HomePage() {
  const [sparkles, setSparkles] = useState([]);

  useEffect(() => {
    const items = Array.from({ length: 35 }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      top: Math.random() * 100,
      delay: Math.random() * 4,
      duration: 2 + Math.random() * 3,
      size: 2 + Math.random() * 4,
    }));

    setSparkles(items);
  }, []);

  return (
    <main className="relative min-h-screen overflow-hidden bg-gradient-to-br from-[#fffdf9] via-[#f8eee2] to-[#ead8bd] text-[#4a3a2b]">

      {/* ÉTOILES */}
      <div className="pointer-events-none absolute inset-0">
        {sparkles.map((sparkle) => (
          <span
            key={sparkle.id}
            className="sparkle absolute rounded-full bg-white shadow-[0_0_12px_rgba(255,255,255,0.95)]"
            style={{
              left: `${sparkle.left}%`,
              top: `${sparkle.top}%`,
              width: `${sparkle.size}px`,
              height: `${sparkle.size}px`,
              animationDelay: `${sparkle.delay}s`,
              animationDuration: `${sparkle.duration}s`,
            }}
          />
        ))}
      </div>

      {/* HALOS LUMINEUX */}
      <div className="pointer-events-none absolute -left-32 top-20 h-80 w-80 rounded-full bg-white/60 blur-3xl" />
      <div className="pointer-events-none absolute -right-32 bottom-20 h-96 w-96 rounded-full bg-[#d7b77d]/30 blur-3xl" />

      {/* ROSE GAUCHE */}
      <div className="rose rose-left pointer-events-none absolute left-[-55px] top-[12%] z-10 text-[130px] sm:left-[-30px] sm:text-[170px]">
        🌹
      </div>

      {/* ROSE DROITE */}
      <div className="rose rose-right pointer-events-none absolute right-[-55px] top-[20%] z-10 rotate-12 text-[130px] sm:right-[-30px] sm:text-[170px]">
        🌹
      </div>

      {/* ROSES BAS */}
      <div className="rose rose-bottom-left pointer-events-none absolute bottom-[-35px] left-[-35px] z-10 rotate-[-15deg] text-[120px] sm:text-[160px]">
        🌹
      </div>

      <div className="rose rose-bottom-right pointer-events-none absolute bottom-[-35px] right-[-35px] z-10 rotate-12 text-[120px] sm:text-[160px]">
        🌹
      </div>

      {/* CONTENU */}
      <div className="relative z-20 flex min-h-screen items-center justify-center px-5 py-10">

        <div className="w-full max-w-2xl text-center">

          {/* PETIT ORNEMENT */}
          <div className="mb-5 flex items-center justify-center gap-4">
            <span className="h-px w-16 bg-[#b08a52]" />
            <span className="text-2xl text-[#b08a52]">✦</span>
            <span className="h-px w-16 bg-[#b08a52]" />
          </div>

          <p className="text-sm font-semibold uppercase tracking-[0.45em] text-[#9b7745]">
            KADER & MARIAME
          </p>

          <h1 className="mt-5 font-serif text-5xl font-medium leading-tight text-[#594532] sm:text-7xl">
            Bienvenue
            <br />
            <span className="text-[#a27b43]">dans nos souvenirs</span>
          </h1>

          <div className="mx-auto mt-6 flex items-center justify-center gap-5">
            <span className="h-px w-20 bg-[#c5a66e]" />

            {/* ALLIANCES */}
            <div className="rings flex items-center justify-center">
              <span className="ring ring-one" />
              <span className="ring ring-two" />
            </div>

            <span className="h-px w-20 bg-[#c5a66e]" />
          </div>

          <p className="mt-6 text-xl font-medium tracking-wide text-[#8b7355]">
            29 août 2026
          </p>

          <p className="mx-auto mt-5 max-w-lg text-base leading-7 text-[#756454] sm:text-lg">
            Partagez avec nous les photos prises pendant cette
            <br className="hidden sm:block" />
            merveilleuse journée et créons ensemble nos plus beaux souvenirs. ❤️
          </p>

          {/* BOUTONS */}
          <div className="mx-auto mt-9 flex w-full max-w-md flex-col gap-4">

            <Link
              href="/upload"
              className="group rounded-full bg-[#b08a52] px-7 py-4 text-base font-semibold tracking-wide text-white shadow-[0_10px_30px_rgba(130,95,45,0.25)] transition-all duration-300 hover:-translate-y-1 hover:bg-[#9d753c] hover:shadow-[0_15px_35px_rgba(130,95,45,0.35)]"
            >
              <span className="mr-2 transition-transform duration-300 group-hover:scale-125">
                📸
              </span>
              AJOUTER MES PHOTOS
            </Link>

            <Link
              href="/galerie"
              className="rounded-full border border-[#cbb58f] bg-white/75 px-7 py-4 text-base font-semibold tracking-wide text-[#80633c] backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:bg-white"
            >
              💍 VOIR LA GALERIE
            </Link>

          </div>

          {/* BAS */}
          <div className="mt-10">
            <p className="text-2xl tracking-[0.3em] text-[#b08a52]">
              ✦ ✧ ✦
            </p>

            <p className="mt-3 text-xs uppercase tracking-[0.3em] text-[#a18d76]">
              Merci de partager notre bonheur
            </p>
          </div>

        </div>
      </div>

      {/* ANIMATIONS */}
      <style jsx>{`
        .sparkle {
          animation-name: sparkle;
          animation-timing-function: ease-in-out;
          animation-iteration-count: infinite;
        }

        @keyframes sparkle {
          0%,
          100% {
            opacity: 0.15;
            transform: scale(0.7);
          }

          50% {
            opacity: 1;
            transform: scale(1.5);
          }
        }

        .rose {
          filter: drop-shadow(0 15px 20px rgba(80, 55, 30, 0.18));
          animation: roseFloat 5s ease-in-out infinite;
        }

        .rose-right {
          animation-delay: 1.5s;
        }

        .rose-bottom-left {
          animation-delay: 0.8s;
        }

        .rose-bottom-right {
          animation-delay: 2s;
        }

        @keyframes roseFloat {
          0%,
          100% {
            transform: translateY(0) rotate(0deg);
          }

          50% {
            transform: translateY(-12px) rotate(3deg);
          }
        }

        .rings {
          position: relative;
          width: 70px;
          height: 48px;
        }

        .ring {
          position: absolute;
          top: 7px;
          width: 35px;
          height: 35px;
          border: 5px solid #c9a45d;
          border-radius: 50%;
          box-shadow:
            inset 0 0 5px rgba(255, 255, 255, 0.8),
            0 0 8px rgba(190, 145, 65, 0.45);
          animation: ringGlow 2.5s ease-in-out infinite;
        }

        .ring-one {
          left: 6px;
        }

        .ring-two {
          right: 6px;
          animation-delay: 0.7s;
        }

        @keyframes ringGlow {
          0%,
          100% {
            transform: translateY(0) rotate(0deg);
            filter: brightness(1);
          }

          50% {
            transform: translateY(-4px) rotate(8deg);
            filter: brightness(1.35);
          }
        }

        @media (max-width: 640px) {
          .sparkle {
            animation-duration: 3s;
          }
        }
      `}</style>
    </main>
  );
}
