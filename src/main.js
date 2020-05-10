const readline = require('readline-sync');
const myParser = require('./parser.js');
const operations = require('./operations.js');
const fs = require('fs');
const prompt = '>';

let start = () => {

    let dataDir =""

    do {
       
        dataDir = readline.question(`Type the data directory's path: \n${prompt}`);


        var dataFileAbsolutePaths = myParser.getdatasPaths(dataDir)



      if(dataFileAbsolutePaths.length != 0) {
        console.log(dataFileAbsolutePaths.length + " files found !")
        console.log("Fetching datas... ")
        let csvToString = myParser.stringifyCSV(dataFileAbsolutePaths)

        myParser.stringToJson(csvToString, (tweets) => {
            console.log(tweets.length + " tweets found !");
            if (tweets.length > 0) {
                printMenu(tweets);
            } else {
                start();
            }
          });
      }
  } while (dataDir == "" || dataFileAbsolutePaths.length == 0);
}

function printMenu(tweets) {
    let keys = Object.keys(operations)
    let cont = false;
    do {


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
            console.log("Which operation do you want to do? Either enter the operation number or part of its description\n")
            let choices = [];
            keys.forEach((key) => {
                console.log("["+ key + "] => " + operations[key].description)
                choices.push(key+" "+operations[key].description);
            })
            let attribute = readline.question(`${prompt}`);
            let regex = new RegExp(attribute.toUpperCase());
            found = choices.filter(choice => choice.toUpperCase().match(regex));
        } while (found.length != 1)

        operations[found[0][0]].operation(tweets)

        console.log("Do you want to do another operation aswell? (yes/no)");
        let answer = readline.question(`${prompt}`);
        if (answer == "yes") {
            cont = true;
        } else cont = false;
    } while (cont);
}



start()
