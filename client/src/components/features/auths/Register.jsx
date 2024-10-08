import React, { useRef, useState } from 'react';
import { useRegisterMutation } from './authApiSlice';
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import { Calendar } from 'primereact/calendar';
import { addLocale } from 'primereact/api';
import { Password } from 'primereact/password';
import { RadioButton } from "primereact/radiobutton";
import { useFormik } from 'formik';
import { classNames } from 'primereact/utils';
import { AutoComplete } from 'primereact/autocomplete';
import { Fieldset } from 'primereact/fieldset';
const Register = (props) => {
    const [visible, setVisible] = useState(true)

    const [registerFunc, { isError, error, isSuccess, data }] =
        useRegisterMutation()

    var name = useRef('')
    var password = useRef('')
    var birthDate = useRef('')
    var gender = useRef('')
    var sector = useRef({ key: '', name: '' })
    var username = useRef('')
    var email = useRef('')
    const register = async(e) => {
        if(sector?.current?.value?.name){sector=sector?.current?.value?.name}else{sector=undefined}
        await registerFunc({name:name.current.value, username:username.current.value, password:password.current.value, birthDate:birthDate.current.value, email:email.current.value, gender:gender.current.value, sector:sector})
        window.location.reload(true);
    };

    const [value, setValue] = useState('');
    const [date, setDate] = useState(null);
    const [ingredient, setIngredient] = useState('');
    addLocale('es', {
        firstDayOfWeek: 1,
        showMonthAfterYear: true,
        dayNames: ['domingo', 'lunes', 'martes', 'miércoles', 'jueves', 'viernes', 'sábado'],
        dayNamesShort: ['dom', 'lun', 'mar', 'mié', 'jue', 'vie', 'sáb'],
        dayNamesMin: ['D', 'L', 'M', 'X', 'J', 'V', 'S'],
        monthNames: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
        monthNamesShort: ['ene', 'feb', 'mar', 'abr', 'may', 'jun', 'jul', 'ago', 'sep', 'oct', 'nov', 'dic'],
        today: 'Hoy',
        clear: 'Limpiar'
    });


    const categories = [
        { name: 'חרדי', key: 'A' },
        { name: 'חילוני', key: 'B' },
        { name: 'דתי לאומי', key: 'C' },
        { name: 'מסורתי', key: 'D' },
        { name: 'לא משתייך', key: 'E' },
        { name: 'נקה בחירה', key: 'F' }
    ];
    const [selectedCategory, setSelectedCategory] = useState("");
    const [textn, setTextn] = useState('')
    const [textu, setTextu] = useState('')
    const [textp, setTextp] = useState('')
    const formik = useFormik({
        initialValues: {
            name: "",
            username: "",
            password: ""

        },
        validate: (data) => {
            let errors = {};
            if (!data.name) {
               
                errors.name = 'שדה חובה';
                

            }
            if (!data.username) {
                
                errors.username = 'שדה חובה';
            } if (!data.password) {
                errors.password = 'שדה חובה';
            }


            return errors;
        },
        onSubmit: async () => {
            await register();
            setVisible(false)

        }
    });
    const isFormFieldInvalid = (name) => !!(formik.touched[name] && formik.errors[name]);

    const getFormErrorMessage = (name) => {
        return isFormFieldInvalid(name) ? <small className="p-error">{formik.errors[name]}</small> : <small className="p-error">&nbsp;</small>;
    };

    const footerContent = (
        <div>
            <Button label="בטל" icon="pi pi-times" onClick={() => setVisible(false)} className="p-button-text" />
            <Button label="כניסה" icon="pi pi-check" type='submit' onClick={formik.handleSubmit} autoFocus />
        </div>
    );

    return (
        <div className="newUser">


            <Dialog header="הרשמה" visible={visible} style={{ minWidth: '50vw', maxWidth: '70vw', textAlign: 'center' }} onHide={() => setVisible(false)} footer={footerContent}>
                <div>
                    <div className="inline-flex flex-column gap-2">
                        <label htmlFor="name" className="font-semibold">
                            שם פרטי
                        </label>

                        <AutoComplete id="autoCompl1" style={{ width: '400px' }} label="Name" inputRef={name} value={formik.values.name}
                            name='name'
                            className={classNames({ 'p-invalid': isFormFieldInvalid('name') })}
                            onChange={(e) => {
                                setTextn(e.value)
                                formik.setFieldValue('name', e.value);
                            }}
                        />
                        {getFormErrorMessage('name')}
                    </div><br /><br /><br />
                    <div className="inline-flex flex-column gap-2">
                        <label htmlFor="username" className="font-semibold">
                            שם משתמש
                        </label>
                        <AutoComplete id="autoCompl2"style={{ width: '400px' }} label="Username" inputRef={username} value={formik.values.username}
                            name='username'
                            className={classNames({ 'p-invalid': isFormFieldInvalid('username') })}
                            onChange={(e) => {
                                setTextu(e.value)
                                formik.setFieldValue('username', e.value);
                            }}
                        />
                        {getFormErrorMessage('username')}
                    </div><br /><br /><br />
                    <div className="inline-flex flex-column gap-2 p-fluid">
                        <label htmlFor="password" className="font-semibold">
                            סיסמה
                        </label>
                        <Password id="password1" style={{ width: '400px', height: '50px' }} value={formik.values.password} toggleMask
                            promptLabel="Choose a password" weakLabel="Too simple" mediumLabel="Average complexity" strongLabel="Complex password"
                            inputRef={password}
                            name="password"
                            className={classNames({ 'p-invalid': isFormFieldInvalid('password') })}
                            onChange={(e) => {
                                setValue(e.target.value)
                                setTextp(e.target.value)
                                formik.setFieldValue('password', e.target.value);
                            }}
                        />
                        {getFormErrorMessage('password')}

                        
                    </div><br /><br />
                    <div className="inline-flex flex-column gap-2" >
                        <label htmlFor="birthDate" className="font-semibold">
                            תאריך לידה
                        </label>
                        <Calendar id='calendar1' style={{ width: '400px', height: '50px' }} value={date} onChange={(e) => setDate(e.value)} locale="es" inputRef={birthDate} />
                    </div><br /><br /><br /><br />
                    <div className="inline-flex flex-column gap-2">
                        <label htmlFor="email" className="font-semibold">
                            מייל
                        </label>
                        <InputText style={{ width: '400px',textAlign:'center',margin:'auto', height:'50px' }} id="email1" label="Email" keyfilter="email" className="" ref={email}>

                        </InputText>
                    </div><br /><br /><br/><br />
                    <div className="inline-flex flex-column gap-2">
                    <label htmlFor="gender" className="font-semibold">
                           מגדר
                        </label>
                    <Fieldset dir='rtl'style={{ width: '400px', textAlign:'center',margin:'auto', height:'50px'}}>
    <p className="m-0">

                        <div className="flex align-items-center gap-2">

                            <div className="flex align-items-center gap-2" ref={gender}>

                              
                                <RadioButton inputId="ingredient2" name="female" value="נקבה" onChange={(e) => { setIngredient(e.value); gender.current.value = e.value }}
                                    checked={ingredient === 'נקבה'}
                                />  <label htmlFor="ingredient2" className="ml-2">נקבה&nbsp;</label>
                            </div>
                            <div className="flex align-items-center gap-2">

                                
                                <RadioButton inputId="ingredient1" name="male" value="זכר" onChange={(e) => { setIngredient(e.value); gender.current.value = e.value }}
                                    checked={ingredient === 'זכר'}

                                /><label htmlFor="ingredient1" className="ml-2">זכר&nbsp;</label>
                            </div>
                            <div className="flex align-items-center gap-2" ref={gender}>

                              
                                <RadioButton inputId="ingredient2" name="clear" value={"לא נבחר"} onChange={(e) => { setIngredient(e.value); gender.current.value = e.value }}
                                    checked={false}
                                />  <label htmlFor="ingredient2" className="ml-2">נקה בחירה&nbsp;</label>
                            </div>
                        </div>
                    </p>
</Fieldset></div><br/><br/><br /><br/>
<div className="inline-flex flex-column gap-2">
                    <label htmlFor="sector" className="font-semibold">
                        מגזר
                        </label>
                    <Fieldset dir='rtl'style={{ width: '400px', textAlign:'center',margin:'auto', height:'50px'}}>
    <p className="m-0">
                       
                        <div className="flex justify-content-right gap-3">
                            {categories.map((category) => {
                                return (
                                    <div key={category.key} className="flex align-items-center">
                                       

                                        <RadioButton inputId={category.key} name="category" value={category}
                                            onChange={(e) => { setSelectedCategory(e.value); sector.current.value = e.value }}
                                            checked={selectedCategory.key=="F"?false:selectedCategory.key === category.key}
                                        /> <label id="radios"htmlFor={category.key} className="ml-2">{category.name}</label>
                                        
                                    </div>
                                );
                            })}
                           
                        </div></p>
</Fieldset></div>
                    </div>
            </Dialog>
        </div>
    )
}
export default Register
