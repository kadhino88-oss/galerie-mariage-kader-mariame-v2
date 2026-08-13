"use client";

import { useRef, useState } from "react";

const CLOUD_NAME = "qmo1hyww";
const UPLOAD_PRESET = "Mariage 29.08.2026";

const stars = [
  { left: "8%", top: "12%", delay: "0s", size: "3px" },
  { left: "18%", top: "30%", delay: "1.2s", size: "2px" },
  { left: "31%", top: "10%", delay: "0.5s", size: "4px" },
  { left: "69%", top: "14%", delay: "1.8s", size: "3px" },
  { left: "82%", top: "28%", delay: "0.8s", size: "2px" },
  { left: "92%", top: "11%", delay: "1.5s", size: "4px" },
  { left: "12%", top: "65%", delay: "2s", size: "2px" },
  { left: "88%", top: "67%", delay: "1s", size: "3px" },
];

function Rose({ className = "" }) {
  return (
    <div className={`rose ${className}`} aria-hidden="true">
      <div className="rose-center" />
      <div className="petal petal-1" />
      <div className="petal petal-2" />
      <div className="petal petal-3" />
      <div className="petal petal-4" />
      <div className="petal petal-5" />
      <div className="petal petal-6" />
      <div className="petal petal-7" />
      <div className="petal petal-8" />
    </div>
  );
}

function Rings() {
  return (
    <div className="rings" aria-hidden="true">
      <div className="ring ring-one">
        <div className="diamond" />
      </div>

      <div className="ring ring-two">
        <div className="diamond" />
      </div>
    </div>
  );
}

