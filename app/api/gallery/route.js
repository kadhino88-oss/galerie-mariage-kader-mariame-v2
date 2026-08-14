import { NextResponse } from "next/server";
import { v2 as cloudinary } from "cloudinary";

export const dynamic = "force-dynamic";

cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function GET() {
  try {
    const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
    const apiKey = process.env.CLOUDINARY_API_KEY;
    const apiSecret = process.env.CLOUDINARY_API_SECRET;

    if (!cloudName || !apiKey || !apiSecret) {
      return NextResponse.json(
        {
          error: "Variables Cloudinary manquantes sur Vercel.",
        },
        { status: 500 }
      );
    }

    const result = await cloudinary.search
      .expression("folder:mariage-kader-mariame")
      .max_results(500)
      .execute();

    return NextResponse.json({
      resources: result.resources || [],
    });
  } catch (error) {
    console.error("ERREUR CLOUDINARY GALERIE :", error);

    return NextResponse.json(
      {
        error:
          error?.error?.message ||
          error?.message ||
          "Impossible de récupérer les photos depuis Cloudinary.",
      },
      { status: 500 }
    );
  }
}
