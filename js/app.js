'use strict';
(function () {
    const init = () => {
        var router = new Router([
            new Route('home', 'home.html', undefined, true),            
            new Route('login', 'login.html', 'login.js'),            
            new Route('signUp', 'signup.html', 'signup.js'),
            new Route('account', 'account.html', 'account.js'),
            new Route('pathologies', 'dataTable.html', 'dataTable.js'),
            new Route('about', 'about.html', undefined)
        ]);
    }
    init();
}());
