<template>
	<div class="space-y-6">
		<div class="space-y-2">
			<label class="block text-lg font-medium text-gray-700">
				Share what you currently know about {{ topic }}
			</label>
			<p class="text-sm text-gray-500">
				Describe your current beliefs and knowledge about this topic. Don't
				worry about being perfectly organized - just share your thoughts.
			</p>
		</div>

		<div class="space-y-4">
			<textarea
				v-model="beliefs"
				rows="6"
				class="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
				placeholder="Start typing your thoughts..."
			/>

			<div class="flex items-center gap-4">
				<button
					class="flex items-center gap-2 px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50"
					@click="toggleVoiceInput"
				>
					<span class="w-5 h-5" :class="{ 'text-red-500': isRecording }">
						🎤
					</span>
					{{ isRecording ? "Stop Recording" : "Use Voice Input" }}
				</button>

				<span v-if="isRecording" class="text-sm text-gray-500">
					Recording... {{ recordingTime }}s
				</span>
			</div>
		</div>

		<div class="flex justify-between pt-4">
			<NuxtLink
				to="/explore/topic"
				class="px-4 py-2 text-gray-600 bg-white border border-gray-300 rounded-lg hover:bg-gray-50"
			>
				Back
			</NuxtLink>

			<button
				:disabled="!beliefs.trim()"
				class="px-4 py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
				@click="$emit('submit', beliefs)"
			>
				Continue
			</button>
		</div>
	</div>
</template>

<script setup lang="ts">
import { useVoiceTranscription } from "@/composables/useVoiceTranscription";

const props = defineProps<{
	topic: string;
	modelValue: string;
}>();

const emit = defineEmits<{
	(e: "update:modelValue", value: string): void;
	(e: "submit", beliefs: string): void;
}>();

const beliefs = computed({
	get: () => props.modelValue,
	set: (value) => emit("update:modelValue", value),
});

const { isRecording, recordingTime, startRecording, stopRecording } =
	useVoiceTranscription();

const toggleVoiceInput = async () => {
	try {
		if (isRecording.value) {
			const transcribedText = await stopRecording();
			beliefs.value = beliefs.value.trim() + " " + transcribedText;
		} else {
			await startRecording();
		}
	} catch (error) {
		alert(error instanceof Error ? error.message : "An error occurred");
	}
};
</script>
