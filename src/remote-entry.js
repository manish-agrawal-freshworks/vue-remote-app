import { createApp } from "vue";
import App from "./App.vue";

export default function (container) {
	let x = createApp(App);
	x.mount(container);
}