"use client";

import { useEffect, useState } from "react";

export default function Gallery() {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadImages() {
      try {
        setLoading(true);
        setError("");

        const response = await fetch("/api/gallery", {
          cache: "no-store",
        });

        const data = await response.json();

        if (!response.ok) {
          throw new Error(
            data?.error || "Impossible de charger les photos."
          );
        }

        const loadedImages = (data.resources || []).map((image) => ({
          url: image.secure_url,
          public_id: image.public_id,
        }));

        setImages(loadedImages);
      } catch (err) {
        console.error("Erreur galerie :", err);
        setError("Impossible de charger les photos pour le moment.");
      } finally {
        setLoading(false);
      }
    }

    loadImages();
  }, []);

  if (loading) {
    return (
      <div className="flex min-h-[300px] items-center justify-center">
        <div className="text-center">
          <div className="mb-4 text-5xl">💍</div>
          <p className="text-[#8b7355]">
            Chargement de vos souvenirs...
          </p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex min-h-[300px] items-center justify-center">
        <div className="rounded-2xl border border-[#eadfce] bg-white/80 p-6 text-center shadow-sm">
          <div className="mb-3 text-4xl">🤍</div>

          <p className="text-[#8b7355]">{error}</p>

          <button
            type="button"
            onClick={() => window.location.reload()}
            className="mt-4 rounded-full bg-[#b08a52] px-6 py-3 font-medium text-white"
          >
            Réessayer
          </button>
        </div>
      </div>
    );
  }

  if (images.length === 0) {
    return (
      <div className="flex min-h-[300px] items-center justify-center">
        <div className="text-center">
          <div className="mb-4 text-5xl">📸</div>

          <p className="text-lg font-medium text-[#765f46]">
            Aucun souvenir pour le moment
          </p>

          <p className="mt-2 text-sm text-[#9a8975]">
            Soyez les premiers à partager une photo ❤️
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
      {images.map((image) => (
        <div
          key={image.public_id}
          className="group overflow-hidden rounded-2xl bg-white shadow-md"
        >
          <img
            src={image.url}
            alt="Souvenir du mariage de Kader et Mariame"
            className="aspect-square h-full w-full object-cover transition duration-500 group-hover:scale-105"
            loading="lazy"
          />
        </div>
      ))}
    </div>
  );
}
