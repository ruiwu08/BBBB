import Upgrade from './upgrade.js';

export default function makeUpgrades(game) {
    let devUpgrade = new Upgrade('Devupgrade', 0, 50, 0, 'TICK');
    devUpgrade.setCostIncrementer(function(cost) {return cost});
    devUpgrade.setIncrease(function(count) {return count * 10000000});
    devUpgrade.setDescription("For development. Delete in final product");
    devUpgrade.setInfo("For development. Delete in final product");
    devUpgrade.setImage("images/other/Coding.jpg");
    game.addUpgrade(devUpgrade);

    let friend = new Upgrade('Friend', 10, 20, 0, 'TICK');
    friend.setCostIncrementer(function (cost) {return cost ** 1.06});
    friend.setIncrease(function (count) {return count * 0.02});
    friend.setDescription("A friend who will share you their code, provided you share some of yours first. What's an honor code anyways?");
    friend.setInfo("Adds 0.2 line of code every second.");
    friend.setImage("images/upgrades/friend.jpg");
    game.addUpgrade(friend);

    let keyboard = new Upgrade('Keyboard', 20, 10, 0, 'CLICK');
    keyboard.setCostIncrementer(function (cost) {return cost * 1.2 + 4});
    keyboard.setIncrease(function (count) {return count});
    keyboard.setDescription("More keyboards means more typing, more typing means more lines of code. More lines of code means more IQ. More IQ means you pass the class! <br/><br/>Don't question how this game works.");
    keyboard.setInfo("Each click generates 1 more line");
    keyboard.setImage("images/upgrades/keyboard.png");
    game.addUpgrade(keyboard);

    let fourFunction = new Upgrade('Four Function Calculator', 100, 10, 0.5, 'TICK_PER');
    fourFunction.setCostIncrementer(function (cost) {return cost ** 1.05});
    fourFunction.setIncrease(function (count) {return count * 0.2});
    fourFunction.setDescription("The only reason they make these are for those teachers that think you'll cheat using a TI-84.");
    fourFunction.setInfo("Passive income is increased by 20% for each Four Function Calculator");
    fourFunction.setImage("images/upgrades/four_function.jpg");
    game.addUpgrade(fourFunction);

    let mechKeyboard = new Upgrade('Mechanical Keyboard', 250, 15, 1, 'CLICK');
    mechKeyboard.setCostIncrementer(function (cost) {return (cost - 50) * 1.5});
    mechKeyboard.setIncrease(function (count) {return count * 5});
    mechKeyboard.setDescription("Clickity-clack, your code is whack");
    mechKeyboard.setInfo("Each click generates 5 more lines");
    mechKeyboard.setImage("images/upgrades/mechanical_keyboard.jpg");
    game.addUpgrade(mechKeyboard);

    let coffee = new Upgrade('Coffee', 500, 8, 2, 'CLICK_PER');
    coffee.setCostIncrementer(function (cost) {return cost * 1.35});
    coffee.setIncrease(function (count) {return count * 0.25});
    coffee.setDescription("Hey barista, this coffee tastes like dirt! <br/><br/> I'm not surprised, it was ground this morning.");
    coffee.setInfo("Each click generates 25% more lines");
    coffee.setImage("images/upgrades/coffee.jpg");
    game.addUpgrade(coffee);

    let cheggAcc = new Upgrade('Chegg Account', 2000, 5, 4, 'TICK_PER');
    cheggAcc.setCostIncrementer(function (cost) {return (cost * 1.2) ** 1.06});
    cheggAcc.setIncrease(function (count) {return count * 0.4});
    cheggAcc.setDescription("These Chegg accounts have been passed down from generation to generation. Treasure these login credentials like the antiques they are.");
    cheggAcc.setInfo("Passive income is increase by 40% for each Chegg Account");
    cheggAcc.setImage("images/upgrades/chegg.png");
    game.addUpgrade(cheggAcc);

    let smartFriend = new Upgrade('Smart Friend', 1000, 15, 5, 'TICK');
    smartFriend.setCostIncrementer(function (cost) {return (cost * 1.1) ** 1.02});
    smartFriend.setIncrease(function (count) {return count * 0.1});
    smartFriend.setDescription("Without these guys, you're GPA would be so much lower. Take a moment to thank your local smart friend, they'd probably appreciate it.");
    smartFriend.setInfo("Adds 1 lines of code every seconds.");
    smartFriend.setImage("images/upgrades/smart_friend.png");
    game.addUpgrade(smartFriend);

    let elemPC = new Upgrade('Elementary School PC', 2500, 20, 8, 'TICK_PER');
    elemPC.setCostIncrementer(function (cost) {return cost * 1.3});
    elemPC.setIncrease(function(count) {return count * 0.25});
    elemPC.setDescription("The only things these bricks can run is Windows XP.");
    elemPC.setInfo("Passive income is increased by 25% for each Elementary School PC");
    elemPC.setImage("images/upgrades/elem_school_pc.jpg");
    game.addUpgrade(elemPC);

    let SFGTC = new Upgrade('Smart Friend who goes to class', 50000, 1, 8, 'TICK_MULT');
    SFGTC.setCostIncrementer(function (cost) {return cost});
    SFGTC.setIncrease(function(count) {return 1 + count});
    SFGTC.setDescription("There's no way someone smart and motivated are willing to give you their code, but their presence motivates everyone to work harder nonetheless.");
    SFGTC.setInfo("Double your passive income");
    SFGTC.setImage("images/upgrades/SFGTC.jpg");
    game.addUpgrade(SFGTC);

    let typewriter = new Upgrade('Typewriter', 8000, 15, 10, 'CLICK');
    typewriter.setCostIncrementer(function(cost) {return cost * 1.3});
    typewriter.setIncrease(function(count) {return count * 20});
    typewriter.setDescription("Your mom must be real proud to raise you into the kind of person who sits in coffeeshops in a turtleneck and beanie while coding on a typewriter.");
    typewriter.setInfo("Each click generates 20 more lines");
    typewriter.setImage("images/upgrades/typewriter.jpg");
    game.addUpgrade(typewriter);
}