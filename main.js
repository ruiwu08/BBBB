import Game from './game.js';
import Upgrade from './upgrade.js';


let preRendered = false;

function main() {
    let game = new Game('user', 'password');
    makeUpgrades(game);
    renderGame(game);
    updateGame(game);
    updateUpgrades(game);
    window.setInterval(function() {
        game.onTick(game);
        updateGame(game);
        updateUpgrades(game);
    }, 100)
}

function makeUpgrades(game) {
    let devUpgrade = new Upgrade('Devupgrade', 0, 50, 0, 'TICK');
    devUpgrade.setCostIncrementer(function(cost) {return cost});
    devUpgrade.setIncrease(function(count) {return count * 10000000});
    devUpgrade.setDescription("For development. Delete in final product");
    devUpgrade.setInfo("For development. Delete in final product");
    devUpgrade.setImage("images/head_slam.jpg");
    game.addUpgrade(devUpgrade);

    let friend = new Upgrade('Friend', 10, 20, 0, 'TICK');
    friend.setCostIncrementer(function (cost) {return cost ** 1.06});
    friend.setIncrease(function (count) {return count * 0.02});
    friend.setDescription("A friend who will share you their code, provided you share some of yours first. What's an honor code anyways?");
    friend.setInfo("Adds 0.2 line of code every second.");
    friend.setImage("images/friend.jpg");
    game.addUpgrade(friend);

    let keyboard = new Upgrade('Keyboard', 20, 10, 0, 'CLICK');
    keyboard.setCostIncrementer(function (cost) {return cost * 1.2 + 4});
    keyboard.setIncrease(function (count) {return count});
    keyboard.setDescription("More keyboards means more typing, more typing means more lines of code. More lines of code means more IQ. More IQ means you pass the class! <br/><br/>Don't question how this game works.");
    keyboard.setInfo("Each click generates 1 more line");
    keyboard.setImage("images/keyboard.png");
    game.addUpgrade(keyboard);

    let fourFunction = new Upgrade('Four Function Calculator', 100, 10, 0.5, 'TICK_PER');
    fourFunction.setCostIncrementer(function (cost) {return cost ** 1.05});
    fourFunction.setIncrease(function (count) {return count * 0.2});
    fourFunction.setDescription("The only reason they make these are for those teachers that think you'll cheat using a TI-84.");
    fourFunction.setInfo("Passive income is increased by 20% for each Four Function Calculator");
    fourFunction.setImage("images/four_function.jpg");
    game.addUpgrade(fourFunction);

    let mechKeyboard = new Upgrade('Mechanical Keyboard', 250, 15, 1, 'CLICK');
    mechKeyboard.setCostIncrementer(function (cost) {return (cost - 50) * 1.5});
    mechKeyboard.setIncrease(function (count) {return count * 5});
    mechKeyboard.setDescription("Clickity-clack, your code is whack");
    mechKeyboard.setInfo("Each click generates 5 more lines");
    mechKeyboard.setImage("images/mechanical_keyboard.jpg");
    game.addUpgrade(mechKeyboard);

    let coffee = new Upgrade('Coffee', 500, 8, 2, 'CLICK_PER');
    coffee.setCostIncrementer(function (cost) {return cost * 1.35});
    coffee.setIncrease(function (count) {return count * 0.25});
    coffee.setDescription("Hey barista, this coffee tastes like dirt! <br/><br/> I'm not surprised, it was ground this morning.");
    coffee.setInfo("Each click generates 25% more lines");
    coffee.setImage("images/coffee.jpg");
    game.addUpgrade(coffee);

    let cheggAcc = new Upgrade('Chegg Account', 2000, 5, 4, 'TICK_PER');
    cheggAcc.setCostIncrementer(function (cost) {return (cost * 1.2) ** 1.06});
    cheggAcc.setIncrease(function (count) {return count * 0.4});
    cheggAcc.setDescription("These Chegg accounts have been passed down from generation to generation. Treasure these login credentials like the antiques they are.");
    cheggAcc.setInfo("Passive income is increase by 40% for each Chegg Account");
    cheggAcc.setImage("images/chegg.png");
    game.addUpgrade(cheggAcc);

    let smartFriend = new Upgrade('Smart Friend', 1000, 15, 5, 'TICK');
    smartFriend.setCostIncrementer(function (cost) {return (cost * 1.1) ** 1.02});
    smartFriend.setIncrease(function (count) {return count * 0.1});
    smartFriend.setDescription("Without these guys, you're GPA would be so much lower. Take a moment to thank your local smart friend, they'd probably appreciate it.");
    smartFriend.setInfo("Adds 1 lines of code every seconds.");
    smartFriend.setImage("images/smart_friend.png");
    game.addUpgrade(smartFriend);

    let elemPC = new Upgrade('Elementary School PC', 2500, 20, 8, 'TICK_PER');
    elemPC.setCostIncrementer(function (cost) {return cost * 1.3});
    elemPC.setIncrease(function(count) {return count * 0.25});
    elemPC.setDescription("The only things these bricks can run is Windows XP.");
    elemPC.setInfo("Passive income is increased by 25% for each Elementary School PC");
    elemPC.setImage("images/elem_school_pc.jpg");
    game.addUpgrade(elemPC);

    let SFGTC = new Upgrade('Smart Friend who goes to class', 50000, 1, 8, 'TICK_MULT');
    SFGTC.setCostIncrementer(function (cost) {return cost});
    SFGTC.setIncrease(function(count) {return 1 + count});
    SFGTC.setDescription("There's no way someone smart and motivated are willing to give you their code, but their presence motivates everyone to work harder nonetheless.");
    SFGTC.setInfo("Double your passive income");
    SFGTC.setImage("images/SFGTC.jpg");
    game.addUpgrade(SFGTC);

    let typewriter = new Upgrade('Typewriter', 8000, 15, 10, 'CLICK');
    typewriter.setCostIncrementer(function(cost) {return cost * 1.3});
    typewriter.setIncrease(function(count) {return count * 20});
    typewriter.setDescription("Your mom must be real proud to raise you into the kind of person who sits in coffeeshops in a turtleneck and beanie while coding on a typewriter.");
    typewriter.setInfo("Each click generates 20 more lines");
    typewriter.setImage("images/typewriter.jpg");
    game.addUpgrade(typewriter);
}

