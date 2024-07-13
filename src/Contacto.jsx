import { useState } from 'react';

function Contacto({ id, textoNombre, textoTel, textoMail, editarTexto, borrarContacto }) {
    // Para determinar cuándo se está editando la información
    let [update, setUpdate] = useState(false);
    // Para determinar el nombre temporal del contacto
    let [nombreTemporal, setNombreTemporal] = useState(textoNombre);
    // Para determinar el teléfono temporal del contacto
    let [telTemporal, setTelTemporal] = useState(textoTel);
    // Para determinar el correo temporal del contacto
    let [mailTemporal, setMailTemporal] = useState(textoMail);

    const handleSave = () => {
        if (nombreTemporal.trim() === "" || telTemporal.trim() === "" || mailTemporal.trim() === "") {
            alert("All fields must be filled out.");
            return;
        }

        if (nombreTemporal !== textoNombre) {
            editarTexto(id, nombreTemporal, 'textoNombre');
        }
        if (telTemporal !== textoTel) {
            editarTexto(id, telTemporal, 'textoTel');
        }
        if (mailTemporal !== textoMail) {
            editarTexto(id, mailTemporal, 'textoMail');
        }
        setUpdate(false);
    };

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
                <div className="btn" onClick={() => {
                    if (update) {
                        handleSave();
                    } else {
                        setUpdate(true);
                    }
                }}>{update ? "Save" : "Update"}</div>
                <div className="btn" onClick={() => borrarContacto(id)}>Delete</div>
            </div>
        </div>
    );
}

export default Contacto;
