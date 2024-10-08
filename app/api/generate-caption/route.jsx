import { AssemblyAI } from "assemblyai";
import { NextResponse } from "next/server";

export async function POST(req) {
  const client = new AssemblyAI({
    apiKey: process.env.ASSEMBLY_CAPTIONS_API_KEY
  });
  try {
    const { audioFileUrl } = await req.json();
    const FILE_URL = audioFileUrl;
    // Request parameters
    const data = {
      audio: FILE_URL
    };
    const transcript = await client.transcripts.transcribe(data);

    return NextResponse.json({ result: transcript.words });
  } catch (e) {
    return NextResponse.json({ error: e });
  }
}
