import {alertCreation} from "./alert_creation.js";

const authForm = document.getElementById("authForm");

authForm.addEventListener('keypress', function(event) {
    if (event.key === 'Enter') {
        event.preventDefault();
        document.getElementById('submitButton').click();
    }
});

document.querySelector('#submitButton').addEventListener('click', () => {
    authForm.onsubmit = async function(event) {
        event.preventDefault();

        const authData = new FormData(authForm);
        const response = await fetch(`/auth/`, {
            method: "POST",
            body: authData
        });

        if (response.ok)
            window.location.replace("/trolleybuspark/");
        if (!response.ok)
            alertCreation("Неверные логин или пароль.", authForm);
    };
});