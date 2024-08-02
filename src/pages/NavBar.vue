<template>
  <router-view/>
    <nav>
    
      <ul>
        <li class="titulo">Examen Distribuida</li>
        <li><router-link to="/autores">Autores</router-link></li>
        <li><router-link to="/libros">Libros</router-link></li>
      
       
      </ul>
    </nav>
  </template>
  
  <script>
  export default {
    name: 'NavBar'
  }
  </script>
  
  <style scoped>
  nav {
    background-color: #89b7b0;
    padding: 5px;
  }
  
  ul {
    
    list-style: none;
    display: flex;
    gap: 1rem;
    
  }

  li {
    color: white;
    margin: 10px;
    padding-inline: 55px;
    border-radius: 10px;
   
  
  }
  
  a {
    color: white;
    text-decoration: none;
  }
  
  a.router-link-active {
    font-weight: bold;
    background-color: rgb(70, 106, 82);
    
    padding: 15px;
    border-radius: 5px;
  }
  .titulo{
    color: rgb(22, 35, 31);
  }

  </style>