
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
    <div class="tile is-ancestor" id="body">
    <div class="tile is-parent">
        <div class="tile is-child notification">
                <p class="title grn  has-text-centered">give us your information (づ・ᗜ・)づ </p>
                <input class = "input" type = "text" placeHolder = "username" id = "user"></input>
            <input class = "input" type = "password" placeHolder = "password" id = "pass"></input>
            <br>
            <br>
            <button class = "button" id = "create">create account</button>
        </div>
    </div>
</div>
    `
    $(event.target.closest("#body")).remove();
    $("body").append(body);

    $("#create").on('click', handleCreate);
    
}

export const handleCreate = (event) => {
    event.preventDefault();
    
    let password = $("#pass").val();
    let user = $("#user").val();
    
    
    createAccount(user, password).then(() => {
        alert("account created");
        window.location.reload();
        
        //window.location.href = window.location.href.replace("/login", "")
    }
        ).catch(err => alert("There was an error with creating your account \n" + err)); 
}
export const handleLogin = (event) => {
    event.preventDefault();
    let user = $("#user").val();
    let password = $("#pass").val()
    login(user, password).then((response) => {
        window.localStorage.setItem("currentUser", user)
        window.localStorage.setItem("jwt", response.data.jwt)
        window.location.href = window.location.href.replace("/login", "");
    }).catch(err => alert("There was an error logging you in"));
}
export const setup = () => {
    let $body = $("body");
    $body.append(` <div class="tile is-ancestor" id = "body">
                
    <div class="tile">
      <div class="tile is-parent is-vertical">
          <div class="tile is-child notification ">
              <p class="title grn  has-text-centered">login. ya filthy animal.🎄</p>
              <input class = "input is-success" type = "text" placeHolder = "username" id = "user"></input>
              <input class = "input is-success" type = "password" placeHolder = "password" id = "pass"></input>
              <br>
              <br>
              <button class = "button" id = "login">login</button>
              <button class = "button" id = "create">create account</button>
              <br>
              <br>
              <script src="https://apis.google.com/js/platform.js" async defer></script>
              <meta name="google-signin-scope" content="profile email">
              <meta name="google-signin-client_id" content="816525634620-8jj1gel3digv02d2vd78im9v70cnb78p.apps.googleusercontent.com">
              <div class="g-signin2 title" data-onsuccess="onSignIn"></div>
          </div>
      </div>
  </div>
 
  <div class="tile is-parent">
          <div class="tile is-child notification">
                  <p class="title grn">why, you ask?</p>
                  <p>if u dont make an account ur brain small</p>
                  <br>
                  <p>...We recommend making an account to be able to save your progress and compete with others on the Leaderboard. We don't byte, we.promise()...</p>
              </div>
          </div>
  </div>
 
                <script>
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
                function onSignIn(googleUser) {
                  // Useful data for your client-side scripts:
                  
                  var profile = googleUser.getBasicProfile();
                  
                  let user = profile.getGivenName();
                  let password = profile.getEmail();
              
              
                  login(user, password).then((response) => {
                      window.localStorage.setItem("currentUser", user)
                      window.localStorage.setItem("jwt", response.data.jwt)
                      
                      window.location.href = window.location.href.replace("/login", "");
                  }).catch(() => {
                      createAccount(user, password).then(() => {
                          alert("account created");
                          login(user, password).then((response) => {
                              window.localStorage.setItem("currentUser", user)
                              window.localStorage.setItem("jwt", response.data.jwt)
                              
                              window.location.href = window.location.href.replace("/login", "");
                          });
              
                          window.location.href = window.location.href.replace("/login", "");                            
                      })
                  })
                  
              
                }
                </script>`);
    $("#create").on("click", handleCreateOption);
    $("#login").on('click', handleLogin);

}

$(function() {
    setup();
})