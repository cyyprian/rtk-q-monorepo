import { defineConfig } from "vite"
import react from "@vitejs/plugin-react"
import path from "path"

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@packages": path.resolve(__dirname, "../../packages")
    }
  },
  server: {
    port: 3000,
    host: "0.0.0.0",
    fs: {
      allow: ["../.."]
    }
  }
})