import { NextResponse } from "next/server";
import crypto from "crypto";

function signature(params, secret) {
  const pairs = Object.keys(params)
    .sort()
    .map((key) => `${key}=${params[key]}`)
    .join("&");

  return crypto
    .createHash("sha1")
    .update(pairs + secret)
    .digest("hex");
}

export async function GET() {
  try {
    const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
    const apiKey = process.env.CLOUDINARY_API_KEY;
    const apiSecret = process.env.CLOUDINARY_API_SECRET;

    if (!cloudName || !apiKey || !apiSecret) {
      return NextResponse.json(
        {
          error: "Configuration Cloudinary manquante.",
        },
        { status: 500 }
      );
    }

    const timestamp = Math.floor(Date.now() / 1000);

    const body = {
      expression: "folder:mariage-kader-mariame",
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

    const response = await fetch(
      `https://api.cloudinary.com/v1_1/${cloudName}/resources/search`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: params,
        cache: "no-store",
      }
    );

    const data = await response.json();

    if (!response.ok) {
      console.error("Cloudinary :", data);

      return NextResponse.json(
        {
          error:
            data?.error?.message ||
            "Erreur lors de la récupération des photos.",
        },
        { status: 500 }
      );
    }

    return NextResponse.json({
      resources: data.resources || [],
    });
  } catch (error) {
    console.error("Erreur API galerie :", error);

    return NextResponse.json(
      {
        error: "Erreur interne de la galerie.",
      },
      { status: 500 }
    );
  }
}
