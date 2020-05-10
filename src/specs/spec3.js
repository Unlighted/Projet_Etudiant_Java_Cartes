const readline = require('readline-sync');
const prompt = '>';

function spec3(tweets) {
    do {
        if (setTweets && setTweets.size == 0) {
            console.log("No tweets found for hashtag "+hashtags);
        }
        var setTweets = new Set([]);
        console.log("On which # do you want to work? (without the #, specify multiple # separated by ,)");
        var hashtags = readline.question(`${prompt}`);
        hashtags = hashtags.split(",");
        hashtags = hashtags.map(str => str.trim(str));
        hashtags.forEach(hashtag => {
            let foundTweets = tweets.filter(tweet => tweet["hashtags"].toUpperCase().match(new RegExp(hashtag.toUpperCase())));
            foundTweets.forEach(item => setTweets.add(item));
        });

        if (setTweets.size > 0) {
            console.log(setTweets.size+" matching hashtag "+hashtags+"!");
            console.log("Does this look fine to you? (yes/no)");
            let answer = readline.question(`${prompt}`);
            if (answer == "yes") {
                var fine = true;
            } else var fine = false;
        }
    } while (setTweets.size == 0 || !fine);

    do {
        if (finalTweets && finalTweets.length == 0) {
            console.log("Your day range is too restrictive, you got no result, change it!");
        }
        var finalTweets = Array.from(setTweets);
        console.log("Choose the day using the following format : month day year (E.g. Mar 23 2018), if you want to use day range, juste place two dates separated by , (E.g. Mar 23 2018,Mar 26 2018)");
        var dates = readline.question(`${prompt}`);
        dates = dates.split(",");
        dates = dates.map(str => str.trim(str));
        if (dates.length == 1) {
            let date1 = new Date(dates[0]);
            let date2 = new Date(dates[0]);
            date2.setDate(date2.getDate()+1);
            finalTweets = finalTweets.filter(tweet => new Date(tweet['created_at']) > date1 && new Date(tweet['created_at']) < date2);
        } else {
            let date1 = new Date(dates[0]);
            let date2 = new Date(dates[1]);
            finalTweets = finalTweets.filter(tweet => new Date(tweet['created_at']) > date1 && new Date(tweet['created_at']) < date2);
        }
    } while (finalTweets.length == 0)

    var chart = {
        "data" : {
                "values" : finalTweets
        },
        "mark" : "bar",
        "encoding" : {
            "x" : {"field" : "created_at", "type" : "ordinal","timeUnit": "datemonth",
                    "axis" : {"title" : "Day"}
                },
            "y" : {"aggregate": "count",
                    "type": "quantitative",
                    "axis" : {"title" : "Number of tweets with # "+hashtags}
                }
        }
    }

    return chart;
}

module.exports = spec3