function renderUpgrades(game) {
    for (let i = 0; i < game.upgrades.length; i++) {
        let upgrade = game.upgrades[i];

        let box = $("<div>");
        box.attr("id", i);
        box.addClass("upgradeBox");
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
            click: function () {game.buyUpgrade(upgrade)}
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

function renderClass(game) {
    if (!preRendered) {
        $('#pass_button').click(function() {
            if (game.passClass()) {
                console.log(game.class);
                resetUpgradeContainer();
                makeUpgrades(game);
                renderGame(game);
            }

        })
    }
    if (game.class == '110'){
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

function renderGame(game) {
    renderClass(game);
    //Renders the DOM with the game state info.
    let type_img = $("#coder");
    type_img.attr("src", "images/coding.jpg");
    if (!preRendered){
        $(document).ready(function(){
            type_img.mousedown(function(){type_img.attr("src", "images/head_slam.jpg")});
            type_img.click(function() {game.onClick()});
            type_img.mouseup(function(){type_img.attr("src", "images/coding.jpg")})
        });
        preRendered = true;
    }
    $('#pass_button').css('visibility', 'hidden');

    renderUpgrades(game);
}   

function updateGame(game) {
    //Updates the DOM with the game state info.
    //*May be redundant with renderGame function. Design is dependent on front-end team.
    $("#lines").text("Lines: " + prettify(game.lines));
    $('#IQ').text("IQ: " + prettify(game.IQ));
    $("#lps").text("Lines per second: " + prettify(game.lps));
    if (game.IQ >= game.IQtoPass) {
        $('#pass_button').css('visibility', 'visible');
    }

}

function updateUpgrades(game) {
    for(let i = 0; i < game.upgrades.length; i++) {
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
    } else if(num >= 10 ** 12 && num < 10 ** 15) {
        return (num / (10 ** 12)).toFixed(1) + " trillion";
    } else if(num >= 10 ** 15 && num < 10 ** 18) {
        return (num / (10 ** 15)).toFixed(1) + " quadrillion";
    } else if(num >= 10 ** 18 && num < 10 ** 21) {
        return (num / (10 ** 18)).toFixed(1) + " quintillion";
    } else {
        return num;
    }
}

main()