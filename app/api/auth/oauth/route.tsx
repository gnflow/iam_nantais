// /app/api/auth/oauth/route.ts
import { NextResponse } from "next/server";
import { auth,signIn } from "@/auth";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { provider, callbackUrl } = body;

    if (!provider) {
      return NextResponse.json(
        { success: false, error: "Provider is required" },
        { status: 400 }
      );
    }

    await signIn(provider, { callbackUrl: callbackUrl || "/dashboard" });
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("OAuth error:", error);
    return NextResponse.json(
      { success: false, error: "OAuth authentication failed" },
      { status: 500 }
    );
  }
}