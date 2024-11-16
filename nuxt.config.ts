// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
	compatibilityDate: "2024-04-03",
	devtools: { enabled: true },
	modules: ["@nuxtjs/tailwindcss"],
	runtimeConfig: {
		openaiApiKey: process.env.NUXT_OPENAI_API_KEY,
	},
});
