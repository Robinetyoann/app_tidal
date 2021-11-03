$(() => {
    $("form[name='registration']").validate({
        rules: {
            firstname: {
                required: true

            },
            lastname: {
                required: true

            },
            email: {
                required: false,
                email: true
            },
            password: {
                required: true,
                minlength: 5
            }
        },

        messages: {
            firstname: "Entrer un prénom",
            lastname: "Entrer un nom",
            password: {
                required: "Entrer un mot de passe",
                minlength: "Votre mot de passe doit faire plus de 5 carractères"
            },
            email: "Entrer une addresse mail valide"
        },

        submitHandler: async function (form) {
            let firstname = document.querySelector('#firstname')
            let lastname = document.querySelector('#lastname')
            let email = document.querySelector('#email')
            let password = document.querySelector('#password')
            var formData = new FormData();
            var myHeaders = new Headers();
            formData.append('firstname', firstname.value);
            formData.append('lastname', lastname.value);
            formData.append('email', email.value);
            formData.append('password', password.value);
            
            var myInit = {
                method: 'POST',
                headers: myHeaders,
                mode: 'cors',
                cache: 'default',
                body: formData
            };

            await fetch('http://localhost:8888/api_tidal/authentification/register', myInit)
                .then(response => response.json())
                .then(data => {
                    if (data.code == 200) {
                        window.location.href = '#login'
                       
                    }
                })
                .catch(error => {
                    return error;
                });
        }
    });
});