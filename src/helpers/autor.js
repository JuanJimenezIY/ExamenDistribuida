import axios from "axios";


const consultar = async () => {
    const info = axios.get(`http://52.228.173.80:8080/authors`).then(r => r.data)
    console.log(info);
    return info;
}

export const consultarFachada = async () => {
    return await consultar();
}


const consultarAutor = async (id) => {
    const info = axios.get(`http://52.228.173.80:8080/authors/${id}`).then(r => r.data)
    console.log(info);
    return info;
}

export const consultarAutorFachada = async (id) => {
    return await consultarAutor(id);
}
//-------------

const guardarAutor = async (body) => {
    try {
        const response = await axios.post(`http://52.228.173.80:8080/authors`, body);
        return response.data;
    } catch (error) {
        throw error;
    }
}

export const guardarAutorFachada = async (body) => {
    try {
        const response = await guardarAutor(body);
        return response;
    } catch (error) {
        throw error;
    }
}
//-------------
const actualizarAutor = async (id,body) => {
    const info = axios.put(`http://52.228.173.80:8080/authors/${id}`, body).then(r => r.data)
    console.log(info);
}

export const actualizarAutorFachada = async (id,body) => {
    return await actualizarAutor(id,body);
}
//--------------------------
const eliminarAutor = async (id) => {
    const data = axios.delete(`http://52.228.173.80:8080/authors/${id}`).then(r => r.data);
    console.log(data);

}

export const eliminarAutorFachada = async (id) => {

    return await eliminarAutor(id);
}
