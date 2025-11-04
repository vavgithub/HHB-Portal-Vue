<template>
  <div style="overflowX: auto" class="scrollbar-hide">
    <table :style="{ width: '100%', minWidth: minWidth }">
      <thead class="rounded-xl overflow-hidden">
        <tr>
          <th
            v-for="(headerObj, index) in th"
            :key="index"
            :class="[
              'bg-background-secondary',
              index === 0 ? 'rounded-l-xl' : index === th.length - 1 ? 'rounded-r-xl' : ''
            ]"
            :style="getHeaderStyle(headerObj)"
          >
            <div
              :class="[
                'py-6 px-4 font-medium text-sm max-h-14 w-full text-left flex items-center'
              ]"
              :style="getAlignStyle(headerObj)"
            >
              {{ getHeaderText(headerObj) }}
            </div>
          </th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="(row, rowIndex) in rowData"
          :key="rowIndex"
          class="hover:bg-accent-50"
        >
          <td
            v-for="(headerObj, colIndex) in th"
            :key="colIndex"
            :class="[
              'px-4 py-5 align-top',
              colIndex === 0 ? 'rounded-l-xl' : colIndex === th.length - 1 ? 'rounded-r-xl' : ''
            ]"
            :style="getCellStyle(headerObj)"
          >
            <div class="whitespace-nowrap text-ellipsis overflow-hidden">
              <CellRenderer :value="row[getHeaderText(headerObj)]" />
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
import { computed, h } from 'vue'

const CellRenderer = {
  props: {
    value: {
      default: null
    }
  },
  setup(props) {
    if (!props.value) return () => ''
    
    // Check if it's a VNode (has type, props, or is a function)
    if (typeof props.value === 'object' && ('type' in props.value || 'component' in props.value)) {
      return () => props.value
    }
    
    // If it's a function (render function)
    if (typeof props.value === 'function') {
      return props.value
    }
    
    // Otherwise render as text
    return () => props.value || ''
  }
}

const props = defineProps({
  th: {
    type: Array,
    default: () => []
  },
  rowData: {
    type: Array,
    default: () => []
  },
  variant: {
    type: String,
    default: 'primary'
  },
  minWidth: {
    type: String,
    default: '1024px'
  }
})

const getHeaderText = (headerObj) => {
  return typeof headerObj === 'string' ? headerObj : headerObj.header
}

const getHeaderStyle = (headerObj) => {
  const width = typeof headerObj === 'object' ? headerObj.width : null
  return width ? { width, maxWidth: width } : {}
}

const getAlignStyle = (headerObj) => {
  const align = typeof headerObj === 'object' ? headerObj.align : null
  return align ? { justifyContent: align, textAlign: align } : {}
}

const getCellStyle = (headerObj) => {
  const width = typeof headerObj === 'object' ? headerObj.width : null
  const align = typeof headerObj === 'object' ? headerObj.align : null
  const style = width ? { width, maxWidth: width } : {}
  if (align) {
    style.textAlign = align
  }
  return style
}
</script>

