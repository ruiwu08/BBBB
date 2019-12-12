import Game from './game.js';
import Upgrade from './upgrade.js';
import Cutscene from './cutscene.js';
import makeUpgrades from './make_upgrades.js';
import makeCutscenes from './make_cutscenes.js';



let preRendered = false;
let showingCutscene = false;
async function saveGame(gameState, event) {
    
    event.preventDefault();
    
    if (document.getElementById("delete") == null) {
        $("#navbar").append(`<div class = "button has-background-danger" id = "delete">Delete Game Progress</div>`)
        $("#delete").on('click', (e) => {
            deleteGameHistory(localStorage.getItem("currentUser"), e);
         })
    }
    
    let jwt = window.localStorage.getItem('jwt');
    
    let upgrades = [];
    
    gameState.upgrades.forEach(upgrade => {
        let store = {
            name: upgrade.name,
            cost: upgrade.cost,
            count: upgrade.count,
            maxPurchases: upgrade.maxPurchases,
            unlockIQ: upgrade.unlockIQ,
            type: upgrade.type,
            increase: upgrade.increase.toString(),
         
            costIncrementer: upgrade.costIncrementer.toString(),

        }
        upgrades.push(store);
    })
    let user_result = await axios({
        method: 'POST',
        url: 'http://localhost:3000/user/' + gameState.user,
        headers: { Authorization: `Bearer ${jwt}` },
        data: {
            data: {
                lines: gameState.lines,
                IQ: gameState.IQ,
                lps: gameState.lps,
                class: gameState.class,
                IQtoPass: gameState.IQtoPass,
                readyToPass: gameState.readyToPass,
                classBonus: gameState.classBonus,
                upgrades: upgrades
                
            }
        }
    });

    let public_result = await axios({
        method: 'POST',
        url: 'http://localhost:3000/public/users/' + gameState.user,
        data: {
            data: {
                // Change when an overall IQ is figured out
                overallIQ: gameState.overallIQ,
            }
        }
    })
    let private_result = await axios({
        method: 'POST',
        url: 'http://localhost:3000/private/users/' + gameState.user,
        headers: { Authorization: `Bearer ${jwt}` },
        data: {
            data: {
                class: gameState.class,
                lines: gameState.lines,
                IQ: gameState.IQ,
            }
        }
    })
    

}
async function getGameDetails(user) {
    let result = await axios({
        method: 'GET',
        url: 'http://localhost:3000/user/' + user,
        headers: { Authorization: `Bearer ${localStorage.getItem("jwt")}` },
    });
    return result.data;
}
async function deleteGameHistory(user, event) {
    event.preventDefault();
     
    let user_result = await axios({
        method: 'DELETE',
        url: 'http://localhost:3000/user/' + user,
        headers: {Authorization: `Bearer ${localStorage.getItem("jwt")}`},
    })
    let public_result = await axios({
        method: 'DELETE',
        url: 'http://localhost:3000/public/users/' + user,
    })
    let private_result = await axios({
        method: 'DELETE',
        url: 'http://localhost:3000/private/users/' + user,
        headers: {Authorization: `Bearer ${localStorage.getItem("jwt")}`}
    })
    $("#delete").remove();
    window.location.reload();
}

