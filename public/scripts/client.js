// const error = $("#error")



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
<span><img class="profile-pic" src="${escape(tweet.user.avatars)}">
 <h6 class="user">${escape(tweet.user.name)}</h6>
</span>
  <h6 class="handle">${escape(tweet.user.handle)}</h6>
</div>

<div class="text">${escape(tweet.content.text)}</div>

<section class="under-border">
  ${escape(new Date(tweet.created_at))}    //// date.now()-tweet.created_at = time in sec convert to days 

  <div class="icons">
  </div>
</section>

<div class="tweet-button">
  <i class="tweet-button-icon"></i>
</div>
</article>`);
  return $tweet;
}

const escape =  function(str) {
  let div = document.createElement('div');
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
}

$(document).ready(function () {
  console.log("loaded")
  loadTweets()
  $(".newtweet_form").submit(function (event) {
    event.preventDefault()
    if (!$(".formtext_area").val()){
      $("#error").html("No text present").show(1000, hideError)

    } else if ($(".formtext_area").val().length > 140) {
      $("#error").html("Character length over 140").show(1000, hideError)
      
    } else {

      let formData = $(".newtweet_form").serialize()
      console.log(formData);
      $.ajax({
        type: "POST",
        url: "/tweets",
        data: formData,
      }).then(function (res) {
        console.log("post response", res)
        loadTweets()
      });
    };
  });
});

const renderTweets = function (tweets) {
  for (let tweet of tweets) {
    $(".tweets").prepend(createTweetElement(tweet))
  }
};

const loadTweets = function () {
  $.ajax({
    type: "GET",
    url: "/tweets",
  })
  .then(function(tweets){
    renderTweets(tweets);
  })
};

const hideError = function () {
  setTimeout(function () {
    $("#error").hide();
  }, 3000)
}

