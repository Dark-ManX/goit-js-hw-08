import throttle from 'lodash.throttle';

console.log(localStorage);

const KEY = 'feedback-form-state';

const obj = {};

const refs = {
    form: document.querySelector('.feedback-form'),
    emailInput: document.querySelector('input'),
    textArea: document.querySelector('textarea'),
}

refs.form.addEventListener('submit', onSubmitClick);
refs.emailInput.addEventListener('input', throttle(onEmailInput, 500));
refs.textArea.addEventListener('input', throttle(onTextArea, 500));

const setMail = setEmailInput();
const setMessage = setTextArea();

function onEmailInput(e) {

    const { name, value } = e.target;

    obj[name] = value;

    localStorage.setItem(KEY, JSON.stringify(obj));
}

function onTextArea(ev) {

    const { name, value } = ev.target;

    obj[name] = value;

    localStorage.setItem(KEY, JSON.stringify(obj));
}

function onSubmitClick(evt) {
    evt.preventDefault();

    if (refs.emailInput.value === '' || refs.textArea.value === '') {
        
        return alert('заполните поля уважаемый');
    }

    try {
        const data = JSON.stringify(obj);

    } catch (error) {
        console.log(error.name);
        console.log(error.message);
    }

    refs.form.reset();
    localStorage.removeItem(KEY);
    localStorage.setItem(KEY, JSON.stringify(obj)); 
}

function setEmailInput() {
    
    const emailText = localStorage.getItem(KEY);

    if (emailText.includes('message')) {
        
        return refs.emailInput.value = JSON.parse(emailText).email;
    }

    return refs.emailInput.value = '';
};

function setTextArea() {

    if (localStorage.getItem(KEY).includes('message')) {

        return refs.textArea.value = JSON.parse(localStorage.getItem(KEY)).message;
    }
    return refs.textArea.value = '';
};


export default {
    refs,
    setMail,
    setMessage,
    onEmailInput,
    onTextArea,
    onSubmitClick,
    setEmailInput,
    setTextArea,
}
//