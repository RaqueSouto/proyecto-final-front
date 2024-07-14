import { useEffect, useState } from 'react'
import Formulario from './Formulario'
import Contacto from './Contacto'

function Contactos() {
    // Estado para almacenar la lista de contactos de la agenda
    const [contactos, setContactos] = useState([])

    useEffect(() => {
        // Efecto para cargar los contactos desde el servidor cuando se monta el componente
        fetch("http://localhost:4000/contactos")
            .then(respuesta => respuesta.json())
            .then(contactos => setContactos(contactos)) // Almacenar los contactos en el estado
            .catch(error => console.error(error)) // Manejar errores en la petición
    }, []) // Dependencia vacía para ejecutar el efecto solo una vez al montar el componente

    // Función para agregar un nuevo contacto a la lista
    function crearContacto(contacto) {
        setContactos([...contactos, contacto])
    }

    // Función para editar un campo específico de un contacto existente
    function editarTexto(id, nuevoTexto, campo) {
        setContactos(contactos.map(contacto => {
            if (contacto.id === id) {
                return { ...contacto, [campo]: nuevoTexto } // Actualizar el campo especificado con el nuevo texto
            }
            return contacto // Devolver el contacto sin cambios si no coincide el id
        }))
    }

    // Función para eliminar un contacto de la lista
    function borrarContacto(id) {
        setContactos(contactos.filter(contacto => contacto.id !== id)) // Filtrar los contactos, excluyendo el contacto con el id dado
    }

    return (
        <div className="contenedor">
            <div className="contenedor-contacto">
                <h1 className="contacto-h1">CONTACTOS</h1>
                <Formulario crearContacto={crearContacto} /> {/* Componente de formulario para crear nuevos contactos */}
                {contactos.map(contacto => (
                    <Contacto
                        key={contacto.id} // Clave única para cada contacto en la lista
                        id={contacto.id} // Identificador del contacto
                        textoNombre={contacto.textoNombre} // Nombre del contacto
                        textoTel={contacto.textoTel} // Teléfono del contacto
                        textoMail={contacto.textoMail} // Correo electrónico del contacto
                        editarTexto={editarTexto} // Función para editar el contacto
                        borrarContacto={borrarContacto} // Función para borrar el contacto
                    />
                ))}
            </div>
        </div>
    )
}

export default Contactos
