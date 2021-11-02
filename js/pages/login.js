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
          submitHandler: function(form) {

            let email = document.querySelector('#email')
            let password = document.querySelector('#password')

            var formData = new FormData();
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

            const myRequest = new Request('http://api_tidal/Authentification/', myInit);

            fetch(myRequest)
                .then(function (response) {
                    response.json().then(function (data) {
                      
                          //  console.log(response)
                        if(data.code == 200)
                        {
                            let tokenData= JSON.parse(data.data);          
                            
                           localStorage.setItem("token", "Bearer "+tokenData.token);

                            let div_account = document.querySelector('#div_account')
                            let div_connect = document.querySelector('#div_connect')
                            let div_disconnect = document.querySelector('#div_disconnect')
                            div_account.style.display = "block"
                            div_connect.style.display = "none"
                            div_disconnect.style.display = "block"
                            
                            window.location.href = '#home'
                        }else{
                            let error_login = document.querySelector('#error_login')
                            error_login.style.display = "block"
                        }
                       

                    });

                })
              
           // form.submit();
          }
      });
  });
  
  
  