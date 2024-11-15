<template>
	<div class="space-y-8">
		<h1 class="text-4xl font-bold text-gray-900">Orrery</h1>

		<div class="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
			<div
				v-for="exploration in explorations"
				:key="exploration.id"
				class="p-6 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow"
			>
				<h3 class="text-xl font-semibold">{{ exploration.topic }}</h3>
				<p class="text-sm text-gray-500">
					{{ new Date(exploration.createdAt).toLocaleDateString() }}
				</p>
				<NuxtLink
					:to="`/explore/${exploration.id}`"
					class="mt-4 inline-block text-blue-600 hover:text-blue-800"
				>
					View Exploration
				</NuxtLink>
			</div>

			<NuxtLink
				to="/explore/topic"
				class="p-6 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow border-2 border-dashed border-gray-300 flex items-center justify-center"
			>
				<span class="text-lg text-gray-600">Start New Exploration</span>
			</NuxtLink>
		</div>
	</div>
</template>

<script setup lang="ts">
import { useExploration } from "~/composables/useExploration";

const { explorations } = useExploration();
</script>
