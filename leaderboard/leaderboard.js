async function getPlayers() {
    let result = await axios({
        method: 'GET',
        url: 'http://localhost:3000/public',
    });
    return result.data;
}


export const setup = () => {
    let $table = $(".leaderboard");
    // this only returns the users names in an array?
    // It does not return the object, which would have allowed us to access the overall IQ, and sort the
    // users by IQ
    getPlayers().then(function(data) {
        return console.log(data);
    })

}

$(function() {
    setup();
})