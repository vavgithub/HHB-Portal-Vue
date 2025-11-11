<template>
  <Container class="w-100 mt-6">
    <div class="flex items-center justify-between mb-6">
      <div>
        <h2>All Loads</h2>
        <p class="text-text-secondary mt-1">
          Browse available loads, edit load
        </p>
      </div>
      <Button class="flex items-center gap-2">
        Add New Load
        <ChevronDown :size="24" />
      </Button>
    </div>

    <div class="bg-background-primary p-4 rounded-xl overflow-hidden ">
      <Table
        :th="tableHeaders"
        :rowData="loadsData"
        minWidth="1080px"
      />
    </div>
  </Container>
</template>

<script setup>
import { computed, h } from 'vue'
import { ChevronDown, Navigation } from 'lucide-vue-next'
import Container from '../../components/Wrapper/Container.vue'
import Button from '../../components/Button/Button.vue'
import Table from '../../components/Table/Table.vue'
import Badge from '../../components/Badge/Badge.vue'
import { useIsMedium } from '../../composables/useMediaQuery'

const isMedium = useIsMedium()

const tableHeaders = computed(() => [
  { header: 'Pickup', width: isMedium.value ? '25%' : 'flex-1' },
  { header: 'Distance', width: '100px' },
  { header: 'Dropoff', width: isMedium.value ? '25%' : 'flex-1' },
  { header: 'Trailer', width: '160px' },
  { header: 'Weight', width: '112px' },
  { header: 'Offers', width: '112px' },
  { header: 'Rate', width: '112px', align: 'right' },
  { header: '', width: '10%' }
])

