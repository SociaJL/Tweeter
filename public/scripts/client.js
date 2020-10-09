//  Dynamically creates the tweet feed on main page
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
    <div class="icons">
      <img class="icon" src="/images/flag-alt-solid-24.png">
      <img class="icon" src="/images/repost-regular-24.png">
      <img class="icon" src="/images/heart-solid-24.png">
    </div>
      ${escape(dayCalc(new Date(tweet.created_at)))} 
      </section>
    </article>`);
  return $tweet;
}

// New tweet form creation with error handeling 
$(document).ready(function () {
  console.log("loaded")
  loadTweets()
  $(".newtweet_form").submit(function (event) {
    event.preventDefault()
    if (!$(".formtext_area").val()) {
      $("#error").html("!!Please Start Humming First!!").show(500, hideError)

    } else if ($(".formtext_area").val().length > 140) {
      $("#error").html("!!Less Humming At A Time!! Character length over 140.").show(500, hideError)

    } else {

      let formData = $(".newtweet_form").serialize()

      $.ajax({
        type: "POST",
        url: "/tweets",
        data: formData,
      }).then(function (res) {
        loadTweets();
      });
    };
  });
});

// updates the feed with all tweets
const renderTweets = function (tweets) {
  for (let tweet of tweets) {
    $(".tweets").prepend(createTweetElement(tweet));
  }
};
// Gets all tweets and clears new tweet form
const loadTweets = function () {
  $.ajax({
    type: "GET",
    url: "/tweets",
  })
    .then(function (tweets) {
      renderTweets(tweets);
      $(".newtweet_form")[0].reset();
    })
};

// Hides error messages after 3 seconds
const hideError = function () {
  setTimeout(function () {
    $("#error").hide();
  }, 3000)
}

// Calculates How Much Time Has Past Since Post
const dayCalc = (date) => {
  const postTime = Math.floor(Math.abs(new Date(date) - Date.now()) / (1000 * 3600 * 24));
  let postDay;
  if (postTime > 1) {
    postDay = `${postTime} Days Ago`;
  } else if (postTime === 1) {
    postDay = `${postTime} Day Ago`;
  } else {
    postDay = "Today";
  }
  return postDay;
};

// Keeps our site safe from injection attacks
const escape = function (str) {
  let div = document.createElement('div');
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
};

