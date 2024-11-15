<template>
  <div class="max-w-3xl mx-auto space-y-8">
    <header class="space-y-2">
      <h1 class="text-3xl font-bold text-gray-900">Initial Thoughts</h1>
      <p class="text-xl text-gray-600">
        Topic: {{ currentExploration?.topic }}
      </p>
    </header>

    <BeliefCapture
      :topic="currentExploration?.topic || ''"
      v-model="beliefs"
      @submit="saveAndContinue"
    />
  </div>
</template>

<script setup lang="ts">
const router = useRouter()
const { currentExploration, updateBeliefs } = useExploration()
const beliefs = ref('')

// Redirect if no current exploration
onMounted(() => {
  if (!currentExploration.value) {
    router.push('/explore/topic')
  } else {
    beliefs.value = currentExploration.value.initialBeliefs
  }
})

const saveAndContinue = () => {
  updateBeliefs(beliefs.value)
  router.push('/explore/claims')
}
</script> 