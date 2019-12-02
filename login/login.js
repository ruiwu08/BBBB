//import {axios} from '../node_modules/axios/dist/axios.js'


const createAccount = (user, password) => {
    let result = axios({
        method: 'POST',
        url: 'http://localhost:3000/account/create',
        data: {
            name: user,
            pass: password,
        }
    });
    return result;
}
const login = (user, password) => {
    let result = axios({
        method: 'post',
        url: 'http://localhost:3000/account/login',
        data: {
            name: user,
            pass: password,
        }
    });
    return result;
}
const handleCreateOption = (event) => {
    event.preventDefault();
    let body = `
    <div id = body class = 'card'>
        <div class = 'card-header-title'>Create Account for BBBB Game</div>
        <div class = 'card-content'>
            <input class = "input" type = "text" placeHolder = "Username" id = "user"></input>
            <input class = "input" type = "text" placeHolder = "Password" id = "pass"></input>
            <button class = "button" id = "create">Create Account</button>
        </div>
    </div>
    `
    $(event.target.closest("#body")).remove();
    $("body").append(body);

    $("#create").on('click', handleCreate);
    
}
const handleCreate = (event) => {
    event.preventDefault();
    
    let password = $(event.target).prev().val();
    let user = $(event.target).prev().prev().val();
    createAccount(user, password).then(() => {
        alert("Successful")
        
        event.target.closest("#body").remove();
        setup();
    }
        ).catch(err => alert("There was an error with creating your account \n" + err));
}
const handleLogin = (event) => {
    event.preventDefault();
    let password = $(event.target).prev().val();
    let user = $(event.target).prev().prev().val();

    login(user, password).then(() => alert('Login successful')).catch(err => alert("There was an error logging you in"));
}
const setup = () => {
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