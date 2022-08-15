import { useRef, useState } from 'react';
import classes from './Checkout.module.css';

const isEmpty = value => value.trim()==='';
const isFive = value => value.trim().length === 5;

const Checkout = (props) => {   
    const nameInputRef = useRef()
    const streetInputRef = useRef()
    const postalInputRef = useRef()
    const cityInputRef = useRef()

    const [formValid,setFormValid]=useState({
        name:true,
        street:true,
        city:true,
        postalCode:true
    })


    const confirmHandler = (event) => {
        event.preventDefault();

        const inputName = nameInputRef.current.value
        const inputStreet = streetInputRef.current.value
        const inputPostal = postalInputRef.current.value
        const inputCity = cityInputRef.current.value

        const nameValid = !isEmpty(inputName)
        const streetValid = !isEmpty(inputStreet)
        const postalValid = isFive(inputPostal)
        const cityValid = !isEmpty(inputCity)

        setFormValid({
            name:nameValid,
            street:streetValid,
            city:cityValid,
            postalCode:postalValid
        })

        const formIsValid = nameValid && streetValid && postalValid && cityValid
        if(!formIsValid){
            return;
        }

        props.onAdd({
            name:inputName,
            street:inputStreet,
            postal:inputPostal,
            city:inputCity
        })

    };

    return (
    <form className={classes.form} onSubmit={confirmHandler}>
        <div className={`${classes.control} ${formValid.name?'':classes.invalid}`}>
        <label htmlFor='name'>Your Name</label>
        <input type='text' id='name' ref={nameInputRef}/>
        {!formValid.name&&<p>Must be valid</p>}
        </div>

        <div className={`${classes.control} ${formValid.street?'':classes.invalid}`}>
        <label htmlFor='street'>Street</label>
        <input type='text' id='street' ref={streetInputRef}/>
        {!formValid.street&&<p>Must be valid</p>}
        </div>

        <div className={`${classes.control} ${formValid.postalCode?'':classes.invalid}`}>
        <label htmlFor='postal'>Postal Code</label>
        <input type='text' id='postal' ref={postalInputRef}/>
        {!formValid.postalCode&&<p>Must be valid</p>}
        </div>

        <div className={`${classes.control} ${formValid.city?'':classes.invalid}`}>
            <label htmlFor='city'>City</label>
            <input type='text' id='city' ref={cityInputRef}/>
            {!formValid.city&&<p>Must be valid</p>}
        </div>

        <div className={classes.actions}>
        <button type='button' onClick={props.onClose}>
            Cancel
        </button>
        <button className={classes.submit} >Confirm</button>
        </div>
    </form>
    );
};

export default Checkout;