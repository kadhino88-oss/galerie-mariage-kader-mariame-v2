"use client";

import Link from "next/link";

export default function HomePage() {
  return (
    <main className="wedding-home">
      <div className="stars"></div>

      <div className="flower flower-left">🌹</div>
      <div className="flower flower-right">🌹</div>
      <div className="flower flower-bottom-left">🌹</div>
      <div className="flower flower-bottom-right">🌹</div>

      <div className="petals">
        <span>✦</span>
        <span>✧</span>
        <span>✦</span>
        <span>✧</span>
        <span>✦</span>
        <span>✧</span>
        <span>✦</span>
        <span>✧</span>
      </div>

      <div className="rings">
        <div className="ring ring-one"></div>
        <div className="ring ring-two"></div>
      </div>

      <section className="hero-content">
        <p className="small-title">NOTRE MARIAGE</p>

        <div className="gold-line">
          <span>✦</span>
          <i></i>
          <span>✦</span>
        </div>

        <h1>
          Kader
          <span>&</span>
          Mariame
        </h1>

        <p className="wedding-date">29 AOÛT 2026</p>

        <p className="welcome">
          Bienvenue dans notre univers
          <br />
          et dans nos plus beaux souvenirs ❤️
        </p>

        <div className="hero-buttons">
          <Link href="/upload" className="gold-button">
            <span>📸</span>
            Ajouter mes photos
          </Link>

          <Link href="/galerie" className="outline-button">
            <span>💍</span>
            Voir la galerie
          </Link>
        </div>

        <p className="bottom-message">
          Partagez avec nous les photos prises
          <br />
          pendant cette magnifique journée.
        </p>
      </section>

      <div className="corner-decoration top-left">✦</div>
      <div className="corner-decoration top-right">✧</div>
      <div className="corner-decoration bottom-left">✧</div>
      <div className="corner-decoration bottom-right">✦</div>
    </main>
  );
}
