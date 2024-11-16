import { ref, onUnmounted } from "vue";

export function useVoiceTranscription() {
	const isRecording = ref(false);
	const recordingTime = ref(0);
	let recordingInterval: NodeJS.Timeout | null = null;

	const mediaRecorder = ref<MediaRecorder | null>(null);
	const audioChunks = ref<Blob[]>([]);

	const startRecording = async () => {
		try {
			const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
			mediaRecorder.value = new MediaRecorder(stream);
			audioChunks.value = [];

			mediaRecorder.value.ondataavailable = (event) => {
				audioChunks.value.push(event.data);
			};

			mediaRecorder.value.start();
			isRecording.value = true;
			recordingTime.value = 0;
			recordingInterval = setInterval(() => {
				recordingTime.value++;
			}, 1000);
		} catch (error) {
			console.error("Error accessing microphone:", error);
			throw new Error(
				"Unable to access microphone. Please check your permissions."
			);
		}
	};

	const stopRecording = async () => {
		if (!mediaRecorder.value) return;

		const recorder = mediaRecorder.value;

		return new Promise<string>((resolve, reject) => {
			recorder.onstop = async () => {
				try {
					const audioBlob = new Blob(audioChunks.value, { type: "audio/webm" });
					const text = await transcribeAudio(audioBlob);
					resolve(text);
				} catch (error) {
					reject(error);
				}
			};

			recorder.stop();
			isRecording.value = false;
			if (recordingInterval) {
				window.clearInterval(recordingInterval);
			}

			recorder.stream.getTracks().forEach((track) => track.stop());
		});
	};

	const transcribeAudio = async (audioBlob: Blob): Promise<string> => {
		try {
			const formData = new FormData();
			formData.append("file", audioBlob, "recording.webm");

			const response = await fetch("/api/transcribe", {
				method: "POST",
				body: formData,
			});

			if (!response.ok) {
				throw new Error("Transcription failed");
			}

			const text = await response.text();
			return text;
		} catch (error) {
			console.error("Error transcribing audio:", error);
			throw new Error("Error transcribing audio. Please try again.");
		}
	};

	onUnmounted(() => {
		if (recordingInterval) {
			window.clearInterval(recordingInterval);
		}
	});

	return {
		isRecording,
		recordingTime,
		startRecording,
		stopRecording,
	};
}
