<template>
  <div class="max-w-3xl mx-auto space-y-8">
    <header class="space-y-2">
      <h1 class="text-3xl font-bold text-gray-900">Explore Implications</h1>
      <p class="text-xl text-gray-600">
        Topic: {{ currentExploration?.topic }}
      </p>
    </header>

    <p class="text-gray-600">
      Based on your validated claims and evidence, what implications or conclusions can you draw? 
      Consider both immediate consequences and broader possibilities that emerge from your understanding.
    </p>

    <ImplicationsExplorer
      :claims="currentExploration?.claims || []"
      :implications="currentExploration?.implications || []"
      @add-implication="addImplication"
      @remove-implication="removeImplication"
      @submit="completeExploration"
    />
  </div>
</template>

<script setup lang="ts">
const router = useRouter()
const { currentExploration, addImplication: addImplicationToStore, removeImplication: removeImplicationFromStore } = useExploration()

// Redirect if no current exploration or no validated claims with evidence
onMounted(() => {
  if (!currentExploration.value || !currentExploration.value.claims.some(c => c.isValid && c.evidence?.length)) {
    router.push('/explore/evidence')
  }
})

const addImplication = (implication: string) => {
  addImplicationToStore(implication)
}

const removeImplication = (index: number) => {
  removeImplicationFromStore(index)
}

const completeExploration = () => {
  router.push('/explore/summary')
}
</script> 