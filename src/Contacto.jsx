import { useState } from 'react'

function Contacto() {
    return (
        <div className="contenedor-info">
            <div className="contacto-img"></div>
            <div className="contenedor-datos">
                <p className="info-p">Name: Paquito López</p>
                <p className="info-p">Phone: 666666666</p>
                <p className="info-p">Mail: paquitolopez@paquitolopez.com</p>
            </div>
            <div className="contenedor-btn">
                <div className="btn">Update</div>
                <div className="btn">Delete</div>
                <div className="btn">Save</div>
            </div>
        </div>
    )
}

export default Contacto