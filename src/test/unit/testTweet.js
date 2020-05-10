// nodeunit https://github.com/caolan/nodeunit
const readline = require('readline-sync');
const myParser = require('../../../src/parser');
const fs = require('fs');
const prompt = '>';

exports.datasSetIsConform = function(test) {
	// test.expect(1);
	var datasSetIsConform = false

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
				for(var i = 0; i < tweets.length; i++) {

					var tweet = tweets[i];
					
					test.equal(Object.keys(tweet)[0], "coordinates", "Expected another value")
					test.equal(Object.keys(tweet)[1], "created_at", "Expected another value")
					test.equal(Object.keys(tweet)[2], "hashtags", "Expected another value")
					test.equal(Object.keys(tweet)[3], "media", "Expected another value")
					test.equal(Object.keys(tweet)[4], "urls", "Expected another value")
					test.equal(Object.keys(tweet)[5], "favorite_count", "Expected another value")
					test.equal(Object.keys(tweet)[6], "id", "Expected another value")
					test.equal(Object.keys(tweet)[7], "in_reply_to_screen_name", "Expected another value")
					test.equal(Object.keys(tweet)[8], "in_reply_to_status_id", "Expected another value")
					test.equal(Object.keys(tweet)[9], "in_reply_to_user_id", "Expected another value")
					test.equal(Object.keys(tweet)[10], "lang", "Expected another value")
					test.equal(Object.keys(tweet)[11], "place", "Expected another value")
					test.equal(Object.keys(tweet)[12], "possibly_sensitive", "Expected another value")
					test.equal(Object.keys(tweet)[13], "retweet_count", "Expected another value")
					test.equal(Object.keys(tweet)[14], "reweet_id", "Expected another value")
					test.equal(Object.keys(tweet)[15], "retweet_screen_name", "Expected another value")
					test.equal(Object.keys(tweet)[16], "source", "Expected another value")
					test.equal(Object.keys(tweet)[17], "text", "Expected another value")
					test.equal(Object.keys(tweet)[18], "tweet_url", "Expected another value")
					test.equal(Object.keys(tweet)[19], "user_created_at", "Expected another value")
					test.equal(Object.keys(tweet)[20], "user_screen_name", "Expected another value")
					test.equal(Object.keys(tweet)[21], "user_default_profile_image", "Expected another value")
					test.equal(Object.keys(tweet)[22], "user_description", "Expected another value")
					test.equal(Object.keys(tweet)[23], "user_favourites_count", "Expected another value")
					test.equal(Object.keys(tweet)[24], "user_followers_count", "Expected another value")
					test.equal(Object.keys(tweet)[25], "user_friends_count", "Expected another value")
					test.equal(Object.keys(tweet)[26], "user_listed_count", "Expected another value")
					test.equal(Object.keys(tweet)[27], "user_location", "Expected another value")
					test.equal(Object.keys(tweet)[28], "user_name", "Expected another value")				
					test.equal(Object.keys(tweet)[29], "user_statuses_count", "Expected another value")
					test.equal(Object.keys(tweet)[30], "user_time_zone", "Expected another value")
					test.equal(Object.keys(tweet)[31], "user_urls", "Expected another value")
					test.equal(Object.keys(tweet)[32], "user_verified", "Expected another value")
					
				}
			  } else {
				console.log("No tweets found")
			  }
			  test.done();
			});
		}
  } while (dataDir == "" || dataFileAbsolutePaths.length == 0);
};



