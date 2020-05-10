const spec1 = require('./specs/spec1.js')
const spec2 = require('./specs/spec2.js')
const spec3 = require('./specs/spec3.js')
const spec4 = require('./specs/spec4.js')
const spec5 = require('./specs/spec5.js')
const spec6 = require('./specs/spec6.js')
const getTweetsByAttribute = require('./specs/getTweetsByAttribute.js')
const createChart = require('./specs/createChart.js')

let operations = {
    1: {
        description: "Top 10 of the most retweet tweets for #",
        operation: function(tweets) {
            spec1(tweets)
        }
    },
    2: {
        description: "Top 10 tweets' authors with their informations for #",
        operation: function(tweets) {
            spec2(tweets)
        }

    },
    3: {
        description: "Number of tweets for # and for a given period",
        operation: function(tweets) {
            createChart(spec3(tweets))
        }

    },
    4: {
        description: "Get links between hashtags...",
        operation: function(tweets) {
            createChart(spec4(tweets))
        }

    },
    5: {
        description: "Get tweets on sending countries",
        operation: function(tweets) {
            createChart(spec5(tweets))
        }

    },
    6: {
        description: "Get specific tweets to a txt",
        operation: function(tweets) {
            spec6(getTweetsByAttribute(tweets));
        }

    }
}

module.exports = operations;