function main() {

    let game;
    let user = localStorage.getItem("currentUser")
    if (user == undefined || user == "") {
        user = "user";
        game = new Game(user, "password");
        makeUpgrades(game);
        makeCutscenes(game);
        renderGame(game);

        updateGame(game);
        updateUpgrades(game);
        window.setInterval(function () {
            game.onTick(game);
            updateGame(game);
            updateUpgrades(game);
            updateCutscenes(game);
        }, 100);
    } else {
        getGameDetails(user).then(details => {
            game = new Game(user, "password")
            game.lines = details.result.lines;
            game.IQ = details.result.IQ;
            game.lps = details.result.lps;
            game.class = details.result.class;
            game.classBonus = details.result.classBonus;
            game.IQtoPass = details.result.IQtoPass;
            game.readyToPass = details.result.readyToPass;
            makeUpgrades(game);

            for (let i = 0; i < details.result.upgrades.length; i++) {
                let curr = details.result.upgrades[i];
                let actualUpgrade = game.upgrades[i];
                
                actualUpgrade.cost = curr.cost;
                actualUpgrade.count = curr.count;
            }
            
         
            window.localStorage.setItem("userClass", game.class);
            $("#navbar").prepend(`<div class="navbar-item"> Hello ${user}</div>`)
            $("#navbar").append(`<div class="button has-background-success" id = "save">Save Game</div>`)
            $("#navbar").append(`<div class = "button has-background-danger" id = "delete">Delete Game Progress</div>`)
            
            // makeCutscenes(game);
            renderGame(game);

            updateGame(game);
            updateUpgrades(game);
            window.setInterval(function () {
                game.onTick(game);
                updateGame(game);
                updateUpgrades(game);
                updateCutscenes(game);
            }, 100);
            if (user !== 'user') {
                $("#login").text("Logout");
            
                $('.navbar-start').append(`<a class="navbar-item" href="./class_leaderboard/"> Class Leaderboard </a>`)
            }
            $("#save").on('click', (e) => {
                saveGame(game, e)
            });
            $("#delete").on('click', (e) => {
                deleteGameHistory(user, e);
            })
        }).catch((err) => {
            alert(err);
            game = new Game(user, "password");
            makeUpgrades(game);
            makeCutscenes(game);
            renderGame(game);
            $("#navbar").prepend(`<div> Hello ${user}</div>`);
            $("#login").text("Logout");
            $("#navbar").append(`<div class="button has-background-success" id = "save">Save Game</div>`)
            updateGame(game);
            updateUpgrades(game);
            window.localStorage.setItem("userClass", game.class);
            window.setInterval(function () {
                game.onTick(game);
                updateGame(game);
                updateUpgrades(game);
                updateCutscenes(game);
            }, 100);
            if (user !== 'user') {
                $("#login").text("Logout")
                $('.navbar-start').append(`<a class="navbar-item" href="./class_leaderboard/"> Class Leaderboard </a>`)
            }
            $("#save").on('click', (e) => {
                saveGame(game, e)
            });
        })
    }
}


// Adds upgrade html stuff to the DOM. 
// Does it on page load, not affected by game state.
function renderUpgrades(game) {
    for (let i = 0; i < game.upgrades.length; i++) {
        let upgrade = game.upgrades[i];

        let box = $("<div>");
        box.attr("id", i);
        box.addClass("upgradeBox");
        box.addClass("card-content");
        box.css("display", "none");

        let name = $("<h1>");
        name.text(upgrade.name + ": \n");
        name.attr("class", 'upgrade_name');
        box.append(name);

        let info = $("<p>");
        info.attr("id", i + "_info");
        info.attr("class", "upgrade_info");
        info.text(upgrade.info)
        box.append(info);

        let count = $("<p>");
        count.attr("id", i + "_count");
        box.append(count);

        let max = $("<p>");
        max.attr("id", i + "_max");
        box.append(max);

        let buyButton = $('<button/>', {
            text: 'Buy',
            id: i + "_buyButton",
            class: 'button is-medium is-success',
            click: function () { game.buyUpgrade(upgrade) }
        });
        box.append(buyButton);
        box.append("<br/>")

        let cost = $("<p>");
        cost.attr("id", i + "_cost");
        box.append(cost);

        let img_box = $('<div>');
        img_box.attr("id", i + "_img_box");
        img_box.addClass("tooltip");
        box.append(img_box);

        let desc = $("<p>");
        desc.attr("id", i + "_desc");
        desc.addClass("tooltiptext");
        desc.html(upgrade.description);
        img_box.append(desc);

        let img = $('<img>');
        img.attr("id", i + "_img");
        img.attr("src", upgrade.image);
        img_box.append(img);

        $("#upgrade_container").append(box);
    }
}

