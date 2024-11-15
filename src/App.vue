<script setup>
import Logeo from './components/logeo.vue';
import { useCounterStore as useBankStore } from './stores/counter';
const bankStore = useBankStore();
</script>

<template>
  <div v-if="!bankStore.isLoggedIn">
    <Logeo @loginSuccess="bankStore.handleLoginSuccess" />
  </div>
  <div v-else id="app">
    <button @click="bankStore.logout">Cerrar sesión</button>
    <img src="./assets/imagenlogeo.jpg" alt="Imagen de logeo">
    <h1>Bancor Provincia de Córdoba</h1>
    <h2>Bienvenido, {{ bankStore.username }}!</h2>
    <p>Saldo en pesos: $ {{ bankStore.balancePesos }}</p>
    <p>Saldo en dólares: usd$ {{ bankStore.balanceDolares }}</p>
    <div class="transaction">
      <h3>Ingresar o Retirar Dinero</h3>
      <input type="number" v-model="bankStore.amount" placeholder="Monto" />
      <select v-model="bankStore.currency">
        <option value="pesos">Pesos</option>
        <option value="dolares">Dólares</option>
      </select>
      <button @click="bankStore.handleTransaction('deposit')">Ingresar</button>
      <button @click="bankStore.handleTransaction('withdraw')">Retirar</button>
    </div>
    <p v-if="bankStore.errorMessage" class="error">{{ bankStore.errorMessage }}</p>
  </div>
</template>

<style scoped>
button {
  float: right;
  margin: 20px;
}
img {
  width: 100%;
  height: 300px;
}
#app {
  max-width: 500px;
  margin: 0 auto;
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 10px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  font-family: Arial, sans-serif;
  background-color: #f5f7fa;
}

h1 {
  text-align: center;
  color: #333;
}

h2 {
  color: #4A90E2;
  text-align: center;
}

p {
  font-size: 18px;
  color: #666;
}

.transaction {
  margin-top: 20px;
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.transaction input[type="number"],
.transaction select {
  padding: 10px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 6px;
  transition: border-color 0.3s ease;
}

.transaction input[type="number"]:focus,
.transaction select:focus {
  border-color: #4A90E2;
  outline: none;
}

button {
  padding: 10px;
  background-color: #4A90E2;
  color: white;
  border: none;
  border-radius: 6px;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

button:hover {
  background-color: #357ABD;
}

button:active {
  transform: scale(0.98);
}

.error {
  color: #E74C3C;
  font-weight: bold;
  margin-top: 10px;
  text-align: center;
}

@media (max-width: 600px) {
  #app {
    padding: 15px;
  }

  .transaction input[type="number"],
  .transaction select {
    font-size: 14px;
  }

  button {
    font-size: 14px;
  }
}
</style>
