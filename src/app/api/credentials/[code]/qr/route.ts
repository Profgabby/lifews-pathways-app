import QRCode from "qrcode";
import { NextRequest } from "next/server";

export async function GET(request: NextRequest, { params }: { params: Promise<{ code: string }> }) {
  const { code } = await params;
  const normalized = decodeURIComponent(code).trim().toUpperCase();
  if (!/^LGS-\d{4}-[0-9A-F]{12}$/.test(normalized)) {
    return new Response("Invalid credential code", { status: 400 });
  }
  const verificationUrl = `${request.nextUrl.origin}/credentials/${encodeURIComponent(normalized)}`;
  const svg = await QRCode.toString(verificationUrl, { type: "svg", errorCorrectionLevel: "M", margin: 1, width: 240 });
  return new Response(svg, {
    headers: {
      "Content-Type": "image/svg+xml; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=86400",
      "Content-Security-Policy": "default-src 'none'; style-src 'unsafe-inline'",
    },
  });
}
