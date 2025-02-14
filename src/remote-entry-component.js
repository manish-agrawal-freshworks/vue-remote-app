import { createApp, defineComponent, defineAsyncComponent, h } from "vue";

const componentMap = {
  AssetsTable: defineAsyncComponent(() => import("./components/Table.vue")),
  AssetDetails: defineAsyncComponent(() => import("./components/AssetDetails.vue")),
};

// Wrapper component that dynamically renders the requested component
const WrapperComponent = defineComponent({
  props: {
    componentName: String,
    propsData: Object, // Pass additional props if needed
  },
  setup(props) {
    const Component = componentMap[props.componentName];
    if (!Component) {
      console.error(`Component "${props.componentName}" does not exist.`);
      return () => h("div", {}, `Error: Component "${props.componentName}" not found`);
    }

    return () => h(Component, props.propsData);
  },
});

// Function to mount Vue component inside the React app
export default function (container, componentName, propsData = {}) {
  if (!componentName) {
    console.error("No component name provided.");
    return;
  }

  const app = createApp(WrapperComponent, { componentName, propsData });
  app.mount(container);
}
