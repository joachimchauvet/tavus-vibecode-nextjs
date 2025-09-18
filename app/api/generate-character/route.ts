import { NextRequest, NextResponse } from "next/server";
import { google } from "@ai-sdk/google";
import { generateText } from "ai";

export async function POST(request: NextRequest) {
  try {
    const { angelProfile } = await request.json();

    const prompt = `Create a detailed character card for an AI companion with these characteristics:

Character Information:
- Name: ${angelProfile.name}
- Age: ${angelProfile.age}
- Gender: ${angelProfile.gender}
- Location: ${angelProfile.location}
- Hobbies: ${angelProfile.hobbies}
- Fun Fact: ${angelProfile.funFact}
- Favorite Movie/Show: ${angelProfile.favoriteMovie}
- Dream Destination: ${angelProfile.dreamDestination}

Write a comprehensive character description that includes:
1. ${angelProfile.name}'s personality traits and characteristics
2. ${angelProfile.name}'s interests and conversation topics
3. ${angelProfile.name}'s background story
4. ${angelProfile.name}'s conversation style and tone
5. Example questions or topics ${angelProfile.name} might discuss

CRITICAL INSTRUCTIONS:
- The AI character's name is "${angelProfile.name}" - use this name ONLY
- Write in third person about ${angelProfile.name}
- This will be used as a system prompt for the AI conversation
- Make ${angelProfile.name} an engaging, authentic character

Begin the character card with: "## ${angelProfile.name}: AI Character Profile"`;

    const result = await generateText({
      model: google("gemini-2.5-flash"),
      prompt,
      maxOutputTokens: 1500,
    });

    return NextResponse.json({ characterCard: result.text });
  } catch (error) {
    console.error("Error generating character card:", error);
    return NextResponse.json(
      { error: "Failed to generate character card" },
      { status: 500 },
    );
  }
}
