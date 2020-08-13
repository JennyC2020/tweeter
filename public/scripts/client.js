/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$(document).ready(function() {

  const escape = function(str) {
    const div = document.createElement('div');
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  };

  const renderTweets = function(tweets) {
    console.log(tweets);
    $("section.tweet-container").empty(); //empties the container so only new ones will appear
    for (let entry of tweets) {
      let $element = createTweetElement(entry);
      $("section.tweet-container").prepend($element);
    }
  };

  const createTweetElement = function(tweet) {
    const time = `${moment(tweet.created_at).toNow(true)} ago`;
    const $tweet = $(`<article class="tweet">
    <header>
      <div>
        <img src="${tweet.user.avatars}" alt="profile picture">
        <p class="user-name">${tweet.user.name}</p>
      </div>
      <p>${tweet.user.handle}</p>
    </header>
    <div>
    <p>${escape(tweet.content.text)}</p>
    </div>
    <footer>
      <div>
      <p>${time}</p>
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
      $(".error-panel").slideDown("slow");
      $(".error-panel p").text("Maximun character allowed is 140.");
    } else if (!$text.val()) {
      $(".error-panel").slideDown("slow");
      $(".error-panel p").text("This field cannot be left empty. Make sure you type in your text below.");
    } else {
      $(".error-panel").hide();
      $.post('/tweets', serialized)
        .then(() => loadTweets()); // fetches new tweets without reloading the page

    }
    $text.val("");
  });

  loadTweets();


});