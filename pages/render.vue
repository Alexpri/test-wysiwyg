<template>
  <div>
    <h1 class="text-center">Render form</h1>
    <input
      type="text"
      v-model="pastedValue"
      class="w-full border border-slate-200 placeholder-slate-400"
    />
    <div v-if="filledItems.length">
      <template v-for="item in filledItems" :key="item.id">
        <h2
          v-if="item.typeId === ELEMENT_NUMBER_TYPES.DIVIDER"
          class="border-b border-black"
        >
          {{ item.fieldId }}
        </h2>
        <label
          v-if="item.typeId === ELEMENT_NUMBER_TYPES.INPUT_NUMBER"
          :for="item.fieldId"
        >
          {{ item.name }}
          <input
            type="number"
            :name="item.fieldId"
            :required="item.required"
            :value="item.default"
            class="w-full border border-slate-200 placeholder-slate-400"
          />
        </label>

        <label
          v-if="item.typeId === ELEMENT_NUMBER_TYPES.INPUT_TEXT"
          :for="item.fieldId"
        >
          {{ item.name }}
          <input
            type="text"
            :name="item.fieldId"
            :required="item.required"
            :value="item.default"
            class="w-full border border-slate-200 placeholder-slate-400"
          />
        </label>

        <label
          v-if="item.typeId === ELEMENT_NUMBER_TYPES.INPUT_CHECKBOX"
          :for="item.fieldId"
        >
          {{ item.name }}
          <input
            type="checkbox"
            :name="item.fieldId"
            :required="item.required"
            :checked="(item.default as boolean)"
            class="w-full border border-slate-200 placeholder-slate-400"
          />
        </label>
      </template>
    </div>
  </div>
</template>
<script setup lang="ts">
import { ELEMENT_NUMBER_TYPES, MainElement } from '~~/types/elements'

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
