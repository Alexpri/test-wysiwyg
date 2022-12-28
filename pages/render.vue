<template>
  <div>
    <h1 class="text-center">Render form</h1>
    <input
      type="text"
      v-model="pastedValue"
      class="w-full border border-slate-200 placeholder-slate-400"
    />
    <div v-if="filledItems.length">
      <RenderElement v-for="item in filledItems" :item="item" :key="item.id" />
    </div>
  </div>
</template>
<script setup lang="ts">
import { MainElement } from '~~/types/elements'

const pastedValue = ref('')
const filledItems = computed(() => {
  let returnValue: Array<MainElement> = []
  if (pastedValue.value !== '') {
    try {
      returnValue = JSON.parse(window.atob(pastedValue.value))
    } catch (e) {
      console.error(e)
    }
  }

  return returnValue
})
</script>
