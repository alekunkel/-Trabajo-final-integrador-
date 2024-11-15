// src/stores/counter.js
import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useCounterStore = defineStore('counter', () => { // Cambiado de `useBankStore` a `useCounterStore`
  const isLoggedIn = ref(false)
  const balancePesos = ref(0)
  const balanceDolares = ref(0)
  const amount = ref(null)
  const currency = ref("pesos")
  const errorMessage = ref("")
  const username = ref("")

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
    errorMessage.value = ""
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

  const handleLoginSuccess = (nombre) => {
    isLoggedIn.value = true
    username.value = nombre
  }

  const logout = () => {
    isLoggedIn.value = false
    username.value = ""
    balancePesos.value = 0
    balanceDolares.value = 0
    amount.value = null
    currency.value = "pesos"
    errorMessage.value = ""
  }

  return {
    isLoggedIn,
    balancePesos,
    balanceDolares,
    amount,
    currency,
    errorMessage,
    username,
    handleTransaction,
    handleLoginSuccess,
    logout
  }
})
