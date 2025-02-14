import { createApp } from "vue";
import Table from "./components/Table.vue";

export default function (container) {
	let x = createApp(Table);
	x.mount(container);
}
