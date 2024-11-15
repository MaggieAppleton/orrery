<template>
  <div class="space-y-6">
    <div 
      v-for="claim in claims" 
      :key="claim.id"
      class="p-6 bg-white rounded-lg border border-gray-200 space-y-4"
    >
      <div class="flex items-start justify-between">
        <div class="space-y-2">
          <p class="text-lg text-gray-900">{{ claim.text }}</p>
          <span 
            class="inline-block px-2 py-1 text-sm rounded-full"
            :class="claim.type === 'fact' ? 'bg-blue-100 text-blue-800' : 'bg-purple-100 text-purple-800'"
          >
            {{ claim.type }}
          </span>
        </div>
        <div class="flex gap-2">
          <button
            class="px-3 py-1 rounded-lg border"
            :class="[
              claim.isValid === true
                ? 'bg-green-100 text-green-800 border-green-200'
                : 'border-gray-200 hover:bg-green-50'
            ]"
            @click="$emit('validate', { id: claim.id, isValid: true })"
          >
            Valid
          </button>
          <button
            class="px-3 py-1 rounded-lg border"
            :class="[
              claim.isValid === false
                ? 'bg-red-100 text-red-800 border-red-200'
                : 'border-gray-200 hover:bg-red-50'
            ]"
            @click="$emit('validate', { id: claim.id, isValid: false })"
          >
            Invalid
          </button>
        </div>
      </div>

      <div v-if="claim.isValid === false" class="space-y-2">
        <textarea
          v-model="invalidReasons[claim.id]"
          rows="2"
          class="w-full p-3 border border-gray-300 rounded-lg"
          placeholder="Why is this claim invalid? What evidence contradicts it?"
          @change="$emit('updateReason', { id: claim.id, reason: invalidReasons[claim.id] })"
        />
      </div>

      <div v-if="searchResults[claim.id]" class="mt-4 p-4 bg-gray-50 rounded-lg space-y-3">
        <h4 class="font-medium text-gray-900">Related Information:</h4>
        <div v-for="(result, index) in searchResults[claim.id]" :key="index" class="text-sm">
          <p class="text-gray-600">{{ result.excerpt }}</p>
          <a :href="result.url" target="_blank" class="text-blue-600 hover:text-blue-800">
            {{ result.source }}
          </a>
        </div>
      </div>
    </div>

    <div class="flex justify-between pt-4">
      <NuxtLink
        to="/explore/claims"
        class="px-4 py-2 text-gray-600 bg-white border border-gray-300 rounded-lg hover:bg-gray-50"
      >
        Back
      </NuxtLink>

      <button
        :disabled="!allClaimsValidated"
        class="px-4 py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
        @click="$emit('submit')"
      >
        Continue to Evidence
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
interface Claim {
  id: string
  text: string
  type: 'fact' | 'belief'
  isValid?: boolean
}

interface SearchResult {
  excerpt: string
  source: string
  url: string
}

interface Props {
  claims: Claim[]
  searchResults: Record<string, SearchResult[]>
}

const props = defineProps<Props>()

const emit = defineEmits<{
  (e: 'validate', data: { id: string, isValid: boolean }): void
  (e: 'updateReason', data: { id: string, reason: string }): void
  (e: 'submit'): void
}>()

const invalidReasons = ref<Record<string, string>>({})

const allClaimsValidated = computed(() => 
  props.claims.every(claim => claim.isValid !== undefined)
)
</script> 