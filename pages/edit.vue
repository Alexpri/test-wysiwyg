<template>
  <div>
    <section class="header-section">
      <div>
        <select
          v-model="selectedItemId"
          name="element select"
          id="add-new-element-select"
        >
          <option
            v-for="option of selectData"
            :key="option.id"
            :value="option.id"
          >
            {{ option.title }}
          </option>
        </select>
        <button @click="addElementButtonHandler">Add element</button>
      </div>
    </section>
    <section class="configuration-section">
      <ConfigTable :filled-items="filledItems" />
    </section>
  </div>
</template>
<script setup lang="ts">
import { reactive, ref } from 'vue'
import { v4 as uuidv4 } from 'uuid'
import type { Ref } from 'vue'

enum ELEMENT_TYPES {
  DIVIDER = 'Divider',
  INPUT_NUMBER = 'Number',
  INPUT_TEXT = 'Input',
  INPUT_CHECKBOX = 'Checkbox',
}

enum ELEMENT_NUMBER_TYPES {
  DIVIDER = 1,
  INPUT_NUMBER = 2,
  INPUT_TEXT = 3,
  INPUT_CHECKBOX = 4,
}

const selectedItemId: Ref<number | undefined> = ref(undefined)
const filledItems: Array<
  DividerItem | InputNumberItem | InputTextItem | InputCheckboxItem
> = reactive([])
const orderNumber: Ref<number> = ref(0)

const selectData: OptionData[] = [
  { title: '', id: undefined },
  { title: 'Divider', id: 1 },
  { title: 'Number', id: 2 },
  { title: 'Input', id: 3 },
  { title: 'Checkbox', id: 4 },
]
function addElementButtonHandler(): void {
  let newElement:
    | DividerItem
    | InputNumberItem
    | InputTextItem
    | InputCheckboxItem
    | null = null
  console.log(selectedItemId)
  if (selectedItemId.value) {
    switch (selectedItemId.value) {
      case ELEMENT_NUMBER_TYPES.DIVIDER:
        newElement = createDivider()
        break
      case ELEMENT_NUMBER_TYPES.INPUT_NUMBER:
        newElement = createInputNumber()
        break
      case ELEMENT_NUMBER_TYPES.INPUT_TEXT:
        newElement = createInputText()
        break
      case ELEMENT_NUMBER_TYPES.INPUT_CHECKBOX:
        newElement = createInputCheckbox()
        break
      default:
        break
    }

    if (newElement) {
      filledItems.push(newElement)
      selectedItemId.value = undefined
    }
  }
}
function createDivider(): DividerItem {
  return {
    type: ELEMENT_TYPES.DIVIDER,
    ...createMainElement(),
  }
}
function createInputNumber(): InputNumberItem {
  return {
    type: ELEMENT_TYPES.INPUT_NUMBER,
    ...createMainElement(),
  }
}
function createInputText(): InputTextItem {
  return {
    type: ELEMENT_TYPES.INPUT_TEXT,
    ...createMainElement(),
  }
}
function createInputCheckbox(): InputCheckboxItem {
  return {
    type: ELEMENT_TYPES.INPUT_CHECKBOX,
    ...createMainElement(),
  }
}
function createMainElement(): MainElement {
  return {
    id: uuidv4(),
    order: generateCurrentOrder(),
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
</script>
