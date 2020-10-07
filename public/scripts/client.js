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
]

const createTweetElement = function (tweet) {
  let $tweet = $(`<article class="tweet">
<div class="avatar-box">
<span><img class="profile-pic" src="${tweet.user.avatars}">
 <h6 class="user">${tweet.user.name}</h6>
</span>
  <h6 class="handle">${tweet.user.handle}</h6>
</div>

<div class="text">${tweet.content.text}</div>

<section class="under-border">
  ${new Date(tweet.created_at)}    //// date.now()-tweet.created_at = time in sec convert to days 

  <div class="icons">
  </div>
</section>

<div class="tweet-button">
  <i class="tweet-button-icon"></i>
</div>
</article>`);
  return $tweet;
}

$(document).ready(function () {
  console.log("loaded")
  renderTweets(data);
  $(".newtweet_form").submit(function (event) {
    event.preventDefault()
    let formData = $(".newtweet_form").serialize()
    console.log(formData);
    $.ajax({
      type: "POST",
      url: "/tweets",
      data: formData,
    }).then(function (res) {
       console.log("post response", res)
    });
  });
});

const renderTweets = function (tweets) {
  for (let tweet of tweets) {
    $(".tweets").prepend(createTweetElement(tweet))
  }
};




$(document).ready(function () {
  .post
  
});

// $(document).ready(function () {
//   $.post("/tweets").serialize()
// });