// Renders all classes at the beginning of the game
// Does it on page load, not affected by game state
function renderClass(game) {
    if (!preRendered) {
        $('#pass_button').click(function () {
            if (game.passClass()) {
                console.log(game.class);
                resetUpgradeContainer();
                makeUpgrades(game);
                renderGame(game);
            }

        })
    }
    if (game.class == '110') {
        $('#class_title').html('COMP 110');
        $('#teacher_pic').attr('src', 'images/faculty/kris_jordan.jpg');
        $('#teacher_title').html('Kris Jordan');
        $('#teacher_text').html("Hello class! Welcome to COMP 110! <br/> I can't wait to teach you all about the world of computer science! <br/> <i>*happy kris noises*</i> ");
        $('#class_description').html("Welcome to COMP 110! <br/> If you're already a CS major, you should be in 401. <br/> If you're a liberal arts major looking for a free QR credit, you should be in COMP 101. <br/> And if you're an incoming freshman who hasn't decided on your major yet, Kris will make you think you're good at compsci and commit to the major (Until 411 says otherwise).")
        $('#IQ_to_pass').html('You need ' + game.IQtoPass + ' IQ to pass the class.');
    } else if (game.class == '401') {
        $('#class_title').html('COMP 401');
        $('#teacher_pic').attr('src', 'images/faculty/kmp.jpeg');
        $('#teacher_title').html('Ketan Mayer-Patel');
        $('#teacher_text').html("Hey guys! Welcome to COMP 401! <br/> I know what it's like being a student, so I'll make it so attendance isn't part of your final grade. <br/> In exchange, can you all go on ratemyprofessor.com and say I'm hot? <br/>(◕‿◕✿)");
        $('#class_description').html("Welcome to COMP 401! <br/> Hopefully you like sushi or instagram filters, because that's all you're gonna learn about in this class <br/> where KMP just goes over code he wrote 6 years ago <br/> at 8:00 AM.....")
        $('#IQ_to_pass').html('You need ' + game.IQtoPass + ' IQ to pass the class.');
    } else if (game.class == '410') {
        $('#class_title').html('COMP 410');
        $('#teacher_pic').attr('src', 'images/faculty/stotts.jpeg');
        $('#teacher_title').html("David 'Papa' Stotts");
        $('#teacher_text').html("Ho ho hooo! And what would you like for Christmas? <br/> --- <br/> An A in this class? <br/> Ho ho! I'm afraid I can't just give those out. Here's a map of the North Acton underground tube instead!");
        $('#class_description').html("Welcome to COMP410! <br/> Here you'll learn a whole bunch of outdated data structures and how google maps works! <br/> Feel free to take a nap anytime and enjoy Papa Stotts soothing, sleep-inducing voice.")
        $('#IQ_to_pass').html('You need ' + game.IQtoPass + ' IQ to pass the class.');
    } else if (game.class == '411') {
        $('#class_title').html("<h1 style='text-decoration: line-through; color: maroon; font-size: 40px;'> HELL </h1> COMP 411")
        $('#teacher_pic').attr('src', 'images/faculty/bishop.jpeg');
        $('#teacher_title').html("Gary Bishop");
        $('#teacher_text').html("HAHAHAHAHAHAHA!!!! <br/> YOU THOUGHT YOU WERE GOOD AT COMPSCI?! YOU?!!!! <br/> <br/> FOOL. NO ONE IS GOOD AT COMPSCI.");
        $('#class_description').html("Welcome to COMP411. <br/> <br/> You thought the other classes were hard? <br/> You poor soul.")
        $('#body').css('background-color', 'black');
        $('#body').css('color', 'white');
        $('.tile').css('background-color', 'black');
        $('.tile').css('color', 'white');
        $('#IQ_to_pass').html('You need ' + game.IQtoPass + ' IQ to pass the class.');
    } else if (game.class == '411-2') {
        $('#class_title').html("<h1 style='text-decoration: line-through; color: maroon; font-size: 40px;'> HELL pt.2 </h1> COMP 411")
        $('#teacher_pic').attr('src', 'images/faculty/singh.jpeg');
        $('#teacher_title').html("Montek Singh");
        $('#teacher_text').html("Oh wow what a large class we have here. <br/> Hmmm... have I seen some of you guys before? Hahahaha! Just joking.... <br/> <br/> Anyways your first assignment is to recode connect carolina in assembly.");
        $('#class_description').html("Welcome back to COMP411. <br/> <br/> You thought you could pass the class? <br/> You never learn. <br/> <br/> <br/> At least you learned to take the class with Montek instead.")
        $('#body').css('background-color', 'black');
        $('#body').css('color', 'white');
        $('#IQ_to_pass').html('You need ' + game.IQtoPass + ' IQ to pass the class.');
    } else if (game.class == '426') {
        $('#class_title').html("COMP 426")
        $('#teacher_pic').attr('src', 'images/faculty/kmp.jpeg');
        $('#teacher_title').html("Ketan Mayer-Patel");
        $('#teacher_text').html("Did y'all miss me?");
        $('#class_description').html("Welcome to COMP 426! <br/> You've done it. You've made it through hell. <br/> You can skip class again! Feel free to get comfortable and take things nice and easy. <br/> <br/> While it lasts")
        $('#body').css('background-color', 'white');
        $('#body').css('color', 'black');
        $('.tile').css('background-color', 'initial');
        $('.tile').css('color', 'black');
        $('#IQ_to_pass').html('You need ' + game.IQtoPass + ' IQ to pass the class.');
    } else if (game.class == '455') {
        $('#class_title').html("COMP 455")
        $('#teacher_pic').attr('src', 'images/faculty/plaisted.jpeg');
        $('#teacher_title').html("David Plaisted");
        $('#teacher_text').html("https://www.youtube.com/watch?v=ZEzRuzXpmXQ");
        $('#class_description').html("Welcome to COMP 455. <br/> Here you'll learn about things like context free grammars and automataass and <i> *yawn* </i> <br/> ... and alphabets and <i> *yawn* </i> ... langguagess and ... <i> *yawn* </i> ......... an..d ...... <br/> ... <br/> ... <br/> ...zzzzzzzzzzzzzzzzzzzzzzzzzz")
        $('#body').css('background-color', 'white');
        $('#body').css('color', 'black');
        $('#IQ_to_pass').html('You need ' + game.IQtoPass + ' IQ to pass the class.');
    } else if (game.class == '550') {
        $('#class_title').html("COMP 550")
        $('#teacher_pic').attr('src', 'images/faculty/frahm.jpg');
        $('#teacher_title').html("Jan-Michael Frahm");
        $('#teacher_text').html("I don't know what Frahm says, so instead here's a fun fact: <br/> Did you know Professor Frahm has published the more papers in the past 10 years than any other CS professor at UNC?");
        $('#class_description').html("Welcome to COMP 550. <br/> You did it, you made it to the 500 level courses! <br/> You can handle these easy peasy sorting algorithms. What's that, big O, pshh. I know what that is. You can't surpri- <br/> Wait what..? That O has a line through it. <br/> What do you mean Θ?");
        $('#IQ_to_pass').html('You need ' + game.IQtoPass + ' IQ to pass the class.');
    }
}

