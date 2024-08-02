import axios from "axios";

const consultar = async () => {
    const info = axios.get(`http://52.230.147.83:8080/books`).then(r => r.data)
    console.log(info);
    return info;
}

export const consultarFachada = async () => {
    return await consultar();
}

const consultarLibro= async (id) => {
    const info = axios.get(`http://52.230.147.83:8080/books/${id}`).then(r => r.data)
    console.log(info);
    return info;
}

export const consultarLibroFachada = async (id) => {
    return await consultarLibro(id);
}
//-------------

const guardarLibro= async (body) => {
    try {
        const response = await axios.post(`http://52.230.147.83:8080/books`, body);
        return response.data;
    } catch (error) {
        throw error;
    }
}

export const guardarLibroFachada = async (body) => {
    try {
        const response = await guardarLibro(body);
        return response;
    } catch (error) {
        throw error;
    }
}
//-------------
const actualizarLibro = async (id,body) => {
    const info = axios.put(`http://52.230.147.83:8080/books/${id}`, body).then(r => r.data)
    console.log(info);
}

export const actualizarLibroFachada = async (id,body) => {
    return await actualizarLibro(id,body);
}
//--------------------------
const eliminarLibro = async (id) => {
    const data = axios.delete(`http://52.230.147.83:8080/books/${id}`).then(r => r.data);
    console.log(data);

}

export const eliminarLibroFachada = async (id) => {

    return await eliminarLibro(id);
}
