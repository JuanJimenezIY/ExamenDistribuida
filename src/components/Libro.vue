<template>
  <div>
    <NavBar/>
    <router-view/>
    <div class="container">
      <h1>Libros</h1>

      <div class="form">
        <p type="Id: ">
          <input v-model="id" type="text" placeholder="Ingrese ID"/>
        </p>
        <button @click="consultarPorId">Consultar por Id</button>
      
        <p type="Titulo:">
          <input v-model="titulo" type="text" placeholder="Titulo" />
        </p>

        <p type="ISBN:">
          <input v-model="isbn" type="text" placeholder="ISBN"/>
        </p>

        <p type="Precio:">
          <input v-model="precio" type="text" placeholder="Precio"/>
        </p>
        
        <p type="Id autor:">
          <input v-model="nombreAutor" type="text" placeholder="id autor" />
        </p>

        <button @click="insertar">Insertar</button>
        <button @click="actualizar">Actualizar</button>

        <button @click="consultar">Consultar todos</button> 
      </div>


      <div v-if="mensajeError" class="error-message">
        {{ mensajeError }}
      </div>


      <div class="tabla" v-if="libros.length > 0">
        <h2>Lista de Libros</h2>
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Titulo</th>
              <th>ISBN</th>
              <th>Precio</th>
              <th>Nombre del autor</th>
              <th>Acción</th> 
            </tr>
          </thead>
          <tbody>
            <tr v-for="libro in libros" :key="libro.id">
              <td>{{ libro.id }}</td>
              <td>{{ libro.title }}</td>
              <td>{{ libro.isbn }}</td>
              <td>{{ libro.price }}</td>
              <td>{{ libro.authorName }}</td>
              <td>
                <button @click="eliminarLibro(libro.id)">Eliminar</button> 
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
  consultarLibroFachada,
  guardarLibroFachada,
  actualizarLibroFachada,
  eliminarLibroFachada,
  consultarFachada 
} from "../helpers/libro"

import NavBar from '../pages/NavBar.vue'

export default {
  components: {
    NavBar
  },
  data() {
    return {
      id: null,
      titulo: null,
      nombreAutor: null,
      isbn: null,
      precio: null,
      libros: [],          
      mensajeError: ''    
    };
  },
  methods: {
    async consultar() {
      try {
        this.libros = await consultarFachada(); 
        this.mensajeError = '';  
      } catch (error) {
        this.mensajeError = 'Error al consultar los libros.';
      }
    },
    async consultarPorId() {
      try {
        const data = await consultarLibroFachada(this.id);
        this.titulo = data.title;
        this.nombreAutor = data.authorName;
        this.isbn = data.isbn;
        this.precio = data.price;
        this.mensajeError = '';  
        console.log(data);
      } catch (error) {
        this.mensajeError = 'Error al consultar el libro.';
      }
    },
    async insertar() {
      if (!this.titulo || !this.isbn || !this.precio || !this.nombreAutor) {
        this.mensajeError = 'Por favor, complete todos los campos antes de insertar.';
        return;
      }

      const libro = {
        title: this.titulo,
        isbn: this.isbn,
        price: this.precio,
        authorId: this.nombreAutor
      };

      try {
        await guardarLibroFachada(libro);
        this.mensajeError = '';  
      } catch (error) {
        this.mensajeError = 'Error al insertar el libro.';
      }
      this.libros = await consultarFachada(); 
    },
    async actualizar() {
      if (!this.id || !this.titulo || !this.isbn || !this.precio || !this.nombreAutor) {
        this.mensajeError = 'Por favor, complete todos los campos(Id,Titulo,ISBN,Precio,Id autor) antes de actualizar.';
        return;
      }

      const body = {
        title: this.titulo,
        isbn: this.isbn,
        price: this.precio,
        authorId: this.nombreAutor
      };

      try {
        await actualizarLibroFachada(this.id, body);
        this.mensajeError = '';  
      } catch (error) {
        this.mensajeError = 'Error al actualizar el libro.';
      }
      this.libros = await consultarFachada(); 
    },
    async eliminar() {
      if (!this.id) {
        this.mensajeError = 'Por favor, ingrese un ID antes de eliminar.';
        return;
      }

      try {
        await eliminarLibroFachada(this.id);
        this.libros = await consultarFachada(); 
        this.mensajeError = '';  
      } catch (error) {
        this.mensajeError = 'Error al eliminar el libro.';
      }
    },
    async eliminarLibro(id) {
      try {
        await eliminarLibroFachada(id);
        this.libros = this.libros.filter(libro => libro.id !== id); 
        this.mensajeError = ''; 
      } catch (error) {
        this.mensajeError = 'Error al eliminar el libro.';
      }
    }
  }
};
</script>

<style>
* {
  font-family: Verdana, sans-serif;
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
  background-color: rgb(100, 131, 100);
  font-weight: bold;
  color: aliceblue;
  border-color: black;
}

.error-message {
  color: red;
  margin-top: 10px;
  font-weight: bold;
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
  background-color: rgb(86, 144, 114);
  color: aliceblue;
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
