<template>
  <div class="space-y-6">
    <div 
      v-for="claim in validClaims" 
      :key="claim.id"
      class="p-6 bg-white rounded-lg border border-gray-200 space-y-4"
    >
      <div class="space-y-2">
        <p class="text-lg text-gray-900">{{ claim.text }}</p>
        <span 
          class="inline-block px-2 py-1 text-sm rounded-full"
          :class="claim.type === 'fact' ? 'bg-blue-100 text-blue-800' : 'bg-purple-100 text-purple-800'"
        >
          {{ claim.type }}
        </span>
      </div>

      <div class="space-y-3">
        <h4 class="font-medium text-gray-700">Supporting Evidence</h4>
        
        <div v-if="claim.evidence?.length" class="space-y-2">
          <div 
            v-for="(evidence, index) in claim.evidence" 
            :key="index"
            class="flex items-start gap-2 p-3 bg-gray-50 rounded-lg"
          >
            <p class="flex-1 text-gray-600">{{ evidence }}</p>
            <button
              class="text-gray-400 hover:text-gray-600"
              @click="$emit('removeEvidence', { claimId: claim.id, index })"
            >
              ✕
            </button>
          </div>
        </div>

        <div class="flex gap-2">
          <input
            v-model="newEvidence[claim.id]"
            type="text"
            class="flex-1 p-2 border border-gray-300 rounded-lg"
            placeholder="Add supporting evidence..."
            @keyup.enter="addEvidenceForClaim(claim.id)"
          />
          <button
            :disabled="!newEvidence[claim.id]?.trim()"
            class="px-3 py-1 text-white bg-blue-600 rounded-lg hover:bg-blue-700 disabled:opacity-50"
            @click="addEvidenceForClaim(claim.id)"
          >
            Add
          </button>
        </div>
      </div>
    </div>

    <div class="flex justify-between pt-4">
      <NuxtLink
        to="/explore/validation"
        class="px-4 py-2 text-gray-600 bg-white border border-gray-300 rounded-lg hover:bg-gray-50"
      >
        Back
      </NuxtLink>

      <button
        :disabled="!allClaimsHaveEvidence"
        class="px-4 py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
        @click="$emit('submit')"
      >
        Continue to Implications
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
  evidence?: string[]
}

const props = defineProps<{
  claims: Claim[]
}>()

const emit = defineEmits<{
  (e: 'addEvidence', data: { claimId: string, evidence: string }): void
  (e: 'removeEvidence', data: { claimId: string, index: number }): void
  (e: 'submit'): void
}>()

const validClaims = computed(() => 
  props.claims.filter(claim => claim.isValid)
)

const newEvidence = ref<Record<string, string>>({})

const addEvidenceForClaim = (claimId: string) => {
  const evidence = newEvidence.value[claimId]?.trim()
  if (evidence) {
    emit('addEvidence', { claimId, evidence })
    newEvidence.value[claimId] = ''
  }
}

const allClaimsHaveEvidence = computed(() =>
  validClaims.value.every(claim => claim.evidence?.length)
)
</script> 