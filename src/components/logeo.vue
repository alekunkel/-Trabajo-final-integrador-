<script setup>
import { ref } from 'vue'
import { defineEmits } from 'vue'

const emit = defineEmits(['loginSuccess']) // Definir el evento de éxito de inicio de sesión

const formulario_banco = ref({
  Nombre: '',
  Apellido: '',
  DNI: ''
})

const verificarDNI = () => {
  if (formulario_banco.value.DNI.length !== 8) {
    alert('El DNI no es válido.')
    return false
  }
  return true
}

const login = () => {
  if (verificarDNI()) {
    alert('Inicio de sesión exitoso')
    emit('loginSuccess', formulario_banco.value.Nombre) // Emitir el nombre del usuario
  }
}
</script>

<template>
  <h1>Login</h1>
  <form @submit.prevent="login">
    <label for="DNI">DNI:</label>
    <input type="text" id="DNI" v-model="formulario_banco.DNI" required />
    <br>
    <label for="Nombre">Nombre:</label>
    <input type="text" id="Nombre" v-model="formulario_banco.Nombre" required />
    <br>
    <label for="Apellido">Apellido:</label>
    <input type="text" id="Apellido" v-model="formulario_banco.Apellido" required />
    <br>
    <button type="submit">Iniciar sesión</button>
  </form>
</template>

<style>
/* Estilos existentes */
</style>
