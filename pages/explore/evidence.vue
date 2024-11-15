<template>
  <div class="max-w-3xl mx-auto space-y-8">
    <header class="space-y-2">
      <h1 class="text-3xl font-bold text-gray-900">Add Supporting Evidence</h1>
      <p class="text-xl text-gray-600">
        Topic: {{ currentExploration?.topic }}
      </p>
    </header>

    <p class="text-gray-600">
      For each of your valid claims, add supporting evidence. This can include research findings, 
      personal experiences, or other relevant information that supports your claim.
    </p>

    <EvidenceCollection
      :claims="currentExploration?.claims || []"
      @add-evidence="addEvidence"
      @remove-evidence="removeEvidence"
      @submit="proceedToImplications"
    />
  </div>
</template>

<script setup lang="ts">
const router = useRouter()
const { currentExploration, addEvidence: addEvidenceToStore, removeEvidence: removeEvidenceFromStore } = useExploration()

// Redirect if no current exploration or no validated claims
onMounted(() => {
  if (!currentExploration.value || !currentExploration.value.claims.some(c => c.isValid)) {
    router.push('/explore/validation')
  }
})

const addEvidence = ({ claimId, evidence }: { claimId: string, evidence: string }) => {
  addEvidenceToStore(claimId, evidence)
}

const removeEvidence = ({ claimId, index }: { claimId: string, index: number }) => {
  removeEvidenceFromStore(claimId, index)
}

const proceedToImplications = () => {
  router.push('/explore/implications')
}
</script> 