import Gallery from "../../components/Gallery";

export default function GalleryPage() {
  return (
    <main className="page">
      <section className="galleryPage royal-gallery-page">

        {/* ALLIANCES */}
        <div className="royal-rings" aria-hidden="true">
          <span className="royal-ring royal-ring-one">
            <span className="royal-diamond" />
          </span>

          <span className="royal-ring royal-ring-two">
            <span className="royal-diamond" />
          </span>
        </div>

        {/* PETIT ORNEMENT */}
        <div className="royal-crown" aria-hidden="true">
          ♕
        </div>

        {/* TITRE */}
        <div className="royal-title-frame">
          <span className="frame-corner frame-corner-tl">✦</span>
          <span className="frame-corner frame-corner-tr">✦</span>
          <span className="frame-corner frame-corner-bl">✦</span>
          <span className="frame-corner frame-corner-br">✦</span>

          <p className="royal-eyebrow">
            KADER & MARIAME
          </p>
        </div>

        {/* GRAND TITRE */}
        <div className="royal-main-frame">
          <span className="royal-line royal-line-left" />
          <span className="royal-star">✦</span>

          <h1>Nos souvenirs</h1>

          <span className="royal-heart">♥</span>

          <span className="royal-star">✦</span>
          <span className="royal-line royal-line-right" />
        </div>

        {/* DATE */}
        <div className="royal-date-frame">
          <span>29 AOÛT 2026</span>
        </div>

        {/* MESSAGE */}
        <div className="royal-message-frame">
          <span className="message-ornament">❦</span>

          <p>
            Retrouvez ici les précieux souvenirs
            <br />
            partagés par votre famille et vos amis.
          </p>

          <span className="message-ornament">❦</span>
        </div>

        {/* GALERIE */}
        <div className="royal-gallery-content">
          <Gallery />
        </div>

      </section>
    </main>
  );
}