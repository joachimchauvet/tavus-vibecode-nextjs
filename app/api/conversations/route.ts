import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Add detailed logging
    console.log("Received request body:", JSON.stringify(body, null, 2));

    // Get the Tavus API key from environment variable (server-side only)
    const tavusApiKey = process.env.TAVUS_API_KEY;

    if (!tavusApiKey) {
      console.error("TAVUS_API_KEY not found in environment variables");
      return NextResponse.json(
        { error: "Tavus API key not configured" },
        { status: 500 },
      );
    }

    console.log("Tavus API key is available, length:", tavusApiKey.length);

    const payload = {
      replica_id: body.replica_id,
      custom_greeting: body.custom_greeting,
      conversational_context: body.conversational_context,
    };

    console.log(
      "Sending payload to Tavus API:",
      JSON.stringify(payload, null, 2),
    );

    const response = await fetch("https://tavusapi.com/v2/conversations", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": tavusApiKey,
      },
      body: JSON.stringify(payload),
    });

    console.log("Tavus API response status:", response.status);

    if (!response.ok) {
      const errorData = await response.text();
      console.error("Tavus API error details:", errorData);
      return NextResponse.json(
        { error: `Tavus API error: ${response.status}`, details: errorData },
        { status: response.status },
      );
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error("Error creating conversation:", error);
    return NextResponse.json(
      { error: "Failed to create conversation" },
      { status: 500 },
    );
  }
}
