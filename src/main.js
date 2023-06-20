import { createApp } from 'vue'
import App from './App.vue'
import store from './store'
import router from './router'

// Vuetify
import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import { md3 } from 'vuetify/blueprints'
import { aliases, mdi } from 'vuetify/iconsets/mdi'
import { VSkeletonLoader } from 'vuetify/labs/VSkeletonLoader'


const vuetify = createVuetify({
  blueprint: md3,
  components: {
    ...components,
    VSkeletonLoader,
  },
  directives,
  icons: {
    defaultSet: 'mdi',
    aliases,
    sets: {
      mdi,
    },
  }
})


createApp(App)
  .use(router)
  .use(store)
  .use(vuetify)
  .mount('#app')
