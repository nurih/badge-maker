import './style.css'
import { Button, Card } from 'primevue';
import { createApp } from 'vue'
import App from './App.vue'
import Aura from '@primevue/themes/aura';
import FileUpload from 'primevue/fileupload';
import PrimeVue from 'primevue/config'

const app = createApp(App);

app.use(PrimeVue, {
  theme: { preset: Aura }
})

app.component('Button', Button);
app.component('Card', Card);
app.component('FileUpload', FileUpload);

app.mount('#app')
