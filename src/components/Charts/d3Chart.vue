<template>
    <div
      ref="chartRef"
      class="bar-chart-container w-full scrollbar-hide"
      :style="wrapperStyle"
    ></div>
  </template>
  
  <script setup>
  import * as d3 from "d3"
  import { onMounted, watch, ref, nextTick, computed } from "vue"
  import { useIsSmall } from "../../composables/useMediaQuery"
  
  const props = defineProps({
    xAxisData: { type: Array, default: () => ["Jan", "Feb", "Mar", "Apr"] },
    stackData: {
      type: Array,
      default: () => [
        { name: "Sales", data: [320, 280, 400, 360], color: "--color-accent-900", valuePrefix: "$" },
        { name: "Profit", data: [180, 120, 200, 240], color: "--color-accent-600", valuePrefix: "$" },
      ],
    },
    minWidth: { type: String, default: "600px" },
    letterSpacing: { type: Number, default: 0.65 },
    stacked: { type: Boolean, default: false },
    aspectRatio: { type: Number, default: 4  }, // ✅ allows 4:1 ratio by default
  })
  
  const chartRef = ref(null)
  const root = computed(() => getComputedStyle(document.documentElement))
  const isSmall = useIsSmall()
  
  const wrapperStyle = computed(() => {
    if (isSmall.value) {
      return {
        overflowX: "auto",
        overflowY: "hidden",
        height: "100%",
        width: "100%",
      }
    }
    return {
      height: "100%",
      width: "100%",
    }
  })
  
  const drawChart = () => {
    const container = chartRef.value
    container.innerHTML = ""
  
    const actualWidth = container.clientWidth
    const minWidth = parseInt(props.minWidth)
    const width = Math.max(actualWidth, minWidth)
  
    // ✅ Responsive height based on aspect ratio
    const height = width / props.aspectRatio
  
    const margin = { top: 12, right: 12, bottom: 28, left: 30 }
  
    const svg = d3
      .select(container)
      .append("svg")
      .attr("width", width)
      .attr("height", height)
      .style("display", "block")
  
    const innerWidth = width - margin.left - margin.right
    const innerHeight = height - margin.top - margin.bottom
  
    const xScale = d3
      .scaleBand()
      .domain(props.xAxisData)
      .range([0, innerWidth])
      .padding(0.3)
  
    const allValues = props.stackData.flatMap((s) => s.data)
    const yMax = props.stacked
      ? d3.max(
          props.xAxisData.map((_, i) =>
            props.stackData.reduce((sum, s) => sum + s.data[i], 0)
          )
        )
      : d3.max(allValues)
  
    const yScale = d3
      .scaleLinear()
      .domain([0, yMax])
      .nice()
      .range([innerHeight, 0])
  
    const g = svg.append("g").attr("transform", `translate(${margin.left},${margin.top})`)
  
    // ✅ Horizontal dashed grid lines
    g.append("g")
      .attr("class", "grid-y")
      .call(d3.axisLeft(yScale).tickSize(-innerWidth).tickFormat(""))
      .selectAll("line")
      .attr("stroke", root.value.getPropertyValue("--color-grayscale-200").trim())
      .attr("stroke-dasharray", "3,4")
      .attr("stroke-width", 1)
    g.selectAll(".grid-y .domain").remove()
  
    // ✅ Tooltip
    const tooltip = d3
      .select(container)
      .append("div")
      .attr("class", "chart-tooltip")
      .style("opacity", 0)
      .html(`<div class="tooltip-content"></div><div class="tooltip-arrow"></div>`)
  
    const showTooltip = (event, index) => {
      const [x, y] = d3.pointer(event)
      const tooltipRows = props.stackData
        .map(
          (s) => `
        <div style="display:flex; justify-content:space-between; gap:12px;">
          <p style="color:${root.value.getPropertyValue("--color-text-secondary").trim()}; font-size:var(--typography-font-size-sm); margin:0;">${s.name}</p>
          <p style="color:${root.value.getPropertyValue("--color-text-primary").trim()}; font-size:var(--typography-font-size-md); margin:0;">
            ${s.valuePrefix || ""}${s.data[index]}
          </p>
        </div>
      `
        )
        .join("")
  
      tooltip
        .style("opacity", 1)
        .style("left", `${x + margin.left + 10}px`)
        .style("top", `${y + margin.top - 20}px`)
        .select(".tooltip-content")
        .html(`<div style="display:flex; flex-direction:column; gap:4px;">${tooltipRows}</div>`)
    }
  
    const hideTooltip = () => tooltip.style("opacity", 0)
  
    // ✅ Helper: Draw bar with only top corners rounded
    const roundedTopRect = (x, y, width, height, radius) => {
      const r = Math.min(radius, height / 2)
      return `
        M${x},${y + height}
        L${x},${y + r}
        Q${x},${y} ${x + r},${y}
        L${x + width - r},${y}
        Q${x + width},${y} ${x + width},${y + r}
        L${x + width},${y + height}
        Z
      `
    }
  
    // ✅ Bars
    const x1 = d3
      .scaleBand()
      .domain(d3.range(props.stackData.length))
      .range([0, xScale.bandwidth()])
      .padding(0.1)
  
    props.stackData.forEach((stack, stackIndex) => {
      g.selectAll(`.bar-${stackIndex}`)
        .data(stack.data)
        .enter()
        .append("path")
        .attr("fill", root.value.getPropertyValue(stack.color).trim())
        .attr("d", (d, i) => {
          const x = xScale(props.xAxisData[i]) + x1(stackIndex)
          const barWidth = x1.bandwidth()
          const y = innerHeight
          const height = 0
          return roundedTopRect(x, y, barWidth, height, 4)
        })
        .transition()
        .duration(800)
        .delay((_, i) => i * 100)
        .attrTween("d", function (d, i) {
          const x = xScale(props.xAxisData[i]) + x1(stackIndex)
          const barWidth = x1.bandwidth()
          const fullHeight = innerHeight - yScale(d)
          const y = yScale(d)
          const interp = d3.interpolateNumber(0, fullHeight)
          return (t) =>
            roundedTopRect(x, y + (fullHeight - interp(t)), barWidth, interp(t), 4)
        })
    })
  
    // Tooltip overlay
    g.selectAll(".bar-overlay")
      .data(props.xAxisData)
      .enter()
      .append("rect")
      .attr("x", (d) => xScale(d))
      .attr("y", 0)
      .attr("width", xScale.bandwidth())
      .attr("height", innerHeight)
      .attr("fill", "transparent")
      .on("mousemove", function (event, label) {
        const index = props.xAxisData.indexOf(label)
        showTooltip(event, index)
      })
      .on("mouseleave", hideTooltip)
  
    // ✅ X Axis
    const xAxis = d3.axisBottom(xScale)
    const xAxisGroup = g
      .append("g")
      .attr("transform", `translate(0, ${innerHeight})`)
      .call(xAxis)
  
    xAxisGroup
      .selectAll("text")
      .style("font-family", root.value.getPropertyValue("--typography-font-family-satoshi").trim())
      .style("font-size", "12px")
      .style("fill", root.value.getPropertyValue("--color-text-secondary").trim())
      .style("letter-spacing", `${props.letterSpacing}px`)
      .attr("text-anchor", "middle")
  
    xAxisGroup
      .selectAll(".domain")
      .attr("stroke", root.value.getPropertyValue("--color-grayscale-200").trim())
      .attr("stroke-width", 1)
  
    // ✅ Y Axis
    const yAxis = d3.axisLeft(yScale).ticks(5)
    const yAxisGroup = g.append("g").call(yAxis)
    yAxisGroup
      .selectAll("text")
      .style("font-family", root.value.getPropertyValue("--typography-font-family-satoshi").trim())
      .style("font-size", "12px")
      .style("fill", root.value.getPropertyValue("--color-text-secondary").trim())
    yAxisGroup.selectAll(".domain").remove()
    yAxisGroup.selectAll("line").attr("x2", 0)
  }
  
  onMounted(() => drawChart())
  watch(() => [props.xAxisData, props.stackData, props.stacked], async () => {
    await nextTick()
    drawChart()
  })
  </script>
  
  <style>
  .bar-chart-container {
    position: relative;
  }
  .chart-tooltip {
    position: absolute;
    opacity: 0;
    background: rgba(255, 255, 255, 0.95);
    border-radius: 8px;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.12);
    border: 1px solid rgba(0, 0, 0, 0.05);
    padding: 8px 10px;
    transition: opacity 0.15s ease;
  }
  .tooltip-arrow {
    position: absolute;
    width: 0;
    height: 0;
    bottom: -6px;
    left: 15px;
    border-left: 6px solid transparent;
    border-right: 6px solid transparent;
    border-top: 6px solid rgba(255, 255, 255, 0.95);
    filter: drop-shadow(0px 1px 2px rgba(0, 0, 0, 0.08));
  }
  </style>
  