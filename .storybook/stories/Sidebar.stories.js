import Sidebar from '../../src/components/Sidebar/Sidebar.vue';
import { ref, h, getCurrentInstance } from 'vue';
import { createRouter, createMemoryHistory } from 'vue-router';

// Create a mock router for Storybook
const createMockRouter = () => {
  const router = createRouter({
    history: createMemoryHistory(),
    routes: [
      { path: '/', redirect: '/admin' },
      { path: '/admin', component: { template: '<div>Admin</div>' } },
      { path: '/admin/carrier', component: { template: '<div>Carrier</div>' } },
      { path: '/admin/shipper', component: { template: '<div>Shipper</div>' } },
      { path: '/admin/loads', component: { template: '<div>Loads</div>' } },
      { path: '/admin/offers', component: { template: '<div>Offers</div>' } },
      { path: '/admin/trips', component: { template: '<div>Trips</div>' } },
      { path: '/admin/drivers', component: { template: '<div>Drivers</div>' } },
      { path: '/admin/locations', component: { template: '<div>Locations</div>' } },
      { path: '/admin/payment', component: { template: '<div>Payment</div>' } },
      { path: '/admin/settings', component: { template: '<div>Settings</div>' } },
      { path: '/admin/notifications', component: { template: '<div>Notifications</div>' } },
      { path: '/admin/support', component: { template: '<div>Support</div>' } },
      { path: '/admin/profile', component: { template: '<div>Profile</div>' } }
    ]
  });
  // Set initial route
  router.push('/admin');
  return router;
};

// Router wrapper component that ensures router is installed
const RouterWrapper = {
  setup(props, { slots }) {
    const router = createMockRouter();
    // Try to install router on app instance
    try {
      const instance = getCurrentInstance();
      if (instance?.appContext?.app) {
        const app = instance.appContext.app;
        if (!app._context.provides.router) {
          app.use(router);
        }
      }
    } catch (e) {
      // If getCurrentInstance fails, router property should still work
      console.warn('Router installation warning:', e);
    }
    return () => h('div', { style: 'min-height: 100vh; position: relative;' }, slots.default?.());
  },
  router: null // Will be set per instance
};

export default {
  title: 'Components/Sidebar',
  component: Sidebar,
  tags: ['autodocs'],
  decorators: [
    (story) => {
      const router = createMockRouter();
      return {
        components: { story },
        router,
        template: '<story />'
      };
    }
  ],
  argTypes: {
    sidebarOpen: {
      control: { type: 'boolean' },
      description: 'Open the sidebar'
    }
  }
};

export const Default = {
  args: {
    sidebarOpen: true
  },
  parameters: {
    design: {
      type: 'figspec',
      url: 'https://www.figma.com/design/ij9bDpaL1rtOaFVCK1u7U5/Design-system?node-id=4384-175&t=Bkm94A7ZwFns2wc9-4'
    },
  },
  render: (args) => {
    const router = createMockRouter();
    return {
      components: { Sidebar, RouterWrapper },
      router,
      setup() {
        const sidebarOpen = ref(args.sidebarOpen);
        return { args, sidebarOpen };
      },
      template: '<RouterWrapper><Sidebar :sidebarOpen="sidebarOpen" @update:sidebarOpen="sidebarOpen = $event" /></RouterWrapper>'
    };
  }
};

export const Open = {
  args: {
    sidebarOpen: true
  },
  render: (args) => {
    const router = createMockRouter();
    return {
      components: { Sidebar, RouterWrapper },
      router,
      setup() {
        const sidebarOpen = ref(args.sidebarOpen);
        return { args, sidebarOpen };
      },
      template: '<RouterWrapper><Sidebar :sidebarOpen="sidebarOpen" @update:sidebarOpen="sidebarOpen = $event" /></RouterWrapper>'
    };
  },
  parameters: {
    design: {
      type: 'figspec',
      url: 'https://www.figma.com/design/ij9bDpaL1rtOaFVCK1u7U5/Design-system?node-id=4384-175&t=Bkm94A7ZwFns2wc9-4'
    }
  }
};

export const Closed = {
  args: {
    sidebarOpen: false
  },
  render: (args) => {
    const router = createMockRouter();
    return {
      components: { Sidebar, RouterWrapper },
      router,
      setup() {
        const sidebarOpen = ref(args.sidebarOpen);
        return { args, sidebarOpen };
      },
      template: '<RouterWrapper><Sidebar :sidebarOpen="sidebarOpen" @update:sidebarOpen="sidebarOpen = $event" /></RouterWrapper>'
    };
  },
  parameters: {
    design: {
      type: 'figspec',
      url: 'https://www.figma.com/design/ij9bDpaL1rtOaFVCK1u7U5/Design-system?node-id=4384-175&t=Bkm94A7ZwFns2wc9-4'
    }
  }
};
