<script setup>
import { ref } from 'vue'
import Logeo from './components/Logeo.vue'

const isLoggedIn = ref(false) // Estado de inicio de sesión
const balancePesos = ref(0)
const balanceDolares = ref(0)
const amount = ref(null)
const currency = ref("pesos")
const errorMessage = ref("")
const username = ref("") // Nueva propiedad para el nombre del usuario

const handleTransaction = (type) => {
  if (!amount.value || amount.value <= 0) {
    showError("Por favor, ingresa un monto válido.")
    return
  }

  const transactionAmount = parseFloat(amount.value)
  if (currency.value === "pesos") {
    if (type === "deposit") {
      balancePesos.value += transactionAmount
    } else {
      handleWithdrawal(balancePesos, transactionAmount, "pesos")
    }
  } else {
    if (type === "deposit") {
      balanceDolares.value += transactionAmount
    } else {
      handleWithdrawal(balanceDolares, transactionAmount, "dólares")
    }
  }
  amount.value = null
  errorMessage.value = "" // Limpia cualquier mensaje de error previo
}

const handleWithdrawal = (balanceRef, transactionAmount, currencyName) => {
  if (balanceRef.value >= transactionAmount) {
    balanceRef.value -= transactionAmount
  } else {
    showError(`Saldo insuficiente en ${currencyName}.`)
  }
}

const showError = (message) => {
  errorMessage.value = message
}

// Función para manejar el inicio de sesión exitoso desde Logeo.vue
const handleLoginSuccess = (nombre) => {
  isLoggedIn.value = true
  username.value = nombre // Almacena el nombre del usuario
}
</script>

<template>
  <!-- Mostrar el componente Logeo si no ha iniciado sesión -->
  <div v-if="!isLoggedIn">
    <Logeo @loginSuccess="handleLoginSuccess" />
  </div>

  <!-- Mostrar el contenido de la aplicación si ha iniciado sesión -->
  <div v-else id="app">
    <h1>Banco -</h1>
    <h2>Bienvenido, {{ username }}!</h2>
    <p>Saldo en pesos: $ {{ balancePesos }}</p>
    <p>Saldo en dólares: $ {{ balanceDolares }}</p>

    <div class="transaction">
      <h3>Ingresar o Retirar Dinero</h3>
      <input type="number" v-model="amount" placeholder="Monto" />
      <select v-model="currency">
        <option value="pesos">Pesos</option>
        <option value="dolares">Dólares</option>
      </select>
      <button @click="handleTransaction('deposit')">Ingresar</button>
      <button @click="handleTransaction('withdraw')">Retirar</button>
    </div>

    <p v-if="errorMessage" class="error">{{ errorMessage }}</p>
  </div>
</template>

<style>
/* Estilos existentes */
</style>
