import { getModel } from "../config/llmModel.js"
import axios from "axios"
import { uploadToS3 } from "../utils/uploadToS3.js";
import { getFromS3 } from "../utils/getFromS3.js";
import { deductCredits } from "../utils/deductCredits.js";
import { checkAgentLimit } from "../config/agentLimit.js";

export const imageGen = async (state) => {
    await checkAgentLimit(state.userId, "image")
    console.log("Image agent Called");
    
    try {
        const llm = await getModel("image")
    const res = await llm.invoke(`
You are an elite AI image prompt engineer.

Convert the user request into a highly detailed image generation prompt.

Requirements:
- Cinematic lighting
- Professional composition
- Ultra realistic
- High detail
- Beautiful color palette
- Sharp focus
- 8K quality
- Photorealistic
- Depth of field
- Professional photography
- Stunning visuals

Return only the image prompt.

User Request:
${state.prompt}
`)

const prompt=res.content.trim()

const imgUrl = `https://image.pollinations.ai/prompt/${encodeURIComponent(prompt)}`

const imgRes = await axios.get(imgUrl, {responseType:"arraybuffer"})

await deductCredits(state.userId, "image")

const buffer = Buffer.from(imgRes.data);

const fileName = `image-${Date.now()}.png`

await uploadToS3(fileName, buffer, "image/png")
const downloadUrl = await getFromS3(fileName, 60*10)

return {
    ...state,
    aiResponse:`

![Generated Image](${downloadUrl})

📥 [Download Image](${downloadUrl})

⏳ Link expires in 10 minutes.
    `
}
    } catch (error) {
        console.error("🔥 IMAGE GENERATION ERROR:", error);
    console.error("🔥 ERROR MESSAGE:", error.message);
    console.error("🔥 ERROR STATUS:", error.response?.status);
    console.error("🔥 ERROR DATA:", error.response?.data);
        return {
    ...state,
    aiResponse:error?.data?.message || 'Failed To Generate Image'
}
    }

}