<template>

<NavBar/>
   <router-view></router-view>
    </template>
    
    <script>
 


    
    import NavBar from '../pages/NavBar.vue'
    export default {
      name: 'App',
      components: {
   
       NavBar
        
       
      }
    }
    </script>
    
    <style>
    * {
  font-family: Verdana, sans-serif;
}
    
    
    </style>
    