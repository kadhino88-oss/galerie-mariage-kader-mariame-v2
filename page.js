import Link from "next/link";
import UploadBox from "../components/UploadBox";

export default function Home() {
  return (
    <main className="page">
      <section className="hero">
        <div className="ornament">✦</div>
        <p className="eyebrow">NOTRE MARIAGE</p>
        <h1>Kader <span>&</span> Mariame</h1>
        <p className="date">29 août 2026</p>
        <p className="intro">Partagez avec nous les photos et vidéos de cette journée inoubliable.</p>
        <UploadBox />
        <Link className="secondaryButton" href="/galerie">❤️ Voir les souvenirs</Link>
        <p className="small">Aucun compte à créer • Aucun téléchargement d’application</p>
      </section>
    </main>
  );
}