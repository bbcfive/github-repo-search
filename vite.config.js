import vue from '@vitejs/plugin-vue';

export default defineConfig({
  plugins: [vue()],
  css: {
    modules: {
      // Enable CSS modules
      localsConvention: 'camelCaseOnly',
      scopeBehaviour: 'local',
      generateScopedName: '[name]_[local]_[hash:base64:5]',
      globalModulePaths: [],
    },
    preprocessorOptions: {
      // Preprocessor options
      scss: {
        additionalData: `@import "@/styles/variables.scss";`
      }
    },
    postcss: {
      // PostCSS configuration
      plugins: [
        require('tailwindcss'),
        autoprefixer()
      ]
    }
  }
})