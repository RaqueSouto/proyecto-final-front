import { useState } from 'react';

function Formulario({ crearContacto }) {
    // Para determinar el estado del nombre
    let [nombreTemporal, setNombreTemporal] = useState("");
    // Para determinar el estado del número de teléfono
    let [telTemporal, setTelTemporal] = useState("");
    // Para determinar el estado del correo electrónico
    let [mailTemporal, setMailTemporal] = useState("");

    return (
        <form className="formulario" onSubmit={evento => {
            evento.preventDefault();

            if (nombreTemporal.trim() !== "" && telTemporal.trim() !== "" && mailTemporal.trim() !== "") {
                crearContacto({
                    id: Math.random(),
                    textoNombre: nombreTemporal.trim(),
                    textoTel: telTemporal.trim(),
                    textoMail: mailTemporal.trim()
                });
                setNombreTemporal("");
                setTelTemporal("");
                setMailTemporal("");
            } else {
                alert("All fields must be filled out.");
            }
        }}>
            <input type="text" className="formulario-input"
                placeholder="Name"
                value={nombreTemporal}
                onChange={evento => setNombreTemporal(evento.target.value)} />
            <input type="text" className="formulario-input"
                placeholder="Phone Number"
                value={telTemporal}
                onChange={evento => setTelTemporal(evento.target.value)} />
            <input type="text" className="formulario-input"
                placeholder="Mail"
                value={mailTemporal}
                onChange={evento => setMailTemporal(evento.target.value)} />
            <input type="submit" className="btn" value="+ add contact" />
        </form>
    );
}

export default Formulario;
