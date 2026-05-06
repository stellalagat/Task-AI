import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export const generateDescription = async (req, res) => {
  try {
    const { title } = req.body;

    const response = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content: "You generate clear and short task descriptions.",
        },
        {
          role: "user",
          content: `Generate a task description for: ${title}`,
        },
      ],
    });

    const description = response.choices[0].message.content;

    res.json({ description });
  } catch (error) {
    res.status(500).json({ message: "AI generation failed" });
  }
};