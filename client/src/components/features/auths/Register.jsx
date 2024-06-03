import React, { useEffect, useRef, useState } from 'react';
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
const Register = () => {
    const [visible, setVisible] = useState(true)

    const [registerFunc, { isError, error, isSuccess, data }] = useRegisterMutation()
    var name = useRef('')
    var password = useRef('')
    var birthDate = useRef('')
    var sex = useRef('')
    var sector = useRef({ key: '', name: '' })
    var username = useRef('')
    var email = useRef('')
    const register = (e) => {
        registerFunc({ name: name.current.value, username: username.current.value, password: password.current.value, birthDate: birthDate.current.value, email: email.current.value, sex: sex.current.value, sector: sector.current.value })
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
        { name: 'לא משתייך', key: 'E' }
    ];
    const [selectedCategory, setSelectedCategory] = useState('');
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
            <Button label="No" icon="pi pi-times" onClick={() => setVisible(false)} className="p-button-text" />
            <Button label="Yes" icon="pi pi-check" type='submit' onClick={() => { formik.handleSubmit() }} autoFocus />
        </div>
    );

    return (
        <div className="newUser">


            <Dialog header="Header" visible={visible} style={{ minWidth: '30vw', maxWidth: '50vw', textAlign: 'center' }} onHide={() => setVisible(false)} footer={footerContent}>
                <div>
                    <div className="inline-flex flex-column gap-2">
                        <label htmlFor="name" className="font-semibold">
                            name
                        </label>

                        <AutoComplete id="name" style={{ width: '400px' }} label="Name" /*className="bg-white-alpha-20 border-#black p-3"*/ inputRef={name} value={formik.values.name} /*placeholder={title.current}*/
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
                            Username
                        </label>
                        <AutoComplete style={{ width: '400px' }} id="username" label="Username" /*className="bg-white-alpha-20 border-#black p-3"*/ inputRef={username} value={formik.values.username}
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
                            password
                        </label>
                        <Password style={{ width: '400px', height: '50px' }} value={formik.values.password} toggleMask
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

                        <br /><br />
                    </div>
                    <div className="inline-flex flex-column gap-2" >
                        <label htmlFor="birthDate" className="font-semibold">
                            birthDate
                        </label>
                        <Calendar style={{ width: '400px', height: '50px' }} value={date} onChange={(e) => setDate(e.value)} locale="es" inputRef={birthDate} />
                    </div><br /><br /><br />
                    <div className="inline-flex flex-column gap-2">
                        <label htmlFor="email" className="font-semibold">
                            email
                        </label>
                        <InputText style={{ width: '400px' }} id="email" label="Email" keyfilter="email" className="bg-white-alpha-20 border-#black p-3" ref={email}>

                        </InputText>
                    </div><br /><br />
                    <label htmlFor="sex" className="font-semibold">
                        sex
                    </label>

                    <div className="bg-white-alpha-20 border-#black p-3">

                        <div className="flex align-items-center gap-2">

                            <div className="flex align-items-center gap-2" ref={sex}>

                                <label htmlFor="ingredient2" className="ml-2">נקבה&nbsp;</label>
                                <RadioButton inputId="ingredient2" name="female" value="נקבה" onChange={(e) => { setIngredient(e.value); sex.current.value = e.value }}
                                    checked={ingredient === 'נקבה'}
                                />
                            </div>
                            <div className="flex align-items-center gap-2">

                                <label htmlFor="ingredient1" className="ml-2">זכר&nbsp;</label>
                                <RadioButton inputId="ingredient1" name="male" value="זכר" onChange={(e) => { setIngredient(e.value); sex.current.value = e.value }}
                                    checked={ingredient === 'זכר'}

                                />
                            </div>
                        </div>
                    </div>
                    <div className="card flex justify-content-right">
                        <label htmlFor="sector" className="font-semibold">
                            sector
                        </label> <br /> <br /> <br /> <br />
                        <div className="flex justify-content-right gap-3">
                            {categories.map((category) => {
                                return (
                                    <div key={category.key} className="flex align-items-center">

                                        <RadioButton inputId={category.key} name="category" value={category}
                                            onChange={(e) => { setSelectedCategory(e.value); sector.current.value = e.value }}
                                            checked={selectedCategory.key === category.key}
                                        />
                                        <label htmlFor={category.key} className="ml-2">{category.name}</label>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>
            </Dialog>
        </div>
    )
}
export default Register

