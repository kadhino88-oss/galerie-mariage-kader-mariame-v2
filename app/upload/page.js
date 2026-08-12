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
    <main className="min-h-screen bg-gradient-to-b from-[#fffdf9] via-[#fffaf2] to-[#f7efe1] px-5 py-8 text-[#3d3328]">
      <div className="mx-auto flex min-h-[90vh] max-w-xl flex-col items-center justify-center">
        <div className="mb-6 text-center">
          <p className="text-sm font-medium uppercase tracking-[0.35em] text-[#a38350]">
            KADER & MARIAME
          </p>

          <h1 className="mt-3 text-4xl font-semibold">
            Nos souvenirs ❤️
          </h1>

          <p className="mt-2 text-lg text-[#8b7355]">
            29 août 2026
          </p>
        </div>

        <div className="w-full rounded-[2rem] border border-[#e8dccb] bg-white p-6 text-center shadow-xl sm:p-9">

          {!finished ? (
            <>
              <div className="mx-auto mb-5 flex h-20 w-20 items-center justify-center rounded-full bg-[#f7efe1] text-4xl">
                📸
              </div>

              <h2 className="text-2xl font-semibold">
                Partagez vos plus beaux souvenirs !
              </h2>

              <p className="mx-auto mt-3 max-w-md leading-7 text-[#766858]">
                Vous avez pris une photo pendant notre mariage ?
                <br />
                Ajoutez-la ici et faites partie de notre album. ❤️
              </p>

              <input
                ref={inputRef}
                type="file"
                accept="image/*"
                multiple
                capture="environment"
                onChange={handleFiles}
                className="hidden"
              />

              {files.length === 0 && (
                <button
                  type="button"
                  onClick={openPicker}
                  className="mt-7 w-full rounded-full bg-[#b08a52] px-6 py-4 text-lg font-semibold text-white shadow-lg active:scale-[0.98]"
                >
                  📸 AJOUTER MES PHOTOS
                </button>
              )}

              {files.length > 0 && (
                <div className="mt-7">

                  <p className="mb-4 text-sm font-medium text-[#8b7355]">
                    {files.length}{" "}
                    {files.length === 1
                      ? "photo sélectionnée"
                      : "photos sélectionnées"}
                  </p>

                  <div className="grid grid-cols-3 gap-2 rounded-2xl bg-[#faf7f1] p-2">
                    {files.map((file, index) => (
                      <div
                        key={`${file.name}-${index}`}
                        className="relative aspect-square overflow-hidden rounded-xl"
                      >
                        <img
                          src={URL.createObjectURL(file)}
                          alt="Photo sélectionnée"
                          className="h-full w-full object-cover"
                        />

                        {!uploading && (
                          <button
                            type="button"
                            onClick={() => removeFile(index)}
                            className="absolute right-1 top-1 flex h-7 w-7 items-center justify-center rounded-full bg-black/70 text-white"
                          >
                            ×
                          </button>
                        )}
                      </div>
                    ))}
                  </div>

                  {uploading && (
                    <div className="mt-5">
                      <p className="mb-2 text-sm text-[#766858]">
                        Envoi de vos photos... {uploaded}/{files.length}
                      </p>

                      <div className="h-2 overflow-hidden rounded-full bg-[#eee4d4]">
                        <div
                          className="h-full rounded-full bg-[#b08a52] transition-all"
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
                        className="w-full rounded-full bg-[#b08a52] px-6 py-4 text-lg font-semibold text-white shadow-lg"
                      >
                        💛 ENVOYER MES PHOTOS
                      </button>

                      <button
                        type="button"
                        onClick={openPicker}
                        className="w-full rounded-full border border-[#d8c6ac] bg-white px-6 py-3 font-medium text-[#8b6d45]"
                      >
                        📸 AJOUTER D'AUTRES PHOTOS
                      </button>
                    </div>
                  )}
                </div>
              )}

              {error && (
                <div className="mt-5 rounded-2xl bg-red-50 p-4 text-sm text-red-700">
                  {error}
                </div>
              )}
            </>
          ) : (
            <div className="py-8">
              <div className="mx-auto mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-[#f7efe1] text-5xl">
                ❤️
              </div>

              <h2 className="text-3xl font-semibold">
                MERCI !
              </h2>

              <p className="mx-auto mt-4 max-w-md leading-7 text-[#766858]">
                Vos photos ont bien été ajoutées à notre album.
                <br />
                Merci de partager ces précieux souvenirs avec nous !
              </p>

              <div className="mt-7 space-y-3">
                <button
                  type="button"
                  onClick={reset}
                  className="w-full rounded-full bg-[#b08a52] px-6 py-4 font-semibold text-white shadow-lg"
                >
                  📸 AJOUTER D'AUTRES PHOTOS
                </button>

                <a
                  href="/galerie"
                  className="block w-full rounded-full border border-[#d8c6ac] bg-white px-6 py-3 font-medium text-[#8b6d45]"
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
