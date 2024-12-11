<script setup>
  import Table from "./components/Table.vue";
</script>

<template>
  <div class="d42-table">
    <Table />
  </div>
</template>

export default defineComponent({
  name: "App",
  components: {
    "Table": Table,
  }
});