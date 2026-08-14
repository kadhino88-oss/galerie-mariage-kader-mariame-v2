import { NextResponse } from "next/server";
import { v2 as cloudinary } from "cloudinary";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
    const apiKey = process.env.CLOUDINARY_API_KEY;
    const apiSecret = process.env.CLOUDINARY_API_SECRET;

    if (!cloudName || !apiKey || !apiSecret) {
      return NextResponse.json(
        {
          error: "Variables Cloudinary absentes",
          cloudName: !!cloudName,
          apiKey: !!apiKey,
          apiSecret: !!apiSecret,
        },
        { status: 500 }
      );
    }

    cloudinary.config({
      cloud_name: cloudName,
      api_key: apiKey,
      api_secret: apiSecret,
      secure: true,
    });

    const result = await cloudinary.search
      .expression("folder:mariage-kader-mariame")
      .max_results(500)
      .execute();

    return NextResponse.json({
      success: true,
      count: result.resources?.length || 0,
      resources: result.resources || [],
    });
  } catch (error) {
    console.error("CLOUDINARY ERROR:", error);

    return NextResponse.json(
      {
        error: error?.message || "Erreur Cloudinary",
      },
      { status: 500 }
    );
  }
}
