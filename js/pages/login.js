$(function() {
      $("form[name='login']").validate({
       
          rules: {
             
              email: {
                  required: true,
                  email: true
              },
              password: {
                  required: true,
              }
          },
          messages: {
              email: "Entrer une addresse mail valide",
              
              password: {
                  required: "Entrer un mot de passe",
                  
              }
              
          },
          submitHandler: async function(form) {

            let email = document.querySelector('#email').value
            let password = document.querySelector('#password').value

            var formData = new FormData();
            formData.append('email', email);
            formData.append('password', password);

            var myHeaders = new Headers();

            var myInit = {
                method: 'POST',
                headers: myHeaders,
                mode: 'cors',
                cache: 'default',
                body: formData
            };

            await fetch('http://localhost:8888/api_tidal/authentification', myInit)
                .then(response => response.json())
                .then(data => {
                    console.log(data)
                    if(data.code === 200) {                           
                        localStorage.setItem("token", "Bearer " + data.data.token);

                        let div_account = document.querySelector('#div_account')
                        let div_connect = document.querySelector('#div_connect')
                        let div_disconnect = document.querySelector('#div_disconnect')
                        div_account.style.display = "block"
                        div_connect.style.display = "none"
                        div_disconnect.style.display = "block"
                        
                        window.location.href = '#home'
                        } else {
                            let error_login = document.querySelector('#error_login')
                            error_login.style.display = "block"
                        }
                })
                .catch(error => {
                    return error;
                });
          }
      });
  });
  
  
  