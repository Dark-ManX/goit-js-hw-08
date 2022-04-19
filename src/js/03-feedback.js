import throttle from 'lodash.throttle';

const storage = window.localStorage;
    
const formRef = document.querySelector('.feedback-form');

const emailInput = formRef.querySelector('input');

const setEmailInput = (emailInput) => {

    if (storage['feedback-form-state']) {
        return emailInput.value = JSON.parse(storage['feedback-form-state']).email;
    }   

    null;
}

const textArea = formRef.querySelector('textarea');

const setTextArea = (textArea) => {

    if (storage['feedback-form-state']) {
        return textArea.value = JSON.parse(storage['feedback-form-state']).message;
    }

    null;
}

const onSubmitClick = (evt) => {
    evt.preventDefault();

    storage.clear();

    const {
        elements: {
            email, message
        }
    } = evt.currentTarget;
    
    const obj = {
        [email.name]: email.value,
        [message.name]: message.value,
    }
    
    try {
        const data = JSON.stringify(obj);
    } catch (error) {
        console.log(error.name);
        console.log(error.message);
    }

    console.log(JSON.stringify(obj));
    return storage['feedback-form-state'] = JSON.stringify(obj);
}

const throttledOnSubmitClick = throttle(onSubmitClick, 500);


const formRefListener = formRef.addEventListener('submit', throttledOnSubmitClick);

export default {
    storage,
    formRef,
    emailInput,
    setEmailInput,
    textArea,
    setTextArea,
    onSubmitClick,
    throttledOnSubmitClick,
    formRefListener,
}
