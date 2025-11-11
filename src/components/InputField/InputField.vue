<template>
  <div class="flex flex-col gap-2 items-start w-full">
    <label
      v-if="showLabel"
      class="font-medium leading-[1.5] text-base text-[#3e4b5b] tracking-[0.65px]"
    >
      {{ label }}
    </label>
    
    <div
      v-if="state === 'Error'"
      class="flex flex-col gap-1 items-start w-full"
    >
      <div
        :class="[
          'flex gap-4 w-full border rounded-xl',
          largeField ? 'h-[112px] items-start px-4 py-3' : 'h-11 items-center px-4 py-3',
          stateClasses.field
        ]"
      >
        <div v-if="!largeField" class="flex flex-1 gap-4 items-center min-w-0">
          <div v-if="iconLeft" class="shrink-0 w-6 h-6 flex items-center justify-center">
            <slot name="iconLeft">
              <!-- Icon placeholder - replace with actual icon component -->
              <svg class="w-6 h-6 text-[#0c1d32]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
              </svg>
            </slot>
          </div>
          <input
            :value="modelValue"
            @input="handleInput"
            type="text"
            :placeholder="placeholder"
            :disabled="state === 'Inactive'"
            class="flex-1 bg-transparent border-none outline-none text-base text-[#0c1d32] tracking-[0.65px] placeholder:text-[#9ca3af] disabled:cursor-not-allowed"
          />
        </div>
        <textarea
          v-else
          :value="modelValue"
          @input="handleInput"
          :placeholder="placeholder"
          :disabled="state === 'Inactive'"
          class="flex-1 bg-transparent border-none outline-none resize-none text-base text-[#0c1d32] tracking-[0.65px] placeholder:text-[#9ca3af] disabled:cursor-not-allowed"
        />
        <div v-if="!largeField" class="flex gap-4 items-center shrink-0">
          <span v-if="showSuffix" class="text-base text-[#0c1d32] tracking-[0.65px]">
            {{ suffixText }}
          </span>
          <div v-if="iconRight" class="shrink-0 w-6 h-6 flex items-center justify-center">
            <slot name="iconRight">
              <!-- Icon placeholder - replace with actual icon component -->
              <svg class="w-6 h-6 text-[#0c1d32]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
              </svg>
            </slot>
          </div>
        </div>
      </div>
      <p v-if="errorMessage" class="text-xs text-[#e42648] tracking-[0.65px]">
        {{ errorMessage }}
      </p>
    </div>
    
    <div
      v-else
      :class="[
        'flex gap-4 w-full border rounded-xl',
        largeField ? 'h-[112px] items-start px-4 py-3' : 'h-11 items-center px-4 py-3',
        stateClasses.field,
        state === 'Inactive' ? 'opacity-40' : ''
      ]"
    >
      <div v-if="!largeField" class="flex flex-1 gap-4 items-center min-w-0">
        <div v-if="iconLeft" class="shrink-0 w-6 h-6 flex items-center justify-center">
          <slot name="iconLeft">
            <!-- Icon placeholder - replace with actual icon component -->
            <svg class="w-6 h-6 text-[#0c1d32]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
            </svg>
          </slot>
        </div>
        <input
          :value="modelValue"
          @input="handleInput"
          type="text"
          :placeholder="placeholder"
          :disabled="state === 'Inactive'"
          class="flex-1 bg-transparent border-none outline-none text-base text-[#0c1d32] tracking-[0.65px] placeholder:text-[#9ca3af] disabled:cursor-not-allowed"
        />
      </div>
      <textarea
        v-else
        :value="modelValue"
        @input="handleInput"
        :placeholder="placeholder"
        :disabled="state === 'Inactive'"
        class="flex-1 bg-transparent border-none outline-none resize-none text-base text-[#0c1d32] tracking-[0.65px] placeholder:text-[#9ca3af] disabled:cursor-not-allowed"
      />
      <div v-if="!largeField" class="flex gap-4 items-center shrink-0">
        <span v-if="showSuffix" class="text-base text-[#0c1d32] tracking-[0.65px]">
          {{ suffixText }}
        </span>
        <div v-if="iconRight" class="shrink-0 w-6 h-6 flex items-center justify-center">
          <slot name="iconRight">
            <!-- Icon placeholder - replace with actual icon component -->
            <svg class="w-6 h-6 text-[#0c1d32]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
            </svg>
          </slot>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  modelValue: {
    type: String,
    default: ''
  },
  label: {
    type: String,
    default: 'User name'
  },
  placeholder: {
    type: String,
    default: ''
  },
  showLabel: {
    type: Boolean,
    default: true
  },
  iconLeft: {
    type: Boolean,
    default: true
  },
  suffixText: {
    type: String,
    default: 'Suffix'
  },
  showSuffix: {
    type: Boolean,
    default: true
  },
  iconRight: {
    type: Boolean,
    default: true
  },
  state: {
    type: String,
    default: 'Default',
    validator: (value) => ['Active', 'Default', 'Inactive', 'Hover', 'Error'].includes(value)
  },
  largeField: {
    type: Boolean,
    default: false
  },
  errorMessage: {
    type: String,
    default: ''
  }
})

const emit = defineEmits(['update:modelValue'])

const handleInput = (event) => {
  emit('update:modelValue', event.target.value)
}

const stateClasses = computed(() => {
  const classes = {
    Default: {
      field: 'bg-white border-[#c9d0d9]'
    },
    Hover: {
      field: 'bg-[#f6ffeb] border-[#c9d0d9]'
    },
    Active: {
      field: 'bg-white border-[#0c1d32]'
    },
    Error: {
      field: 'bg-white border-[#e42648]'
    },
    Inactive: {
      field: 'bg-white border-[#c9d0d9]'
    }
  }
  
  return classes[props.state] || classes.Default
})
</script>

