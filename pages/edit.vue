<template>
  <div>
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
        :filled-items="filledItems"
        @update-type="changeTypeHandler"
        @update-id="changeIdHandler"
        @update-name="changeNameHandler"
        @update-default="changeDefaultHandler"
        @update-required="changeRequiredHandler"
      />
    </section>
  </div>
</template>
<script setup lang="ts">
import { reactive, ref } from 'vue'
import { v4 as uuidv4 } from 'uuid'
import type { Ref } from 'vue'
import {
  MainElement,
  UpdateIdEvent,
  ELEMENT_NUMBER_TYPES,
  ELEMENT_TYPES,
  UpdateInputEvent,
  UpdateTypeEvent,
  UpdateRequiredEvent,
} from '~~/types/elements'

const selectedItemId: Ref<number | undefined> = ref(undefined)
const filledItems: Array<MainElement> = reactive([])
const orderNumber: Ref<number> = ref(0)

function addElementButtonHandler(): void {
  filledItems.push(createInputText())
}

function createInputText(): MainElement {
  return createMainElement(
    ELEMENT_TYPES.INPUT_TEXT,
    ELEMENT_NUMBER_TYPES.INPUT_TEXT
  )
}

function createMainElement(
  type: ELEMENT_TYPES,
  typeId: ELEMENT_NUMBER_TYPES
): MainElement {
  const order_number = generateCurrentOrder()
  return {
    typeId,
    id: uuidv4(),
    fieldId: `parameter_${order_number}`,
    order: order_number,
    name: '',
    default: '',
    required: false,
  }
}
function deleteElement() {}

function generateCurrentOrder(): number {
  const currentValue = orderNumber.value
  orderNumber.value += 1
  return currentValue
}

function changeTypeHandler(event: UpdateTypeEvent): void {
  const foundElem = filledItems.find((item) => item.id === event.id)
  if (foundElem) {
    foundElem.typeId = event.value
  }
}

function changeIdHandler(event: UpdateIdEvent): void {
  const foundElem = filledItems.find((item) => item.id === event.id)
  if (foundElem) {
    foundElem.fieldId = event.value
  }
}

function changeNameHandler(event: UpdateInputEvent): void {
  const foundElem = filledItems.find((item) => item.id === event.id)
  if (foundElem) {
    foundElem.name = event.value
  }
}

function changeDefaultHandler(event: UpdateInputEvent): void {
  const foundElem = filledItems.find((item) => item.id === event.id)
  if (foundElem) {
    foundElem.default = event.value
  }
}

function changeRequiredHandler(event: UpdateRequiredEvent): void {
  const foundElem = filledItems.find((item) => item.id === event.id)
  if (foundElem) {
    foundElem.required = event.value
  }
}
</script>
