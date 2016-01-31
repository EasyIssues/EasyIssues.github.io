'use strict';
let ref;
class Auth {

    /*@ngInject*/
    constructor(base_url) {
      ref = new Firebase(base_url);
    }

    login() {
      return ref.authWithOAuthPopup("github", function(error, authData) {
        if (error) {
          console.log("Login Failed!", error);
        } else {
          console.log("Authenticated successfully with payload:", authData);
        }
       }, {
        remember: "sessionOnly",
        scope: "user,repo,read:org,write:org"
      });
    }

}

export { Auth }
