import throttle from 'lodash.throttle';

console.log(localStorage);

const KEY = 'feedback-form-state';

const obj = {};

const refs = {
    form: document.querySelector('.feedback-form'),
    emailInput: document.querySelector('input'),
    textArea: document.querySelector('textarea'),
}

const formListener = refs.form.addEventListener('submit', onSubmitClick);
const emailInputListener = refs.emailInput.addEventListener('input', throttle(onEmailInput, 500));
const textAreaListener = refs.textArea.addEventListener('input', throttle(onTextArea, 500));

function onEmailInput(e) {

    setEmailInput();

    const { name, value } = e.target;

    obj[name] = value;

    localStorage.setItem(KEY, JSON.stringify(obj));
}

function onTextArea(ev) {

    setTextArea();
    
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

    if (emailText) {
        
        refs.emailInput.value = JSON.parse(emailText).email;
        console.log(refs.emailInput.value);
    }
};

function setTextArea() {

    if (localStorage.getItem(KEY)) {

        refs.textArea.value = JSON.parse(localStorage.getItem(KEY)).message;
    }
};


export default {
    refs,
    // formListener,
    // emailInputListener,
    // textAreaListener,
    onEmailInput,
    onTextArea,
    onSubmitClick,
    setEmailInput,
    setTextArea,
}

// 