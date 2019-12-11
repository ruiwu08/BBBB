import Cutscene from './cutscene.js';

export default function makeCutscenes(game) {
    //To make a cutscene, specify *the name of the cutscene, the class the cutscene is part of, and the IQ the cutscene appears
    // *The name of the cutscene is the text that appears on the button
    //Then set the html of the cutscene
    //Push the cutscene to the game


    // plz change these low effort cutscenes i made these at 3 am in an airport their so shit
    // I tried to help with the cutscenes. The quantity is up but the quality is down. Please change anything that
    // is too boring. Also we definitely need even more cutscenes for the later classes. -Anusha
    let PBnJ = new Cutscene('What did Kris do?', '110', 1);
    PBnJ.setTopText("You come to class and witness...");
    PBnJ.setBotText("Kris Jordan making a peanut butter and jelly sandwich.");
    PBnJ.setImage("images/cutscenes/pbnj.jpg");
    game.cutscenes.push(PBnJ);

    let hack110 = new Cutscene("Hack 110!", '110', 2);
    hack110.setTopText("It's hack 110! Your first hackathon! Finally you'll experience the fun of making fun projects and late night coding with your friends!");
    hack110.setBotText("and writing butt-ugly code and having your code not work because of some stupid small thing and having your group members leave at 2 AM for you to suffer alone...");
    hack110.setImage("images/cutscenes/sitterson.jpg");
    game.cutscenes.push(hack110);

    let kmpDance = new Cutscene('Someone sent a message in the 401 chat', '401', 100);
    kmpDance.setTopText("Lol KMP dancing");
    kmpDance.setBotText("https://www.youtube.com/watch?v=a2K2botmjOw");
    kmpDance.setImage("images/cutscenes/groupme.PNG");
    game.cutscenes.push(kmpDance);

    let kmpMidterm = new Cutscene('Email from 401 Gradescope', '401', 200);
    kmpMidterm.setTopText("Midterm scores are released... and you did terribly");
    kmpMidterm.setBotText("You need to work harder to pass the class");
    kmpMidterm.setImage("images/cutscenes/401_gradescope.png");
    game.cutscenes.push(kmpMidterm);

    let kmpAssignment = new Cutscene('KMP sent an email', '401', 1333);
    kmpAssignment.setTopText("The deadline for the last assignment was extended!");
    kmpAssignment.setBotText("The bad new is that you pulled an all-nighter and already completed it.");
    kmpAssignment.setImage("images/cutscenes/outlook.PNG");
    game.cutscenes.push(kmpAssignment);

    let stottsFlu = new Cutscene('Aachoo!', '410', 2000);
    stottsFlu.setTopText("You got the flu right before the midterm.");
    stottsFlu.setBotText("You miss a week of class and take the midterm at an alternative time.");
    stottsFlu.setImage("images/cutscenes/campus_health.jpeg");
    game.cutscenes.push(stottsFlu);

    let stottsSleep = new Cutscene('Zzzz', '410', 4000);
    stottsSleep.setTopText("You fell asleep in class...");
    stottsSleep.setBotText("luckily you were sitting in the back of the classroom");
    stottsSleep.setImage("images/cutscenes/genome_g100.jpg");
    game.cutscenes.push(stottsSleep);

    let bishopQuiz = new Cutscene('Pop Quiz', '411', 200);
    bishopQuiz.setTopText("You realize this class is going to end in disaster.");
    bishopQuiz.setBotText("But you need the class so you hang in there.");
    bishopQuiz.setImage("images/cutscenes/fail_time.PNG");
    game.cutscenes.push(bishopQuiz);

    let bishopLab = new Cutscene('Whoops...', '411', 60000);
    bishopLab.setTopText("You completely forgot that this class has a recitation.");
    bishopLab.setBotText("Go to recitation to get help.");
    bishopLab.setImage("images/cutscenes/sitterson.jpg");
    game.cutscenes.push(bishopLab);

    let montek = new Cutscene('Yikes', '411-2', 40);
    montek.setTopText("2nd time and this class still barely makes sense.");
    montek.setBotText("MIPs who? Circuits? Should I have taken physics before this class?");
    montek.setImage("images/cutscenes/logic_circuit.png");
    game.cutscenes.push(montek);

    let montek2 = new Cutscene('Yay!', '411-2', 40000);
    montek2.setTopText("The class is still hard...");
    montek2.setBotText("But it's starting to make sense?");
    montek2.setImage("images/cutscenes/brain.PNG");
    game.cutscenes.push(montek2);

    let montek3 = new Cutscene('2... more... weeks', '411-2', 600000);
    montek3.setTopText("You are completely unprepared for the final.");
    montek3.setBotText("On the bright side, once you survive this semester, you can do anything (probably)");
    montek3.setImage("images/cutscenes/stressed.PNG");
    game.cutscenes.push(montek3);

    let kmp2048 = new Cutscene('2048', '426', 50);
    kmp2048.setTopText("You grind out the assignment and get it in on time...");
    kmp2048.setBotText("You start playing the game in your dreams T.T");
    kmp2048.setImage("images/cutscenes/2048.PNG");
    game.cutscenes.push(kmp2048);

    let kmpMidterm2 = new Cutscene('426 Gradescope Notification!', '426', 80);
    kmpMidterm2.setTopText("You thought you did terribly on the 401 midterm but...");
    kmpMidterm2.setBotText("This definitely takes the cake.");
    kmpMidterm2.setImage("images/cutscenes/426_gradescope.png");
    game.cutscenes.push(kmpMidterm2);
    
    let plaisted1 = new Cutscene("yeah I'm taking this class", '455', 100);
    plaisted1.setTopText("You come to class for the first time since the first week of class.");
    plaisted1.setBotText("You know you should come to class more often but ....");
    plaisted1.setImage("images/cutscenes/genome_g100.jpg");
    game.cutscenes.push(plaisted1);

    let plaisted2 = new Cutscene('Midterm', '455', 555550);
    plaisted2.setTopText("You survived the midterm.");
    plaisted2.setBotText("You're almost done!");
    plaisted2.setImage("images/cutscenes/exam.PNG");
    game.cutscenes.push(plaisted2);
    
    let plaisted3 = new Cutscene('Water bottle', '455', 605550);
    plaisted3.setTopText("You left your water bottle in class.");
    plaisted3.setBotText("But you never realized it was missing until a week later.");
    plaisted3.setImage("images/cutscenes/water_bottle.PNG");
    game.cutscenes.push(plaisted3);

    // I cannot for the life of me come up with some more cutscenes for plaisted.
    // let plaisted4 = new Cutscene('Midterm', '455', 875550);
    // plaisted4.setTopText("You survived the midterm.");
    // plaisted4.setBotText("You're almost done!");
    // plaisted4.setImage();
    // game.cutscenes.push(plaisted4);

    let frahm1 = new Cutscene('Extra Credit Oppurtunity', '550', 7568225);
    frahm1.setTopText("You did the extra credit.");
    frahm1.setBotText("Good job!");
    frahm1.setImage("images/cutscenes/working_hard.PNG");
    game.cutscenes.push(frahm1);
    
    let frahm2 = new Cutscene('Did you forget something?', '550', 8000092250);
    frahm2.setTopText("You forgot to turn in a homework assignment.");
    frahm2.setBotText("Be more careful next time.");
    frahm2.setImage("images/cutscenes/confused.PNG");
    game.cutscenes.push(frahm2);

    let frahm3 = new Cutscene("Here's some water!", '550', 9875682250);
    frahm3.setTopText("You spilled the water on your laptop...");
    frahm3.setBotText("go take your laptop to CCI.");
    frahm3.setImage("images/cutscenes/water_glass.PNG");
    game.cutscenes.push(frahm3);

    let frahm4 = new Cutscene('Missed the bus', '550', 9995682250);
    frahm4.setTopText("You missed the bus and were unable to turn in your homework assignment...");
    frahm4.setBotText("All this coding must be throwing you off your game.");
    frahm4.setImage("images/cutscenes/bus.PNG");
    game.cutscenes.push(frahm4);

    let frahm5 = new Cutscene('last midterm', '550', 99999998855);
    frahm5.setTopText("You survived the first 2.");
    frahm5.setBotText("Knock out the last one!");
    frahm5.setImage("images/cutscenes/exam.PNG");
    game.cutscenes.push(frahm5);
};