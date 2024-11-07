import './style.css'
import { Button, Card } from 'primevue';
import { createApp } from 'vue'
import App from './App.vue'
import Nora from '@primevue/themes/nora';
import FileUpload from 'primevue/fileupload';
import PrimeVue from 'primevue/config'
import { definePreset } from '@primevue/themes';

const app = createApp(App);

app.use(PrimeVue, {
  theme: {
    preset: definePreset(Nora, {
      semantic: {
        primary: {
          50:  '{zinc.50}',
          100: '{zinc.100}',
          200: '{zinc.200}',
          300: '{zinc.300}',
          400: '{zinc.400}',
          500: '{zinc.500}',
          600: '{zinc.600}',
          700: '{zinc.700}',
          800: '{zinc.800}',
          900: '{zinc.900}',
          950: '{zinc.950}'
        }
      }
    })
  }
})

app.component('Button', Button);
app.component('Card', Card);
app.component('FileUpload', FileUpload);

app.mount('#app')
