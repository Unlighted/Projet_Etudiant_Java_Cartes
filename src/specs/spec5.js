function spec5(tweets) {


	let countryTweet = [];

	let counter, counter2, buffer;

    for(counter=0; counter < tweets.length; counter++){
    	// we count where we find the country in tweets in countryTweet
    	for(counter2=0; counter2 < countryTweet.length; counter2++){
    		if(countryTweet[counter2].country == tweets[counter]["user_location"]){
    			break;
    		}
    	}
    	//an array of objects 
    	if(countryTweet.length == counter2){
    		countryTweet.push({
    			country: tweets[counter]["user_location"],
    			times: 1
			})
    	}
    	else{
    		countryTweet[counter2].times += 1;
    	}
    }

    //tri bulle
	for(counter=0; counter < countryTweet.length; counter++){
    	for(counter2 = counter ; counter2 < countryTweet.length ; counter2++){
    		if(countryTweet[counter2].times > countryTweet[counter].times){
    			buffer = countryTweet[counter2].country;
    			countryTweet[counter2].country = countryTweet[counter].country;
    			countryTweet[counter].country = buffer;

    			buffer = countryTweet[counter2].times;
    			countryTweet[counter2].times = countryTweet[counter].times;
    			countryTweet[counter].times = buffer;
    		}
    	}
    }
    // find the empty country tweet
    for(counter=0; counter < countryTweet.length; counter++){
    	if(countryTweet[counter].country == ""){
    		break;
    	}
    }
    countryTweet.splice(countryTweet.counter, 1);
    console.log(countryTweet);


    var chart = {
   "data" : {
      "values" : countryTweet
	},
        "mark" : "bar",
  		"encoding": {
    		"x": {"field": "country", "type": "nominal"},
    		"y": {"field": "times", "type": "quantitative"}
  		}
	}
	return chart;
}

module.exports = spec5;