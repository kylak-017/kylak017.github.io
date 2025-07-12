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
      port: 5174
    }
    ,
    base: 
    '/'
  }