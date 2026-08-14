"use client";

import { useEffect, useState } from "react";

export default function Gallery() {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(null);

  useEffect(() => {
    async function loadGallery() {
      try {
        const response = await fetch("/api/gallery", {
          cache: "no-store",
        });

        const data = await response.json();

        if (!response.ok || !data.success) {
          throw new Error(data.error || "Impossible de charger les images");
        }

        setImages(data.resources || []);
      } catch (err) {
        console.error("Gallery error:", err);
        setError(err.message || "Erreur lors du chargement des images");
      } finally {
        setLoading(false);
      }
    }

    loadGallery();
  }, []);

  useEffect(() => {
    function handleKeyboard(event) {
      if (selectedIndex === null || images.length === 0) return;

      if (event.key === "Escape") {
        setSelectedIndex(null);
      }

      if (event.key === "ArrowRight") {
        setSelectedIndex((current) =>
          current === images.length - 1 ? 0 : current + 1
        );
      }

      if (event.key === "ArrowLeft") {
        setSelectedIndex((current) =>
          current === 0 ? images.length - 1 : current - 1
        );
      }
    }

    window.addEventListener("keydown", handleKeyboard);

    return () => {
      window.removeEventListener("keydown", handleKeyboard);
    };
  }, [selectedIndex, images.length]);

  useEffect(() => {
    document.body.style.overflow =
      selectedIndex !== null ? "hidden" : "";

    return () => {
      document.body.style.overflow = "";
    };
  }, [selectedIndex]);

  if (loading) {
    return (
      <div className="gallery-loading">
        <div className="gallery-spinner" />
        <p>Chargement des photos...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="gallery-error">
        <strong>Impossible de charger les photos</strong>
        <p>{error}</p>
      </div>
    );
  }

  if (images.length === 0) {
    return (
      <div className="gallery-empty">
        Aucune photo pour le moment.
      </div>
    );
  }

  const selectedImage =
    selectedIndex !== null ? images[selectedIndex] : null;

  return (
    <>
      <div className="photo-grid">
        {images.map((image, index) => (
          <button
            key={image.asset_id || image.public_id || index}
            type="button"
            className="photo-card"
            onClick={() => setSelectedIndex(index)}
            aria-label={`Ouvrir la photo ${index + 1}`}
          >
            <img
              src={image.secure_url}
              alt={image.display_name || "Photo du mariage"}
              loading="lazy"
            />

            <span className="photo-overlay">
              Agrandir
            </span>
          </button>
        ))}
      </div>

      {selectedImage && (
        <div
          className="photo-lightbox"
          onClick={() => setSelectedIndex(null)}
        >
          <button
            type="button"
            className="lightbox-close"
            onClick={() => setSelectedIndex(null)}
            aria-label="Fermer"
          >
            ×
          </button>

          <div className="lightbox-counter">
            {selectedIndex + 1} / {images.length}
          </div>

          <button
            type="button"
            className="lightbox-arrow lightbox-prev"
            onClick={(event) => {
              event.stopPropagation();

              setSelectedIndex((current) =>
                current === 0 ? images.length - 1 : current - 1
              );
            }}
            aria-label="Photo précédente"
          >
            ‹
          </button>

          <div
            className="lightbox-image-container"
            onClick={(event) => event.stopPropagation()}
          >
            <img
              src={selectedImage.secure_url}
              alt={
                selectedImage.display_name ||
                "Photo du mariage"
              }
            />
          </div>

          <button
            type="button"
            className="lightbox-arrow lightbox-next"
            onClick={(event) => {
              event.stopPropagation();

              setSelectedIndex((current) =>
                current === images.length - 1 ? 0 : current + 1
              );
            }}
            aria-label="Photo suivante"
          >
            ›
          </button>
        </div>
      )}
    </>
  );
}