import { FEEDBACK_PROMT } from "@/app/services/Constants"
import { NextResponse } from "next/server"
import OpenAI from "openai"
import { jsonrepair } from 'jsonrepair'  // For auto-repairing JSON

export async function POST(req) {
    try {
        console.log("hi")
        // debugger  // Remove or comment out in production

        const { conversation } = await req.json()
        console.log("conversation", conversation)

        // Optional: Validate conversation to prevent bad requests
        if (!conversation || !Array.isArray(conversation)) {
            return NextResponse.json(
                { error: "Invalid or missing conversation data" },
                { status: 400 }
            );
        }

        const FINAL_PROMPT = FEEDBACK_PROMT.replace('{{conversation}}', JSON.stringify(conversation))
        console.log("FINAL_PROMPT", FINAL_PROMPT)

        const openai = new OpenAI({
            baseURL: "https://openrouter.ai/api/v1",
            apiKey: process.env.OPENROUTER_APIKEY,
        })

        const completion = await openai.chat.completions.create({
            model: "deepseek/deepseek-r1-0528:free",
            messages: [
                { role: "user", content: FINAL_PROMPT }
            ],
        })

        if (!completion.choices || completion.choices.length === 0) {
            console.error("No choices in OpenAI response")
            return NextResponse.json(
                { error: "No response from AI model" },
                { status: 500 }
            );
        }
        console.log("Generated feedback completion:", completion)  // Optional: For debugging

        // Extract the feedback content
        let feedbackText = completion.choices[0].message.content;
        console.log("Raw AI response:", feedbackText)  // Optional: For debugging

        // Step 1: Strip Markdown code block wrappers (e.g., ```json ... ```)
        if (feedbackText.startsWith('```json')) {
            feedbackText = feedbackText.replace(/^```json\s*/, '').replace(/\s*```$/, '');
        } else if (feedbackText.startsWith('```')) {
            feedbackText = feedbackText.replace(/^```\s*/, '').replace(/\s*```$/, '');
        }

        console.log("After stripping Markdown:", feedbackText)  // Log cleaned tex

        // Success: Return the parsed JSON
        return NextResponse.json(feedbackText, { status: 200 });

    } catch (error) {
        console.error("Error in ai-feedback API:", error.message || error)  // Safe logging
        return NextResponse.json(
            { error: "Internal server error occurred while generating feedback" },
            { status: 500 }
        );
    }
}