export default function UploadPage() {
  const inputRef = useRef(null);

  const [files, setFiles] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [uploaded, setUploaded] = useState(0);
  const [finished, setFinished] = useState(false);
  const [error, setError] = useState("");

  function handleFiles(event) {
    const selectedFiles = Array.from(event.target.files || []);

    if (!selectedFiles.length) return;

    setError("");
    setFinished(false);
    setFiles((current) => [...current, ...selectedFiles]);
    setUploaded(0);

    if (inputRef.current) {
      inputRef.current.value = "";
    }
  }

  function removeFile(index) {
    setFiles((current) => current.filter((_, i) => i !== index));
  }

  async function uploadPhotos() {
    if (!files.length) return;

    setUploading(true);
    setUploaded(0);
    setError("");

    try {
      let completed = 0;

      for (const file of files) {
        const formData = new FormData();

        formData.append("file", file);
        formData.append("upload_preset", UPLOAD_PRESET);
        formData.append("folder", "mariage-kader-mariame");

        const response = await fetch(
          `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`,
          {
            method: "POST",
            body: formData,
          }
        );

        const data = await response.json();

        if (!response.ok) {
          throw new Error(
            data?.error?.message || "Impossible d'envoyer la photo."
          );
        }

        completed += 1;
        setUploaded(completed);
      }

      setFinished(true);
    } catch (err) {
      console.error(err);

      setError(
        "Une photo n'a pas pu être envoyée. Vérifiez votre connexion et réessayez."
      );
    } finally {
      setUploading(false);
    }
  }

  function openPicker() {
    inputRef.current?.click();
  }

  function reset() {
    setFiles([]);
    setUploaded(0);
    setFinished(false);
    setError("");

    if (inputRef.current) {
      inputRef.current.value = "";
    }
  }

  return (
    <main className="wedding-page">
      {/* Décor */}
      <div className="decor" aria-hidden="true">
        {stars.map((star, index) => (
          <span
            key={index}
            className="star"
            style={{
              left: star.left,
              top: star.top,
              animationDelay: star.delay,
              width: star.size,
              height: star.size,
            }}
          />
        ))}

        <div className="gold-glow glow-one" />
        <div className="gold-glow glow-two" />

        <Rose className="rose-left-top" />
        <Rose className="rose-right-top" />
        <Rose className="rose-left-bottom" />
        <Rose className="rose-right-bottom" />

        <div className="petal-fall petal-a">✦</div>
        <div className="petal-fall petal-b">✧</div>
        <div className="petal-fall petal-c">✦</div>
      </div>

      <div className="wedding-content">
        <header className="wedding-header">
          <p className="couple-name">KADER & MARIAME</p>

          <div className="ornament">
            <span />
            <span className="ornament-diamond">◆</span>
            <span />
          </div>

          <Rings />

          <p className="wedding-date">29 AOÛT 2026</p>

          <h1>
            Nos souvenirs
            <span>❤️</span>
          </h1>

          <p className="intro">
            Partagez avec nous les merveilleux moments capturés
            <br className="desktop-break" />
            pendant cette belle journée.
          </p>
        </header>

        <section className="upload-card">
          {!finished ? (
            <>
              <div className="camera-icon">📸</div>

              <h2>Partagez vos plus beaux souvenirs</h2>

              <p className="card-text">
                Vous avez pris une photo pendant notre mariage ?
                <br />
                Faites-la simplement glisser dans notre album.
              </p>

              <input
                ref={inputRef}
                type="file"
                accept="image/*"
                multiple
                capture="environment"
                onChange={handleFiles}
                className="hidden-input"
              />

              {files.length === 0 && (
                <button
                  type="button"
                  onClick={openPicker}
                  className="gold-button"
                >
                  <span>📸</span>
                  AJOUTER MES PHOTOS
                </button>
              )}

              {files.length > 0 && (
                <div className="selected-area">
                  <div className="selected-header">
                    <span>
                      {files.length}{" "}
                      {files.length === 1
                        ? "photo sélectionnée"
                        : "photos sélectionnées"}
                    </span>

                    <button
                      type="button"
                      onClick={openPicker}
                      disabled={uploading}
                      className="add-more"
                    >
                      + Ajouter
                    </button>
                  </div>

                  <div className="photo-grid">
                    {files.map((file, index) => (
                      <div
                        key={`${file.name}-${index}`}
                        className="photo-preview"
                      >
                        <img
                          src={URL.createObjectURL(file)}
                          alt="Photo sélectionnée"
                        />

                        {!uploading && (
                          <button
                            type="button"
                            onClick={() => removeFile(index)}
                            className="remove-photo"
                          >
                            ×
                          </button>
                        )}
                      </div>
                    ))}
                  </div>

                  {uploading && (
                    <div className="progress-area">
                      <p>
                        Envoi de vos souvenirs...
                        <strong>
                          {uploaded}/{files.length}
                        </strong>
                      </p>

                      <div className="progress-track">
                        <div
                          className="progress-bar"
                          style={{
                            width: `${(uploaded / files.length) * 100}%`,
                          }}
                        />
                      </div>
                    </div>
                  )}

                  {!uploading && (
                    <button
                      type="button"
                      onClick={uploadPhotos}
                      className="gold-button send-button"
                    >
                      <span>✨</span>
                      ENVOYER MES PHOTOS
                    </button>
                  )}
                </div>
              )}

              {error && <div className="error-box">{error}</div>}
            </>
          ) : (
            <div className="success-area">
              <div className="success-rings">
                <Rings />
              </div>

              <div className="heart">♥</div>

              <h2>Merci !</h2>

              <p>
                Vos souvenirs ont bien été ajoutés
                <br />
                à notre album.
              </p>

              <div className="success-line">
                <span />
                ✦
                <span />
              </div>

              <p className="small-thanks">
                Merci de partager ces précieux moments
                <br />
                avec Kader & Mariame. 🤍
              </p>

              <button
                type="button"
                onClick={reset}
                className="gold-button"
              >
                📸 AJOUTER D'AUTRES PHOTOS
              </button>

              <a href="/galerie" className="gallery-button">
                💍 VOIR LA GALERIE
              </a>
            </div>
          )}
        </section>

        <footer className="wedding-footer">
          Avec tout notre amour
          <span>✦</span>
        </footer>
      </div>

      <style jsx>{`
        .wedding-page {
          position: relative;
          min-height: 100vh;
          overflow: hidden;
          background:
            radial-gradient(circle at 50% 20%, rgba(255, 255, 255, 0.95), transparent 38%),
            linear-gradient(135deg, #fffdf9 0%, #f9f0e3 48%, #fffaf4 100%);
          color: #493a2d;
        }

        .decor {
          position: absolute;
          inset: 0;
          pointer-events: none;
          overflow: hidden;
        }

        .wedding-content {
          position: relative;
          z-index: 5;
          width: min(100%, 720px);
          margin: 0 auto;
          padding: 38px 20px 35px;
        }

        .wedding-header {
          text-align: center;
        }

        .couple-name {
          margin: 0;
          color: #a7834c;
          font-size: 12px;
          font-weight: 700;
          letter-spacing: 0.45em;
        }

        .ornament {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
          margin: 14px auto 5px;
          width: 180px;
        }

        .ornament span:not(.ornament-diamond) {
          height: 1px;
          flex: 1;
          background: linear-gradient(to right, transparent, #c9a66b);
        }

        .ornament span:last-child {
          background: linear-gradient(to left, transparent, #c9a66b);
        }

        .ornament-diamond {
          color: #bd9656;
          font-size: 10px;
        }

        .rings {
          position: relative;
          width: 150px;
          height: 72px;
          margin: 8px auto 5px;
        }

        .ring {
          position: absolute;
          width: 56px;
          height: 56px;
          border: 7px solid #c89d50;
          border-radius: 50%;
          background: transparent;
          box-shadow:
            inset 0 0 7px rgba(255, 255, 255, 0.9),
            0 3px 14px rgba(155, 111, 42, 0.25);
        }

        .ring-one {
          left: 28px;
          top: 5px;
          transform: rotate(-10deg);
          animation: ringFloat 4s ease-in-out infinite;
        }

        .ring-two {
          right: 28px;
          top: 5px;
          transform: rotate(10deg);
          animation: ringFloat 4s ease-in-out 0.5s infinite;
        }

        .diamond {
          position: absolute;
          top: -11px;
          left: 18px;
          width: 12px;
          height: 12px;
          background: linear-gradient(135deg, #fff 0%, #fff8dc 45%, #d8b76c 100%);
          transform: rotate(45deg);
          box-shadow: 0 0 12px rgba(255, 222, 139, 0.9);
        }

        @keyframes ringFloat {
          0%, 100% {
            transform: translateY(0) rotate(-10deg);
          }
          50% {
            transform: translateY(-5px) rotate(-5deg);
          }
        }

        .ring-two {
          animation-name: ringFloatTwo;
        }

        @keyframes ringFloatTwo {
          0%, 100% {
            transform: translateY(0) rotate(10deg);
          }
          50% {
            transform: translateY(-5px) rotate(5deg);
          }
        }

        .wedding-date {
          margin: 3px 0 5px;
          color: #9b7b4b;
          font-size: 13px;
          font-weight: 600;
          letter-spacing: 0.25em;
        }

        .wedding-header h1 {
          margin: 4px 0 8px;
          font-family: Georgia, "Times New Roman", serif;
          font-size: clamp(38px, 8vw, 58px);
          font-weight: 500;
          line-height: 1.05;
          color: #4a392a;
        }

        .wedding-header h1 span {
          display: inline-block;
          margin-left: 9px;
          font-size: 25px;
          animation: heartbeat 2s ease-in-out infinite;
        }

        @keyframes heartbeat {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.18); }
        }

        .intro {
          margin: 0 auto 28px;
          max-width: 530px;
          color: #806f5d;
          font-size: 15px;
          line-height: 1.7;
        }

        .upload-card {
          position: relative;
          padding: 34px 24px;
          border: 1px solid rgba(195, 157, 97, 0.35);
          border-radius: 32px;
          background: rgba(255, 255, 255, 0.84);
          box-shadow:
            0 25px 70px rgba(117, 87, 48, 0.12),
            inset 0 0 0 1px rgba(255, 255, 255, 0.8);
          backdrop-filter: blur(12px);
          text-align: center;
        }

        .upload-card::before {
          content: "";
          position: absolute;
          inset: 8px;
          border: 1px solid rgba(203, 168, 108, 0.18);
          border-radius: 25px;
          pointer-events: none;
        }

        .camera-icon {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 78px;
          height: 78px;
          margin: 0 auto 18px;
          border-radius: 50%;
          background: linear-gradient(145deg, #fffdf8, #f4e8d4);
          box-shadow:
            0 8px 25px rgba(150, 111, 50, 0.12),
            inset 0 0 0 1px rgba(195, 157, 97, 0.18);
          font-size: 34px;
        }

        .upload-card h2 {
          margin: 0;
          font-family: Georgia, "Times New Roman", serif;
          font-size: clamp(25px, 5vw, 34px);
          font-weight: 500;
          color: #4c3b2b;
        }

        .card-text {
          margin: 12px auto 0;
          max-width: 470px;
          color: #81705f;
          line-height: 1.7;
          font-size: 14px;
        }

        .hidden-input {
          display: none;
        }

        .gold-button {
          position: relative;
          z-index: 2;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
          width: 100%;
          margin-top: 26px;
          padding: 17px 22px;
          border: 0;
          border-radius: 999px;
          background: linear-gradient(135deg, #b58a49, #d5b16f, #a97a39);
          color: white;
          font-size: 14px;
          font-weight: 700;
          letter-spacing: 0.08em;
          box-shadow: 0 12px 25px rgba(157, 112, 47, 0.25);
          transition: transform 0.25s ease, box-shadow 0.25s ease;
        }

        .gold-button:hover {
          transform: translateY(-2px);
          box-shadow: 0 16px 30px rgba(157, 112, 47, 0.32);
        }

        .gold-button:active {
          transform: scale(0.98);
        }

        .selected-area {
          position: relative;
          z-index: 2;
          margin-top: 26px;
        }

        .selected-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 12px;
          margin-bottom: 12px;
          color: #8b704a;
          font-size: 13px;
          font-weight: 600;
        }

        .add-more {
          border: 0;
          background: transparent;
          color: #a77d42;
          font-weight: 700;
        }

        .photo-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 8px;
        }

        .photo-preview {
          position: relative;
          aspect-ratio: 1;
          overflow: hidden;
          border-radius: 15px;
          background: #f5eee4;
        }

        .photo-preview img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
        }

        .remove-photo {
          position: absolute;
          right: 5px;
          top: 5px;
          width: 27px;
          height: 27px;
          border: 0;
          border-radius: 50%;
          background: rgba(35, 27, 19, 0.72);
          color: white;
          font-size: 18px;
          line-height: 1;
        }

        .send-button {
          margin-top: 20px;
        }

        .progress-area {
          margin-top: 22px;
          text-align: left;
        }

        .progress-area p {
          display: flex;
          justify-content: space-between;
          margin: 0 0 8px;
          color: #7c6a57;
          font-size: 13px;
        }

        .progress-track {
          height: 7px;
          overflow: hidden;
          border-radius: 999px;
          background: #eee4d5;
        }

        .progress-bar {
          height: 100%;
          border-radius: inherit;
          background: linear-gradient(90deg, #a97a3d, #e0c184);
          transition: width 0.35s ease;
        }

        .error-box {
          position: relative;
          z-index: 2;
          margin-top: 18px;
          padding: 13px;
          border-radius: 15px;
          background: #fff1f1;
          color: #a33e3e;
          font-size: 13px;
        }

        .success-area {
          position: relative;
          z-index: 2;
          padding: 10px 0 3px;
        }

        .success-rings {
          margin-bottom: 5px;
        }

        .heart {
          margin: 3px 0 8px;
          color: #b58a52;
          font-size: 45px;
          animation: heartbeat 1.8s ease-in-out infinite;
        }

        .success-area h2 {
          margin: 0;
          font-family: Georgia, "Times New Roman", serif;
          font-size: 40px;
          font-weight: 500;
          color: #4b392a;
        }

        .success-area p {
          margin: 14px 0 0;
          color: #7e6d5b;
          line-height: 1.8;
        }

        .success-line {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 12px;
          margin: 22px auto;
          color: #bb9659;
        }

        .success-line span {
          width: 65px;
          height: 1px;
          background: #d5bd94;
        }

        .small-thanks {
          font-size: 13px;
        }

        .gallery-button {
          position: relative;
          z-index: 2;
          display: block;
          width: 100%;
          margin-top: 12px;
          padding: 14px;
          border: 1px solid #d8c5a6;
          border-radius: 999px;
          color: #896b42;
          font-size: 14px;
          font-weight: 700;
        }

        .wedding-footer {
          margin-top: 25px;
          text-align: center;
          color: #9a8467;
          font-family: Georgia, "Times New Roman", serif;
          font-size: 13px;
          font-style: italic;
        }

        .wedding-footer span {
          margin-left: 7px;
          color: #b68b4b;
        }

        .star {
          position: absolute;
          display: block;
          border-radius: 50%;
          background: #d8b36d;
          box-shadow: 0 0 10px rgba(213, 175, 102, 0.9);
          animation: twinkle 2.5s ease-in-out infinite;
        }

        @keyframes twinkle {
          0%, 100% {
            opacity: 0.25;
            transform: scale(0.7);
          }
          50% {
            opacity: 1;
            transform: scale(1.5);
          }
        }

        .gold-glow {
          position: absolute;
          width: 300px;
          height: 300px;
          border-radius: 50%;
          background: rgba(219, 190, 137, 0.14);
          filter: blur(50px);
        }

        .glow-one {
          top: 5%;
          left: -130px;
        }

        .glow-two {
          right: -130px;
          bottom: 5%;
        }

        .rose {
          position: absolute;
          width: 145px;
          height: 145px;
          opacity: 0.72;
          animation: roseFloat 7s ease-in-out infinite;
          filter: drop-shadow(0 12px 18px rgba(118, 82, 39, 0.12));
        }

        .rose-left-top {
          top: -25px;
          left: -35px;
        }

        .rose-right-top {
          top: 50px;
          right: -50px;
          transform: rotate(18deg);
          animation-delay: 1s;
        }

        .rose-left-bottom {
          bottom: 35px;
          left: -55px;
          transform: rotate(-18deg);
          animation-delay: 2s;
        }

        .rose-right-bottom {
          right: -45px;
          bottom: -20px;
          transform: rotate(15deg);
          animation-delay: 1.5s;
        }

        .rose-center {
          position: absolute;
          width: 32px;
          height: 32px;
          left: 56px;
          top: 56px;
          border-radius: 50%;
          background: radial-gradient(circle at 40% 35%, #fff, #f3e5d0 65%, #d8bc92);
          z-index: 4;
          box-shadow: 0 3px 8px rgba(100, 70, 35, 0.15);
        }

        .petal {
          position: absolute;
          width: 62px;
          height: 80px;
          left: 42px;
          top: 32px;
          border-radius: 60% 40% 65% 35%;
          background: radial-gradient(circle at 35% 30%, #fff, #faf4ea 52%, #e7d6bc);
          box-shadow: inset 0 0 8px rgba(155, 118, 72, 0.12);
          transform-origin: 31px 70px;
        }

        .petal-1 { transform: rotate(0deg) translateY(-22px); }
        .petal-2 { transform: rotate(45deg) translateY(-22px); }
        .petal-3 { transform: rotate(90deg) translateY(-22px); }
        .petal-4 { transform: rotate(135deg) translateY(-22px); }
        .petal-5 { transform: rotate(180deg) translateY(-22px); }
        .petal-6 { transform: rotate(225deg) translateY(-22px); }
        .petal-7 { transform: rotate(270deg) translateY(-22px); }
        .petal-8 { transform: rotate(315deg) translateY(-22px); }

        @keyframes roseFloat {
          0%, 100% {
            transform: translateY(0) rotate(0deg);
          }
          50% {
            transform: translateY(-9px) rotate(2deg);
          }
        }

        .petal-fall {
          position: absolute;
          color: #caa76d;
          font-size: 14px;
          opacity: 0;
          animation: falling 8s linear infinite;
        }

        .petal-a {
          left: 25%;
          animation-delay: 1s;
        }

        .petal-b {
          left: 62%;
          animation-delay: 4s;
        }

        .petal-c {
          left: 78%;
          animation-delay: 2.5s;
        }

        @keyframes falling {
          0% {
            top: -5%;
            opacity: 0;
            transform: rotate(0deg) translateX(0);
          }
          15% {
            opacity: 0.7;
          }
          85% {
            opacity: 0.35;
          }
          100% {
            top: 105%;
            opacity: 0;
            transform: rotate(280deg) translateX(80px);
          }
        }

        @media (max-width: 600px) {
          .wedding-content {
            padding: 28px 14px 28px;
          }

          .rose {
            width: 105px;
            height: 105px;
            transform: scale(0.8);
          }

          .rose-left-top {
            left: -42px;
          }

          .rose-right-top {
            right: -52px;
          }

          .rose-left-bottom {
            left: -58px;
          }

          .rose-right-bottom {
            right: -55px;
          }

          .upload-card {
            padding: 29px 17px;
            border-radius: 28px;
          }

          .desktop-break {
            display: none;
          }

          .wedding-header h1 {
            font-size: 40px;
          }
        }
      `}
      </style>
    </main>
  );
}
