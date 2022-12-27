<template>
  <div class="flex flex-col w-full">
    <div class="flex flex-row">
      <div class="w-36">Type</div>
      <div class="flex-grow">ID</div>
      <div class="w-48">Name</div>
      <div class="w-36">Default</div>
      <div class="w-36">Required</div>
      <div class="w-48">Action</div>
    </div>
    <draggable
      :modelValue="modelValue"
      @update:modelValue="emit('update:modelValue', $event)"
      item-key="id"
      handle=".handle"
    >
      <template #item="{ element }">
        <ConfigElement
          @update-type="emit('updateType', $event)"
          @update-id="emit('updateId', $event)"
          @update-name="emit('updateName', $event)"
          @update-default="emit('updateDefault', $event)"
          @update-required="emit('updateRequired', $event)"
          @delete-event="emit('deleteEvent', $event)"
          :element="element"
        />
      </template>
    </draggable>
  </div>
</template>

<script setup lang="ts">
import draggable from 'vuedraggable'
import { MainElement } from '~~/types/elements'

const { modelValue } = defineProps<{
  modelValue: MainElement[]
}>()

const emit = defineEmits([
  'updateId',
  'updateName',
  'updateDefault',
  'updateType',
  'updateRequired',
  'deleteEvent',
  'update:modelValue',
])
</script>
