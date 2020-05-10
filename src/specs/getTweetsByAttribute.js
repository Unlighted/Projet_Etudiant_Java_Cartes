const readline = require('readline-sync');
const prompt = '>';

function getTweetsByAttribute(tweets) {
    let cont = false;
    let foundTweets = [];
    let remainingTweets;
    do {
        if (!remainingTweets) {
            remainingTweets = tweets;
        } else {
            remainingTweets = foundTweets;
        }
        console.log("On which attribute do you want to filter?");
        let found;
        do {
            if (found && found.length > 1) {
                console.log("Multiple match possible, make it clearer");
                for (var choice in found) {
                    let text = found[choice]+" "
                    console.log(text);
                }
            }
            if (!found) {
                found = [];
            } else if (found == 0){
                console.log("No match found, verify what you entered");
            }
            let msg = "Choose from : ";
            let choices = [];
            for (let attribute in tweets[0]){
                msg += attribute+", ";
                choices.push(attribute);
            }
            msg = msg.substring(0,msg.length-2);
            console.log(msg);
            let attribute = readline.question(`${prompt}`);
            let regex = new RegExp('^'+attribute);
            found = choices.filter(choice => choice.match(regex));
        } while (found.length != 1)
        console.log("What is the value you want to inspect "+found[0]+" with?");
        let value = readline.question(`${prompt}`);

        foundTweets = remainingTweets.filter(tweet => tweet[found[0]].toUpperCase().match(new RegExp(value.toUpperCase())));

        console.log(foundTweets.length+" matching value !");
        console.log("Do you want to search another attribute aswell? (yes/no)");
        let answer = readline.question(`${prompt}`);
        if (answer == "yes") {
            cont = true;
        } else cont = false;
    } while (cont);

    return foundTweets;


}

module.exports = getTweetsByAttribute
