import {useState} from 'react'


function Formulario() {
    return (
            <form action="" className="formulario">
                <input type="text" className="formulario-input" placeholder="Name"/>
                <input type="text" className="formulario-input" placeholder="Phone Number"/>
                <input type="text" className="formulario-input" placeholder="Mail"/>
                <input type="submit" className="btn" value="+ add contact" />
            </form>
            )
}

export default Formulario