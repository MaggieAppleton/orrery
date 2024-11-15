<template>
  <div class="max-w-3xl mx-auto space-y-8">
    <header class="space-y-2">
      <h1 class="text-3xl font-bold text-gray-900">Validate Claims</h1>
      <p class="text-xl text-gray-600">
        Topic: {{ currentExploration?.topic }}
      </p>
    </header>

    <p class="text-gray-600">
      Review each claim and validate it against available information. For any claims marked as invalid, 
      please provide a brief explanation of why.
    </p>

    <ClaimValidation
      :claims="currentExploration?.claims || []"
      :search-results="searchResults"
      @validate="validateClaim"
      @update-reason="updateInvalidReason"
      @submit="proceedToEvidence"
    />
  </div>
</template>

<script setup lang="ts">
const router = useRouter()
const { currentExploration, validateClaim: updateClaimValidity } = useExploration()

// Mock search results - replace with actual API calls
const searchResults = ref<Record<string, any>>({})

// Redirect if no current exploration or claims
onMounted(() => {
  if (!currentExploration.value || !currentExploration.value.claims.length) {
    router.push('/explore/claims')
    return
  }

  // Simulate fetching search results for each claim
  currentExploration.value.claims.forEach(async (claim) => {
    await searchForEvidence(claim)
  })
})

const searchForEvidence = async (claim: { id: string, text: string }) => {
  // TODO: Implement actual search
  await new Promise(resolve => setTimeout(resolve, 1000))
  searchResults.value[claim.id] = [{
    excerpt: "Sample search result related to the claim...",
    source: "Example.com",
    url: "https://example.com"
  }]
}

const validateClaim = ({ id, isValid }: { id: string, isValid: boolean }) => {
  updateClaimValidity(id, isValid)
}

const updateInvalidReason = ({ id, reason }: { id: string, reason: string }) => {
  // TODO: Store the reason with the claim
  console.log(`Updated reason for claim ${id}:`, reason)
}

const proceedToEvidence = () => {
  router.push('/explore/evidence')
}
</script> 