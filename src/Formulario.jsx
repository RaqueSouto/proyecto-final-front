import { useState } from 'react'

function Formulario({ crearContacto }) {
    // Estado para almacenar temporalmente el nombre del contacto
    let [nombreTemporal, setNombreTemporal] = useState("")
    // Estado para almacenar temporalmente el número de teléfono del contacto
    let [telTemporal, setTelTemporal] = useState("")
    // Estado para almacenar temporalmente el correo electrónico del contacto
    let [mailTemporal, setMailTemporal] = useState("")

    return (
        <form className="formulario" onSubmit={async evento => {
            // Prevenir el comportamiento por defecto del formulario
            evento.preventDefault() 

            // Validar que todos los campos estén llenos
            if (nombreTemporal.trim() !== "" && telTemporal.trim() !== "" && mailTemporal.trim() !== "") {
                try {
                    // Realizar la petición POST para crear un nuevo contacto
                    let response = await fetch("https://proyecto-final-back-lpmu.onrender.com/contactos/nuevo", {
                        method: "POST",
                        body: JSON.stringify({
                            textoNombre: nombreTemporal.trim(),
                            textoTel: telTemporal.trim(),
                            textoMail: mailTemporal.trim()
                        }),
                        headers: {
                            "Content-type": "application/json"
                        }
                    });
                    let { error, id } = await response.json()

                    // Si no hay error, actualizar el estado y limpiar el formulario
                    if (!error) {
                        crearContacto({
                            id,
                            textoNombre: nombreTemporal.trim(),
                            textoTel: telTemporal.trim(),
                            textoMail: mailTemporal.trim()
                        });
                        // Limpiar el campo del nombre
                        setNombreTemporal("") 
                        // Limpiar el campo del teléfono
                        setTelTemporal("") 
                        // Limpiar el campo del correo
                        setMailTemporal("") 
                    } else {
                        // Mostrar alerta de error
                        alert("Error al crear contacto") 
                    }
                } catch (error) {
                    // Mostrar alerta de error de conexión
                    alert("Error de conexión") 
                }
            } else {
                // Mostrar alerta si los campos están vacíos
                alert("Todos los campos deben estar llenos.") 
            }
        }}>
            <input type="text" className="formulario-input"
                placeholder="Name"
                value={nombreTemporal}
                onChange={evento => setNombreTemporal(evento.target.value)} /> {/* Actualizar el estado del nombre */}
            <input type="text" className="formulario-input"
                placeholder="Phone Number"
                value={telTemporal}
                onChange={evento => setTelTemporal(evento.target.value)} /> {/* Actualizar el estado del teléfono */}
            <input type="text" className="formulario-input"
                placeholder="Mail"
                value={mailTemporal}
                onChange={evento => setMailTemporal(evento.target.value)} /> {/* Actualizar el estado del correo */}
            <input type="submit" className="btn" value="+ add contact" /> {/* Botón para enviar el formulario */}
        </form>
    );
}

export default Formulario
