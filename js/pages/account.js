
function parseJwt(token) {
    var base64Url = token.split('.')[1];
    var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    var jsonPayload = decodeURIComponent(atob(base64).split('').map(function (c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));

    return JSON.parse(jsonPayload);
};
var token = localStorage.getItem("token")
if (token != null) {
    console.log(token)
    console.log(parseJwt(token))

    let tokenDecoded = parseJwt(token)
    let account_info = document.querySelector('#account_info')

    let id = document.createElement('div')
    let email = document.createElement('div')
    
    id.innerHTML = '<label>ID : </label><span>'+tokenDecoded.id+'</span>'
    email.innerHTML = '<label>Email : </label><span>'+tokenDecoded.email+'</span>'
    account_info.appendChild(id)
    account_info.appendChild(email)
}
