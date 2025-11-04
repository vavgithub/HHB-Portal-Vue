<template>
  <div class="w-full h-full" :style="{ minHeight: '150px' }">
    <v-chart
      :option="option"
      :autoresize="true"
      :style="{ height: '100%', width: '100%' }"
    />
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { use } from 'echarts/core'
import { CanvasRenderer } from 'echarts/renderers'
import { PieChart } from 'echarts/charts'
import {
  TooltipComponent,
  LegendComponent
} from 'echarts/components'
import VChart from 'vue-echarts'

use([
  CanvasRenderer,
  PieChart,
  TooltipComponent,
  LegendComponent
])

const props = defineProps({
  title: {
    type: String,
    default: 'Title'
  },
  data: {
    type: Array,
    default: () => []
  },
  valuePrefix: {
    type: String,
    default: ''
  }
})

const root = computed(() => getComputedStyle(document.documentElement))

const processData = (dataArray) => {
  if (!dataArray || dataArray.length === 0) {
    return [
      {
        value: 0,
        name: 'No Name',
      },
      {
        value: 0,
        name: 'No Name 1',
      },
      {
        value: 0,
        name: 'No Name 2',
      },
    ]
  }

  return dataArray.map(item => ({
    value: item.value || 0,
    name: item.name || 'No Name',
    itemStyle: item.color ? { color: item.color } : undefined
  }))
}

const processedData = computed(() => processData(props.data))

const option = computed(() => ({
  tooltip: {
    trigger: 'item',
    borderWidth: 0,
    borderRadius: 4,
    formatter: (params) => {
      return `<div>
          <p class="text-text-secondary text-sm text-center">${params.name}</p>
          <p class="text-text-primary text-lg font-medium text-center">${props.valuePrefix}${params.value}</p>
      </div>`
    },
  },
  legend: {
    orient: 'vertical',
    right: '5%',
    top: 'center',
    itemWidth: 8,
    itemHeight: 8,
    borderWidth: 0,
    textStyle: {
      fontSize: 12,
      color: root.value.getPropertyValue('--color-text-secondary').trim(),
      width: 90,
      overflow: 'truncate',
    },
  },
  series: [
    {
      name: props.title,
      type: 'pie',
      radius: ['35%', '75%'],
      center: ['25%', '50%'],
      avoidLabelOverlap: false,
      itemStyle: {
        borderRadius: 6,
        borderColor: '#fff',
        borderWidth: 1,
      },
      label: {
        show: false,
        position: 'center',
      },
      emphasis: {
        label: {
          show: false,
        },
      },
      labelLine: {
        show: false,
      },
      data: processedData.value,
    },
  ],
}))
</script>

