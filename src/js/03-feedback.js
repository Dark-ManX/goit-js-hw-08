import throttle from 'lodash.throttle';

console.log(JSON.parse(localStorage.getItem(['feedback-form-state'])));

const obj = {};

const formRef = document.querySelector('.feedback-form');
console.log(localStorage['feedback-form-state']);

const checkStorage = ({elements: {email, message}}) => {
    if (!localStorage.getItem(['feedback-form-state'])) {
    
        return;
    }

    email = JSON.parse(localStorage.getItem(['feedback-form-state'])).email;
    message = JSON.parse(localStorage.getItem(['feedback-form-state'])).message;
}

const onSubmitClick = (evt) => {
    evt.preventDefault();
    
    localStorage.clear();

    const {
        elements: {
            email, message
        }
    } = evt.currentTarget;

    if (email.value === '' || message.value === '') {
        
        return alert('заполните поля уважаемый');
    }

        obj[email.name] = email.value;
        obj[message.name] = message.value;

    try {
        const data = JSON.stringify(obj);

    } catch (error) {
        console.log(error.name);
        console.log(error.message);
    }

    return localStorage.setItem(['feedback-form-state'], JSON.stringify(obj)); 
}

const throttledOnSubmitClick = throttle(onSubmitClick, 500);


const formRefListener = formRef.addEventListener('submit', throttledOnSubmitClick);

export default {
    formRef,
    checkStorage,
    onSubmitClick,
    throttledOnSubmitClick,
    formRefListener,
}
