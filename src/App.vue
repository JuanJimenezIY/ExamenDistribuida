<template>
   
     <router-view/>
     
  </template>
  
  <script>
  import PaginaInicio from './pages/PaginaInicio.vue'

  import NavBar from './pages/NavBar.vue'
 // import Cliente from './pages/Clientes.vue'
  

  export default {
    name: 'App',
    components: {
      PaginaInicio,
      NavBar
      
     
    }
  }
  </script>
  
  <style>
  
  
  
  </style>
  