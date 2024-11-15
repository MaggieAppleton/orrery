<template>
	<div class="max-w-2xl mx-auto space-y-8">
		<h1 class="text-3xl font-bold text-gray-900">Start New Exploration</h1>

		<TopicInput v-model="topic" @submit="startExploration" />
	</div>
</template>

<script setup lang="ts">
const router = useRouter();
const { startNewExploration } = useExploration();
const topic = ref("");

const startExploration = () => {
	if (topic.value.trim()) {
		startNewExploration(topic.value);
		router.push("/explore/beliefs");
	}
};
</script>
