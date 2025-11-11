import Button from '../../src/components/Button/Button.vue';

export default {
  title: 'Components/Button',
  component: Button,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['primary', 'secondary'],
      description: 'Button variant style',
    },
    className: {
      control: { type: 'text' },
      description: 'Additional CSS classes'
    },
    disabled: {
      control: { type: 'boolean' },
      description: 'Disable the button'
    }
  }
};

export const Primary = {
  args: {
    variant: 'primary'
  },
  parameters: {
    // Replace with your actual Figma URL
    // Format: https://www.figma.com/file/[FILE_KEY]/[FILE_NAME]?node-id=[NODE_ID]
    design: {
        type: 'figspec',
      url: 'https://www.figma.com/design/ij9bDpaL1rtOaFVCK1u7U5/Design-system?node-id=4521-218&t=Bkm94A7ZwFns2wc9-4'
    }
  },
  render: (args) => ({
    components: { Button },
    setup() {
      return { args };
    },
    template: '<Button v-bind="args">Button</Button>'
  })
};

export const Secondary = {
  args: {
    variant: 'secondary'
  },
  parameters: {
    // Replace with your actual Figma URL
    // Format: https://www.figma.com/file/[FILE_KEY]/[FILE_NAME]?node-id=[NODE_ID]
    design: {
    type: 'figspec',
      url: 'https://www.figma.com/design/ij9bDpaL1rtOaFVCK1u7U5/Design-system?node-id=4521-306&t=Bkm94A7ZwFns2wc9-4'
    }
  },
  render: (args) => ({
    components: { Button },
    setup() {
      return { args };
    },
    template: '<Button v-bind="args">Button</Button>'
  })
};

export const Disabled = {
  args: {
    variant: 'primary',
    disabled: true
  },
  parameters: {
    design: {
      type: 'figspec',
      url: 'https://www.figma.com/design/ij9bDpaL1rtOaFVCK1u7U5/Design-system?node-id=4521-266&t=Bkm94A7ZwFns2wc9-4'
    }
  },
  render: (args) => ({
    components: { Button },
    setup() {
      return { args };
    },
    template: '<Button v-bind="args" :disabled="args.disabled">Disabled Button</Button>'
  })
};

export const WithCustomClass = {
  args: {
    variant: 'primary',
    className: 'w-full'
  },
  render: (args) => ({
    components: { Button },
    setup() {
      return { args };
    },
    template: '<Button v-bind="args">Full Width Button</Button>'
  })
};

