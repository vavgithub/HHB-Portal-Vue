<template>
  <div class="w-full h-full flex flex-col justify-center items-center" :style="{ minHeight: '160px' }">
    <div class="flex-1 w-full">
      <v-chart
        :option="option"
        :autoresize="true"
        :style="{ width: '100%', height: '100%' }"
      />
    </div>
    <div class="flex items-center justify-between w-full mt-2">
      <p class="text-text-secondary text-sm">{{ guageTitle || 'Title' }}</p>
      <p class="text-text-primary text-lg font-medium">${{ max.toFixed(0) }}</p>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { use } from 'echarts/core'
import { CanvasRenderer } from 'echarts/renderers'
import { GaugeChart } from 'echarts/charts'
import { TooltipComponent } from 'echarts/components'
import VChart from 'vue-echarts'

use([
  CanvasRenderer,
  GaugeChart,
  TooltipComponent
])

const props = defineProps({
  value: {
    type: Number,
    default: 100
  },
  min: {
    type: Number,
    default: 0
  },
  max: {
    type: Number,
    default: 240
  },
  guageTitle: {
    type: String,
    default: null
  }
})

const root = computed(() => getComputedStyle(document.documentElement))

const option = computed(() => ({
  tooltip: {
    show: true,
    trigger: 'item',
    borderWidth: 0,
    backgroundColor: root.value.getPropertyValue('--color-background-secondary').trim(),
    borderRadius: 4,
    padding: 10,
    shadowColor: 'rgba(0,0,0,0.15)',
    textStyle: {
      color: root.value.getPropertyValue('--color-text-primary').trim(),
      fontFamily: root.value.getPropertyValue('--typography-font-family-satoshi').trim(),
    },
    formatter: (params) => {
      const percent = ((params.value / props.max) * 100).toFixed(1)
      return `
        <div style="text-align: center;">
          You have used <br/><strong class="text-text-primary text-lg font-semibold">${percent}%</strong>
        </div>
      `
    },
  },
  series: [
    {
      type: 'gauge',
      startAngle: 180,
      endAngle: 0,
      min: props.min,
      max: props.max,
      radius: '150%',
      center: ['50%', '80%'],
      splitNumber: 12,
      itemStyle: {
        color: root.value.getPropertyValue('--color-primary-900').trim(),
      },
      progress: {
        show: true,
        roundCap: true,
        width: 20,
      },
      pointer: {
        width: 0,
      },
      axisLine: {
        roundCap: true,
        lineStyle: {
          width: 18,
        },
      },
      axisTick: { show: false },
      splitLine: { show: false },
      axisLabel: { show: false },
      title: { show: false },
      detail: {
        borderWidth: 0,
        width: '60%',
        fontFamily: root.value.getPropertyValue('--typography-font-family-satoshi').trim(),
        lineHeight: 40,
        height: 40,
        borderRadius: 8,
        offsetCenter: [0, 0],
        color: root.value.getPropertyValue('--color-text-primary').trim(),
        fontSize: 24,
        fontWeight: '500',
        letterSpacing: '2px',
        valueAnimation: true,
        formatter: (value) => `$${value.toFixed(2)}`,
      },
      data: [{ value: props.value }],
    },
  ],
}))
</script>

