import React, {useRef} from 'react';

const Form = ({ onChangeFunction, labelText, formClassName, onSubmitFunction}) => {
    const inputRef = useRef();
  return (
    <form className={formClassName} onSubmit={onSubmitFunction}>
        <label htmlFor="teamName">{labelText}</label>
        <input ref={inputRef} type="text" name="teamName" id="#teamName" onChange={onChangeFunction}/>
        {inputRef.current?.value.length > 0 && inputRef.current?.value.length < 3 &&
            (<span>Minimum 3 znaki</span>)
        }
        <button type="submit" disabled={!(inputRef.current?.value.length >= 3)}>Wyślij</button>
    </form>
  )
}

export default Form