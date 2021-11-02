'use stict';

function Route(name, htmlName,jsScripts, defaultRoute) {
    try {
        if(!name || !htmlName) {
            throw 'error: name and htmlName params are mandatories';
        }
        this.constructor(name, htmlName,  jsScripts, defaultRoute);
    } catch (e) {
        console.error(e);
    }
}

Route.prototype = {
    name: undefined,
    htmlName: undefined,
    default: undefined,
    jsScripts: undefined,
    constructor: function (name, htmlName, jsScripts,  defaultRoute) {
        this.name = name;
        this.htmlName = htmlName;
        this.default = defaultRoute;
        this.jsScripts =jsScripts;
    },
    isActiveRoute: function (hashedPath) {
        return hashedPath.replace('#', '') === this.name; 
    }
}