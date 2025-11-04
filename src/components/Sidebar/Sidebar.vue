<template>
  <!-- Mobile Sidebar -->
  <nav
    v-if="isXSmall"
    class="transition-all min-h-14 duration-300 ease-in-out flex justify-between bg-background-primary z-20 rounded-lg fixed w-full top-0 left-0 p-4"
  >
    <div class="flex items-center gap-2">
      <div class="w-fit" @click="setIsMenuOpen(!isMenuOpen)">
        <IconWrapper
          :customSize="20"
          :icon="isMenuOpen ? X : Menu"
          :customStrokeWidth="2"
        />
      </div>
      <img :src="logo" alt="logo" class="w-[42px]" />
      <h4>Dashboard</h4>
    </div>
    <div class="flex items-center gap-2">
      <IconWrapper :icon="Bell" />
      <IconWrapper :icon="Headset" />
      <IconWrapper :icon="User" bgColor="bg-grayscale-150" />
    </div>
    <div
      :class="[
        'w-full bg-background-primary overflow-hidden transition-all duration-300 ease-in-out absolute top-14 left-0 z-10',
        isMenuOpen ? 'h-fit shadow-md' : 'h-0'
      ]"
    >
      <div class="space-y-1 p-4 max-h-[80vh] overflow-y-auto overflow-x-hidden">
        <NavItem :icon="LayoutDashboard" label="Dashboard" to="/admin" />
        <NavItem :icon="Clipboard" label="Carrier" to="/admin/carrier" />
        <NavItem :icon="Package" label="Shipper" to="/admin/shipper" />
        <NavItem :icon="Container" label="Loads" to="/admin/loads" />
        <NavItem :icon="BadgePercent" label="Offers" to="/admin/offers" />
        <NavItem :icon="Route" label="Trips" to="/admin/trips" />
        <NavItem :icon="LifeBuoy" label="Drivers" to="/admin/drivers" />
        <NavItem :icon="MapPin" label="Locations" to="/admin/locations" />
        <NavItem :icon="Banknote" label="Payment" to="/admin/payment" />
        <NavItem :icon="Settings" label="Settings" to="/admin/settings" />
      </div>
    </div>
  </nav>

  <!-- Desktop Sidebar -->
  <nav
    v-else
    :class="[
      'transition-all min-h-[calc(100vh-2rem)] duration-300 ease-in-out flex flex-col justify-between bg-background-primary rounded-lg fixed',
      sidebarOpen ? 'w-[11.5rem] p-2' : 'w-[4rem] p-1'
    ]"
    @mouseenter="setIsHovered(true)"
    @mouseleave="setIsHovered(false)"
  >
    <div>
      <div
        :class="[
          'flex items-center',
          sidebarOpen ? 'py-2 pl-4 pr-2 justify-between' : 'min-h-6 my-4 justify-center'
        ]"
      >
        <img
          v-if="sidebarOpen || (!sidebarOpen && isLarge) || (!sidebarOpen && !isLarge && !isHovered)"
          :src="logo"
          alt="logo"
          :class="sidebarOpen ? 'w-[79px]' : 'w-[42px]'"
        />
        <div
          v-if="sidebarOpen || (!sidebarOpen && isHovered && !isLarge)"
          class="w-fit"
          @click="$emit('update:sidebarOpen', !sidebarOpen)"
        >
          <IconWrapper
            padding="p-0"
            :icon="sidebarOpen ? PanelRightOpen : PanelRightClose"
            :customSize="20"
            :customStrokeWidth="2"
            borderRadius="rounded-full"
          />
        </div>
      </div>
      <div class="space-y-1 mt-2 max-h-[80vh] overflow-y-auto overflow-x-hidden">
        <NavItem :shrink="!sidebarOpen" :icon="LayoutDashboard" label="Dashboard" to="/admin" />
        <NavItem :shrink="!sidebarOpen" :icon="Clipboard" label="Carrier" to="/admin/carrier" />
        <NavItem :shrink="!sidebarOpen" :icon="Package" label="Shipper" to="/admin/shipper" />
        <NavItem :shrink="!sidebarOpen" :icon="Container" label="Loads" to="/admin/loads" />
        <NavItem :shrink="!sidebarOpen" :icon="BadgePercent" label="Offers" to="/admin/offers" />
        <NavItem :shrink="!sidebarOpen" :icon="Route" label="Trips" to="/admin/trips" />
        <NavItem :shrink="!sidebarOpen" :icon="LifeBuoy" label="Drivers" to="/admin/drivers" />
        <NavItem :shrink="!sidebarOpen" :icon="MapPin" label="Locations" to="/admin/locations" />
        <NavItem :shrink="!sidebarOpen" :icon="Banknote" label="Payment" to="/admin/payment" />
        <NavItem :shrink="!sidebarOpen" :icon="Settings" label="Settings" to="/admin/settings" />
      </div>
    </div>
    <div>
      <div class="space-y-1 mt-2 max-h-[80vh] overflow-y-auto overflow-x-hidden">
        <NavItem :shrink="!sidebarOpen" :icon="Bell" label="Notifications" to="/admin/notifications" />
        <NavItem :shrink="!sidebarOpen" :icon="Headset" label="Support" to="/admin/support" />
        <ProfileItem :shrink="!sidebarOpen" to="/admin/profile" />
      </div>
    </div>
  </nav>
</template>

<script setup>
import { ref, watch, onMounted } from 'vue'
import {
  LayoutDashboard,
  Clipboard,
  ChevronLeft,
  ChevronRight,
  Package,
  Container,
  BadgePercent,
  Route,
  LifeBuoy,
  MapPin,
  Banknote,
  Headset,
  Settings,
  Bell,
  User,
  PanelRightClose,
  PanelRightOpen,
  Menu,
  X
} from 'lucide-vue-next'
import logo from '../../assets/logo/logo-light.png'
import IconWrapper from '../Utility/IconWrapper.vue'
import NavItem from './NavItem.vue'
import ProfileItem from './ProfileItem.vue'
import { useIsLarge, useIsXSmall } from '../../composables/useMediaQuery'

const props = defineProps({
  sidebarOpen: {
    type: Boolean,
    required: true
  }
})

const emit = defineEmits(['update:sidebarOpen'])

const isLarge = useIsLarge()
const isXSmall = useIsXSmall()
const isHovered = ref(false)
const isMenuOpen = ref(false)

const setSidebarOpen = (value) => {
  emit('update:sidebarOpen', value)
}

const setIsHovered = (value) => {
  isHovered.value = value
}

const setIsMenuOpen = (value) => {
  isMenuOpen.value = value
}
</script>

