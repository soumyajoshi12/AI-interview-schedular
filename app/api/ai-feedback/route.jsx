import { NextResponse } from "next/server";  // Ensure this is imported
import { FEEDBACK_PROMPT } from "@/app/services/Constants";
import OpenAI from "openai";

export async function POST(req) {
    try {
        const { conversation } = await req.json();

        // Basic input validation (optional but recommended)
        if (!conversation || !Array.isArray(conversation)) {
            return NextResponse.json(
                { error: "Invalid or missing conversation. It should be an array." },
                { status: 400 }
            );
        }

        // Fix: Properly stringify the conversation
        const FINAL_PROMPT = FEEDBACK_PROMPT.replace('{{conversation}}', JSON.stringify(conversation));

        const openai = new OpenAI({
            baseURL: "https://openrouter.ai/api/v1",
            apiKey: process.env.OPENROUTER_APIKEY,
        });

        const completion = await openai.chat.completions.create({
            model: "deepseek/deepseek-r1-0528:free",
            messages: [
                { role: "user", content: FINAL_PROMPT }
            ],
        });

        if (!completion.choices || completion.choices.length === 0) {
            return NextResponse.json(
                { error: "No response from AI model" },
                { status: 500 }
            );
        }

        // NEW: Extract the response and return it
        const feedback = completion.choices[0].message.content;
        return NextResponse.json({ feedback });

    } catch (error) {
        console.error("Error in feedback generation:", error);
        return NextResponse.json(
            { error: "Internal server error" },
            { status: 500 }
        );
    }
}