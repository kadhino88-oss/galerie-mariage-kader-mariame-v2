use client';

import { useEffect, useState } from "react";

export default function Gallery() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  async function load() {
    try {
      const res = await fetch("/api/gallery", { cache: "no-store" });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Erreur");
      setItems(data.resources || []);
    } catch (e) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => { load(); }, []);

  if (loading) return <p className="center">Chargement des souvenirs…</p>;
  if (error) return <div className="notice">La galerie n'est pas encore configurée. {error}</div>;
  if (!items.length) return <p className="center">Les premiers souvenirs arrivent bientôt ❤️</p>;

  return (
    <div className="grid">
      {items.map((item) => (
        <a key={item.public_id} className="media" href={item.secure_url} target="_blank" rel="noreferrer">
          {item.resource_type === "video" ? (
            <video src={item.secure_url} muted playsInline preload="metadata" />
          ) : (
            <img src={item.secure_url} alt="Souvenir du mariage" loading="lazy" />
          )}
        </a>
      ))}
    </div>
  );
}