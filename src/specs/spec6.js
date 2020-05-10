const readline = require('readline-sync');
const prompt = '>';

function spec6(tweets) {
    const fs = require('fs')
    console.log("Where do you want to save your .txt file? (E.g. C:\\Users\\user\\Desktop\\myfile.txt)");
    let path = readline.question(`${prompt}`);
    let msg = "===========Tweets===========\n";
    for (var tweet in tweets) {
        msg += "----------------------------\n"
        for (var att in tweets[tweet]) {
            msg += att+" : "+tweets[tweet][att]+"\n";
        }
        msg += "----------------------------\n"
    }
    fs.writeFile(path, msg, (err) => {
        if (err) throw err;
    })
}

module.exports = spec6
