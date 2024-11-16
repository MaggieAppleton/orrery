import { createError } from "h3";
import OpenAI from "openai";

const openai = new OpenAI({
	apiKey: process.env.OPENAI_API_KEY,
});

export default defineEventHandler(async (event) => {
	try {
		const formData = await readMultipartFormData(event);
		const audioFile = formData?.find((item) => item.name === "file");

		if (!audioFile) {
			throw createError({
				statusCode: 400,
				message: "No audio file provided",
			});
		}

		const response = await openai.audio.transcriptions.create({
			file: new File([audioFile.data], "recording.webm", {
				type: "audio/webm",
			}),
			model: "whisper-1",
		});

		return response.text;
	} catch (error) {
		console.error("Transcription error:", error);
		throw createError({
			statusCode: 500,
			message: "Error transcribing audio",
		});
	}
});
