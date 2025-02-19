<template>
  <div>
    <div v-if="loading" class="shimmer-wrapper">
      <Skeleton active :paragraph="{ rows: 5 }" class="p-4" />
    </div>
    <Card v-else title="Asset Details" class="asset-card">
      <template #extra>
        <Tag color="blue">{{ assetData.asset_type || "Unknown" }}</Tag>
      </template>
      <p><strong>Name:</strong> {{ assetData.name || "--" }}</p>
      <p><strong>Asset Tag:</strong> {{ assetData.asset_tag || "--" }}</p>
      <p><strong>Usage Type:</strong> {{ assetData.usage_type || "--" }}</p>
      <p><strong>Location:</strong> {{ assetData.location || "--" }}</p>
      <Button type="primary" @click="refreshData">Refresh</Button>
    </Card>
  </div>
</template>

<script>
import { defineComponent, ref, onMounted } from "vue";
import { Card, Skeleton, Tag, Button } from "ant-design-vue";

export default defineComponent({
  name: "AssetDetails",
  components: {
    Card,
    Skeleton,
    Tag,
    Button,
  },
  props: {
    messageChannelService: {
      type: Object,
      default: () => ({}), // Default to an empty object
    },
  },
  setup(props) {
    const assetData = ref({});
    const loading = ref(true);

    const fetchAssetDetails = async () => {
      loading.value = true;
      try {
        // const response = await fetch("/api/asset/1"); // Change with your API
        // if (!response.ok) throw new Error("Failed to fetch asset data");
        assetData.value = {
          "id": 1,
          "name": "MacBook Pro 16-inch",
          "asset_type": "Laptop",
          "asset_tag": "MBP-001",
          "usage_type": "Employee",
          "location": "San Francisco HQ"
        }
      } catch (error) {
        console.error("Error fetching asset details:", error);
      } finally {
        loading.value = false;
      }
    };

    const refreshData = () => {
      fetchAssetDetails();

      // send message to parent component
      props.messageChannelService.postMessage({
        action: 'Event from VueJs Component',
        payload: { hi: 'hello' },
      });
    };

    onMounted(() => {
      fetchAssetDetails();

      // listen for messages from parent component
      props.messageChannelService.onMessage((messageData) => {
        console.log("Message received in VueJs component:", messageData);
        const { action, payload } = messageData;
        if (action === 'updateTagName') {
          assetData.value.asset_tag = payload.tagNameValue;
        }
      });
    });

    return {
      assetData,
      loading,
      refreshData,
    };
  },
});
</script>

<style scoped>
.asset-card {
  max-width: 400px;
  margin: 20px auto;
}
.shimmer-wrapper {
  max-width: 400px;
  margin: 20px auto;
}
</style>
