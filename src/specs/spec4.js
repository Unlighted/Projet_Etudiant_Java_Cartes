const readline = require('readline-sync');
const prompt = '>';

function spec4(tweets) {

	let counter, counter2, buffer;
	let lookedHashAdd, lookedHash = [ ];
	let concernedTweets = [ ];

	//Find all the wanted hashtags
	console.log("What are the beginning hashtags (without #, Type OK when done)");
	while(lookedHashAdd != "OK"){
		lookedHash.push(lookedHashAdd);
		lookedHashAdd = readline.question(`${prompt}`);
	} 
	lookedHash.shift();


    // go through tweets and find singular concerned tweets
    for(counter = 0; counter !== tweets.length; counter++ ){
		if (lookForSingleConcerned(tweets[counter], lookedHash) === true)
    		concernedTweets.push(tweets[counter]);

    }

    // we get all the possible hash
    let allConcernedTweets = lookForAllConcerned(tweets, concernedTweets);
    let foundHash = addAllHash(allConcernedTweets);
    let hashValues = [];


    for(counter=0; counter < foundHash.length; counter++){
    	// we count where we find the hash in foundHash in hashValues
    	for(counter2=0; counter2 < hashValues.length; counter2++){
    		if(hashValues[counter2].hash === foundHash[counter]){
    			break;
    		}
    	}
    	//an array of objects 
    	if(hashValues.length == counter2){
    		hashValues.push({
    			hash: foundHash[counter],
    			times: 1
			})
    	}
    	else{
    		hashValues[counter2].times += 1;
    	}
    }

    //tri bulle
    for(counter=0; counter < hashValues.length; counter++){
    	for(counter2 = counter ; counter2 < hashValues.length ; counter2++){
    		if(hashValues[counter2].times > hashValues[counter].times){
    			buffer = hashValues[counter2].hash;
    			hashValues[counter2].hash = hashValues[counter].hash;
    			hashValues[counter].hash = buffer;

    			buffer = hashValues[counter2].times;
    			hashValues[counter2].times = hashValues[counter].times;
    			hashValues[counter].times = buffer;
    		}
    	}
    }

    hashValues.shift();
    console.log(hashValues);

    if (hashValues.length == 0){
    	console.log("Aucun hashtag trouvé");
    }

    var chart = {
   "data" : {
      "values" : hashValues
	},
        "mark" : "bar",
  		"encoding": {
    		"x": {"field": "hash", "type": "nominal"},
    		"y": {"field": "times", "type": "quantitative"}
  		}
	}
	return chart;
}

//look for single tweets with the hashtag
function lookForSingleConcerned(tweet, lookedHash = [ ]){

	let found = false;
	hashtags = tweet["hashtags"].split(/\s+/);
		//console.log(tweet["hashtags"] + "+ " + hashtags);

	for(let i=0; i<lookedHash.length; i++){
		if(hashtags.includes(lookedHash[i])){
			found = true;
		}
	}
	return found;
}

// Increase the range to the whole discussion
function lookForAllConcerned(tweets = [ ], concernedTweets = [ ]){

    // adds all retweet and status id to allCases
	let allCases = [ ];
	for (let i=0; i<concernedTweets.length; i++){
		if(concernedTweets[i]["reweet_id"] !== ""){
			allCases.push(concernedTweets[i]["reweet_id"]);
		}
		if(concernedTweets[i]["in_reply_to_status_id"] != ""){
			allCases.push(concernedTweets[i]["in_reply_to_status_id"]);
		}
	}

	let addTweet = [ ];
	// adds found ID to addTweet
	for(let i=0; i != tweets.length; i++){
		if(allCases.includes(tweets[i]["id"])){
			addTweet.push(tweets[i]);
		}
	}

	let allConcernedTweets = arrayUnique(concernedTweets.concat(addTweet)); 

	return allConcernedTweets;
}

//merge two arrays
function arrayUnique(array) {
    var a = array.concat();
    for(var i=0; i<a.length; ++i) {
        for(var j=i+1; j<a.length; ++j) {
            if(a[i] === a[j])
                a.splice(j--, 1);
        }
    }

    return a;
}

// adds all hashtags found in the concerned tweets, with all the instances
function addAllHash(allConcernedTweets = [ ]){
	let foundHash = [];
	for(i=0; i<allConcernedTweets.length; i++){
		hashtags = allConcernedTweets[i]["hashtags"].split(/\s+/);
		foundHash = hashtags.concat(foundHash);
	}
	return foundHash;
}

module.exports = spec4

/* NOTES TO MYSELF

readline.question(`Type the data directory's path: \n${prompt}`);  ==> ${prompt} : ">"
Don't forget npm*
you acceed tweets with their name in the first line of tweets.csv

curS.match(/(\d+(\.\d+)?);(\d+(\.\d+)?)/)

in_reply_to_status_id
*/
/*

    	if(tweetAnalyzed.includes(tweetID) === false){
    		lookForHashtag(tweetID, tweetAnalyzed, lookedHash, foundHash);
    	}

*/