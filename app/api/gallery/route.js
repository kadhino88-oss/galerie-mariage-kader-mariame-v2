import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

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

    const expression = "folder:mariage-kader-mariame";

    const auth = Buffer.from(`${apiKey}:${apiSecret}`).toString("base64");

    const response = await fetch(
      `https://api.cloudinary.com/v1_1/${cloudName}/resources/search`,
      {
        method: "POST",
        headers: {
          Authorization: `Basic ${auth}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          expression,
          max_results: 500,
        }),
        cache: "no-store",
      }
    );

    const data = await response.json();

    if (!response.ok) {
      console.error("Erreur Cloudinary :", data);

      return NextResponse.json(
        {
          error:
            data?.error?.message ||
            "Erreur lors de la récupération des photos.",
        },
        { status: response.status }
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
