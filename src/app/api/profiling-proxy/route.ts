import { NextResponse } from "next/server";

export async function GET() {
  const res = await fetch("https://service6.acuitytec.com/api/js/profiling.min.js");
  const script = await res.text();
  const rewritten = script.replace(/https:\/\/dfl\.acuitytec\.com/g, "/api/dfl-proxy");
  const patched = `${rewritten}\nwindow.Profiling = Profiling;`;
  return new NextResponse(patched, {
    headers: { "Content-Type": "application/javascript" },
  });
}
