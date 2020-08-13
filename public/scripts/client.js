/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$(document).ready(function() {

  const renderTweets = function(tweets) {
    console.log(tweets);
    $("section.tweet-container").empty();
    for (let entry of tweets) {
      let $element = createTweetElement(entry);
      $("section.tweet-container").prepend($element);
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
        <p>moment().format(); </p>
        <div>
         <span class="fa fa-flag"></span>
          <span class="fa fa-retweet"></span>
          <span class="fa fa-heart"></span>
        </div>
      </div>
    </footer>
  </article> `);

    return $tweet;
  };

  const loadTweets = function() {
    $.ajax('/tweets', { method: 'GET' })
      .then(function(allTweets) {
        allTweets.sort(function(a, b) {
          return a['created_at'] < b['created_at'];
        });
        renderTweets(allTweets);
      });
  };

  const $form = $('#new-tweet');
  $form.on('submit', (event) => {
    event.preventDefault();
    const serialized = $form.serialize();

    let $text = $form.find("#tweet-text");
    console.log("$text:", $text.val());
    if ($text.val().length > 140) {
      alert("Input cannot exceed 140 characters.");
    } else if (!$text.val()) {
      alert("This field cannot be empty.");
    } else {
      $.post('/tweets', serialized)
        .then(() => loadTweets());

    }
  });

  loadTweets();

});