const loadsData = [
  {
    'Pickup': h('div', { class: 'flex flex-col gap-3' }, [
      h('p', { class: 'font-medium text-base text-text-primary' }, 'Hazelwood, MO'),
      h('p', { class: 'text-sm text-text-secondary' }, 'Jul 7, 9:30 PST')
    ]),
    'Distance': h('div', { class: 'flex flex-col items-center gap-2.5' }, [
      h(Navigation, { size: 16, class: 'text-grayscale-350' }),
      h('p', { class: 'text-base text-text-primary' }, '400 mi')
    ]),
    'Dropoff': h('div', { class: 'flex flex-col gap-3' }, [
      h('p', { class: 'font-medium text-base text-text-primary' }, 'New York, NY'),
      h('p', { class: 'text-sm text-text-secondary' }, 'Jul 9, 12:30 PST')
    ]),
    'Trailer': h('div', { class: 'flex flex-col gap-3' }, [
      h('p', { class: 'text-base text-text-primary' }, 'Dry Van'),
      h('p', { class: 'text-sm text-text-secondary' }, '53\'')
    ]),
    'Weight': h('p', { class: 'text-base text-text-primary' }, '2000 lb'),
    'Offers': h('p', { class: 'text-base text-text-primary' }, 'No Offers'),
    'Rate': h('div', { class: 'flex flex-col gap-3 text-right' }, [
      h('p', { class: 'font-medium text-xl text-text-primary leading-[1.2]' }, '$400'),
      h('p', { class: 'text-base text-text-secondary' }, '$1.00/mi')
    ]),
    '': h('div', { class: 'flex flex-col gap-2' }, [
      h(Badge, { text: 'NO BOL', variant: 'alert', borderRadius: 'rounded-full', paddingX: 'px-2', paddingY: 'py-1.5' }),
      h(Badge, { text: 'Multi-Stop', variant: 'info', borderRadius: 'rounded-full', paddingX: 'px-2', paddingY: 'py-1.5' })
    ])
  },
  {
    'Pickup': h('div', { class: 'flex flex-col gap-3' }, [
      h('p', { class: 'font-medium text-base text-text-primary' }, 'Quakertown, PA'),
      h('p', { class: 'text-sm text-text-secondary' }, 'Jul 8, 9:30 PST')
    ]),
    'Distance': h('div', { class: 'flex flex-col items-center gap-2.5' }, [
      h('div', { class: 'w-4 h-4' }, [
        h('svg', {
          width: '16',
          height: '16',
          viewBox: '0 0 16 16',
          fill: 'none',
          xmlns: 'http://www.w3.org/2000/svg'
        }, [
          h('path', {
            d: 'M8 2L10 6L14 7L10 8L8 12L6 8L2 7L6 6L8 2Z',
            stroke: 'var(--color-grayscale-350)',
            'stroke-width': '1.5',
            'stroke-linecap': 'round',
            'stroke-linejoin': 'round'
          })
        ])
      ]),
      h('p', { class: 'text-base text-text-primary' }, '186 mi')
    ]),
    'Dropoff': h('div', { class: 'flex flex-col gap-3' }, [
      h('p', { class: 'font-medium text-base text-text-primary' }, 'Southampton, NY'),
      h('p', { class: 'text-sm text-text-secondary' }, 'Jul 8, 12:30 PST')
    ]),
    'Trailer': h('div', { class: 'flex flex-col gap-3' }, [
      h('p', { class: 'text-base text-text-primary' }, 'Flatbed'),
      h('p', { class: 'text-sm text-text-secondary' }, '48\'')
    ]),
    'Weight': h('p', { class: 'text-base text-text-primary' }, '5000 lb'),
    'Offers': h(Badge, { 
      text: '2 Offers', 
      variant: 'info',
      bgColor: 'bg-background-primary',
      borderRadius: 'rounded-full',
      paddingX: 'px-2',
      paddingY: 'py-1.5',
      className: 'border-grayscale-300'
    }),
    'Rate': h('div', { class: 'flex flex-col gap-3 text-right' }, [
      h('p', { class: 'font-medium text-xl text-text-primary leading-[1.2]' }, '$950'),
      h('p', { class: 'text-base text-text-secondary' }, '$5.10/mi')
    ]),
    '': h(Badge, { text: 'FCFS', variant: 'info', borderRadius: 'rounded-full', paddingX: 'px-2', paddingY: 'py-1.5' })
  },
  {
    'Pickup': h('div', { class: 'flex flex-col gap-3' }, [
      h('p', { class: 'font-medium text-base text-text-primary' }, 'Fleetwood, PA'),
      h('p', { class: 'text-sm text-text-secondary' }, 'Jul 7, 9:30 PST')
    ]),
    'Distance': h('div', { class: 'flex flex-col items-center gap-2.5' }, [
      h('div', { class: 'w-4 h-4' }, [
        h('svg', {
          width: '16',
          height: '16',
          viewBox: '0 0 16 16',
          fill: 'none',
          xmlns: 'http://www.w3.org/2000/svg'
        }, [
          h('path', {
            d: 'M8 2L10 6L14 7L10 8L8 12L6 8L2 7L6 6L8 2Z',
            stroke: 'var(--color-grayscale-350)',
            'stroke-width': '1.5',
            'stroke-linecap': 'round',
            'stroke-linejoin': 'round'
          })
        ])
      ]),
      h('p', { class: 'text-base text-text-primary' }, '798 mi')
    ]),
    'Dropoff': h('div', { class: 'flex flex-col gap-3' }, [
      h('p', { class: 'font-medium text-base text-text-primary' }, 'Nashville, TN'),
      h('p', { class: 'text-sm text-text-secondary' }, 'Jul 9, 12:30 PST')
    ]),
    'Trailer': h('div', { class: 'flex flex-col gap-3' }, [
      h('p', { class: 'text-base text-text-primary' }, 'Box Truck'),
      h('p', { class: 'text-sm text-text-secondary' }, '28\'')
    ]),
    'Weight': h('p', { class: 'text-base text-text-primary' }, '11,022 lb'),
    'Offers': h(Badge, { 
      text: '2 Offers', 
      variant: 'info',
      bgColor: 'bg-background-primary',
      borderRadius: 'rounded-full',
      paddingX: 'px-2',
      paddingY: 'py-1.5',
      className: 'border-grayscale-300'
    }),
    'Rate': h('div', { class: 'flex flex-col gap-3 text-right' }, [
      h('p', { class: 'font-medium text-xl text-text-primary leading-[1.2]' }, '$990'),
      h('p', { class: 'text-base text-text-secondary' }, '$1.24/mi')
    ]),
    '': h(Badge, { text: 'Multi-Stop', variant: 'info', borderRadius: 'rounded-full', paddingX: 'px-2', paddingY: 'py-1.5' })
  },
  {
    'Pickup': h('div', { class: 'flex flex-col gap-3' }, [
      h('p', { class: 'font-medium text-base text-text-primary' }, 'Dallas, TX'),
      h('p', { class: 'text-sm text-text-secondary' }, 'Jul 10, 9:30 PST')
    ]),
    'Distance': h('div', { class: 'flex flex-col items-center gap-2.5' }, [
      h('div', { class: 'w-4 h-4' }, [
        h('svg', {
          width: '16',
          height: '16',
          viewBox: '0 0 16 16',
          fill: 'none',
          xmlns: 'http://www.w3.org/2000/svg'
        }, [
          h('path', {
            d: 'M8 2L10 6L14 7L10 8L8 12L6 8L2 7L6 6L8 2Z',
            stroke: 'var(--color-grayscale-350)',
            'stroke-width': '1.5',
            'stroke-linecap': 'round',
            'stroke-linejoin': 'round'
          })
        ])
      ]),
      h('p', { class: 'text-base text-text-primary' }, '700 mi')
    ]),
    'Dropoff': h('div', { class: 'flex flex-col gap-3' }, [
      h('p', { class: 'font-medium text-base text-text-primary' }, 'Atlanta, GA'),
      h('p', { class: 'text-sm text-text-secondary' }, 'Jul 11, 12:30 PST')
    ]),
    'Trailer': h('div', { class: 'flex flex-col gap-3' }, [
      h('p', { class: 'text-base text-text-primary' }, 'Reefer'),
      h('p', { class: 'text-sm text-text-secondary' }, '53\'')
    ]),
    'Weight': h('p', { class: 'text-base text-text-primary' }, '15,000 lb'),
    'Offers': h(Badge, { 
      text: '2 Offers', 
      variant: 'info',
      bgColor: 'bg-background-primary',
      borderRadius: 'rounded-full',
      paddingX: 'px-2',
      paddingY: 'py-1.5',
      className: 'border-grayscale-300'
    }),
    'Rate': h('div', { class: 'flex flex-col gap-3 text-right' }, [
      h('p', { class: 'font-medium text-xl text-text-primary leading-[1.2]' }, '$1,200'),
      h('p', { class: 'text-base text-text-secondary' }, '$1.71/mi')
    ]),
    '': ''
  },
  {
    'Pickup': h('div', { class: 'flex flex-col gap-3' }, [
      h('p', { class: 'font-medium text-base text-text-primary' }, 'Detroit, MI'),
      h('p', { class: 'text-sm text-text-secondary' }, 'Jul 9, 9:30 PST')
    ]),
    'Distance': h('div', { class: 'flex flex-col items-center gap-2.5' }, [
      h('div', { class: 'w-4 h-4' }, [
        h('svg', {
          width: '16',
          height: '16',
          viewBox: '0 0 16 16',
          fill: 'none',
          xmlns: 'http://www.w3.org/2000/svg'
        }, [
          h('path', {
            d: 'M8 2L10 6L14 7L10 8L8 12L6 8L2 7L6 6L8 2Z',
            stroke: 'var(--color-grayscale-350)',
            'stroke-width': '1.5',
            'stroke-linecap': 'round',
            'stroke-linejoin': 'round'
          })
        ])
      ]),
      h('p', { class: 'text-base text-text-primary' }, '280 mi')
    ]),
    'Dropoff': h('div', { class: 'flex flex-col gap-3' }, [
      h('p', { class: 'font-medium text-base text-text-primary' }, 'Chicago, IL'),
      h('p', { class: 'text-sm text-text-secondary' }, 'Jul 10, 12:30 PST')
    ]),
    'Trailer': h('div', { class: 'flex flex-col gap-3' }, [
      h('p', { class: 'text-base text-text-primary' }, 'Flatbed'),
      h('p', { class: 'text-sm text-text-secondary' }, '48\'')
    ]),
    'Weight': h('p', { class: 'text-base text-text-primary' }, '4,200 lb'),
    'Offers': h(Badge, { 
      text: '2 Offers', 
      variant: 'info',
      bgColor: 'bg-background-primary',
      borderRadius: 'rounded-full',
      paddingX: 'px-2',
      paddingY: 'py-1.5',
      className: 'border-grayscale-300'
    }),
    'Rate': h('div', { class: 'flex flex-col gap-3 text-right' }, [
      h('p', { class: 'font-medium text-xl text-text-primary leading-[1.2]' }, '$600'),
      h('p', { class: 'text-base text-text-secondary' }, '$2.14/mi')
    ]),
    '': h(Badge, { text: 'NO BOL', variant: 'alert', borderRadius: 'rounded-full', paddingX: 'px-2', paddingY: 'py-1.5' })
  },
  {
    'Pickup': h('div', { class: 'flex flex-col gap-3' }, [
      h('p', { class: 'font-medium text-base text-text-primary' }, 'Phoenix, AZ'),
      h('p', { class: 'text-sm text-text-secondary' }, 'Jul 12, 9:30 PST')
    ]),
    'Distance': h('div', { class: 'flex flex-col items-center gap-2.5' }, [
      h('div', { class: 'w-4 h-4' }, [
        h('svg', {
          width: '16',
          height: '16',
          viewBox: '0 0 16 16',
          fill: 'none',
          xmlns: 'http://www.w3.org/2000/svg'
        }, [
          h('path', {
            d: 'M8 2L10 6L14 7L10 8L8 12L6 8L2 7L6 6L8 2Z',
            stroke: 'var(--color-grayscale-350)',
            'stroke-width': '1.5',
            'stroke-linecap': 'round',
            'stroke-linejoin': 'round'
          })
        ])
      ]),
      h('p', { class: 'text-base text-text-primary' }, '370 mi')
    ]),
    'Dropoff': h('div', { class: 'flex flex-col gap-3' }, [
      h('p', { class: 'font-medium text-base text-text-primary' }, 'Los Angeles, CA'),
      h('p', { class: 'text-sm text-text-secondary' }, 'Jul 12, 12:30 PST')
    ]),
    'Trailer': h('div', { class: 'flex flex-col gap-3' }, [
      h('p', { class: 'text-base text-text-primary' }, 'Dry Van'),
      h('p', { class: 'text-sm text-text-secondary' }, '53\'')
    ]),
    'Weight': h('p', { class: 'text-base text-text-primary' }, '8,500 lb'),
    'Offers': h('p', { class: 'text-base text-text-primary' }, 'No Offers'),
    'Rate': h('div', { class: 'flex flex-col gap-3 text-right' }, [
      h('p', { class: 'font-medium text-xl text-text-primary leading-[1.2]' }, '$850'),
      h('p', { class: 'text-base text-text-secondary' }, '$2.30/mi')
    ]),
    '': ''
  }
]
</script>

