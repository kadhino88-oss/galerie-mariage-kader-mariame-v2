import { NextResponse } from "next/server";
import crypto from "crypto";

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

    const timestamp = Math.floor(Date.now() / 1000);

    const expression = "folder:mariage-kader-mariame";

    const paramsToSign = {
      expression,
      max_results: 500,
      timestamp,
    };

    const signatureString = Object.keys(paramsToSign)
      .sort()
      .map(
        (key) =>
          `${key}=${paramsToSign[key]}`
      )
      .join("&");

    const signature = crypto
      .createHash("sha1")
      .update(signatureString + apiSecret)
      .digest("hex");

    const body = new URLSearchParams();

    body.append("expression", expression);
    body.append("max_results", "500");
    body.append("timestamp", String(timestamp));
    body.append("api_key", apiKey);
    body.append("signature", signature);

    const response = await fetch(
      `https://api.cloudinary.com/v1_1/${cloudName}/resources/search`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: body.toString(),
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
        error:
          error?.message ||
          "Impossible de récupérer les photos.",
      },
      { status: 500 }
    );
  }
}
