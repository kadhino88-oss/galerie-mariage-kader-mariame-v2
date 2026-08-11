import "./globals.css";

export const metadata = {
  title: "Kader & Mariame — Nos souvenirs",
  description: "Galerie photo collaborative du mariage de Kader & Mariame",
};

export default function RootLayout({ children }) {
  return (
    <html lang="fr">
      <body>{children}</body>
    </html>
  );
}