<template>
  <div class="max-w-3xl mx-auto space-y-8">
    <header class="space-y-2">
      <h1 class="text-3xl font-bold text-gray-900">Review Your Claims</h1>
      <p class="text-xl text-gray-600">
        Topic: {{ currentExploration?.topic }}
      </p>
    </header>

    <div v-if="!currentExploration?.initialBeliefs" class="text-center py-8">
      <p class="text-gray-600">No beliefs captured yet.</p>
      <NuxtLink 
        to="/explore/beliefs"
        class="mt-4 inline-block text-blue-600 hover:text-blue-800"
      >
        Go back to capture beliefs
      </NuxtLink>
    </div>

    <template v-else>
      <p class="text-gray-600">
        Here are the key claims we've identified from your beliefs. Review them, remove any that aren't accurate, and add any we missed.
      </p>

      <ClaimsList
        :claims="currentExploration.claims"
        :loading="analyzing"
        @remove="removeClaim"
        @add="showAddClaimModal = true"
        @submit="proceedToValidation"
      />
    </template>

    <Modal
      v-if="showAddClaimModal"
      @close="showAddClaimModal = false"
    >
      <div class="space-y-4">
        <h2 class="text-lg font-semibold">Add New Claim</h2>
        <textarea
          v-model="newClaimText"
          rows="3"
          class="w-full p-3 border border-gray-300 rounded-lg"
          placeholder="Enter your claim..."
        />
        <div class="flex gap-4">
          <button
            class="flex-1 py-2 text-center rounded-lg"
            :class="[
              newClaimType === 'fact' 
                ? 'bg-blue-100 text-blue-800' 
                : 'bg-gray-100 text-gray-600 hover:bg-blue-50'
            ]"
            @click="newClaimType = 'fact'"
          >
            Fact
          </button>
          <button
            class="flex-1 py-2 text-center rounded-lg"
            :class="[
              newClaimType === 'belief' 
                ? 'bg-purple-100 text-purple-800' 
                : 'bg-gray-100 text-gray-600 hover:bg-purple-50'
            ]"
            @click="newClaimType = 'belief'"
          >
            Belief
          </button>
        </div>
        <div class="flex justify-end gap-4">
          <button
            class="px-4 py-2 text-gray-600 bg-white border border-gray-300 rounded-lg hover:bg-gray-50"
            @click="showAddClaimModal = false"
          >
            Cancel
          </button>
          <button
            :disabled="!newClaimText.trim()"
            class="px-4 py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700 disabled:opacity-50"
            @click="addClaim"
          >
            Add Claim
          </button>
        </div>
      </div>
    </Modal>
  </div>
</template>

<script setup lang="ts">
const router = useRouter()
const { currentExploration, addClaim: addClaimToExploration, removeClaim: removeClaimFromExploration } = useExploration()

const analyzing = ref(false)
const showAddClaimModal = ref(false)
const newClaimText = ref('')
const newClaimType = ref<'fact' | 'belief'>('fact')

// Redirect if no current exploration
onMounted(() => {
  if (!currentExploration.value) {
    router.push('/explore/topic')
    return
  }

  // If we have beliefs but no claims, analyze them
  if (currentExploration.value.initialBeliefs && !currentExploration.value.claims.length) {
    analyzeClaims()
  }
})

const analyzeClaims = async () => {
  analyzing.value = true
  try {
    // TODO: Implement AI analysis of beliefs to extract claims
    await new Promise(resolve => setTimeout(resolve, 2000)) // Simulated delay
    
    // Sample claims for now
    addClaimToExploration({
      text: "This is a sample extracted claim",
      type: "fact"
    })
  } finally {
    analyzing.value = false
  }
}

const addClaim = () => {
  if (newClaimText.value.trim()) {
    addClaimToExploration({
      text: newClaimText.value,
      type: newClaimType.value
    })
    newClaimText.value = ''
    showAddClaimModal.value = false
  }
}

const removeClaim = (id: string) => {
  removeClaimFromExploration(id)
}

const proceedToValidation = () => {
  router.push('/explore/validation')
}
</script> 