import { createApp } from 'vue'
import './style.css'
import App from './App.vue'

import Noise from "./PerlinNoise.js"

console.log(Noise.perlin2(0.1, 0.2))

createApp(App).mount('#app')
