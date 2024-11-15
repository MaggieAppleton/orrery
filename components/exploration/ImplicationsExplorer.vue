<template>
  <div class="space-y-6">
    <!-- Summary of validated claims -->
    <div class="p-6 bg-gray-50 rounded-lg space-y-4">
      <h3 class="font-medium text-gray-900">Your Validated Claims:</h3>
      <ul class="space-y-2">
        <li 
          v-for="claim in validClaims" 
          :key="claim.id"
          class="text-gray-600"
        >
          • {{ claim.text }}
        </li>
      </ul>
    </div>

    <!-- Implications input -->
    <div class="space-y-4">
      <div v-if="implications.length" class="space-y-3">
        <div 
          v-for="(implication, index) in implications" 
          :key="index"
          class="flex items-start gap-2 p-4 bg-white rounded-lg border border-gray-200"
        >
          <p class="flex-1 text-gray-900">{{ implication }}</p>
          <button
            class="text-gray-400 hover:text-gray-600"
            @click="$emit('removeImplication', index)"
          >
            ✕
          </button>
        </div>
      </div>

      <div class="space-y-3">
        <label class="block text-gray-700">Add a new implication:</label>
        <textarea
          v-model="newImplication"
          rows="3"
          class="w-full p-3 border border-gray-300 rounded-lg"
          placeholder="What follows from these claims? What are the consequences or possibilities that emerge?"
        />
        <div class="flex justify-end">
          <button
            :disabled="!newImplication.trim()"
            class="px-4 py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700 disabled:opacity-50"
            @click="addImplication"
          >
            Add Implication
          </button>
        </div>
      </div>

      <!-- AI-suggested implications -->
      <div v-if="suggestedImplications.length" class="mt-6 space-y-3">
        <h4 class="font-medium text-gray-900">Suggested Implications:</h4>
        <div 
          v-for="(suggestion, index) in suggestedImplications" 
          :key="index"
          class="p-4 bg-blue-50 rounded-lg border border-blue-100"
        >
          <p class="text-gray-800">{{ suggestion }}</p>
          <button
            class="mt-2 text-sm text-blue-600 hover:text-blue-800"
            @click="addSuggestedImplication(suggestion)"
          >
            Add this implication
          </button>
        </div>
      </div>
    </div>

    <div class="flex justify-between pt-4">
      <NuxtLink
        to="/explore/evidence"
        class="px-4 py-2 text-gray-600 bg-white border border-gray-300 rounded-lg hover:bg-gray-50"
      >
        Back
      </NuxtLink>

      <button
        :disabled="!implications.length"
        class="px-4 py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
        @click="$emit('submit')"
      >
        Complete Exploration
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
interface Claim {
  id: string
  text: string
  type: 'fact' | 'belief'
  isValid: boolean
  evidence: string[]
}

const props = defineProps<{
  claims: Claim[]
  implications: string[]
}>()

const emit = defineEmits<{
  (e: 'addImplication', implication: string): void
  (e: 'removeImplication', index: number): void
  (e: 'submit'): void
}>()

const validClaims = computed(() => 
  props.claims.filter(claim => claim.isValid)
)

const newImplication = ref('')
const suggestedImplications = ref<string[]>([])

const addImplication = () => {
  if (newImplication.value.trim()) {
    emit('addImplication', newImplication.value)
    newImplication.value = ''
    generateSuggestedImplications()
  }
}

const addSuggestedImplication = (suggestion: string) => {
  emit('addImplication', suggestion)
  suggestedImplications.value = suggestedImplications.value.filter(s => s !== suggestion)
}

const generateSuggestedImplications = async () => {
  // TODO: Implement AI-based suggestion generation
  await new Promise(resolve => setTimeout(resolve, 1000))
  suggestedImplications.value = [
    "Sample suggested implication based on your claims...",
    "Another potential implication to consider..."
  ]
}

// Generate initial suggestions
onMounted(() => {
  if (validClaims.value.length) {
    generateSuggestedImplications()
  }
})
</script> 