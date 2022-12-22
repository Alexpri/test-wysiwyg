<template>
  <div>
    {{ filledItems }}
  </div>
</template>

<script setup lang="ts">
defineProps({
  filledItems: Array<
    DividerItem | InputNumberItem | InputTextItem | InputCheckboxItem
  >,
})
</script>
