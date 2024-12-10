import { createBridgeComponent } from "@module-federation/bridge-vue3";
import App from "./App.vue";

export default createBridgeComponent({
  rootComponent: App,
});
