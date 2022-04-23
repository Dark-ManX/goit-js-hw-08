import throttle from 'lodash.throttle';

console.log(localStorage);

const KEY = 'feedback-form-state';
    
const obj = {};

const refs = {
    form: document.querySelector('.feedback-form'),
    emailInput: document.querySelector('input'),
    textArea: document.querySelector('textarea'),
}

const formText = refs.form.elements;

refs.form.addEventListener('submit', onSubmitClick);
refs.form.addEventListener('input', throttle(setFormFields, 500));

onLoadValue();

function onLoadValue() {

    const getField = localStorage.getItem(KEY);

    if (getField && getField !== '') {

        formText.email.value = JSON.parse(getField).email;
        formText.message.value = JSON.parse(getField).message;
    } 
}

function setFormFields() {
   
    obj[formText.email.name] = formText.email.value;
    obj[formText.message.name] = formText.message.value;
    
    try {
        const data = JSON.stringify(obj);

    } catch (error) {
        console.log(error.name);
        console.log(error.message);
    }

    localStorage.setItem(KEY, JSON.stringify(obj)); 
}

function onSubmitClick(evt) {
    evt.preventDefault();    

    if (formText.email.value === '' || formText.message.value === '') {
        
        return alert('заполните поля уважаемый');
    }
    
    refs.form.reset();
    localStorage.removeItem(KEY);
    localStorage.setItem(KEY, JSON.stringify(obj));
}

export default {
    refs,
    onLoadValue,
    setFormFields,
    onSubmitClick,
}
//
