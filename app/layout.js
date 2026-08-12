import "./globals.css";

export const metadata = {
  title: "Kader & Mariame — Nos souvenirs",
  description:
    "Partagez les photos et souvenirs du mariage de Kader et Mariame.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="fr">
      <body>{children}</body>
    </html>
  );
}