function renderCutscenes(game) {
    for (let i = 0; i < game.cutscenes.length; i++) {
        let cutscene = game.cutscenes[i];

        let box = $("<div>");
        box.attr("id", i + "_cutscene_box");
        box.attr("class", "cutscene");
        box.css("display", "none");
        box.css("z-index", 1000);

        let topText = $("<div>");
        topText.html(cutscene.topText);
        topText.css("text-align", "center");
        box.append(topText);

        let img = $("<img>");
        img.attr("src", cutscene.img);
        img.css("display", "block");
        img.css("margin-left", "auto");
        img.css("margin-right", "auto");
        img.css("width", "50%");
        box.append(img);

        let botText = $("<div>");
        botText.html(cutscene.botText);
        botText.css("text-align", "center");
        box.append(botText);

        let closeWrapper = $("<div>");
        closeWrapper.attr("class", "close_button_wrapper");
        box.append(closeWrapper);

        let closeButton = $('<button/>', {
            text: "Close",
            class: 'button',
            click: function () {
                showingCutscene = false;
                box.css("display", "none");
                $('#cutscene_container').css('z-index', -1000);
            }
        })
        closeButton.css("margin-left", "auto");
        closeButton.css("margin-right", "auto");
        closeWrapper.append(closeButton);

        $("#cutscene_container").append(box);

        let appearButton = $('<button/>', {
            text: cutscene.name,
            class: 'button is-medium is-success',
            id: i + '_appear_button',
            click: function () {
                if (!showingCutscene) {
                    appearButton.css("display", "none");
                    showingCutscene = true;
                    box.css("display", "block");
                    $('#cutscene_container').css('z-index', 1000);
                    cutscene.shown = true;
                }
            }
        });
        appearButton.css("display", "none");
        $("#notification_container").append(appearButton);
    }
}

// Packages all 'render' functions into one single renderGame function
// Just changes DOM, not affected by game state.
function renderGame(game) {
    renderClass(game);
    //Renders the DOM with the game state info.
    let type_img = $("#coder");
    let click_img = $("#line_icon");
    type_img.attr("src", "images/other/Coding.png");
    if (!preRendered) {
        renderCutscenes(game);
        $(document).ready(function () {
            type_img.mousedown(function () { type_img.attr("src", "images/other/CodingSAd.png") });
            type_img.click(function () { game.onClick() });
            type_img.mouseup(function () { type_img.attr("src", "images/other/Coding.png") })
            var x = 0;
            click_img.click(function(e) {
                var audio = new Audio(soundPicker());
                audio.play();
                x++;
                click_img.append(`<div id="x${x}" hidden>+${game.cps}</div>`);
                $("#x"+x).css("top", e.clientY);
                $("#x"+x).css("left", e.clientX - 10);
                $("#x"+x).css("position", "absolute");
                $("#x"+x).css("width", "25px");
                $("#x"+x).css("height", "25px");
                $("#x"+x).css("color", "white");
                $("#x"+x).css("font-weight", "bold");
                $("#x"+x).css("animation", "GoUp 2s forwards linear");
                $("#x"+x).show();

                // setTimeout(function() {$("#x"+x).remove()}, 1000)
            });
        });
        preRendered = true;
    }
    $('#pass_button').css('visibility', 'hidden');

    renderUpgrades(game);
}

