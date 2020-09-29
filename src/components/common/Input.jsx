import React from 'react';

const Input = ({name,label,placeholder,type,accept,value,onChange,reference}) => {
    return ( 
        <div className="form-group row">
            <label htmlFor={name} className="col-sm-2 col-form-label">{label}</label>
            <div className="col-sm-10">
                <input type={type} name={name} accept={accept || null} ref={reference || null} onChange={onChange} className="form-control" id={name} placeholder={placeholder} value={value} />
            </div>
        </div>
     );
}

const Button = ({text}) => {
    return (
        <div className="form-group row">
            <div className="col-sm-10">
                <button type="submit" className="btn btn-primary">{text}</button>
            </div>
        </div>
    )
}

const Selection = ({list,propertyName,name,id,label,multiple, onChange, value})=>{
    return (
        <div className="form-group row">
            <label htmlFor={name} className="col-sm-2 col-form-label">{label}</label>
            <div className="col-sm-10">
                <select value={value} multiple={multiple} id={name} onChange={onChange} name={name} className="form-control">
                    {list.map(item => <option value={item[id]} key={item[id]}>{item[propertyName]}</option>)}
                </select>
            </div>
        </div>
    )   
}

export {Input, Button, Selection};