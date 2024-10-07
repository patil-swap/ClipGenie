const { GoogleGenerativeAI } = require("@google/generative-ai");

const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(apiKey);

const model = genAI.getGenerativeModel({
  model: "gemini-1.5-flash"
});

const generationConfig = {
  temperature: 1,
  topP: 0.95,
  topK: 64,
  maxOutputTokens: 8192,
  responseMimeType: "application/json"
};

export const chatSession = model.startChat({
  generationConfig,
  // safetySettings: Adjust safety settings
  // See https://ai.google.dev/gemini-api/docs/safety-settings
  history: [
    {
      role: "user",
      parts: [
        {
          text: "Write a script to generate 60 seconds video on topic: Bedtime story along with AI image prompt in Cartoon format for each scene and give me result in JSON format with imagePrompt and ContentText as field"
        }
      ]
    },
    {
      role: "model",
      parts: [
        {
          text: '```json\n[\n  {\n    "imagePrompt": "Cartoon illustration of a little girl with big eyes and a fluffy nightgown, sitting in bed with a teddy bear, looking up at the ceiling with a curious expression",\n    "contentText": "Once upon a time, in a cozy little bedroom with a window looking out at a starlit sky, lived a little girl named Lily. Lily loved bedtime stories, especially those with magical creatures and faraway lands."\n  },\n  {\n    "imagePrompt": "Cartoon illustration of a friendly, colorful dragon flying over a moonlit forest, with stars twinkling in the sky",\n    "contentText": "One night, as Lily snuggled under her covers, her mom began telling her a story about a friendly dragon named Sparky who lived in a forest filled with glowing mushrooms and sparkling waterfalls."\n  },\n  {\n    "imagePrompt": "Cartoon illustration of a dragon with sparkly scales and big, gentle eyes, sitting on a giant mushroom, looking at a little girl with a smile",\n    "contentText": "Sparky loved to play with his friends, the fluffy bunnies who hopped through the forest and the singing birds who perched on the branches of the glowing trees."\n  },\n  {\n    "imagePrompt": "Cartoon illustration of a dragon and a bunny holding hands, playing hide-and-seek behind a glowing mushroom",\n    "contentText": "One day, Sparky found a tiny, lost butterfly with a broken wing. He gently carried the butterfly to a safe place and helped it heal."\n  },\n  {\n    "imagePrompt": "Cartoon illustration of a dragon carefully carrying a butterfly with a broken wing, with a concerned expression",\n    "contentText": "The butterfly was so grateful for Sparky\'s kindness that it shared a secret with him: a magical waterfall hidden deep in the forest that could grant wishes."\n  },\n  {\n    "imagePrompt": "Cartoon illustration of a sparkling waterfall flowing through a lush green forest, with a rainbow shimmering above it",\n    "contentText": "Sparky flew to the waterfall, making a wish for all the creatures in the forest to be happy and safe. And, just like magic, the waterfall granted his wish."\n  },\n  {\n    "imagePrompt": "Cartoon illustration of Lily smiling and holding her teddy bear, with a peaceful expression",\n    "contentText": "The end. And Lily, feeling happy and sleepy, drifted off to dreamland, imagining herself flying through the magical forest with Sparky, the friendly dragon."\n  }\n]\n```\n\n**Explanation of the Script:**\n\n* **Each JSON object represents a scene in the video.**\n* **`imagePrompt`:** This field contains the text prompt for the AI image generator. It describes the scene in detail, including characters, setting, and emotions.\n* **`contentText`:** This field contains the text to be narrated during the scene. It tells the story and connects the scenes together.\n\n**To create the video:**\n\n1. **Generate images:** Use an AI image generator (like DALL-E 2, Midjourney, or Stable Diffusion) to create images based on the `imagePrompt` for each scene.\n2. **Edit the images:** You can use video editing software to edit the images (crop, resize, add transitions) and create a visual flow.\n3. **Add narration:** Record the `contentText` for each scene and add it to the video with appropriate timing.\n4. **Combine the images and audio:** Sync the images with the narration and create a final video.\n\n**Notes:**\n\n* You can adjust the number of scenes and the length of each scene to fit the desired video length.\n* You can also add sound effects and music to enhance the story.\n* Experiment with different AI image generators and prompt styles to achieve the desired look and feel for your cartoon video. \n'
        }
      ]
    }
  ]
});
