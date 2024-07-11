import { useState, useEffect } from 'react'
import Formulario from './Formulario'
import Contacto from './Contacto'

function Contactos() {
    return (
        <>
            <div className="contenedor">
                <div className="contenedor-contacto">
                    <h1 className="contacto-h1">CONTACTS</h1>
                    <Formulario />
                    <Contacto />
                </div>
            </div>
        </>
    )
}

export default Contactos