function updateGame(game) {
    //Updates the DOM with the game state info.
    //*May be redundant with renderGame function. Design is dependent on front-end team.
    $("#lines").text("Lines: " + prettifyLines(game.lines));
    $('#IQ').text("IQ: " + prettifyIQ(game.IQ));
    $("#lps").text("Lines per second: " + prettifyLines(game.lps));
    if (game.IQ >= game.IQtoPass) {
        $('#pass_button').css('visibility', 'visible');
    }

}

function updateUpgrades(game) {
    for (let i = 0; i < game.upgrades.length; i++) {
        let upgrade = game.upgrades[i];
        //Makes upgrade visible only if UnlockIQ is met.
        if (game.IQ >= upgrade.unlockIQ) {
            $(`#${i}`).css("display", "block");
        }
        $(`#${i}_count`).text("Amount: " + upgrade.count + '\n');
        $(`#${i}_max`).text("Max Purchases: " + upgrade.maxPurchases + '\n');
        if (upgrade.count == upgrade.maxPurchases) {
            $(`#${i}_cost`).text("Can't buy any more!");
        } else {
            $(`#${i}_cost`).text("Upgrade Cost: " + prettify(upgrade.cost) + '\n');
        }
    }
}

function updateCutscenes(game) {
    for (let i = 0; i < game.cutscenes.length; i++) {
        let cutscene = game.cutscenes[i];
        if (game.class == cutscene.classReq) {
            if (!cutscene.shown) {
                if (game.IQ >= cutscene.IQReq) {
                    $(`#${i}_appear_button`).css('display', 'block');
                }
            }
        }
    }
}

function resetUpgradeContainer() {
    const myNode = document.getElementById('upgrade_container');
    while (myNode.firstChild) {
        myNode.removeChild(myNode.firstChild);
    }
}

function prettify(num) {
    if (num < 10 ** 6) {
        return num.toFixed(0);
    } else if (num >= 10 ** 6 && num < 10 ** 9) {
        return (num / (10 ** 6)).toFixed(1) + " million";
    } else if (num >= 10 ** 9 && num < 10 ** 12) {
        return (num / (10 ** 9)).toFixed(1) + " billion";
    } else if (num >= 10 ** 12 && num < 10 ** 15) {
        return (num / (10 ** 12)).toFixed(1) + " trillion";
    } else if (num >= 10 ** 15 && num < 10 ** 18) {
        return (num / (10 ** 15)).toFixed(1) + " quadrillion";
    } else if (num >= 10 ** 18 && num < 10 ** 21) {
        return (num / (10 ** 18)).toFixed(1) + " quintillion";
    } else {
        return num;
    }
}

function prettifyIQ(num) {
    if (num < 100) {
        return num.toFixed(2)
    } else if (num >= 100 && num < 1000) {
        return num.toFixed(1);
    } else {
        return prettify(num);
    }
}

function prettifyLines(num) {
    if (num < 100) {
        return num.toFixed(1);
    } else {
        return prettify(num);
    }
}

function soundPicker() {
    let standardSound = [];
    standardSound.push("audio/slap.mp3");
    let uncommonSound = [];
    uncommonSound.push("door_close.mp3");
    uncommonSound.push("audio/gavel.mp3");
    uncommonSound.push("wooden_floor.mp3");
    uncommonSound.push("audio/roblox.mp3");
    uncommonSound.push("audio/metal.mp3");
    uncommonSound.push("audio/minecraft.mp3");
    uncommonSound.push("audio/banana_slap.mp3");
    let secretSound = [];
    secretSound.push("audio/pterodactyl.mp3");
    secretSound.push("audio/wilhelm.mp3");
    let num = Math.random()
    if (num < 0.75){
        return standardSound[Math.floor(Math.random()*standardSound.length)];
    } else if (num >= 0.75 && num < 0.99) {
        return uncommonSound[Math.floor(Math.random()*uncommonSound.length)];
    } else {
        return secretSound[Math.floor(Math.random()*secretSound.length)];
    }
}


main()