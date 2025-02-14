import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import { federation } from "@module-federation/vite";

export default defineConfig({
  base: "https://vue-d42-remote-app.pages.dev",
  server: {
    port: 5173,
    cors: true,
    strictPort: true,
    host: 'mandroid.freshservice-dev.com'
  },
  plugins: [
    federation({
      name: "d42RemoteApp",
      manifest: true,
      filename: "remoteEntry.js",
      exposes: {
        "./d42RemoteApp": "./src/remote-entry.js",
        "./d42RemoteAssetTable": "./src/remote-entry-asset-table.js",
      },
    }),
    vue(),
  ],
  build: {
    target: "esnext",
  },
});
