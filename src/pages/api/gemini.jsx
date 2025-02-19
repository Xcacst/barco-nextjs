import {GoogleGenerativeAI} from "@google/generative-ai";

export default async function handler(req, res) {
	if (req.method !== "POST") {
		return res.status(405).json({error: "Méthode non autorisée. Utilisez POST."});
	}
	
	const {prompt} = req.body;
	
	if (!prompt || prompt.trim() === "") {
		return res.status(400).json({error: "Le prompt est requis."});
	}
	
	try {
		const genAI = new GoogleGenerativeAI(process.env.GOOGLE_GENERATIVE_AI_API_KEY);
		const model = genAI.getGenerativeModel({model: "gemini-1.5-flash"});
		
		const result = await model.generateContent(prompt);
		
		if (result && result.response && typeof result.response.text === "function") {
			const responseText = await result.response.text();
			return res.status(200).json({response: responseText});
		} else {
			throw new Error("Réponse invalide de l'API de Google Generative AI.");
		}
	} catch (error) {
		console.error("Erreur API :", error);
		return res.status(500).json({
			error: "Erreur lors de la communication avec le service de génération de contenu.",
		});
	}
}
