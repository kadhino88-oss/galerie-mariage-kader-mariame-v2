"use client";

import { useRef, useState } from "react";

const CLOUD_NAME = "qmo1hyww";
const UPLOAD_PRESET = "Mariage le 29.08.2026";

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
    setFiles(selectedFiles);
    setUploaded(0);
  }

  function removeFile(index) {
    setFiles((current) => current.filter((_, i) => i !== index));
    setFinished(false);
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

        const response = await fetch(
          `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`,
          {
            method: "POST",
            body: formData,
          }
        );

        if (!response.ok) {
          const data = await response.json().catch(() => null);
          throw new Error(
            data?.error?.message || "Une photo n'a pas pu être envoyée."
          );
        }

        completed += 1;
        setUploaded(completed);
      }

      setFinished(true);
      setFiles([]);
    } catch (err) {
      console.error("Erreur upload :", err);
      setError(
        "Une photo n'a pas pu être envoyée. Vérifiez votre connexion et réessayez."
      );
    } finally {
      setUploading(false);
    }
  }

  function openGallery() {
    inputRef.current?.click();
  }

  function resetUpload() {
    setFiles([]);
    setUploaded(0);
    setFinished(false);
    setError("");

    if (inputRef.current) {
      inputRef.current.value = "";
    }
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-[#fffdf9] via-[#fffaf2] to-[#f7efe1] px-5 py-8 text-[#3d3328]">
      <div className="mx-auto flex min-h-[90vh] max-w-xl flex-col items-center justify-center">
        <div className="mb-5 text-center">
          <p className="text-sm font-medium uppercase tracking-[0.35em] text-[#a38350]">
            KADER & MARIAME
          </p>

          <h1 className="mt-3 text-4xl font-semibold tracking-tight sm:text-5xl">
            Nos souvenirs
          </h1>

          <p className="mt-2 text-lg text-[#8b7355]">29 août 2026</p>
        </div>

        <div className="w-full rounded-[2rem] border border-[#e8dccb] bg-white/90 p-6 text-center shadow-xl shadow-[#b79b7040] backdrop-blur sm:p-9">
          {!finished ? (
            <>
              <div className="mx-auto mb-5 flex h-20 w-20 items-center justify-center rounded-full bg-[#f7efe1] text-4xl">
                📸
              </div>

              <h2 className="text-2xl font-semibold">
                Partagez vos plus beaux souvenirs !
              </h2>

              <p className="mx-auto mt-3 max-w-md text-base leading-7 text-[#766858]">
                Vous avez pris une photo pendant notre mariage ?
                <br />
                Ajoutez-la ici et faites partie de notre album de souvenirs. ❤️
              </p>

              <input
                ref={inputRef}
                type="file"
                accept="image/*"
                multiple
                onChange={handleFiles}
                className="hidden"
              />

              {!files.length && (
                <button
                  type="button"
                  onClick={openGallery}
                  className="mt-7 w-full rounded-full bg-[#b08a52] px-6 py-4 text-lg font-semibold text-white shadow-lg transition hover:bg-[#98733f] active:scale-[0.98]"
                >
                  📸 AJOUTER MES PHOTOS
                </button>
              )}

              {files.length > 0 && (
                <div className="mt-7">
                  <p className="mb-4 text-sm font-medium text-[#8b7355]">
                    {files.length}{" "}
                    {files.length === 1 ? "photo sélectionnée" : "photos sélectionnées"}
                  </p>

                  <div className="grid max-h-72 grid-cols-3 gap-2 overflow-y-auto rounded-2xl bg-[#faf7f1] p-2">
                    {files.map((file, index) => (
                      <div
                        key={`${file.name}-${index}`}
                        className="relative aspect-square overflow-hidden rounded-xl bg-[#eee5d8]"
                      >
                        <img
                          src={URL.createObjectURL(file)}
                          alt={file.name}
                          className="h-full w-full object-cover"
                        />

                        {!uploading && (
                          <button
                            type="button"
                            onClick={() => removeFile(index)}
                            className="absolute right-1.5 top-1.5 flex h-7 w-7 items-center justify-center rounded-full bg-black/70 text-sm text-white"
                            aria-label="Supprimer cette photo"
                          >
                            ×
                          </button>
                        )}
                      </div>
                    ))}
                  </div>

                  {uploading && (
                    <div className="mt-5">
                      <div className="mb-2 flex justify-between text-sm text-[#766858]">
                        <span>Envoi de vos photos...</span>
                        <span>
                          {uploaded}/{files.length}
                        </span>
                      </div>

                      <div className="h-2 overflow-hidden rounded-full bg-[#eee4d4]">
                        <div
                          className="h-full rounded-full bg-[#b08a52] transition-all duration-300"
                          style={{
                            width: `${(uploaded / files.length) * 100}%`,
                          }}
                        />
                      </div>
                    </div>
                  )}

                  {!uploading && (
                    <div className="mt-5 space-y-3">
                      <button
                        type="button"
                        onClick={uploadPhotos}
                        className="w-full rounded-full bg-[#b08a52] px-6 py-4 text-lg font-semibold text-white shadow-lg transition hover:bg-[#98733f] active:scale-[0.98]"
                      >
                        💛 ENVOYER MES PHOTOS
                      </button>

                      <button
                        type="button"
                        onClick={openGallery}
                        className="w-full rounded-full border border-[#d8c6ac] bg-white px-6 py-3 font-medium text-[#8b6d45] transition hover:bg-[#faf5ec]"
                      >
                        📸 AJOUTER D'AUTRES PHOTOS
                      </button>
                    </div>
                  )}
                </div>
              )}

              {error && (
                <div className="mt-5 rounded-2xl bg-red-50 p-4 text-sm leading-6 text-red-700">
                  {error}
                </div>
              )}
            </>
          ) : (
            <div className="py-8">
              <div className="mx-auto mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-[#f7efe1] text-5xl">
                ❤️
              </div>

              <h2 className="text-3xl font-semibold">MERCI !</h2>

              <p className="mx-auto mt-4 max-w-md text-base leading-7 text-[#766858]">
                Vos photos ont bien été ajoutées à notre album.
                <br />
                Merci de partager ces précieux souvenirs avec nous !
              </p>

              <div className="mt-7 space-y-3">
                <button
                  type="button"
                  onClick={resetUpload}
                  className="w-full rounded-full bg-[#b08a52] px-6 py-4 font-semibold text-white shadow-lg transition hover:bg-[#98733f]"
                >
                  📸 AJOUTER D'AUTRES PHOTOS
                </button>

                <a
                  href="/galerie"
                  className="block w-full rounded-full border border-[#d8c6ac] bg-white px-6 py-3 font-medium text-[#8b6d45] transition hover:bg-[#faf5ec]"
                >
                  💍 VOIR LA GALERIE
                </a>
              </div>
            </div>
          )}
        </div>

        <p className="mt-6 text-center text-xs text-[#9a8975]">
          Merci de faire partie de cette belle journée. 🤍
        </p>
      </div>
    </main>
  );
}