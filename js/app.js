'use strict';

(function () {
    function init() {
        var router = new Router([
            new Route('home', 'home.html', true),            
            new Route('login', 'login.html'),            
            new Route('signUp', 'signup.html'),
            new Route('technos', 'technos.html')
        ]);
    }
    init();
}());
