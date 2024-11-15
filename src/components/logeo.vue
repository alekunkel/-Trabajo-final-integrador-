
<script setup>
import { ref } from 'vue';
import { useCounterStore as useBankStore } from '../stores/counter'; // Importa la tienda de Pinia
const bankStore = useBankStore(); // Accede a la tienda de Pinia

const formulario_banco = ref({
  Nombre: '',
  Apellido: '',
  DNI: ''
});

const verificarDNI = () => {
  if (formulario_banco.value.DNI.length !== 8) {
    alert('Inicio de sesión fallido');
    return false;
  }
  return true;
};

const login = () => {
  if (verificarDNI()) {
    // Llamamos al método de la tienda para manejar el éxito del login
    bankStore.handleLoginSuccess(formulario_banco.value.Nombre);
  }
};
</script>

<template>
  <div class="login-container">
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
    <img alt="Banco" class="Banco" src="/src/assets/imagenlogeo.jpg" />
  </div>
</template>

<style scoped>
.login-container {
  max-width: 400px;
  margin: 100px auto;
  padding: 30px;
  border-radius: 15px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
  background: rgba(255, 255, 255, 0.9);
  backdrop-filter: blur(8px);
  font-family: Arial, sans-serif;
  text-align: center;
  position: relative;
}

h1 {
  color: #333;
  font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;
  font-size: 2em;
  margin-bottom: 20px;
  position: relative;
}

h1::after {
  content: '';
  display: block;
  width: 50px;
  height: 3px;
  background: #4CAF50;
  margin: 10px auto 0;
  border-radius: 4px;
}

form {
  display: flex;
  flex-direction: column;
  gap: 15px;
  padding: 10px;
}

label {
  font-weight: bold;
  color: #444;
  font-size: 0.9em;
  text-transform: uppercase;
}

input[type="text"] {
  padding: 12px;
  border: 1px solid #ccc;
  border-radius: 8px;
  font-size: 1em;
  transition: border 0.3s ease;
}

input[type="text"]:focus {
  border: 1px solid #4CAF50;
  outline: none;
  box-shadow: 0 0 5px rgba(76, 175, 80, 0.3);
}

button[type="submit"] {
  padding: 12px;
  font-size: 1.1em;
  font-weight: bold;
  background-color: #4CAF50;
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.3s ease, transform 0.1s ease;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.15);
}

button[type="submit"]:hover {
  background-color: #45a049;
}

button[type="submit"]:active {
  transform: scale(0.98);
}

.Banco {
  position: absolute;
  bottom: 550px;
  left: 250%;
  transform: translateX(-50%);
  width: 125px;
  height: 125px;
  transition: transform 0.3s ease, opacity 0.3s ease;
}

.login-container:hover .Banco {
  transform: translate(-50%, 10%) scale(1.05);
  opacity: 0.9;
}

:global(body) {
  background: linear-gradient(to bottom right, #ffdd99, #66cc99);
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0;
  font-family: Arial, sans-serif;
}
</style>
