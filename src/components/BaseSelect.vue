<script setup>
import { computed } from 'vue'
import BaseButton from './BaseButton.vue'
import BaseIcon from './BaseIcon.vue'
import {
  validateSelectOptions,
  isUndefinedOrNull,
  isSelectValueValid,
} from '../validators'
import { normalizeSelectValue } from '../functions'
import { BUTTON_TYPE_NEUTRAL } from '../constants'
import { ICON_XMARK } from '../icons'
const props = defineProps({
  selected: [String, Number],
  options: {
    type: Array,
    validator: validateSelectOptions,
  },
  placeholder: {
    type: String,
    required: true,
  },
})
const emit = defineEmits({
  select: isSelectValueValid,
})
const select = (value) => {
  emit('select', normalizeSelectValue(value))
}
const isNotSelected = computed(() => isUndefinedOrNull(props.selected))
</script>
<template>
  <div class="flex gap-2">
    <BaseButton @click="select(null)" :type="BUTTON_TYPE_NEUTRAL">
      <BaseIcon :name="ICON_XMARK" class="h-8" />
    </BaseButton>
    <select
      class="w-full truncate rounded bg-gray-100 px-2 py-1 text-2xl"
      @change="select($event.target.value)"
    >
      <option :selected="isNotSelected" disabled value="">
        {{ placeholder }}
      </option>
      <option
        v-for="{ value, label } in options"
        :key="value"
        :value="value"
        :selected="value === selected"
      >
        {{ label }}
      </option>
    </select>
  </div>
</template>
