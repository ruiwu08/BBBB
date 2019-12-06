
//import {Game} from "../game.js"
async function createAccount (user, password){
    let result = await axios({
        method: 'POST',
        url: 'http://localhost:3000/account/create',
        data: {
            name: user,
            pass: password,
        }
    });
    return result;
}



async function login(user, password) {
    let result = await axios({
        method: 'post',
        url: 'http://localhost:3000/account/login',
        data: {
            name: user,
            pass: password,
        }
    });
    
    return result;
}
export const handleCreateOption = (event) => {
    event.preventDefault();
    let body = `
    <div id = body class = 'card'>
        <div class = 'card-header-title'>Create Account for BBBB Game</div>
        <div class = 'card-content'>
            <input class = "input" type = "text" placeHolder = "Username" id = "user"></input>
            <input class = "input" type = "text" placeHolder = "Password" id = "pass"></input>
            <button class = "button" id = "create">Create Account</button>
            <div>You can create an account through Google below, an account will be made for you through our website with username and password being your Gmail</div>
            <script src="https://apis.google.com/js/platform.js" async defer></script>
    <meta name="google-signin-scope" content="profile email">
    <meta name="google-signin-client_id" content="816525634620-8jj1gel3digv02d2vd78im9v70cnb78p.apps.googleusercontent.com">
    <div class="g-signin2" data-onsuccess="onSignIn"></div>
                  <script>
                    function onSignIn(googleUser) {
                      // Useful data for your client-side scripts:
                      var profile = googleUser.getBasicProfile();
                      console.log("ID: " + profile.getId()); // Don't send this directly to your server!
                      console.log('Full Name: ' + profile.getName());
                      
                      console.log("Email: " + profile.getEmail());
              
                      // The ID token you need to pass to your backend:
                      var id_token = googleUser.getAuthResponse().id_token;
                      console.log("ID Token: " + id_token);
                    }
                  </script>
        </div>
    </div>
    `
    $(event.target.closest("#body")).remove();
    $("body").append(body);

    $("#create").on('click', handleCreate);
    
}
export const handleCreate = (event) => {
    event.preventDefault();
    
    let password = $(event.target).prev().val();
    let user = $(event.target).prev().prev().val();
    
    
    createAccount(user, password).then(() => {
        alert("account created");
        
        
        window.location.href = window.location.href.replace("/login", "")
    }
        ).catch(err => alert("There was an error with creating your account \n" + err)); 
}
export const handleLogin = (event) => {
    event.preventDefault();
    let password = $(event.target).prev().val();
    let user = $(event.target).prev().prev().val();
    
    login(user, password).then((response) => {
        window.localStorage.setItem("currentUser", user)
        window.localStorage.setItem("jwt", response.data.jwt)
        
        window.location.href = window.location.href.replace("/login", "");
    }).catch(err => alert("There was an error logging you in"));
}
export const setup = () => {
    let $body = $("body");
    $body.append(`<div class = "card" id = "body">
    <div class = "card-header-title" id = "title">Login to BBBB Game</div>
    <div class = "card-content">

        <input class = "input" type = "text" placeHolder = "Username" id = "user"></input>
        <input class = "input" type = "text" placeHolder = "Password" id = "pass"></input>
        <button class = "button" id = "login">Login</button>
    </div>
    <button class = "button" id = "create">Create Account</button>
    
    </div>`);
    $("#create").on("click", handleCreateOption);
    $("#login").on('click', handleLogin);

}





$(function() {
    setup();
})