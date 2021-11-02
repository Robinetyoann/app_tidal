'use strict';

function Router(routes) {
    try {
        if (!routes) {
            throw 'error: routes param is mandatory';
        }
        this.constructor(routes);
        this.init();
    } catch (e) {
        console.error(e);
    }
}

Router.prototype = {
    routes: undefined,
    rootElem: undefined,
    constructor: function (routes) {
        this.routes = routes;
        this.rootElem = document.getElementById('app');
    },
    init: function () {
        var r = this.routes;
        (function (scope, r) {
            window.addEventListener('hashchange', function (e) {
                scope.hasChanged(scope, r);
            });
        })(this, r);
        this.hasChanged(this, r);
    },
    hasChanged: function (scope, r) {
        if (window.location.hash.length > 0) {
            for (var i = 0, length = r.length; i < length; i++) {
                var route = r[i];
                if (route.isActiveRoute(window.location.hash.substr(1))) {

                    scope.goToRoute(route.htmlName);
                   /* let app = document.querySelector('#app')
                    let scripts = document.querySelectorAll('#app > script')
                    console.log(scripts)
                    if (scripts.length != 0) {
                        console.log('coucou')
                        scripts.forEach(scrpt => {
                            if (scrpt.attributes.length != 0) {
                                let new_script = document.createElement('script')
                                new_script.src = scrpt.attributes.src.value
                                app.appendChild(new_script)
                            }

                        })
                    }*/

                    /* scripts.forEach((script)=>{
                        script.remove()
                    })
                    console.log('azer  ,', )
                   
*/
                   if (route.jsScripts != undefined) {
                        scope.loadJs(route.jsScripts);
                    }



                }
            }
        } else {
            for (var i = 0, length = r.length; i < length; i++) {
                var route = r[i];
                if (route.default) {
                    scope.goToRoute(route.htmlName);
                   /* let app = document.querySelector('#app')
                    let scripts = document.querySelectorAll('#app > script')
                    console.log(scripts)
                    if (scripts.length != 0) {
                        
                        scripts.forEach(scrpt => {
                            if (scrpt.attributes.length != 0) {
                                let new_script = document.createElement('script')
                                new_script.src = scrpt.attributes.src.value
                                app.appendChild(new_script)
                            }

                        })
                    }*/
                }
            }
        }
    },
    goToRoute: function (htmlName) {
        (function (scope) {
            var url = 'views/' + htmlName,
                xhttp = new XMLHttpRequest();
            xhttp.onreadystatechange = function () {
                if (this.readyState === 4 && this.status === 200) {
                    scope.rootElem.innerHTML = this.responseText;
                }
            };
            xhttp.open('GET', url, true);
            xhttp.send();
        })(this);


    },
    loadJs: function (jsScripts) {
        (function (scope) {
            if (typeof (jsScripts) == 'string') {
                jsScripts = [jsScripts]
            }
            jsScripts.forEach(js => {


                var url = 'js/pages/' + js
                let url_plit = url.split('/')

                let test = document.getElementById(url_plit[url_plit.length - 1])
                
                if (test != null) {
                    test.remove();
                }

                let script = document.createElement('script')
                script.src = url
                script.id = url_plit[url_plit.length - 1]
                document.body.appendChild(script);
            });

        })(this);
    }
};