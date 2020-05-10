const readline = require('readline-sync');
const prompt = '>';

function spec1(tweets) {
		

				// creation of variable	
	let lookedHashtagAdd, lookedHashtag=[];
	let concerned_tweets=[];
	let nb_retweet_list=[];
	let delete_tweet;
	let top10 = [];
	console.log('What are the hashtag you are looking for (Type without #, specify multiple # separated by ,)')
    lookedHashtag = readline.question(`${prompt}`);
    lookedHashtag = lookedHashtag.split(",");
    lookedHashtag = lookedHashtag.map(str => str.trim(str));
	console.log('the top 10 tweets with the hashtags '+lookedHashtag+' are:')
	top10=top_10(concernedTweets(tweets,lookedHashtag))		
	//console.log(top10)


	// look at if one of the given hashtags are include in the tweet[i] and add it in concerned_tweets
	function concernedTweets(tweets=[],lookedHashtag=[]){
		concerned_tweets= tweets.filter(tweet => tweet["hashtags"].match(lookedHashtag))
		return concerned_tweets			
	}


				//create an array of the top 10 tweets
	function top_10(concerned_tweets=[]){

		
		for (i=0;i<concerned_tweets.length;i++){
			nb_retweet_list.push(Number(concerned_tweets[i]["retweet_count"]))
		}
		for (i=0;i<10;i++){
			let max = Math.max(...nb_retweet_list)
			let index = nb_retweet_list.indexOf(max)
			top10.push(concerned_tweets[index])
			nb_retweet_list.splice(index,1)
			concerned_tweets.splice(index,1)
		}
		console.log(top10)
		console.log("Do you want to delete one of those tweet?(Type 1 to 10 to delete the tweet according to their order.  Type Finish when done)")
		console.log("When deleting a tweet; the top 10 will refreshed ")
		do{	
			delete_tweet=readline.question(`${prompt}`);
			top10.splice(delete_tweet-1,1)
			let max = Math.max(...nb_retweet_list)
			let index = nb_retweet_list.indexOf(max)
			top10.push(concerned_tweets[index])
			nb_retweet_list.splice(index,1)
			concerned_tweets.splice(index,1)
			console.log(top10)
			console.log("Type 1 to 10 to delete the tweet according to their order.  Type Finish when done")
		}while(delete_tweet!= "Finish")
		

		return top10
	}

}



module.exports = spec1