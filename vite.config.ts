import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
  },
  // تحسينات الأداء المطورة
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          // React والمكتبات الأساسية
          vendor: ['react', 'react-dom', '@tanstack/react-query'],
          
          // مكونات واجهة المستخدم
          ui: [
            '@radix-ui/react-dialog', '@radix-ui/react-dropdown-menu', 
            '@radix-ui/react-select', '@radix-ui/react-toast',
            '@radix-ui/react-tabs', '@radix-ui/react-accordion'
          ],
          
          // مكتبات المخططات والتقارير (كبيرة)
          charts: ['recharts'],
          reports: ['jspdf', 'html2canvas'],
          excel: ['xlsx'],
          
          // أدوات مساعدة
          utils: ['date-fns', 'clsx', 'tailwind-merge'],
          
          // التوجيه
          routing: ['react-router-dom'],
          
          // النماذج
          forms: ['react-hook-form', '@hookform/resolvers', 'zod']
        }
      }
    },
    sourcemap: mode === 'development',
    minify: mode === 'production',
    chunkSizeWarningLimit: 600, // زيادة الحد المسموح قليلاً
    target: 'es2020' // تحسين التوافق
  },
  plugins: [
    react(),
    mode === 'development' &&
    componentTagger(),
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
      react: path.resolve(__dirname, "./node_modules/react"),
      "react-dom": path.resolve(__dirname, "./node_modules/react-dom"),
      "react/jsx-runtime": path.resolve(__dirname, "./node_modules/react/jsx-runtime.js"),
      "react/jsx-dev-runtime": path.resolve(__dirname, "./node_modules/react/jsx-dev-runtime.js"),
    },
    dedupe: ["react", "react-dom"],
  },
  // تحسين الـ caching
  optimizeDeps: {
    include: ['react', 'react-dom'],
    exclude: ['@vite/client', '@vite/env']
  }
}));
