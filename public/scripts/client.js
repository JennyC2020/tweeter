/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

// Fake data taken from initial-tweets.json
const data = [
  {
    "user": {
      "name": "Newton",
      "avatars": "https://i.imgur.com/73hZDYK.png"
      ,
      "handle": "@SirIsaac"
    },
    "content": {
      "text": "If I have seen further it is by standing on the shoulders of giants"
    },
    "created_at": 1461116232227
  },
  {
    "user": {
      "name": "Descartes",
      "avatars": "https://i.imgur.com/nlhLi3I.png",
      "handle": "@rd"
    },
    "content": {
      "text": "Je pense , donc je suis"
    },
    "created_at": 1461113959088
  }
];


$(document).ready(function() {

  const renderTweets = function(tweets) {
    console.log(tweets);
    for (let entry of tweets) { // loops through tweets
      let $renderedTweet = createTweetElement(entry); // calls createTweetElement for each tweet
      $("section.tweet-container").append($renderedTweet); // takes return value and appends it to the tweets container
    }
  };

  const createTweetElement = function(tweet) {
    const $tweet = $(`<article class="tweet">
    <header>
      <div>
        <img src="${tweet.user.avatars}" alt="profile picture">
        <p class="user-name">${tweet.user.name}</p>
      </div>
      <p>${tweet.user.handle}</p>
    </header>
    <div>
      <p>${tweet.content.text}</p>
    </div>
    <footer>
      <div>
        <p>${tweet.content.created_at}</p>
        <div>
          <span>icon</span>
          <span>icon</span>
          <span>icon</span>
        </div>
      </div>
    </footer>
  </article> `);

    return $tweet;
  };

});
renderTweets(data);