import { NextRequest, NextResponse } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { brands } from '@/data/brands';
import type { DiagnosisResult } from '@/types';

const apiKey = process.env.GEMINI_API_KEY;
const genAI = apiKey ? new GoogleGenerativeAI(apiKey) : null;

const SYSTEM_PROMPT = `You are AutoAid AI, an expert, highly intelligent, and conversational roadside vehicle assistant.
Your goal is to help users diagnose their vehicle issues and provide safe, accurate repair advice.

CONVERSATION RULES:
1. Be polite, concise, and professional.
2. You need the vehicle's BRAND and YEAR to make an accurate diagnosis. If the user hasn't provided them, ask for them naturally.
3. If the user hasn't described their symptoms clearly, ask clarifying questions.
4. If you have enough information (Brand, Year, Symptoms) to make a confident diagnosis, you MUST output a structured JSON block containing the diagnosis data.

DIAGNOSIS OUTPUT RULE:
When you are ready to diagnose, you must wrap a raw JSON object inside <DIAGNOSIS> and </DIAGNOSIS> tags at the END of your message. 
The JSON must perfectly match this TypeScript interface:
{
  "possibleFaults": [
    {
      "faultSlug": "engine-misfire", // A hyphenated slug
      "faultName": "Engine Misfire",
      "confidence": 85, // Number 0-100
      "description": "Short explanation of why this is happening.",
      "estimatedCost": { "min": 5000, "max": 25000 } // IN LKR (Sri Lankan Rupees). 1 USD = 300 LKR approx.
    }
  ],
  "canDrive": false, // Boolean
  "canDriveNote": "Explain if it is safe to drive to a mechanic."
}

Do NOT output the <DIAGNOSIS> tag if you are just asking a follow-up question. Only output it when you are actually diagnosing a fault.
Ensure costs are always realistic and in Sri Lankan Rupees (LKR).`;

export async function POST(request: NextRequest) {
  try {
    const { messages } = await request.json() as { messages: { role: string; content: string }[] };

    if (!messages || messages.length === 0) {
      return NextResponse.json({ error: 'No messages provided' }, { status: 400 });
    }

    if (!genAI) {
      return NextResponse.json({ error: 'Gemini API key is not configured' }, { status: 500 });
    }

    // Convert messages to Gemini format
    const geminiHistory = messages.slice(0, -1).map(msg => ({
      role: msg.role === 'assistant' ? 'model' : 'user',
      parts: [{ text: msg.content }]
    }));

    const currentMessage = messages[messages.length - 1].content;

    // Use Gemini 1.5 Flash (or Pro if required, but Flash is faster for chat)
    const model = genAI.getGenerativeModel({ 
      model: 'gemini-1.5-flash',
      systemInstruction: SYSTEM_PROMPT
    });

    const chat = model.startChat({
      history: geminiHistory,
      generationConfig: {
        temperature: 0.2, // Low temp for more accurate diagnoses
      }
    });

    const result = await chat.sendMessage(currentMessage);
    const responseText = result.response.text();

    // Parse the response for a <DIAGNOSIS> block
    const diagnosisMatch = responseText.match(/<DIAGNOSIS>([\s\S]*?)<\/DIAGNOSIS>/);
    let diagnosisData: DiagnosisResult | undefined = undefined;
    let replyText = responseText;

    if (diagnosisMatch) {
      try {
        diagnosisData = JSON.parse(diagnosisMatch[1].trim());
        // Remove the diagnosis block from the text shown to the user
        replyText = responseText.replace(/<DIAGNOSIS>[\s\S]*?<\/DIAGNOSIS>/, '').trim();
      } catch (err) {
        console.error('Failed to parse Gemini diagnosis JSON', err);
      }
    }

    return NextResponse.json({
      type: diagnosisData ? 'diagnosis-result' : 'text',
      reply: replyText,
      result: diagnosisData,
    });

  } catch (error: any) {
    console.error('Gemini API error:', error);
    return NextResponse.json(
      { error: error?.message || 'An error occurred during diagnosis. Please try again.' },
      { status: 500 }
    );
  }
}
