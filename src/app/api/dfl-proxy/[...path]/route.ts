import { NextRequest, NextResponse } from "next/server";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ path: string[] }> }
) {
  const { path: segments } = await params;
  const path = segments.join("/");
  const search = request.nextUrl.search;
  const targetUrl = `https://dfl.acuitytec.com/${path}${search}`;

  const res = await fetch(targetUrl);
  const content = await res.text();
  const contentType = res.headers.get("Content-Type") ?? "application/javascript";

  return new NextResponse(content, {
    status: res.status,
    headers: { "Content-Type": contentType },
  });
}
