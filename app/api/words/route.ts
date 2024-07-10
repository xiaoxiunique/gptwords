import { NextRequest, NextResponse } from "next/server";

import result from "./result.json";

export const runtime = "edge";

export async function GET(req: NextRequest) {
  const url = new URL(req.url);
  const word = url.searchParams.get("word");

  if (!word) {
    return NextResponse.json({
      message: "Please provide a word",
    });
  }

  const gptWord = (result as any[]).find(
    (item) => item.word.toLowerCase() === word.toLowerCase(),
  );

  return NextResponse.json({
    message: "Hello World",
    data: gptWord,
  });
}
