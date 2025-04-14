import openAI, { OpenAI } from 'openai';
import 'dotenv/config';

const client = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY
  });

export async function enhancePrompt(initialPrompt: string, improvementPrompt: string, iterations: number, model: string): Promise<{ finalPrompt: string, iterationsPerformed: number, modelUsed: string }> {
    let currentPrompt = initialPrompt;

    for (let i = 0; i < iterations; i++) {
        const response = await client.chat.completions.create({
            model: model,
            messages: [
                { role: 'system', content: improvementPrompt },
                { role: 'user', content: currentPrompt }
            ]
        });

        const enhancedPrompt = response.choices[0].message.content;
        currentPrompt = enhancedPrompt ?? currentPrompt;
    }

    return {
        finalPrompt: currentPrompt,
        iterationsPerformed: iterations,
        modelUsed: model
    };
}

if (require.main === module) {
    const [initialPrompt, improvementPrompt, iterationsString, model] = process.argv.slice(2);
  
    if (!initialPrompt || !improvementPrompt || !iterationsString || !model) {
      console.error("Usage: ts-node src/index.ts <initialPrompt> <improvementPrompt> <iterations> <model>");
      process.exit(1);
    }
  
    const iterations = parseInt(iterationsString);
  
    enhancePrompt(initialPrompt, improvementPrompt, iterations, model)
      .then(result => {
        console.log(`Final Prompt: ${result.finalPrompt}`);
        console.log(`Iterations: ${result.iterationsPerformed}`);
        console.log(`Model: ${result.modelUsed}`);
      })
      .catch(err => {
        console.error("Error:", err);
      });
}