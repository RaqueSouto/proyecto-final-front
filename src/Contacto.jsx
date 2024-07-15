import { useState } from 'react'

function Contacto({ id, textoNombre, textoTel, textoMail, editarTexto, borrarContacto }) {
    // Estado para determinar cuándo se está editando la información
    let [update, setUpdate] = useState(false)
    // Estado para almacenar temporalmente el nombre del contacto
    let [nombreTemporal, setNombreTemporal] = useState(textoNombre)
    // Estado para almacenar temporalmente el teléfono del contacto
    let [telTemporal, setTelTemporal] = useState(textoTel)
    // Estado para almacenar temporalmente el correo del contacto
    let [mailTemporal, setMailTemporal] = useState(textoMail)

    // Función para manejar la acción de guardar los cambios
    const handleSave = () => {
        if (nombreTemporal.trim() === "" || telTemporal.trim() === "" || mailTemporal.trim() === "") {
            // Validar que todos los campos estén llenos
            alert("All fields must be filled out.") 
            return
        }

        if (nombreTemporal !== textoNombre) {
            // Editar el nombre si ha cambiado
            editarTexto(id, nombreTemporal, 'textoNombre') 
        }
        if (telTemporal !== textoTel) {
            // Editar el teléfono si ha cambiado
            editarTexto(id, telTemporal, 'textoTel') 
        }
        if (mailTemporal !== textoMail) {
            // Editar el correo si ha cambiado
            editarTexto(id, mailTemporal, 'textoMail') 
        }
        // Terminar la edición
        setUpdate(false) 
    }

    return (
        <div className="contenedor-info">
            <div className="contacto-img"></div>
            <div className="contenedor-datos">
                <p className="info-p">Name: <span className={!update ? "visible" : ""}>{textoNombre}</span>
                    <input className={update ? "visible" : ""} 
                    type="text" 
                    value={nombreTemporal}
                    onChange={evento => setNombreTemporal(evento.target.value)} /> 
                </p>
                <p className="info-p">Phone: <span className={!update ? "visible" : ""}>{textoTel}</span>
                    <input className={update ? "visible" : ""} 
                    type="text" 
                    value={telTemporal}
                    onChange={evento => setTelTemporal(evento.target.value)} />
                </p>
                <p className="info-p">Mail: <span className={!update ? "visible" : ""}>{textoMail}</span>
                    <input className={update ? "visible" : ""} 
                    type="text" 
                    value={mailTemporal}
                    onChange={evento => setMailTemporal(evento.target.value)} />
                </p>
            </div>
            <div className="contenedor-btn">
                <div className="btn" onClick={async () => {
                    if (update) {
                        // Validar y enviar los cambios si se están editando los campos
                        if (nombreTemporal.trim() !== "" && telTemporal.trim() !== "" && mailTemporal.trim() !== "" &&
                            (nombreTemporal.trim() !== textoNombre || telTemporal.trim() !== textoTel || mailTemporal.trim() !== textoMail)) {
                            let { error } = await fetch(`https://proyecto-final-back-lpmu.onrender.com/contactos/actualizar/${id}/1`, {
                                method: "PUT",
                                body: JSON.stringify({
                                    textoNombre: nombreTemporal.trim(),
                                    textoTel: telTemporal.trim(),
                                    textoMail: mailTemporal.trim()
                                }),
                                headers: {
                                    "Content-type": "application/json"
                                }
                            })
                            .then(respuesta => respuesta.json())

                            if (!error) {
                                setNombreTemporal(nombreTemporal.trim())
                                setTelTemporal(telTemporal.trim())
                                setMailTemporal(mailTemporal.trim())
                                setUpdate(false)
                                return editarTexto(id, nombreTemporal.trim(), 'textoNombre') &&
                                       editarTexto(id, telTemporal.trim(), 'textoTel') &&
                                       editarTexto(id, mailTemporal.trim(), 'textoMail')
                            }
                            // Manejar el error en la actualización
                            console.log("mostrar error al usuario") 
                        } else {
                            // Llamar a la función de guardado si los campos son válidos
                            handleSave() 
                        }
                    } else {
                        // Activar el modo de edición
                        setUpdate(true) 
                    }
                }}>{update ? "Save" : "Update"}</div>
                <div className="btn" onClick={() => {
                    // Función para borrar el contacto
                    fetch(`https://proyecto-final-back-lpmu.onrender.com/contactos/borrar/${id}`, {
                        method: "DELETE"
                    })
                    .then(respuesta => respuesta.json())
                    .then(({ error }) => {
                        if (!error) {
                            // Borrar el contacto si no hay error
                            return borrarContacto(id) 
                        }
                        // Manejar el error en la eliminación del contacto
                        console.log("mostrar error al usuario") 
                    })
                }}>Delete</div>
            </div>
        </div>
    )
}

export default Contacto
