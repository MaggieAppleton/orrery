<template>
  <div class="space-y-6">
    <div v-if="loading" class="text-center py-8">
      <p class="text-gray-600">Analyzing your beliefs...</p>
    </div>
    
    <div v-else class="space-y-4">
      <div 
        v-for="claim in claims" 
        :key="claim.id"
        class="p-4 bg-white rounded-lg border border-gray-200"
      >
        <div class="flex items-start justify-between gap-4">
          <div class="flex-1">
            <p class="text-gray-900">{{ claim.text }}</p>
            <span 
              class="inline-block mt-2 px-2 py-1 text-sm rounded-full"
              :class="claim.type === 'fact' ? 'bg-blue-100 text-blue-800' : 'bg-purple-100 text-purple-800'"
            >
              {{ claim.type }}
            </span>
          </div>
          <button
            class="text-gray-400 hover:text-gray-600"
            @click="$emit('remove', claim.id)"
          >
            ✕
          </button>
        </div>
      </div>

      <button
        class="w-full p-4 border-2 border-dashed border-gray-300 rounded-lg text-gray-500 hover:text-gray-700 hover:border-gray-400"
        @click="$emit('add')"
      >
        + Add another claim
      </button>
    </div>

    <div class="flex justify-between pt-4">
      <NuxtLink
        to="/explore/beliefs"
        class="px-4 py-2 text-gray-600 bg-white border border-gray-300 rounded-lg hover:bg-gray-50"
      >
        Back
      </NuxtLink>

      <button
        :disabled="!claims.length"
        class="px-4 py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
        @click="$emit('submit')"
      >
        Continue to Validation
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
interface Claim {
  id: string
  text: string
  type: 'fact' | 'belief'
}

defineProps<{
  claims: Claim[]
  loading?: boolean
}>()

defineEmits<{
  (e: 'remove', id: string): void
  (e: 'add'): void
  (e: 'submit'): void
}>()
</script> 