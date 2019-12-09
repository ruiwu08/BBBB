async function getPlayers() {
    let result = await axios({
        method: 'GET',
        url: 'http://localhost:3000/private/users',
        headers: {Authorization: `Bearer ${localStorage.getItem("jwt")}`}
    });
    return result.data;
}


export const setup = () => {
    let $table = $(".leaderboard");
    let userClass = localStorage.getItem("userClass");
    // Stores Users, class, lines, iq in array --> Sort iq in decreasing order --> append to Leaderboard
    getPlayers().then(function(data) {
        Object.keys(data).forEach(function (key) {
            data = data[key];
        });

        let scoreIQ = [];
        Object.keys(data).forEach(function(key) {
            if(data[key].class == userClass) {
                scoreIQ.push(
                    {user: key,
                    lines: data[key].lines,
                    IQ: data[key].IQ,
                    }
                );
            }
        });
        scoreIQ = scoreIQ.sort(function (playerA, playerB) {return playerB.IQ - playerA.IQ});

        for(let i = 0; i < scoreIQ.length; i++) {
            $table.append(`<tr>
                <th> ${i+1} </th>
                <td> ${scoreIQ[i].user} </td>
                <td> ${prettify(scoreIQ[i].lines)} </td>
                <td> ${prettify(scoreIQ[i].IQ)} </td>
            </tr>`)
        }
    })
    renderClass(userClass);

}

function renderClass(userClass) {
    if (userClass == '110') {
        $('#class_title').html('COMP 110');
        $('#teacher_pic').attr('src', '../images/faculty/kris_jordan.jpg');
        $('#teacher_title').html('Kris Jordan');
        $('#teacher_text').html("Hello class! Welcome to COMP 110! <br/> I can't wait to teach you all about the world of computer science! <br/> <i>*happy kris noises*</i> ");
        $('#class_description').html("Welcome to COMP 110! <br/> If you're already a CS major, you should be in 401. <br/> If you're a liberal arts major looking for a free QR credit, you should be in COMP 101. <br/> And if you're an incoming freshman who hasn't decided on your major yet, Kris will make you think you're good at compsci and commit to the major (Until 411 says otherwise).");
    } else if (userClass == '401') {
        $('#class_title').html('COMP 401');
        $('#teacher_pic').attr('src', '../images/faculty/kmp.jpeg');
        $('#teacher_title').html('Ketan Mayer-Patel');
        $('#teacher_text').html("Hey guys! Welcome to COMP 401! <br/> I know what it's like being a student, so I'll make it so attendance isn't part of your final grade. <br/> In exchange, can you all go on ratemyprofessor.com and say I'm hot? <br/>(◕‿◕✿)");
        $('#class_description').html("Welcome to COMP 401! <br/> Hopefully you like sushi or instagram filters, because that's all you're gonna learn about in this class <br/> where KMP just goes over code he wrote 6 years ago <br/> at 8:00 AM.....");
    } else if (userClass == '410') {
        $('#class_title').html('COMP 410');
        $('#teacher_pic').attr('src', '../images/faculty/stotts.jpeg');
        $('#teacher_title').html("David 'Papa' Stotts");
        $('#teacher_text').html("Ho ho hooo! And what would you like for Christmas? <br/> --- <br/> An A in this class? <br/> Ho ho! I'm afraid I can't just give those out. Here's a map of the North Acton underground tube instead!");
        $('#class_description').html("Welcome to COMP410! <br/> Here you'll learn a whole bunch of outdated data structures and how google maps works! <br/> Feel free to take a nap anytime and enjoy Papa Stotts soothing, sleep-inducing voice.");
    } else if (userClass == '411') {
        $('#class_title').html("<h1 style='text-decoration: line-through; color: maroon; font-size: 40px;'> HELL </h1> COMP 411");
        $('#teacher_pic').attr('src', '../images/faculty/bishop.jpeg');
        $('#teacher_title').html("Gary Bishop");
        $('#teacher_text').html("HAHAHAHAHAHAHA!!!! <br/> YOU THOUGHT YOU WERE GOOD AT COMPSCI?! YOU?!!!! <br/> <br/> FOOL. NO ONE IS GOOD AT COMPSCI.");
        $('#class_description').html("Welcome to COMP411. <br/> <br/> You thought the other classes were hard? <br/> You poor soul.");
    } else if (userClass == '411-2') {
        $('#class_title').html("<h1 style='text-decoration: line-through; color: maroon; font-size: 40px;'> HELL pt.2 </h1> COMP 411");
        $('#teacher_pic').attr('src', '../images/faculty/singh.jpeg');
        $('#teacher_title').html("Montek Singh");
        $('#teacher_text').html("Oh wow what a large class we have here. <br/> Hmmm... have I seen some of you guys before? Hahahaha! Just joking.... <br/> <br/> Anyways your first assignment is to recode connect carolina in assembly.");
        $('#class_description').html("Welcome back to COMP411. <br/> <br/> You thought you could pass the class? <br/> You never learn. <br/> <br/> <br/> At least you learned to take the class with Montek instead.");
    } else if (userClass == '426') {
        $('#class_title').html("COMP 426")
        $('#teacher_pic').attr('src', '../images/faculty/kmp.jpeg');
        $('#teacher_title').html("Ketan Mayer-Patel");
        $('#teacher_text').html("Did y'all miss me?");
        $('#class_description').html("Welcome to COMP 426! <br/> You've done it. You've made it through hell. <br/> You can skip class again! Feel free to get comfortable and take things nice and easy. <br/> <br/> While it lasts");
    } else if (guserClass == '455') {
        $('#class_title').html("COMP 455")
        $('#teacher_pic').attr('src', '../images/faculty/plaisted.jpeg');
        $('#teacher_title').html("David Plaisted");
        $('#teacher_text').html("https://www.youtube.com/watch?v=ZEzRuzXpmXQ");
        $('#class_description').html("Welcome to COMP 455. <br/> Here you'll learn about things like context free grammars and automataass and <i> *yawn* </i> <br/> ... and alphabets and <i> *yawn* </i> ... langguagess and ... <i> *yawn* </i> ......... an..d ...... <br/> ... <br/> ... <br/> ...zzzzzzzzzzzzzzzzzzzzzzzzzz");
    } else if (userClass == '550') {
        $('#class_title').html("COMP 550")
        $('#teacher_pic').attr('src', '../images/faculty/frahm.jpg');
        $('#teacher_title').html("Jan-Michael Frahm");
        $('#teacher_text').html("I don't know what Frahm says, so instead here's a fun fact: <br/> Did you know Professor Frahm has published the more papers in the past 10 years than any other CS professor at UNC?");
        $('#class_description').html("Welcome to COMP 550. <br/> You did it, you made it to the 500 level courses! <br/> You can handle these easy peasy sorting algorithms. What's that, big O, pshh. I know what that is. You can't surpri- <br/> Wait what..? That O has a line through it. <br/> What do you mean Θ?");
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

$(function() {
    setup();
})