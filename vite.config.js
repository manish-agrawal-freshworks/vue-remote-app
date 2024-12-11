import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import { federation } from "@module-federation/vite";

export default defineConfig({
  base: "https://vue-remote-app.pages.dev",
  server: {
    port: 5173,
    cors: true,
    strictPort: true,
    host: 'localhost.freshservice-dev.com'
  },
  plugins: [
    federation({
      name: "d42RemoteApp",
      manifest: true,
      filename: "remoteEntry.js",
      exposes: {
        "./d42RemoteApp": "./src/App.vue",
      }
    }),
    vue(),
  ],
  build: {
    target: "esnext",
  },
});
