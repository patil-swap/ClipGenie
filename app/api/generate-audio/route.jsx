import { storage } from "@/configs/FirebaseConfig";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { NextResponse } from "next/server";
const textToSpeech = require("@google-cloud/text-to-speech");

const client = new textToSpeech.TextToSpeechClient({
  apiKey: process.env.GOOGLE_TTS_API_KEY
});

export async function POST(req) {
  const { text, id } = await req.json();
  const storageRef = ref(storage, "clip-genie-files/" + id + ".mp3");
  const request = {
    input: { text: text },
    voice: { languageCode: "en-US", name: "en-US-Studio-O" },
    audioConfig: { audioEncoding: "MP3" }
  };

  const [response] = await client.synthesizeSpeech(request);
  const audioBuffer = Buffer.from(response.audioContent, "binary");
  await uploadBytes(storageRef, audioBuffer, { contentType: "audio/mp3" });
  const downloadUrl = await getDownloadURL(storageRef);
  console.log(downloadUrl);
  return NextResponse.json({ result: downloadUrl });
}
