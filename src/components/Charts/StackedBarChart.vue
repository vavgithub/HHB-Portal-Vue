<template>
  <div
    ref="chartRef"
    :style="wrapperStyle"
    class="w-full scrollbar-hide"
    :class="{ 'aspect-[4/1]': !isSmall }"
  >
    <v-chart
      :option="option"
      :autoresize="true"
      :style="{ height: '100%', width: '100%', minWidth: minWidth }"
    />
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { use } from 'echarts/core'
import { CanvasRenderer } from 'echarts/renderers'
import { BarChart } from 'echarts/charts'
import {
  TooltipComponent,
  LegendComponent,
  GridComponent
} from 'echarts/components'
import VChart from 'vue-echarts'
import { useIsSmall } from '../../composables/useMediaQuery'

use([
  CanvasRenderer,
  BarChart,
  TooltipComponent,
  LegendComponent,
  GridComponent
])

const props = defineProps({
  noLegend: {
    type: Boolean,
    default: false
  },
  xAxisData: {
    type: Array,
    default: () => []
  },
  stackData: {
    type: Array,
    default: () => []
  },
  minWidth: {
    type: String,
    default: '600px'
  }
})

const chartRef = ref(null)
const isSmall = useIsSmall()

const root = computed(() => getComputedStyle(document.documentElement))

const wrapperStyle = computed(() => {
  if (isSmall.value) {
    return {
      overflowX: 'auto',
      overflowY: 'hidden',
      height: '100%',
      width: '100%',
      minHeight: '200px'
    }
  }
  return {
    height: '100%',
    width: '100%'
  }
})

const option = computed(() => ({
  tooltip: {
    trigger: 'axis',
    className: 'my-echarts-tooltip',
    axisPointer: { type: 'shadow' },
    renderMode: 'html',
    borderRadius: 8,
    padding: 10,
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    extraCssText: `
      box-shadow: 0 4px 20px rgba(0, 0, 0, 0.12);
      border: 1px solid rgba(0,0,0,0.05);
      border-radius: 8px;
    `,
    formatter: (params) => {
      return `
        <div class="custom-tooltip">
          ${
            params.map(param => (`
              <div style="display:flex; justify-content:space-between; gap:14px; align-items:center;">
                <p style="color:${root.value.getPropertyValue('--color-text-secondary').trim()}; text-small-p">${param.seriesName}</p>
                <p style="color:${root.value.getPropertyValue('--color-text-primary').trim()}; text-body">${props.stackData.filter(stack => stack.name === param.seriesName)[0]?.valuePrefix || ''}${param.value}</p>
              </div>
            `)).join('')
          }
        </div>
      `
    },
  },
  legend: { show: !props.noLegend },
  textStyle: {
    fontFamily: root.value.getPropertyValue('--typography-font-family-satoshi').trim(),
    color: root.value.getPropertyValue('--color-text-secondary').trim(),
    fontSize: 12,
  },
  xAxis: [
    {
      type: 'category',
      axisTick: { show: false },
      data: props.xAxisData,
      axisLabel: {
        formatter: (value) =>
          value.length > 8 ? value.substring(0, 8) + '…' : value,
        interval: 0,
      },
      axisLine: {
        show: true,
        lineStyle: {
          color: root.value.getPropertyValue('--color-grayscale-200').trim(),
          width: 1,
          type: 'solid',
        },
      },
    },
  ],
  yAxis: [
    {
      type: 'value',
      splitLine: {
        show: true,
        lineStyle: {
          type: [3, 4],
          color: root.value.getPropertyValue('--color-grayscale-200').trim(),
        },
      },
    },
  ],
  grid: { top: 10, bottom: 0, left: 6, right: 0, containLabel: true },
  series: props.stackData?.length > 0
    ? props.stackData.map(stack => ({
        name: stack?.name || 'No Name',
        type: 'bar',
        barGap: 0.2,
        barWidth: '36px',
        data: stack?.data || [100, 100, 100, 100, 100],
        itemStyle: {
          color: root.value.getPropertyValue(stack?.color || '--color-accent-900').trim(),
          borderRadius: [4, 4, 0, 0],
        },
      }))
    : [
        {
          name: 'No Name',
          type: 'bar',
          barGap: 0.2,
          barWidth: '36px',
          data: [320, 332, 301, 334, 390],
          itemStyle: {
            color: root.value.getPropertyValue('--color-accent-900').trim(),
            borderRadius: [4, 4, 0, 0],
          },
        },
      ],
}))
</script>

