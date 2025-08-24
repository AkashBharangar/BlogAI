import { GoogleGenerativeAI } from '@google/generative-ai';
import dotenv from 'dotenv';
dotenv.config();

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

export const generateBlogPost = async (req, res) => {
  try {
    const { prompt } = req.body;
    if (!prompt) {
      return res.status(400).json({ error: 'Prompt is required.' });
    }

  const beautifiedPrompt = `Write a blog post for beginners about \"${prompt}\".\n\n- Start with a relatable, engaging introduction.\n- Use real-world scenarios and examples.\n- Add a personal touch or storytelling.\n- Make it conversational and easy to read.\n- Define a clear target audience.\n- Include a call to action or next steps at the end.\n- Use headings (<h1>, <h2>, <h3>), bold (<strong>), bullet points (<ul><li>), and line breaks (<br>) for readability.\n- Avoid sounding like dry documentation.\n- Focus on practical value and SEO (add FAQs, comparisons, keywords if relevant).\n\nReturn the blog post as ready-to-publish HTML, not markdown.`;
  const model = genAI.getGenerativeModel({ model: 'gemini-2.5-flash' });
  const result = await model.generateContent([{text: beautifiedPrompt}]);
  const response = await result.response;
  const text = response.text();

  res.json({ blogPost: text });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to generate blog post.' });
  }
};
