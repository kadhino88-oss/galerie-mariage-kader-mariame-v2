"use client";

import { useRef, useState } from "react";

export default function UploadBox() {
  const inputRef = useRef(null);
  const [files, setFiles] = useState([]);
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState("");

  function chooseFiles() {
    inputRef.current?.click();
  }

  function onFiles(e) {
    setFiles(Array.from(e.target.files || []));
    setMessage("");
  }

  async function upload() {
    if (!files.length) return;
    setBusy(true);
    setMessage("");
    let ok = 0;
    let failed = 0;

    for (const file of files) {
      if (file.size > 100 * 1024 * 1024) {
        failed++;
        continue;
      }
      try {
        const form = new FormData();
        form.append("file", file);
        form.append("upload_preset", process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET);
        form.append("folder", "mariage-kader-mariame");
        const resourceType = file.type.startsWith("video/") ? "video" : "image";
        const res = await fetch(
          `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/${resourceType}/upload`,
          { method: "POST", body: form }
        );
        if (!res.ok) throw new Error("Upload failed");
        ok++;
      } catch {
        failed++;
      }
    }

    setFiles([]);
    if (inputRef.current) inputRef.current.value = "";
    setBusy(false);
    setMessage(
      failed
        ? `🎉 ${ok} fichier(s) envoyé(s). ${failed} n'ont pas pu être envoyés.`
        : `🎉 ${ok} fichier(s) envoyé(s) avec succès !`
    );
  }

  return (
    <div className="uploadCard">
      <input
        ref={inputRef}
        type="file"
        accept="image/*,video/*"
        multiple
        onChange={onFiles}
        className="hiddenInput"
      />
      <button className="primaryButton" onClick={chooseFiles} disabled={busy}>
        📸 Ajouter mes photos / vidéos
      </button>
      {files.length > 0 && (
        <>
          <p className="selected">{files.length} fichier(s) sélectionné(s)</p>
          <button className="sendButton" onClick={upload} disabled={busy}>
            {busy ? "⏳ Envoi en cours…" : "✨ Envoyer"}
          </button>
        </>
      )}
      {message && <p className="success">{message}</p>}
      <p className="hint">Photos et vidéos • 100 Mo maximum par fichier</p>
    </div>
  );
}