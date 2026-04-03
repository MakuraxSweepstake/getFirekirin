import { NextRequest, NextResponse } from "next/server";

export async function GET(
  request: NextRequest,
  { params }: { params: { path: string[] } }
) {
  const path = params.path.join("/");
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
