import { OpenAI } from "openai";
import axios from "axios";

const openai = new OpenAI({
  baseURL: "https://openrouter.ai/api/v1",
  apiKey: process.env.EXPO_PUBLIC_OPENROUTER_API_KEY,
});

const AIMODELNAME = "google/gemma-3-27b-it:free";

export const CalculateCaloriesAI = async (PROMPT) =>
  await openai.chat.completions.create({
    model: AIMODELNAME,
    messages: [{ role: "user", content: PROMPT }],
    response_format: "json_object",
  });

export const GenerateRecipeAI = async (PROMPT) =>
  await openai.chat.completions.create({
    model: AIMODELNAME,
    messages: [{ role: "user", content: PROMPT }],
    response_format: "json_object",
  });