import { NextResponse } from "next/server";
import crypto from "crypto";

function signature(params, secret) {
  const pairs = Object.keys(params)
    .sort()
    .map((k) => `${k}=${params[k]}`)
    .join("&");
  return crypto.createHash("sha1").update(pairs + secret).digest("hex");
}

export async function GET() {
  const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
  const apiKey = process.env.CLOUDINARY_API_KEY;
  const apiSecret = process.env.CLOUDINARY_API_SECRET;

  if (!cloudName || !apiKey || !apiSecret) {
    return NextResponse.json(
      { error: "Cloudinary API non configurée. Ajoute API Key et API Secret dans .env.local." },
      { status: 500 }
    );
  }

  const timestamp = Math.floor(Date.now() / 1000);
  const body = {
    expression: 'folder:mariage-kader-mariame',
    max_results: 500,
    timestamp,
  };
  const params = new URLSearchParams({
    expression: body.expression,
    max_results: String(body.max_results),
    timestamp: String(timestamp),
    api_key: apiKey,
    signature: signature(body, apiSecret),
  });

  const res = await fetch(
    `https://api.cloudinary.com/v1_1/${cloudName}/resources/search`,
    { method: "POST", headers: { "Content-Type": "application/x-www-form-urlencoded" }, body: params, cache: "no-store" }
  );

  const data = await res.json();
  if (!res.ok) return NextResponse.json({ error: data.error?.message || "Cloudinary Search API error" }, { status: 500 });

  return NextResponse.json({ resources: data.resources || [] });
}