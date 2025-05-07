import { OpenAI } from "openai";
import axios from "axios";

const openai = new OpenAI({
  baseURL: "https://openrouter.ai/api/v1",
  apiKey: process.env.EXPO_PUBLIC_OPENROUTER_API_KEY,
});

const openaiBackup = new OpenAI({
	baseURL: "https://openrouter.ai/api/v1",
	apiKey: process.env.EXPO_PUBLIC_OPENROUTER_API_KEY_BACKUP,
});

const AIMODELNAME = "google/gemma-3-27b-it:free";

export const CalculateCaloriesAI = async (PROMPT) =>
	await openai.chat.completions.create({
		model: AIMODELNAME,
		messages: [{ role: "user", content: PROMPT }],
		response_format: "json_object",
	});

const FALLBACK_MODEL = "qwen/qwen3-8b:free";

export const GenerateRecipeAI = async (PROMPT) => {
	try {
		return await openai.chat.completions.create({
			model: AIMODELNAME,
			messages: [{ role: "user", content: PROMPT }],
			response_format: "json_object",
		});
	} catch (error) {
		console.error("Error with primary model:", error.message);
		if (error?.message?.includes("Rate limit")) {
			console.warn("Gemma model limit hit. Falling back to Qwen.");
			return await openaiBackup.chat.completions.create({
				model: FALLBACK_MODEL,
				messages: [{ role: "user", content: PROMPT }],
				response_format: "json_object",
			});
		} else {
			throw error;
		}
	}
};
