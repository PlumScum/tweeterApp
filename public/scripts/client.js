/* eslint-disable no-undef */
$(() => {

  // Escapes user input to prevent XSS attacks
  const escape = function(str) {
    let div = document.createElement("div");
    div.appendChild(document.createTextNode(str));
    // console.log("div: ", div)
    return div.innerHTML;
  };
    
  // Style our tweets
  const createTweetElement = function(tweet) {
    const $tweet = `
      <article class="tweet-post">
      <section class="user-info">
        <div class="avatar-and-name">
          <div class="avatar-alone">
            <img src='${tweet.user.avatars}'>
          </div>
          <div class="name-alone">
            ${tweet.user.name}
          </div>
        </div>
        <div class="handle">${tweet.user.handle}</div>
      </section>
      <p class="entry">
          ${escape(tweet.content.text)}
      </p>
      <footer>
      <div class="created-at">${timeago.format(tweet.created_at)}</div>
      <div class="icons">
      <i class="fas fa-flag"></i>
      <i class="fas fa-retweet"></i>
      <i class="fas fa-heart"></i>
      </div>
      </footer>
      </article>
      `;
    return $tweet;
  };
    
  // Render tweets to our container
  const renderTweets = function(tweets) {
    const $tweetsContainer = $('.tweets-container');
    $tweetsContainer.empty();
    for (const tweet of tweets) {
      const $tweet = createTweetElement(tweet);
      $tweetsContainer.prepend($tweet);
    }
  };
    
  // Override default form submition and check form before submition
  $('form').on('submit', function(event) {
    event.preventDefault();
    let $tweetLength = $(this).find('textarea').val().length;
    console.log("tweetLength: ", $tweetLength);
    $('.error').slideUp(400);
    if ($tweetLength > 140) {
      return $('.character').slideDown(400);
    
    }
    if ($tweetLength === 0) {
      return $('.blank').slideDown(400);
    }
    
    
    $.ajax({
      url: '/tweets',
      method: 'POST',
      data: $('form').serialize()
  
    }).then(loadTweets).catch(error => console.log(error));
  });
    
  // Loads tweets from our tweets endpoint
  const loadTweets = () => {
    $.ajax({
      url: '/tweets',
      method: 'GET',
      dataType: 'json',
      success: (tweets) => {
        // console.log("data", tweets);
        renderTweets(tweets);
      },
      error: (err) => {
        console.log(`error: ${err}`);
      }
    });
    $('#tweet-text').val('');
    $('.counter').text(140);
  };
    
    
  loadTweets();
    
});