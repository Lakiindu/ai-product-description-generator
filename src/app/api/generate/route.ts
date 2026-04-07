import { NextResponse } from "next/server";
import { openai } from "@/lib/openai";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { product } = body;

    // 🧪 DEBUG: request input
    console.log("📩 Received product:", product);

    // ❌ validation
    if (!product) {
      return NextResponse.json(
        { error: "Product name is required" },
        { status: 400 }
      );
    }

    // 🧪 DEBUG: API key status
    console.log(
      "🔑 OPENAI KEY:",
      process.env.OPENAI_API_KEY ? "EXISTS ✅" : "MISSING ❌"
    );

    let text: string;

    // 🚀 TRY REAL OPENAI FIRST
    try {
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

      text = completion.choices[0]?.message?.content || "";
      console.log("🤖 OpenAI response:", text);
    } catch (aiError: any) {
      console.error("🔥 OPENAI FAILED, using fallback:", aiError?.message);

      // 🆓 FALLBACK RESPONSE (NO OPENAI NEEDED)
      text = `✨ AI Generated Product Description:

"${product}" is a premium-quality product designed to deliver excellent performance, modern design, and reliable user experience.

It is built for customers who value efficiency, style, and durability. Perfect choice for everyday use with outstanding value.`;
    }

    return NextResponse.json({ result: text });
  } catch (error: any) {
    console.error("🔥 SERVER ERROR:", error?.message || error);

    return NextResponse.json(
      {
        error: "Failed to generate description",
        details: error?.message || "Unknown error",
      },
      { status: 500 }
    );
  }
}