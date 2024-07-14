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
            evento.preventDefault() // Prevenir el comportamiento por defecto del formulario

            // Validar que todos los campos estén llenos
            if (nombreTemporal.trim() !== "" && telTemporal.trim() !== "" && mailTemporal.trim() !== "") {
                try {
                    // Realizar la petición POST para crear un nuevo contacto
                    let response = await fetch("http://localhost:4000/contactos/nuevo", {
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
                        setNombreTemporal("") // Limpiar el campo del nombre
                        setTelTemporal("") // Limpiar el campo del teléfono
                        setMailTemporal("") // Limpiar el campo del correo
                    } else {
                        alert("Error al crear contacto") // Mostrar alerta de error
                    }
                } catch (error) {
                    alert("Error de conexión") // Mostrar alerta de error de conexión
                }
            } else {
                alert("Todos los campos deben estar llenos.") // Mostrar alerta si los campos están vacíos
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
