const readline = require('readline-sync');
const prompt = '>';


function spec2(tweets) {
	
	/*the datas of the user are :
	user_created_at
	user_screen_name
 	user_description
	user_favourites_count
	user_followers_count
	user_friends_count
	user_listed_count
	user_location
	user_name
	user_statuses_count: '8287',
	user_urls: 'http://www.missabigail.com',*/


				// creation of variable	
	let lookedHashtagAdd, lookedHashtag=[];
	let concerned_tweets=[];
	let concern_tweets
	let topauthors=[]



				//Main
	console.log('What are the hashtag you are looking for (Type without #, specify multiple # separated by ,)')
    lookedHashtag = readline.question(`${prompt}`);
    lookedHashtag = lookedHashtag.split(",");
    lookedHashtag = lookedHashtag.map(str => str.trim(str));
	console.log('the top 10 tweets authors with their informations for the hashtags '+lookedHashtag+' are:')
	console.log(      top_authors(   authors_tweets(concernedTweets(tweets,lookedHashtag)),  concernedTweets(tweets, lookedHashtag)     ))


				// look at if one of the given hashtags are include in the tweet[i] and add it in concerned_tweets
	function concernedTweets(tweets=[],lookedHashtag=[]){
		concerned_tweets= tweets.filter(tweet => tweet["hashtags"].match(lookedHashtag))
		return concerned_tweets			
	}


				// Create a map where each user_name is a key and their value is the number of tweet they have written 
	function authors_tweets(concern_tweets=[])	{
		let authors=new Map();
		let name;
		let numberof_tweet;

		for (i=0;i<concern_tweets.length;i++){
			if(concern_tweets[i]["user_name"]!=""){
				name=concerned_tweets[i]["user_name"]
				if (authors.get(name)==undefined){
					authors.set (name,1)
				}
				else{
					number_tweet=authors.get(name)+1
					authors.set(name,numberof_tweet)
				}
			}
		}
		return authors
	}



	function top_authors(authors, concerned_tweets){
		let map_size=authors.size
		let number_tweet=authors.values()
		let numberof_tweet=[]
		let authorsof_tweets=authors.keys()



		for (i=0;i<map_size;i++){
			numberof_tweet.push(number_tweet.next().value)
		}




		for (i=0;i<10;i++){
			let max = Math.max(...number_tweet)
			let index = number_tweet.indexOf(max)
			for (j=0;j<index;j++){
				author=authorsof_tweets.next().value
			}






			author_tweets= concerned_tweets.filter(tweet => tweet["user_name"].match(author))
			console.log(author_tweets[0]["user_name"])
			console.log(author_tweets[0]["user_screen_name"])
			console.log(author_tweets[0]["user_created_at"])
			console.log(author_tweets[0]["user_description"])
			console.log(author_tweets[0]["user_location"])
			console.log(author_tweets[0]["user_urls"])
			console.log(author_tweets[0]["user_statuses_count"])
			console.log(author_tweets[0]["user_friends_count"])
			console.log(author_tweets[0]["user_followers_count"])
			console.log(author_tweets[0]["user_listed_count"])
			console.log(author_tweets[0]["user_favourites_count"])
		}
	}
}

module.exports = spec2