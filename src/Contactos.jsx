import { useState } from 'react'
import Formulario from './Formulario'
import Contacto from './Contacto'

function Contactos() {
    // Para determinar los contactos de la agenda
    let [contactos, setContacto] = useState([])

    // Función para crear los contactos
    function crearContacto(contacto) {
        setContacto([...contactos, contacto])
    }

    // Función para editar los textos
    function editarTexto(id, nuevoTexto, campo) {
        setContacto(contactos.map(contacto => {
            if (contacto.id === id) {
                return { ...contacto, [campo]: nuevoTexto }
            }
            return contacto
        }));
    }

    // Función para borrar el contacto
    function borrarContacto(id) {
        setContacto(contactos.filter(contacto => contacto.id !== id))
    }

    return (
        <div className="contenedor">
            <div className="contenedor-contacto">
                <h1 className="contacto-h1">CONTACTS</h1>
                <Formulario crearContacto={crearContacto} />
                {contactos.map(({ id, textoNombre, textoTel, textoMail }) => (
                    <Contacto 
                        key={id} 
                        id={id} 
                        textoNombre={textoNombre} 
                        textoTel={textoTel} 
                        textoMail={textoMail} 
                        editarTexto={editarTexto} 
                        borrarContacto={borrarContacto} 
                    />
                ))}
            </div>
        </div>
    )
}

export default Contactos
