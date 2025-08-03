export default {
     build: {
    rollupOptions: {
      input: {
        main: 'index.html',
        about: 'about.html',
        newsletter: 'newsletter.html',
        welcome: 'welcome.html',
        inita: 'inita.html',
        profile: 'profile.html',
        // etc.
      }
    }
  },
    server: {
    host: '127.0.0.1',
    port: 5174,
    strictPort: true,
    cors: true,
    headers: {
      'Cross-Origin-Opener-Policy': 'same-origin',
      'Cross-Origin-Embedder-Policy': 'require-corp', // remove if unnecessary
    },
    proxy: {
      '/verify-token': 'http://localhost:3000',
      '/api': 'http://localhost:3000',
    }
  }
    ,
    base: 
    '/'
  }