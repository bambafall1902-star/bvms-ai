export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Méthode interdite" });
  }

  try {
    const { message, history } = req.body;

    const r = await fetch(
      "https://api.groq.com/openai/v1/chat/completions",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.GROQ_API_KEY}`,
        },
        body: JSON.stringify({
          model: "llama3-8b-8192",
          messages: [
            {
              role: "system",
              content:
                "Tu es un assistant professionnel de service client. Tu comprends et réponds dans TOUTES les langues."
            },
            ...(history || []),
            { role: "user", content: message }
          ],
          temperature: 0.5
        })
      }
    );

    const data = await r.json();
    res.status(200).json({ reply: data.choices[0].message.content });

  } catch {
    res.status(500).json({ reply: "Erreur IA" });
  }
}
