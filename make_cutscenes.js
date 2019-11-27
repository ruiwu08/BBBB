import Cutscene from './cutscene.js';

export default function makeCutscenes(game) {
    //To make a cutscene, specify *the name of the cutscene, the class the cutscene is part of, and the IQ the cutscene appears
    // *The name of the cutscene is the text that appears on the button
    //Then set the html of the cutscene
    //Push the cutscene to the game


    // plz change these low effort cutscenes i made these at 3 am in an airport their so shit
    let PBnJ = new Cutscene('What did Kris do?', '110', 1);
    PBnJ.setTopText("Kris Jordan be making a sandwich");
    PBnJ.setBotText("He's doing it all stupid");
    PBnJ.setImage("images/cutscenes/pbnj.jpg");
    game.cutscenes.push(PBnJ);

    let hack110 = new Cutscene("Hack 110!", '110', 2);
    hack110.setTopText("It's hack 110! Your first hackathon! Finally you'll experience the fun of making fun projects and late night coding with your friends!");
    hack110.setBotText("and writing butt-ugly code and having your code not work because of some stupid small thing and having your group members leave at 2 AM for you to suffer alone...");
    hack110.setImage("images/cutscenes/sitterson.jpg");
    game.cutscenes.push(hack110);

    let kmpDance = new Cutscene('KMP be crazy', '401', 100);
    kmpDance.setTopText("Lol KMP dancing");
    kmpDance.setBotText("https://www.youtube.com/watch?v=a2K2botmjOw");
    kmpDance.setImage("images/cutscenes/kmpdance.JPG");
    game.cutscenes.push(kmpDance);
};