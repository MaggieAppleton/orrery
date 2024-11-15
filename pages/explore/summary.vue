<template>
  <div class="max-w-3xl mx-auto space-y-8">
    <header class="space-y-2">
      <h1 class="text-3xl font-bold text-gray-900">Exploration Summary</h1>
      <p class="text-xl text-gray-600">
        Topic: {{ currentExploration?.topic }}
      </p>
    </header>

    <div class="space-y-8">
      <!-- Initial Beliefs -->
      <section class="space-y-4">
        <h2 class="text-2xl font-semibold text-gray-900">Initial Beliefs</h2>
        <div class="p-6 bg-white rounded-lg border border-gray-200">
          <p class="whitespace-pre-wrap text-gray-700">{{ currentExploration?.initialBeliefs }}</p>
        </div>
      </section>

      <!-- Validated Claims -->
      <section class="space-y-4">
        <h2 class="text-2xl font-semibold text-gray-900">Validated Claims</h2>
        <div class="space-y-4">
          <div 
            v-for="claim in validClaims" 
            :key="claim.id"
            class="p-6 bg-white rounded-lg border border-gray-200"
          >
            <div class="space-y-3">
              <div class="flex items-start justify-between">
                <div class="space-y-2">
                  <p class="text-gray-900">{{ claim.text }}</p>
                  <span 
                    class="inline-block px-2 py-1 text-sm rounded-full"
                    :class="claim.type === 'fact' ? 'bg-blue-100 text-blue-800' : 'bg-purple-100 text-purple-800'"
                  >
                    {{ claim.type }}
                  </span>
                </div>
              </div>

              <div v-if="claim.evidence?.length" class="mt-4 space-y-2">
                <h4 class="font-medium text-gray-700">Supporting Evidence:</h4>
                <ul class="list-disc list-inside space-y-1">
                  <li 
                    v-for="(evidence, index) in claim.evidence" 
                    :key="index"
                    class="text-gray-600"
                  >
                    {{ evidence }}
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Invalid Claims -->
      <section v-if="invalidClaims.length" class="space-y-4">
        <h2 class="text-2xl font-semibold text-gray-900">Rejected Claims</h2>
        <div class="space-y-4">
          <div 
            v-for="claim in invalidClaims" 
            :key="claim.id"
            class="p-6 bg-red-50 rounded-lg border border-red-100"
          >
            <p class="text-gray-900">{{ claim.text }}</p>
          </div>
        </div>
      </section>

      <!-- Implications -->
      <section class="space-y-4">
        <h2 class="text-2xl font-semibold text-gray-900">Implications</h2>
        <div class="space-y-4">
          <div 
            v-for="(implication, index) in currentExploration?.implications" 
            :key="index"
            class="p-6 bg-white rounded-lg border border-gray-200"
          >
            <p class="text-gray-900">{{ implication }}</p>
          </div>
        </div>
      </section>
    </div>

    <div class="flex justify-between pt-8">
      <NuxtLink
        to="/explore/implications"
        class="px-4 py-2 text-gray-600 bg-white border border-gray-300 rounded-lg hover:bg-gray-50"
      >
        Back
      </NuxtLink>

      <NuxtLink
        to="/"
        class="px-4 py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700"
      >
        Return to Dashboard
      </NuxtLink>
    </div>
  </div>
</template>

<script setup lang="ts">
const router = useRouter()
const { currentExploration } = useExploration()

// Redirect if no current exploration
onMounted(() => {
  if (!currentExploration.value || !currentExploration.value.implications.length) {
    router.push('/explore/implications')
  }
})

const validClaims = computed(() => 
  currentExploration.value?.claims.filter(claim => claim.isValid) || []
)

const invalidClaims = computed(() => 
  currentExploration.value?.claims.filter(claim => claim.isValid === false) || []
)
</script> 