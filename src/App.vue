<script setup>
import {ref, onMounted} from "vue"
import Noise from "./PerlinNoise"

const size = ref({
  width: 200,
  height: 200
})
const canvas = ref(null)
const resolution = ref(null)
const density = ref(null)
const seed = ref(null)
const harmonics = ref(null)

const perlin = (x,y,frequency, harmonics=0)=>{
  const seedValue = seed.value.value
  let result=0
  for(let i = 0; i < harmonics+1;i++){
    result += (Noise.perlin2(x/size.value.width*frequency*(i+1)+seedValue*(12347+i), y/size.value.height*frequency*(i+1)) + 1) / 2 / (harmonics+1)
  }
  return result
}

const draw = ()=>{
  const resValue = resolution.value.value
  const densityValue = density.value.value
  const seedValue = seed.value.value
  const harmonicsValue = harmonics.value.value
  console.log("Drawing at resolution", resValue)
  console.log("Drawing at density", densityValue)
  console.log("Drawing at seed", seedValue)
  console.log("Drawing at harmonics", harmonicsValue)
  const ctx = canvas.value.getContext("2d")
  ctx.clearRect(0, 0, size.value.width, size.value.height)
  for(let y = 0; y < size.value.height; y++){
    for(let x = 0; x < size.value.width; x++){
      const value = perlin(x,y, resValue, parseInt(harmonicsValue))
      
      if(value < densityValue) ctx.fillStyle = "white"
      else  ctx.fillStyle = "black"
      //ctx.fillStyle = `rgb(${value},${value},${value})`
      ctx.fillRect(x,y,1,1)
    }
  }
}

onMounted(()=> {
  draw()
  console.log(canvas.value)
})
</script>

<template>
  <canvas ref="canvas" :width="size.width" :height="size.height"></canvas>
  <div class="input-field">
    <label>Resolution</label>
    <input @input="draw" ref="resolution" type="range" min="0" max="10" step="0.1" value="5">
  </div>
  <div class="input-field">
    <label>Density</label>
    <input @input="draw" ref="density" type="range" min="0" max="1" step="0.01" value="0.5">
  </div>
  <div class="input-field">
    <label>Seed</label>
    <input @input="draw" ref="seed" type="range" min="0" max="100" step="1" value="123">
  </div>
  <div class="input-field">
    <label>Harmonics</label>
    <input @input="draw" ref="harmonics" type="range" min="0" max="10" step="1" value="1">
  </div>
</template>

<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
