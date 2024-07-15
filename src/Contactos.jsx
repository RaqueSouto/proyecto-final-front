import { useEffect, useState } from 'react'
import Formulario from './Formulario'
import Contacto from './Contacto'

function Contactos() {
    // Estado para almacenar la lista de contactos de la agenda
    const [contactos, setContactos] = useState([])

    useEffect(() => {
        // Petición para cargar los contactos desde el servidor cuando se inicia
        fetch("https://proyecto-final-back-lpmu.onrender.com/contactos")
            .then(respuesta => respuesta.json())
            // Almacenar los contactos en el estado
            .then(contactos => setContactos(contactos)) 
            // Manejar errores en la petición
            .catch(error => console.error(error))
    }, []) // Dependencia vacía para ejecutar la petición solo una vez

    // Función para agregar un nuevo contacto a la lista
    function crearContacto(contacto) {
        setContactos([...contactos, contacto])
    }

    // Función para editar un campo específico de un contacto existente
    function editarTexto(id, nuevoTexto, campo) {
        setContactos(contactos.map(contacto => {
            if (contacto.id === id) {
                // Actualizar el campo especificado con el nuevo texto
                return { ...contacto, [campo]: nuevoTexto } 
            }
            // Devolver el contacto sin cambios si no coincide el id
            return contacto 
        }))
    }

    // Función para eliminar un contacto de la lista
    function borrarContacto(id) {
        // Filtrar los contactos, sin contar con el contacto con el id dado
        setContactos(contactos.filter(contacto => contacto.id !== id)) 
    }

    return (
        <div className="contenedor">
            <div className="contenedor-contacto">
                <h1 className="contacto-h1">CONTACTOS</h1>
                <Formulario crearContacto={crearContacto} /> {/* Componente de formulario para crear nuevos contactos */}
                {contactos.map(contacto => (
                    <Contacto
                        // Clave única para cada contacto en la lista
                        key={contacto.id}
                        // Identificador del contacto 
                        id={contacto.id} 
                        // Nombre del contacto
                        textoNombre={contacto.textoNombre} 
                        // Teléfono del contacto
                        textoTel={contacto.textoTel} 
                        // Correo electrónico del contacto
                        textoMail={contacto.textoMail}
                        // Función para editar el contacto 
                        editarTexto={editarTexto} 
                        // Función para borrar el contacto
                        borrarContacto={borrarContacto} 
                    />
                ))}
            </div>
        </div>
    )
}

export default Contactos
