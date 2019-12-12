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

    //////////////////////////////////////////////

    let supremecurtain = new Upgrade('Supreme Smart Curtain', 70000, 1, 15, 'TICK_MULT');
    supremecurtain.setCostIncrementer(function (cost) {return cost* 1.1});
    supremecurtain.setIncrease(function(count) {return 1.5 + count});
    supremecurtain.setDescription("Why are you still using your computer?");
    supremecurtain.setInfo("Triple your passive income with more click generation");
    supremecurtain.setImage("images/upgrades/supreme.JPG");
    game.addUpgrade(supremecurtain);

    let smartpaper = new Upgrade('Balenciaga Smart Paper', 105000, 1, 18, 'TICK_MULT');
    smartpaper.setCostIncrementer(function (cost) {return cost * 1.3});
    smartpaper.setIncrease(function(count) {return 2 + count});
    smartpaper.setDescription("Don't call yourself a programmer if you dont tweet from balenciaga smart paper?");
    smartpaper.setInfo("Quadruple your passive income with more click generation");
    smartpaper.setImage("images/upgrades/smartpaper.JPG");
    game.addUpgrade(smartpaper);

    let blackmail = new Upgrade('Blackmail', 102000, 1, 11, 'TICK_PER');
    blackmail.setCostIncrementer(function (cost) {return (cost * 1.4) ** 1.6});
    blackmail.setIncrease(function (count) {return count * 0.7});
    blackmail.setDescription("You'll never need to go to office hours ever again.");
    blackmail.setInfo("Passive income is increase by enough.");
    blackmail.setImage("images/upgrades/blackmail.JPG");
    game.addUpgrade(blackmail);

    let dialup = new Upgrade('Dial-Up', 8000, 3, 5, 'TICK');
    dialup.setCostIncrementer(function (cost) {return (cost * 2.1) ** 1.02});
    dialup.setIncrease(function (count) {return count * 0.2});
    dialup.setDescription("Pshhhkkkkkkrrrr​kakingkakingkakingtsh​chchchchchchchcch​*ding*ding*ding*");
    dialup.setInfo("Adds more extra lines of code per second.");
    dialup.setImage("images/upgrades/dialup.JPG");
    game.addUpgrade(dialup);

    let fiber = new Upgrade('Fiber', 80000, 3, 15, 'TICK');
    fiber.setCostIncrementer(function (cost) {return (cost * 1.5) ** 1.82});
    fiber.setIncrease(function (count) {return count * 0.8});
    fiber.setDescription("We are all now connected by the Internet, like neurons in a giant brain.");
    fiber.setInfo("Adds even more extra lines of code per second.");
    fiber.setImage("images/upgrades/fiber.JPG");
    game.addUpgrade(fiber);

    let screens = new Upgrade('Screens', 38000, 15, 10, 'CLICK');
    screens.setCostIncrementer(function(cost) {return cost * 1.7});
    screens.setIncrease(function(count) {return count * 49});
    screens.setDescription("You look up, left, right, down, and inside but all you see is Carl.");
    screens.setInfo("Each click generates 49 more lines");
    screens.setImage("images/upgrades/screens.JPG");
    game.addUpgrade(screens);

    let fivehour = new Upgrade('Five Hour Energy', 22500, 8, 7, 'CLICK_PER');
    fivehour.setCostIncrementer(function (cost) {return cost * 1.75});
    fivehour.setIncrease(function (count) {return count * 0.5});
    fivehour.setDescription("The preferred programmer hggateway drug.");
    fivehour.setInfo("Each click generates 42% more lines");
    fivehour.setImage("images/upgrades/fivehour.JPG");
    game.addUpgrade(fivehour);

    let twentyfourhour = new Upgrade('500-Hour Energy', 55500, 4, 9, 'CLICK_PER');
    twentyfourhour.setCostIncrementer(function (cost) {return cost * 1.75});
    twentyfourhour.setIncrease(function (count) {return count * 0.75});
    twentyfourhour.setDescription("A cocktail of five hour energy drinks, for loko, and something bubbling after a chemistry lab.");
    twentyfourhour.setInfo("Each click generates 61% more lines");
    twentyfourhour.setImage("images/upgrades/fivehundo.JPG");
    game.addUpgrade(twentyfourhour);

    let water = new Upgrade('Water', 1000, 15, 10, 'CLICK');
    water.setCostIncrementer(function(cost) {return cost * 1.05});
    water.setIncrease(function(count) {return count * 1.03});
    water.setDescription("Carl's worried about you, stay hydrated.");
    water.setInfo("Each click generates a small increase of  more lines");
    water.setImage("images/upgrades/water.JPG");
    game.addUpgrade(water);

    let tape = new Upgrade('Tape', 2500, 8, 10, 'CLICK_PER');
    tape.setCostIncrementer(function (cost) {return cost * 1.75});
    tape.setIncrease(function (count) {return count * 0.4});
    tape.setDescription("Blinking is for the weak.");
    tape.setInfo("Each click generates 45% more lines.");
    tape.setImage("images/upgrades/Tape.JPG");
    game.addUpgrade(tape);

    let toothpicks = new Upgrade('Toothpick', 11500, 9, 11, 'CLICK_PER');
    toothpicks.setCostIncrementer(function (cost) {return cost * 2.15});
    toothpicks.setIncrease(function (count) {return count * 0.65});
    toothpicks.setDescription("Tape wasn't strong enough");
    toothpicks.setInfo("Each click generates 65% more lines");
    toothpicks.setImage("images/upgrades/toothpicks.JPG");
    game.addUpgrade(toothpicks);

    
    
}