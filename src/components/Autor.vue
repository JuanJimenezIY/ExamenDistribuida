<template>
  <div>
    <NavBar/>
    <router-view/>
    <div class="container">
      <h1>Autores</h1>

      <div class="form">
        <p type="Id: ">
          <input v-model="id" type="text" placeholder="Ingrese ID"/>
        </p>
        <button @click="consultarPorId">Consultar por Id</button>
        

        <p type="Nombre:">
          <input v-model="nombre" type="text" placeholder="Nombre" />
        </p>
        <p type="Apellido:">
          <input v-model="apellido" type="text" placeholder="Apellido"/>
        </p>
        
        <button @click="insertar">Insertar</button>
        <button @click="actualizar">Actualizar</button>
        <button @click="consultar">Consultar todos</button>
      </div>

      <!-- Mensaje de Error -->
      <div v-if="mensajeError" class="error-message">
        {{ mensajeError }}
      </div>

      <!-- Tabla de Autores -->
      <div class="tabla" v-if="autores.length > 0">
        <h2>Lista de Autores</h2>
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Nombre</th>
              <th>Apellido</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="autor in autores" :key="autor.id">
              <td>{{ autor.id }}</td>
              <td>{{ autor.firstName }}</td>
              <td>{{ autor.lastName }}</td>
              <td>
                <button @click="eliminarAutor(autor.id)">Eliminar</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
import {
  consultarFachada,
  consultarAutorFachada,
  guardarAutorFachada,
  actualizarAutorFachada,
  eliminarAutorFachada
} from "../helpers/autor.js"

import NavBar from '../pages/NavBar.vue'

export default {
  components: {
    NavBar
  },
  data() {
    return {
      id: null,
      nombre: null,
      apellido: null,
      autores: [],
      mensajeError: ''  
    };
  },
  methods: {
    async consultar() {
      this.autores = await consultarFachada();
    },
    async consultarPorId() {
      const data = await consultarAutorFachada(this.id);
      this.nombre = data.firstName;
      this.apellido = data.lastName;
    },
    async insertar() {
      if (!this.nombre || !this.apellido) {
        this.mensajeError = 'Por favor, complete todos los campos antes de insertar.';
        return;
      }
      
      const libro = {
        firstName: this.nombre,
        lastName: this.apellido
      };
      await guardarAutorFachada(libro);
      await this.consultar(); 
      this.mensajeError = '';  
    },
    async actualizar() {
      if (!this.id || !this.nombre || !this.apellido) {
        this.mensajeError = 'Por favor, complete todos los campos(Id,Nombre,Apellido) antes de actualizar.';
        return;
      }
      
      const body = {
        firstName: this.nombre,
        lastName: this.apellido
      };
      await actualizarAutorFachada(this.id, body);
      await this.consultar(); 
      this.mensajeError = '';  
    },
    async eliminar() {
      await eliminarAutorFachada(this.id);
      await this.consultar(); 
    },
    async eliminarAutor(id) {
      await eliminarAutorFachada(id);
      this.autores = this.autores.filter(autor => autor.id !== id);
    }
  },
};
</script>

<style>
* {
  font-family: Verdana, sans-serif;
}
h1{
  color: #5a5a5a;
}
.container {
  justify-content: center;
  height: 800px;
  width: 97%;
  text-align: center;
  background-color: rgb(233, 245, 243);
  margin-top: 5px;
  padding: 20px;

}

button:hover {
  color: black;
  background-color: rgb(106, 123, 118);
  height: 30px;
}

button {
  border-style: ridge;
  padding: 5px;
  border-radius: 5px;
  background-color: rgb(62, 99, 62);
  font-weight: bold;
  color: aliceblue;
  border-color: black;
}

.tabla{
  display: grid;
  justify-content: center;
  align-items: center;
}
table {


  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;
}

table, th, td {
  border: 1px solid black;
}

th, td {
  padding: 10px;
  text-align: left;
}

th {
  background-color: rgb(62, 99, 62);
  color: aliceblue;
}

.error-message {
  color: red;
  margin-top: 10px;
  font-weight: bold;
}
p {
  display: grid;
  justify-content: center;
}
p:before {
  content: attr(type);
  display: block;
  text-align: left;
  margin: 3px 2px;
  font-size: 16px;
  color: #5a5a5a;
}
</style>
