<template>
  <Container class="w-100 mt-6">
    <h2>Your Business at a Glance</h2>
    <p>
      Monitor shippers, carriers, finances and registrations all in one place
      to keep your logistics running smoothly.
    </p>

    <section
      class="grid xl:grid-cols-4 grid-cols-1 md:grid-cols-2 grid-rows-8 md:grid-rows-4 grid-flow-row auto-rows-max gap-4 mt-6"
    >
      <!-- First Card -->
      <InfoCard
        class="col-span-1 md:col-span-2 row-span-2"
        :icon="TrendingUp"
        title="Top Carriers"
      >
        <template #topRight>
          <div class="flex items-center gap-4">
            <SquareDot label="Loads" />
            <SquareDot color="bg-primary-900" label="Amount" />
          </div>
        </template>
        <StackedBarChart
          minWidth="600px"
          :xAxisData="['ITF LLC', 'Dado Transports', 'PQR Transports', 'Road Freight Inc.', 'Maize LLC']"
          :noLegend="true"
          :stackData="stackData"
        />
      </InfoCard>

      <!-- Second Card -->
      <div class="row-span-2 flex flex-col gap-4">
        <InfoCard
          :icon="CircleDollarSign"
          title="Total Spend"
          class="h-full md:justify-between md:gap-0"
        >
          <div class="flex items-center justify-between">
            <h4>$2,200</h4>
          </div>
        </InfoCard>
        <InfoCard
          :icon="Package"
          title="Total Shipments"
          class="h-full md:justify-between md:gap-0"
        >
          <div class="flex items-center justify-between">
            <h4>52</h4>
            <div class="flex items-center gap-1">
              <IconWrapper
                :icon="ArrowUp"
                :customSize="16"
                class="text-success-900"
              />
              <span class="text-text-secondary">12% since last week</span>
            </div>
          </div>
        </InfoCard>
      </div>

      <!-- Third Card -->
      <InfoCard
        :icon="ClockArrowDown"
        title="On Time Dropoff"
        class="md:justify-between md:gap-0"
      >
        <div class="flex items-center justify-between">
          <h4>67%</h4>
          <div class="flex items-center gap-1">
            <IconWrapper
              :icon="ArrowUp"
              :customSize="16"
              class="text-success-900"
            />
            <span class="text-text-secondary">10% since last week</span>
          </div>
        </div>
      </InfoCard>

      <!-- Fourth Card -->
      <Card variant="primary" class="row-span-6 md:row-span-3 overflow-hidden relative">
        <div class="z-10 relative">
          <h3 class="mb-6">
            Looking to <br />
            create a <br />
            new load?
          </h3>
          <Button>Create Here</Button>
        </div>
        <img
          :src="ProfessionalMan"
          alt=""
          height="100%"
          class="object-cover z-0 absolute top-0 left-[50%] translate-x-[-50%] w-full h-full"
        />
      </Card>

      <!-- Fifth Card -->
      <InfoCard
        :icon="Gauge"
        title="Credit Utilization"
        class="row-span-2"
      >
        <div class="h-full">
          <GaugeChart :value="4200.00" :max="5000" guageTitle="Credit Limit" />
        </div>
      </InfoCard>

      <!-- Sixth Card -->
      <InfoCard
        :icon="Receipt"
        title="Incidental Expenses"
        class="row-span-4 md:row-span-2"
      >
        <PieChart
          valuePrefix="$"
          title="Incidental Expenses"
          :data="pieChartData"
        />
      </InfoCard>

      <!-- Seventh Card -->
      <div class="row-span-2 flex flex-col gap-4">
        <InfoCard
          :icon="HandCoins"
          title="Outstanding Balance"
          class="h-full md:justify-between md:gap-0"
        >
          <div class="flex items-center justify-between">
            <h4>$5200</h4>
          </div>
        </InfoCard>
        <InfoCard
          :icon="ClockArrowUp"
          title="On Time Pickup"
          class="h-full md:justify-between md:gap-0"
        >
          <div class="flex items-center justify-between">
            <h4>53%</h4>
            <div class="flex items-center gap-1">
              <IconWrapper
                :icon="ArrowUp"
                :customSize="16"
                class="text-success-900"
              />
              <span class="text-text-secondary">12% since last week</span>
            </div>
          </div>
        </InfoCard>
      </div>
    </section>

    <!-- Table Section -->
    <section class="mt-4 mb-8 grid xl:grid-cols-2 grid-cols-1 auto-rows-max gap-4">
      <InfoCard :icon="Gauge" title="Shippers Exceeding Credit Limit">
        <Table
          :th="shippersTableHeaders"
          :rowData="shippersTableData"
          minWidth="600px"
        />
      </InfoCard>
      <InfoCard :icon="Clock" title="Pending Registrations">
        <template #topRight>
          <LinkButton variant="teritiary">View All</LinkButton>
        </template>
        <Table
          :th="registrationsTableHeaders"
          :rowData="registrationsTableData"
          minWidth="600px"
        />
      </InfoCard>
    </section>
  </Container>
