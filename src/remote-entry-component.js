import { createApp, defineAsyncComponent } from "vue";

const componentMap = {
    AssetsTable: defineAsyncComponent(() => import("./components/Table.vue")),
    AssetDetails: defineAsyncComponent(() => import("./components/AssetDetails.vue")),
};

export default function (container, componentName) {
    const Component = componentMap[componentName];
    if (!Component) {
        console.error(`Component "${componentName}" does not exist.`);
        return;
    }
	let x = createApp(Component);
	x.mount(container);
}
