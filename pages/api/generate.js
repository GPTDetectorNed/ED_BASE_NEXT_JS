import { Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({
  apiKey:'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',
});
const openai = new OpenAIApi(configuration);

export default async function (req, res) {
  const userText = req.body.textUser || '';
  const textLength = req.body.lengthText || '';
  if (!configuration.apiKey) {
    res.status(500).json({
      error: {
        message: "OpenAI API key not configured, please follow instructions in README.md",
      }
    });
    return;
  }

  


  try {
    const resume = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: [{role: "user", content: "Ecrit moi un résumé précis, dit moi aussi quelle sorte de texte c'est (informatieve, een brief, een presentatie...): "+userText}],
      temperature:0.31,
      top_p:1,
      frequency_penalty:1.5,
      presence_penalty:0,
      max_tokens:1500,
    });
    console.log(resume.data.choices[0].message.content );
    const completion = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: [{role: "user", content: "Ecrit un texte avec environ "+ textLength +" mots qui parle de "+resume.data.choices[0].message.content}],
      temperature:0.10,
      top_p:1,
      frequency_penalty:1,
      presence_penalty:0,
      max_tokens:1500,
    });
    
    res.status(200).json({ result: completion.data.choices[0].message.content, resumée:resume.data.choices[0].message.content  });
  } catch(error) {
    // Consider adjusting the error handling logic for your use case
    if (error.response) {
      console.error(error.response.status, error.response.data);
      res.status(error.response.status).json(error.response.data);
    } else {
      console.error(`Error with OpenAI API request: ${error.message}`);
      res.status(500).json({
        error: {
          message: 'An error occurred during your request.',
        }
      });
    }
  }
}



