async function getPlayers() {
    let result = await axios({
        method: 'GET',
        url: 'http://localhost:3000/public/users',
    });
    return result.data;
}


export const setup = () => {
    let $table = $(".leaderboard");
    // Stores Users and Overall IQ in array --> Sort in decreasing order --> append to Leaderboard
    getPlayers().then(function(data) {
        Object.keys(data).forEach(function (key) {
            data = data[key];
            console.log(data)
        });

        let scoreIQ = [];
        Object.keys(data).forEach(function(key) {
            scoreIQ.push(
                {user: key,
                 overallIQ: data[key].overallIQ,
                }
            );
        });
        scoreIQ = scoreIQ.sort(function (playerA, playerB) {return playerB.overallIQ - playerA.overallIQ});

        for(let i = 0; i < scoreIQ.length; i++) {
            if(i == 0) {
                $(`#rank1`).append(`<p> <strong>Player:</strong> ${scoreIQ[i].user} </p>
                    <p> <strong>Overall IQ:</strong> ${prettify(scoreIQ[i].overallIQ)} </p>`);
            } else if(i == 1) {
                $(`#rank2`).append(`<p> <strong>Player:</strong> ${scoreIQ[i].user} </p>
                    <p> <strong>Overall IQ:</strong> ${prettify(scoreIQ[i].overallIQ)} </p>`);
            } else if (i == 2) {
                $(`#rank3`).append(`<p> <strong>Player:</strong> ${scoreIQ[i].user} </p>
                    <p> <strong>Overall IQ:</strong> ${prettify(scoreIQ[i].overallIQ)} </p>`);
            } else {
                $table.append(`<tr>
                    <th> ${i+1} </th>
                    <td> ${scoreIQ[i].user} </td>
                    <td> ${prettify(scoreIQ[i].overallIQ)} </td>
                </tr>`);
            }
        }
    })

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