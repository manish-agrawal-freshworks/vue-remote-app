import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import { federation } from "@module-federation/vite";

export default defineConfig({
  plugins: [
    federation({
      name: "d42RemoteApp",
      manifest: true,
      filename: "remoteEntry.js",
      exposes: {
        "./d42RemoteApp": "./src/remote-entry.js",
      },
    }),
    vue(),
  ],
  build: {
    target: "esnext",
  },
});
