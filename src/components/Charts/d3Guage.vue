<template>
    <div
      ref="chartRef"
      class="gauge-chart w-full flex flex-col justify-center items-center"
      :style="{ minHeight: '160px' }"
    >
      <svg ref="svgRef" class="w-full"></svg>
  
      <div class="flex items-center justify-between w-full mt-2">
        <p class="text-text-secondary text-sm">{{ guageTitle || 'Title' }}</p>
        <p class="text-text-primary text-lg font-medium">${{ max.toFixed(0) }}</p>
      </div>
    </div>
  </template>
  
  <script setup>
  import * as d3 from "d3"
  import { ref, onMounted, watch, nextTick, computed } from "vue"
  
  const props = defineProps({
    value: { type: Number, default: 100 },
    min: { type: Number, default: 0 },
    max: { type: Number, default: 240 },
    guageTitle: { type: String, default: null },
  })
  
  const chartRef = ref(null)
  const svgRef = ref(null)
  const root = computed(() => getComputedStyle(document.documentElement))
  
  const drawGauge = () => {
    const container = chartRef.value
    const svg = d3.select(svgRef.value)
    svg.selectAll("*").remove()
  
    const width = container.clientWidth
    const height = 180
    const radius = Math.min(width / 2, height)
  
    const centerX = width / 2
    const centerY = height
  
    const value = props.value
    const percent = Math.min(value / props.max, 1)
  
    // ✅ Define angle scale (180° arc, from left to right)
    const scale = d3
      .scaleLinear()
      .domain([props.min, props.max])
      .range([-Math.PI, 0]) // left to right arc
  
    // ✅ Define base and progress arcs
    const arc = d3
      .arc()
      .innerRadius(radius - 18)
      .outerRadius(radius)
      .startAngle(-Math.PI)
      .endAngle(0)
      .cornerRadius(9)
  
    const group = svg
      .attr("width", width)
      .attr("height", height + 40)
      .append("g")
      .attr("transform", `translate(${centerX},${centerY})`)
  
    // ✅ Background arc
    group
      .append("path")
      .attr("d", arc)
      .attr("fill", root.value.getPropertyValue("--color-grayscale-200").trim())
  
    // ✅ Progress arc (starts from left, grows to right)
    const progressArc = d3
      .arc()
      .innerRadius(radius - 18)
      .outerRadius(radius)
      .startAngle(-Math.PI)
      .endAngle(scale(value))
      .cornerRadius(9)
  
    const progress = group
      .append("path")
      .attr("fill", root.value.getPropertyValue("--color-primary-900").trim())
      .attr("d", progressArc)
  
    // ✅ Animate arc drawing
    progress
      .transition()
      .duration(1000)
      .attrTween("d", () => {
        const interp = d3.interpolate(props.min, value)
        return (t) => {
          const currentVal = interp(t)
          const end = scale(currentVal)
          return d3
            .arc()
            .innerRadius(radius - 18)
            .outerRadius(radius)
            .startAngle(-Math.PI)
            .endAngle(end)
            .cornerRadius(9)()
        }
      })
  
    // ✅ Center value text
    group
      .append("text")
      .attr("text-anchor", "middle")
      .attr("dy", "-10")
      .attr("fill", root.value.getPropertyValue("--color-text-primary").trim())
      .attr("font-family", root.value.getPropertyValue("--typography-font-family-satoshi").trim())
      .attr("font-size", 24)
      .attr("font-weight", 500)
      .text(`$${value.toFixed(2)}`)
  
    // ✅ Tooltip
    const tooltip = d3
      .select(container)
      .append("div")
      .attr("class", "gauge-tooltip")
      .style("opacity", 0)
      .html(`<div class="tooltip-content"></div>`)
  
    const tooltipHTML = `
      <div style="text-align:center;">
        You have used <br/><strong>${(percent * 100).toFixed(1)}%</strong>
      </div>
    `
  
    svg
      .on("mousemove", (event) => {
        const [x, y] = d3.pointer(event)
        tooltip
          .style("opacity", 1)
          .style("left", `${x + 20}px`)
          .style("top", `${y}px`)
          .select(".tooltip-content")
          .html(tooltipHTML)
      })
      .on("mouseleave", () => tooltip.style("opacity", 0))
  }
  
  onMounted(() => drawGauge())
  watch(() => [props.value, props.min, props.max], async () => {
    await nextTick()
    drawGauge()
  })
  </script>
  
  <style scoped>
  .gauge-chart {
    position: relative;
  }
  
  .gauge-tooltip {
    position: absolute;
    opacity: 0;
    background: rgba(255, 255, 255, 0.95);
    border-radius: 8px;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.12);
    border: 1px solid rgba(0, 0, 0, 0.05);
    padding: 8px 10px;
    transition: opacity 0.15s ease;
    pointer-events: none;
  }
  </style>
  