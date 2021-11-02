$(function () {

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

        submitHandler: function (form) {
            // form.submit();
            let firstname = document.querySelector('#firstname')
            let lastname = document.querySelector('#lastname')
            let email = document.querySelector('#email')
            let password = document.querySelector('#password')

            var formData = new FormData();
            formData.append('firstname', firstname.value);
            formData.append('lastname', lastname.value);
            formData.append('email', email.value);
            formData.append('password', password.value);


            var myHeaders = new Headers();

            var myInit = {
                method: 'POST',
                headers: myHeaders,
                mode: 'cors',
                cache: 'default',
                body: formData
            };

            const myRequest = new Request('http://tidal/Authentification/register', myInit);

            fetch(myRequest)
                .then(function (response) {
                    response.json().then(function (data) {
                        if (data.code == 200) {
                            window.location.href = '#login'
                           // window.location.replace("http://apptidal/#login");
                        }

                    });

                })
                .catch((err) => {
                    err.json().then(function (data) {
                        console.log('err:' + data);
                    });

                })
        }
    });
});