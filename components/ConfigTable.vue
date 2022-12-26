<template>
  <div class="flex flex-col w-full">
    {{ filledItems }}
    <div class="flex flex-row">
      <div class="w-36">Type</div>
      <div class="flex-grow">ID</div>
      <div class="w-48">Name</div>
      <div class="w-36">Default</div>
      <div class="w-36">Required</div>
      <div class="w-48">Action</div>
    </div>

    <div v-for="item in filledItems" :key="item.id" class="flex flex-row">
      <div class="w-36">
        <select
          :value="item.typeId"
          @change="eventTypeHandler($event, item.id)"
          name="element select"
          id="add-new-element-select"
          class="border rounded-sm border-gray-300 mr-2"
        >
          <option
            v-for="option of selectData"
            :key="option.id"
            :value="option.id"
          >
            {{ option.title }}
          </option>
        </select>
        <input
          class="w-full border border-slate-200 placeholder-slate-400"
          type="text"
        />
      </div>
      <div class="flex-grow">
        <input
          class="w-full border border-slate-200 placeholder-slate-400"
          :value="item.fieldId"
          @input="eventIdHandler($event, item.id)"
          type="text"
        />
      </div>
      <template v-if="item.typeId !== ELEMENT_NUMBER_TYPES.DIVIDER">
        <div class="w-48">
          <input
            class="w-full border border-slate-200 placeholder-slate-400"
            :value="item.name"
            @input="eventNameHandler($event, item.id)"
            type="text"
          />
        </div>
        <div class="w-36">
          <input
            v-if="item.typeId == ELEMENT_NUMBER_TYPES.INPUT_NUMBER"
            @input="eventDefaultHandler($event, item.id, item.typeId)"
            type="number"
            class="w-full border border-slate-200 placeholder-slate-400"
          />
          <input
            v-else-if="item.typeId == ELEMENT_NUMBER_TYPES.INPUT_CHECKBOX"
            @input="eventDefaultHandler($event, item.id, item.typeId)"
            type="checkbox"
            class="w-full border border-slate-200 placeholder-slate-400"
          />
          <input
            v-else
            class="w-full border border-slate-200 placeholder-slate-400"
            :value="item.default"
            @input="eventDefaultHandler($event, item.id, item.typeId)"
            type="text"
          />
        </div>
        <div class="w-36">
          <input
            type="checkbox"
            :value="item.name"
            @input="eventRequiredHandler($event, item.id)"
          />
        </div>
      </template>

      <div class="w-48">
        <button class="p-1 border border-gray-500 rounded-md mr-2">Drag</button>
        <button
          @click="deleteHandler(item.id)"
          class="p-1 border border-red-400 rounded-md"
        >
          Delete
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import {
  OptionData,
  ELEMENT_TYPES,
  ELEMENT_NUMBER_TYPES,
  MainElement,
} from '~~/types/elements'

defineProps({
  filledItems: Array<MainElement>,
})
const emit = defineEmits([
  'updateId',
  'updateName',
  'updateDefault',
  'updateType',
  'updateRequired',
  'deleteEvent',
])

const selectData: OptionData[] = [
  { title: ELEMENT_TYPES.DIVIDER, id: ELEMENT_NUMBER_TYPES.DIVIDER },
  { title: ELEMENT_TYPES.INPUT_NUMBER, id: ELEMENT_NUMBER_TYPES.INPUT_NUMBER },
  { title: ELEMENT_TYPES.INPUT_TEXT, id: ELEMENT_NUMBER_TYPES.INPUT_TEXT },
  {
    title: ELEMENT_TYPES.INPUT_CHECKBOX,
    id: ELEMENT_NUMBER_TYPES.INPUT_CHECKBOX,
  },
]

function eventIdHandler(event: Event, id: string) {
  emit('updateId', { value: (event.target as HTMLInputElement).value, id })
}
function eventNameHandler(event: Event, id: string) {
  emit('updateName', { value: (event.target as HTMLInputElement).value, id })
}

function eventDefaultHandler(
  event: Event,
  id: string,
  type: ELEMENT_NUMBER_TYPES
) {
  if (type === ELEMENT_NUMBER_TYPES.INPUT_CHECKBOX) {
    emit('updateDefault', {
      value: (event.target as HTMLInputElement).checked,
      id,
      type,
    })
  } else {
    emit('updateDefault', {
      value: (event.target as HTMLInputElement).value,
      id,
      type,
    })
  }
}

function eventTypeHandler(event: Event, id: string) {
  emit('updateType', {
    value: Number((event.target as HTMLSelectElement).value),
    id,
  })
}
function eventRequiredHandler(event: Event, id: string) {
  emit('updateRequired', {
    value: (event.target as HTMLInputElement).checked,
    id,
  })
}

function deleteHandler(id: string) {
  emit('deleteEvent', id)
}
</script>
