<template>
	<div class="space-y-4">
		<label class="block text-lg font-medium text-gray-700">
			Enter a topic you want to explore:
		</label>

		<input
			:value="modelValue"
			@input="
				$emit('update:modelValue', ($event.target as HTMLInputElement).value)
			"
			type="text"
			class="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
			placeholder="e.g., plate tectonics"
			@keyup.enter="$emit('submit')"
		/>

		<button
			class="w-full px-4 py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
			@click="$emit('submit')"
		>
			Start
		</button>
	</div>
</template>

<script setup lang="ts">
defineProps<{
	modelValue: string;
}>();

defineEmits<{
	(e: "update:modelValue", value: string): void;
	(e: "submit"): void;
}>();
</script>
