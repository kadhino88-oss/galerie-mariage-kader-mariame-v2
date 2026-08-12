"use client";

import { useEffect, useState } from "react";

export default function Gallery() {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadImages() {
      try {
        const response = await fetch("/api/gallery");

        if (!response.ok) {
          throw new Error("Impossible de charger les photos");
        }

        const data = await response.json();

        setImages(data.images || []);
      } catch (error) {
        console.error("Erreur galerie :", error);
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
        <p className="text-gray-600">Chargement des photos...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex min-h-[300px] items-center justify-center">
        <p className="text-gray-600">{error}</p>
      </div>
    );
  }

  if (images.length === 0) {
    return (
      <div className="flex min-h-[300px] items-center justify-center">
        <p className="text-gray-600">
          Aucune photo disponible pour le moment.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
      {images.map((image) => (
        <div
          key={image.public_id}
          className="overflow-hidden rounded-xl bg-gray-100 shadow-sm"
        >
          <img
            src={image.url}
            alt="Photo du mariage de Kader et Mariame"
            className="h-64 w-full object-cover object-center transition-transform duration-300 hover:scale-105"
            loading="lazy"
          />
        </div>
      ))}
    </div>
  );
}