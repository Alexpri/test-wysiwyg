<template>
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
<script setup lang="ts">
import { ELEMENT_NUMBER_TYPES, MainElement } from '~~/types/elements'

const { item } = defineProps<{
  item: MainElement
}>()
</script>
