import { PROMPT } from "@/app/services/Constants";
import { NextResponse } from "next/server";
import OpenAI from "openai";

export async function POST(req) {

    try {
        const { jobPosition, jobDescription, duration, type } = await req.body

        const Final_Promt = PROMPT.replace('{{jobTitle}}', jobPosition).replace('{{jobDescription}}', jobDescription).replace('{{duration}}', duration).replace('{{type}}', type)

        const openai = new OpenAI({
            baseURL: "https://openrouter.ai/api/v1",
            apiKey: process.env.OPENROUTER_APIKEY,
        })

        const completion = await openai.chat.completions.create({
            model: "google/gemini-2.0-flash-exp:free",
            messages: [
                { role: "user", content: Final_Promt }
            ],
        })

        console.log(completion.choices[0].message)
        return NextResponse.json(completion.choices[0].message)

    } catch (error) {
        console.log(error)
        return NextResponse.json(error)
    }

}