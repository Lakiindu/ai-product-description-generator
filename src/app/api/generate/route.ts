import { NextResponse } from "next/server";
import { openai } from "@/lib/openai";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { product } = body;

    if (!product) {
      return NextResponse.json(
        { error: "Product name is required" },
        { status: 400 }
      );
    }

    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content:
            "You are a professional marketing copywriter who writes high-converting product descriptions.",
        },
        {
          role: "user",
          content: `Write a compelling product description for: ${product}`,
        },
      ],
      temperature: 0.8,
    });

    const text = completion.choices[0]?.message?.content;

    return NextResponse.json({ result: text });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to generate description" },
      { status: 500 }
    );
  }
}