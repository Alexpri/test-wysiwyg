<template>
  <div>
    <h1 class="text-center">Edit form</h1>
    <section class="header-section">
      <div>
        <button
          class="px-4 py-2 font-semibold text-sm bg-cyan-500 text-white rounded-full shadow-sm"
          @click="addElementButtonHandler"
        >
          Add element
        </button>
      </div>
    </section>
    <section class="configuration-section">
      <ConfigTable
        :filled-items="filledItems.items"
        @update-type="changeTypeHandler"
        @update-id="changeIdHandler"
        @update-name="changeNameHandler"
        @update-default="changeDefaultHandler"
        @update-required="changeRequiredHandler"
        @delete-event="deleteEventHanlder"
        @change-order="changeOrderHandler"
      />
    </section>
    <textarea class="w-96 h-40" readonly>
      {{ encodedData }}
    </textarea>
    <button type="button" @click="copyToClipboard">Copy</button>
  </div>
</template>
<script setup lang="ts">
import { reactive, ref, computed } from 'vue'
import { v4 as uuidv4 } from 'uuid'
import type { Ref } from 'vue'
import {
  MainElement,
  UpdateIdEvent,
  ELEMENT_NUMBER_TYPES,
  UpdateInputEvent,
  UpdateTypeEvent,
  UpdateRequiredEvent,
  FilledItemsObject,
  movedObjectInterface,
} from '~~/types/elements'

let filledItems: FilledItemsObject = reactive({ items: [] })
const orderNumber: Ref<number> = ref(0)

const encodedData = computed(() => {
  return window.btoa(JSON.stringify(filledItems.items))
})

function addElementButtonHandler(): void {
  filledItems.items.push(createInputText())
}

function createInputText(): MainElement {
  return createMainElement(ELEMENT_NUMBER_TYPES.INPUT_TEXT)
}

function createMainElement(typeId: ELEMENT_NUMBER_TYPES): MainElement {
  const order_number = generateCurrentOrder()
  return {
    typeId,
    id: uuidv4(),
    fieldId: `parameter_${order_number}`,
    name: '',
    default: '',
    required: false,
  }
}

function generateCurrentOrder(): number {
  const currentValue = orderNumber.value
  orderNumber.value += 1
  return currentValue
}

function changeTypeHandler(event: UpdateTypeEvent): void {
  const foundElem = filledItems.items.find((item) => item.id === event.id)
  if (foundElem) {
    foundElem.typeId = event.value
  }
}

function changeIdHandler(event: UpdateIdEvent): void {
  const foundElem = filledItems.items.find((item) => item.id === event.id)
  if (foundElem) {
    foundElem.fieldId = event.value
  }
}

function changeNameHandler(event: UpdateInputEvent): void {
  const foundElem = filledItems.items.find((item) => item.id === event.id)
  if (foundElem) {
    foundElem.name = event.value
  }
}

function changeDefaultHandler(event: UpdateInputEvent): void {
  const foundElem = filledItems.items.find((item) => item.id === event.id)
  if (foundElem) {
    foundElem.default = event.value
  }
}

function changeRequiredHandler(event: UpdateRequiredEvent): void {
  const foundElem = filledItems.items.find((item) => item.id === event.id)
  if (foundElem) {
    foundElem.required = event.value
  }
}

function deleteEventHanlder(id: string) {
  filledItems.items = filledItems.items.filter((item) => {
    return item.id !== id
  })
}

function changeOrderHandler(event: movedObjectInterface) {
  filledItems.items.splice(event.newIndex, 0, filledItems.items.splice(event.oldIndex, 1)[0]);
}

function copyToClipboard() {
  navigator.clipboard.writeText(encodedData.value)
}
</script>
