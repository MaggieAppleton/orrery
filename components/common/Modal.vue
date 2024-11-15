<template>
  <div class="fixed inset-0 z-50 overflow-y-auto">
    <div 
      class="fixed inset-0 bg-black bg-opacity-25"
      @click="$emit('close')"
    />
    <div class="flex min-h-full items-center justify-center p-4">
      <div class="relative bg-white p-6 rounded-lg shadow-xl max-w-lg w-full">
        <slot />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
defineEmits<{
  (e: 'close'): void
}>()
</script> 