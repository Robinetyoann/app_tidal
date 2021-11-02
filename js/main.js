function disconnect() {
    localStorage.removeItem('token');
    window.location.href = '#home'
    verif_display_connection()

}

function verif_display_connection() {
    var token = localStorage.getItem("token")
    let div_disconnect = document.querySelector('#div_disconnect')
    let div_connect = document.querySelector('#div_connect')
    let div_account = document.querySelector('#div_account')
    if (token == null) {
        div_disconnect.style.display = "none"
        div_connect.style.display = "inline-flex"
        div_account.style.display = "none"
    } else {
        div_disconnect.style.display = "block"
        div_connect.style.display = "none"
        div_account.style.display = "block"
    }
    
}

verif_display_connection()