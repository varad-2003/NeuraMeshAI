import { getModel } from "../config/llmModel.js"
import { deductCredits } from "../utils/deductCredits.js"
import { generatePPT } from "../utils/generatePpt.js"
import { getFromS3 } from "../utils/getFromS3.js"
import { uploadToS3 } from "../utils/uploadToS3.js"
import { checkAgentLimit } from "../config/agentLimit.js";

export const ppt = async (state) => {
console.log("ppt agent called");

    try {
        await checkAgentLimit(state.userId, "ppt")
        const llm = await getModel("ppt")
        const prompt = `
You are a professional presentation designer.

Format:

{
  "title": "",
  "subtitle": "",
  "slides": [
    {
      "title": "",
      "points": [
        "",
        "",
        "",
        ""
      ]
    }
  ]
}

Rules:

- Generate exactly 6 content slides.
- Each slide should have 4-6 concise bullet points.
- No markdown.
- No explanation.
- No code block.
- Return ONLY JSON.

Topic:

${state.prompt}
`

        const res = await llm.invoke(prompt)
        const data = JSON.parse(res.content);
        await deductCredits(state.userId, "ppt")
        console.log("generator fn called" );
        
        const ppt = await generatePPT(data)

        console.log("generator fn done bro" );
        const buffer = await ppt.write({
            outputType:"nodebuffer"
        })
        const fileName = `ppt-${Date.now()}.pptx`

        await uploadToS3(fileName, buffer, "application/vnd.openxmlformats-officedocument.presentationml.presentation")

        const downloadUrl = await getFromS3(fileName, 24*60)

        return{
            ...state,
            aiResponse: `
✅ Presentation Generated

**${data.title}**

📥 [Download PPT](${downloadUrl})

_Link expires in 10 minutes._
`
        }
        
    } catch (error) {
        console.log(error);
          return{
            ...state,
            aiResponse:error?.data?.message || 'Failed To Generate PPT'
        }

    }
    
}