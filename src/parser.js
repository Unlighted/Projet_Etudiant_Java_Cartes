const fs = require('fs');
const csv = require('fast-csv');
let tweets = []

module.exports = {
// dataDir == ../datas
getdatasPaths: function(dataDir) {
        const dataFileName = "tweets.csv"
        let dataFileAbsolutePath = []

        try {
            directoriesArr = fs.readdirSync(dataDir)

            directoriesArr.forEach(function (dir) {
                if (dir.startsWith('.')) {
                    return
                } else {
                    dataFileAbsolutePath.push(dataDir + "/" + dir + "/" + dataFileName)
                }
            })
        } catch (e) {
            if (e.code === 'ENOENT') {
              console.log("/!\\ No files found /!\\ ")
            } else {
              throw e;
            }
        }
        return dataFileAbsolutePath
    },

stringifyCSV: function(paths) {
    let string = "";
    if (paths.length > 0) {
        try {
            string += fs.readFileSync(paths[0], 'utf8');
    		string += '\n';
    		if (paths.length > 1) {
    			paths.shift();
    			paths.forEach((elt, idx) => {
    				let csv = fs.readFileSync(elt, 'utf8');
    				csv = csv.split('\n').slice(1).join('\n');
    				csv += '\n';
    				string += csv;
    			});
    		}
        } catch (e) {
            if (e.code === 'ENOENT') {
              console.log("/!\\ No CSV files found /!\\ ")
            } else {
              throw e;
            }
        }
	}
    return string;
},

testTweet: function(tweet){
    let bool = true;
    if (!tweet.hasOwnProperty("coordinates")) bool = false;
    if (!tweet.hasOwnProperty("created_at")) bool = false;
    if (!tweet.hasOwnProperty("hashtags")) bool = false;
    if (!tweet.hasOwnProperty("media")) bool = false;
    if (!tweet.hasOwnProperty("urls")) bool = false;
    if (!tweet.hasOwnProperty("favorite_count")) bool = false;
    if (!tweet.hasOwnProperty("id")) bool = false;
    if (!tweet.hasOwnProperty("in_reply_to_screen_name")) bool = false;
    if (!tweet.hasOwnProperty("in_reply_to_status_id")) bool = false;
    if (!tweet.hasOwnProperty("in_reply_to_user_id")) bool = false;
    if (!tweet.hasOwnProperty("lang")) bool = false;
    if (!tweet.hasOwnProperty("place")) bool = false;
    if (!tweet.hasOwnProperty("possibly_sensitive")) bool = false;
    if (!tweet.hasOwnProperty("retweet_count")) bool = false;
    if (!tweet.hasOwnProperty("reweet_id")) bool = false;
    if (!tweet.hasOwnProperty("retweet_screen_name")) bool = false;
    if (!tweet.hasOwnProperty("source")) bool = false;
    if (!tweet.hasOwnProperty("text")) bool = false;
    if (!tweet.hasOwnProperty("tweet_url")) bool = false;
    if (!tweet.hasOwnProperty("user_created_at")) bool = false;
    if (!tweet.hasOwnProperty("user_screen_name")) bool = false;
    if (!tweet.hasOwnProperty("user_default_profile_image")) bool = false;
    if (!tweet.hasOwnProperty("user_description")) bool = false;
    if (!tweet.hasOwnProperty("user_favourites_count")) bool = false;
    if (!tweet.hasOwnProperty("user_followers_count")) bool = false;
    if (!tweet.hasOwnProperty("user_friends_count")) bool = false;
    if (!tweet.hasOwnProperty("user_listed_count")) bool = false;
    if (!tweet.hasOwnProperty("user_location")) bool = false;
    if (!tweet.hasOwnProperty("user_name")) bool = false;
    if (!tweet.hasOwnProperty("user_statuses_count")) bool = false;
    if (!tweet.hasOwnProperty("user_time_zone")) bool = false;
    if (!tweet.hasOwnProperty("user_urls")) bool = false;
    if (!tweet.hasOwnProperty("user_verified")) bool = false;
    return bool;
},

stringToJson: function (string, callback){
    csv
	.parseString(string, {headers: true})
	.on('data', (tweet) => {
        if (this.testTweet(tweet)) tweets.push(tweet);
	})
	.on('end', () => {
		callback(tweets);
	});

}
}
