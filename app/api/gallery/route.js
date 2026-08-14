import { NextResponse } from "next/server";
import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const result = await cloudinary.search
      .expression("folder:mariage-kader-mariame")
      .max_results(500)
      .execute();

    return NextResponse.json({
      resources: result.resources || [],
    });
  } catch (error) {
    console.error("Erreur Cloudinary :", error);

    return NextResponse.json(
      {
        error:
          error?.error?.message ||
          error?.message ||
          "Impossible de récupérer les photos.",
      },
      { status: 500 }
    );
  }
}
