import { PROMPT } from "@/app/services/Constants";
import { NextResponse } from "next/server";
import OpenAI from "openai";

export async function POST(req) {

    try {
        const { jobPosition, jobDescription, duration, type } = await req.json()

        console.log("jobPosition, jobDescription, duration, type ", jobPosition, jobDescription, duration, type)

        const Final_Promt = PROMPT.replace('{{jobTitle}}', jobPosition).replace('{{jobDescription}}', jobDescription).replace('{{duration}}', duration).replace('{{type}}', type)

        const openai = new OpenAI({
            baseURL: "https://openrouter.ai/api/v1",
            apiKey: process.env.OPENROUTER_APIKEY,
        })

        const completion = await openai.chat.completions.create({
            model: "deepseek/deepseek-r1-0528:free",
            messages: [
                { role: "user", content: Final_Promt }
            ],
        })

        if (!completion.choices || completion.choices.length === 0) {
            return NextResponse.json(
                { error: "No response from AI model" },
                { status: 500 }
            );
        }

        return NextResponse.json(completion.choices[0].message);

    } catch (error) {
        console.log(error)
        return NextResponse.json(error)
    }

}