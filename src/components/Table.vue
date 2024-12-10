<template>
  <div>
    <div v-if="loading" class="shimmer-wrapper">
      <a-skeleton
        active
        :paragraph="{ rows: 15 }"
        class="p-8"
        style="
          width: 70%;
          border-right: 1px solid var(--color-boundary-border-mildest);
          height: calc(100vh - 65px);
        "
      />
      <a-skeleton
        :paragraph="{
          rows: 10,
          width: [100, 200, 100, 200, 100, 200, 100, 200, 100, 200],
          style: { height: '24px' },
        }"
        class="p-8"
        style="width: 30%; height: calc(100vh - 65px)"
      />
    </div>
    <a-table
      v-else
      :columns="columns"
      :data-source="tableData"
      :row-key="(record) => record.key"
    />
  </div>
</template>

<script>
import { defineComponent, ref, onMounted } from "vue";
import { Skeleton, Table } from "ant-design-vue";

export default defineComponent({
  name: "AssetsTable",
  components: {
    "a-skeleton": Skeleton,
    "a-table": Table,
  },
  setup() {
    const columns = [
      { dataIndex: "name", key: "name", title: "Name" },
      {
        dataIndex: "asset_type",
        key: "asset_type",
        title: "Asset Type",
        customRender: ({ text }) => text || "--",
      },
      {
        dataIndex: "asset_tag",
        key: "asset_tag",
        title: "Asset Tag",
        customRender: ({ text }) => text || "--",
      },
      {
        dataIndex: "usage_type",
        key: "usage_type",
        title: "Usage Type",
        customRender: ({ text }) => text || "--",
      },
      {
        dataIndex: "location",
        key: "location",
        title: "Location",
        customRender: ({ text }) => text || "--",
      },
    ];

    const tableData = ref([]);
    const loading = ref(true);
    const assetsData = ref([]);
    const locationData = ref([]);
    const assetTypesData = ref([]);

    const fetchOptions = {
      method: "GET",
      credentials: "include",
      headers: {
        "Content-Type": "application/json; charset=UTF-8",
        Accept: "application/json",
        "X-CSRF-Token": window?.REACT_USER_ATTRIBUTES?.meta?.csrf_token,
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Credentials": "true",
      },
    };

    const hostname = window.location.hostname.includes("freshservice-dev")
      ? `${window.location.protocol}//${window.location.hostname}:4000/api/_`
      : `${window.location.protocol}//${window.location.hostname}/api/_`;

    const fetchData = async (url, dataRef) => {
      try {
        const response = await fetch(url, fetchOptions);
        if (!response.ok) {
          throw new Error(
            `Network response was not ok: ${response.statusText}`,
          );
        }
        const data = await response.json();
        dataRef.value = data;
      } catch (error) {
        console.error("Fetch error:", error);
      }
    };

    onMounted(async () => {
      loading.value = true;

      await Promise.all([
        fetchData(`${hostname}/assets`, assetsData),
        fetchData(`${hostname}/locations`, locationData),
        fetchData(`${hostname}/asset_types`, assetTypesData),
      ]);

      // Transform the data
      tableData.value = assetsData.value.assets.map((asset) => ({
        ...asset,
        key: asset.id,
        location: locationData.value.locations.find(
          (location) => location.id === asset.location_id,
        )?.name,
        asset_type: assetTypesData.value.asset_types.find(
          (assetType) => assetType.id === asset.asset_type_id,
        )?.name,
      }));

      loading.value = false;
    });

    return {
      columns,
      tableData,
      loading,
    };
  },
});
</script>

<style>
.shimmer-wrapper {
  display: flex;
}
</style>
