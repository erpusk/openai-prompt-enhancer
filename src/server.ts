import express from 'express';
import { enhancePrompt } from './index';

const app = express();
app.use(express.json());

app.post('/enhance-prompt', async (req, res) => {
  const { initialPrompt, improvementPrompt, iterations, model } = req.body;

  try {
    const result = await enhancePrompt(initialPrompt, improvementPrompt, iterations, model);
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while enhancing the prompt' });
  }
});

const port = 3000;
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});