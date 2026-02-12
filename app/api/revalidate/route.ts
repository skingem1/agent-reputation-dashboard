import { revalidatePath } from "next/cache";
import { NextRequest, NextResponse } from "next/server";

/**
 * API route to trigger on-demand revalidation of all pages.
 * Called by:
 * 1. Vercel Cron Job (every 30 min) via vercel.json
 * 2. Manual trigger: GET /api/revalidate?secret=YOUR_SECRET
 *
 * This clears the ISR cache so pages re-fetch fresh on-chain data
 * on the next request.
 */
export async function GET(request: NextRequest) {
  // Optional: protect with a secret token
  const secret = request.nextUrl.searchParams.get("secret");
  const expectedSecret = process.env.REVALIDATION_SECRET;

  // If a secret is configured, enforce it (skip check if not set)
  if (expectedSecret && secret !== expectedSecret) {
    return NextResponse.json({ error: "Invalid secret" }, { status: 401 });
  }

  try {
    // Revalidate all main pages
    revalidatePath("/", "page");
    revalidatePath("/agents", "page");
    revalidatePath("/dashboard", "page");
    // Revalidate all agent profile pages via layout
    revalidatePath("/agents/[id]", "page");

    return NextResponse.json({
      revalidated: true,
      timestamp: new Date().toISOString(),
      message: "All pages revalidated. Fresh on-chain data will be fetched on next request.",
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Revalidation failed", details: String(error) },
      { status: 500 }
    );
  }
}