</template>

<script setup>
import { computed, h } from 'vue'
import {
  ArrowUp,
  CircleDollarSign,
  Clock,
  ClockArrowDown,
  ClockArrowUp,
  Gauge,
  HandCoins,
  Package,
  Receipt,
  TrendingUp,
} from 'lucide-vue-next'
import Card from '../../components/Card/Card.vue'
import InfoCard from '../../components/Card/InfoCard.vue'
import SquareDot from '../../components/Utility/SquareDot.vue'
import IconWrapper from '../../components/Utility/IconWrapper.vue'
import ProfessionalMan from '../../assets/images/admin/professional-man.png'
import Button from '../../components/Button/Button.vue'
import LinkButton from '../../components/Link/LinkButton.vue'
import Table from '../../components/Table/Table.vue'
import StackedBarChart from '../../components/Charts/StackedBarChart.vue'
import GaugeChart from '../../components/Charts/GaugeChart.vue'
import PieChart from '../../components/Charts/PieChart.vue'
import Badge from '../../components/Badge/Badge.vue'
import Container from '../../components/Wrapper/Container.vue'
import { useIsMedium } from '../../composables/useMediaQuery'

const isMedium = useIsMedium()

const stackData = [
  {
    name: 'Loads',
    data: [120, 132, 101, 134, 90],
    color: '--color-accent-900'
  },
  {
    name: 'Amount',
    data: [98.23, 77.54, 81.52, 99.55, 40.89],
    color: '--color-primary-900',
    valuePrefix: '$'
  }
]

const pieChartData = [
  { value: 100, name: 'Lumper Service', color: '#F46A9B' },
  { value: 200, name: 'Lumper Service 1', color: '#FB9D13' },
  { value: 300, name: 'Lumper Service 2', color: '#FCE91D' },
  { value: 400, name: 'Lumper Service 3', color: '#A7FC3B' },
  { value: 800, name: 'Other', color: '#1AB2FC' },
]

const shippersTableHeaders = computed(() => [
  { header: 'Company Name', width: isMedium.value ? '25%' : '30%' },
  { header: 'Credit Limit', width: isMedium.value ? '25%' : '22%', align: 'right' },
  { header: 'Outstanding Balance', width: isMedium.value ? '25%' : '22%', align: 'right' },
  { header: 'Status', width: isMedium.value ? '25%' : '26%' },
])

const shippersTableData = [
  {
    'Company Name': 'One Best Test LLC',
    'Credit Limit': '$120,000',
    'Outstanding Balance': h('div', { class: 'text-right' }, [
      h('p', '$150,000'),
      h('p', { class: 'text-error-900 text-small-p' }, 'Over by $30,000')
    ]),
    'Status': h(Badge, { text: 'Pending', variant: 'alert' })
  },
  {
    'Company Name': 'Global Freight Inc.',
    'Credit Limit': '$100,000',
    'Outstanding Balance': h('div', { class: 'text-right' }, [
      h('p', '$115,000'),
      h('p', { class: 'text-error-900 text-small-p' }, 'Over by $30,000')
    ]),
    'Status': h(Badge, { text: 'Overdue', variant: 'error' })
  },
  {
    'Company Name': 'Prime Shippers LLC',
    'Credit Limit': '$75,000',
    'Outstanding Balance': h('div', { class: 'text-right' }, [
      h('p', '$82,500')
    ]),
    'Status': h(Badge, { text: 'Paid', variant: 'success' })
  },
]

const registrationsTableHeaders = [
  { header: 'Company Name', width: '30%' },
  { header: 'City', width: '24%' },
  { header: 'State', width: '20%' },
  { header: 'Status', width: '26%' },
]

const registrationsTableData = [
  {
    'Company Name': 'One Best Test LLC',
    'City': 'Miamsburg',
    'State': 'OH',
    'Status': h(Badge, { text: 'Pending', variant: 'alert' })
  },
  {
    'Company Name': 'Two future Innovations LLC',
    'City': 'Brooklyn',
    'State': 'NY',
    'Status': h(Badge, { text: 'Pending', variant: 'alert' })
  },
  {
    'Company Name': 'Oceanic Logistics',
    'City': 'San Diego',
    'State': 'CA',
    'Status': h(Badge, { text: 'In Progress', variant: 'info' })
  },
  {
    'Company Name': 'Global Freight Inc.',
    'City': 'Miamsburg',
    'State': 'OH',
    'Status': h(Badge, { text: 'In Progress', variant: 'info' })
  },
]
</script>

