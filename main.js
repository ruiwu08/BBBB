import Game from './game.js';
import Upgrade from './upgrade.js';
// import { runInNewContext } from 'vm';


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
    let friend = new Upgrade('Friend', 10, 20, 0, 'TICK');
    friend.setCostIncrementer(function (cost) {return cost ** 1.1});
    friend.setIncrease(function (count) {return count * 0.1});
    friend.setDescription("BUY A FRIEND");
    friend.setInfo("Adds 1 line of code every 10 seconds");
    friend.setImage("images/friend.jpg");
    game.addUpgrade(friend);

    let keyboard = new Upgrade('Keyboard', 20, 10, 0, 'CLICK');
    keyboard.setCostIncrementer(function (cost) {return cost * 1.1 + 4});
    keyboard.setIncrease(function (count) {return count});
    keyboard.setDescription("More keyboards mean you can type faster :D");
    keyboard.setInfo("Each click generates 1 more line");
    keyboard.setImage("images/keyboard.png");
    game.addUpgrade(keyboard);
}

function renderGame(game) {
    //Renders the DOM with the game state info.
    let type_img = $("<img>");
    type_img.attr("id", "coder");
    type_img.attr("src", "images/coding.jpg");
    $(document).ready(function(){
        type_img.mousedown(function(){type_img.attr("src", "images/head_slam.jpg")});
        type_img.click(function(){game.onClick()});
        type_img.mouseup(function(){type_img.attr("src", "images/coding.jpg")})
    });
    $("#default_container").prepend(type_img);
    for (let i = 0; i < game.upgrades.length; i++) {
        let upgrade = game.upgrades[i];

        let box = $("<div>");
        box.attr("id", upgrade.name);
        box.addClass("upgradeBox");
        box.text(upgrade.name + ": \n");

        let info = $("<p>");
        info.attr("id", upgrade.name + "_info");
        info.text(upgrade.info)
        box.append(info);

        let count = $("<p>");
        count.attr("id", upgrade.name + "_count");
        box.append(count);

        let max = $("<p>");
        max.attr("id", upgrade.name + "_max");
        box.append(max);

        let buyButton = $('<button/>', {
            text: 'Buy',
            id: upgrade.name + "_buyButton",
            click: function () {game.buyUpgrade(upgrade)}
        });
        box.append(buyButton);
        box.append("<br/>")

        let cost = $("<p>");
        cost.attr("id", upgrade.name + "_cost");
        box.append(cost);

        let img_box = $('<div>');
        img_box.attr("id", upgrade.name + "_img_box");
        img_box.addClass("tooltip");
        box.append(img_box);

        let desc = $("<p>");
        desc.attr("id", upgrade.name + "_desc");
        desc.addClass("tooltiptext");
        desc.text(upgrade.description);
        img_box.append(desc);

        let img = $('<img>');
        img.attr("id", upgrade.name + "_img");
        img.attr("src", upgrade.image);
        img_box.append(img);

        $("#upgrade_container").append(box);
    }

}   

function updateGame(game) {
    //Updates the DOM with the game state info.
    //*May be redundant with renderGame function. Design is dependent on front-end team.
    $("#lines").text("Lines: " + game.lines.toFixed(1));
    $('#IQ').text("IQ: " + game.IQ.toFixed(3));
    $("#lps").text("Lines per second: " + game.lps.toFixed(1));

}

function updateUpgrades(game) {
    for(let i = 0; i < game.upgrades.length; i++) {
        let upgrade = game.upgrades[i];
        $(`#${upgrade.name}_count`).text("Amount: " + upgrade.count + '\n');
        $(`#${upgrade.name}_max`).text("Max Purchases: " + upgrade.maxPurchases + '\n');
        $(`#${upgrade.name}_cost`).text("Upgrade Cost: " + upgrade.cost.toFixed(0) + '\n');
    }
}

main()