import react from '@vitejs/plugin-react';
import { defineConfig } from 'vitest/config';

export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'happy-dom',
    setupFiles: ['src/tests/setup.ts'],
    coverage: {
      provider: 'v8',
      all: true,
      skipFull: false,
      reporter: ['text', 'html', 'lcov'],
    },
  },
});
