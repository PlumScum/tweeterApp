/* eslint-disable no-undef */
const $tweetText = $('#tweet-text');
const $counter = $('.counter');


$(function() {
  const maxCharLength = 140;
  $tweetText.on('input', function() {
    const inputLength = $(this).val().length;
    const counter = maxCharLength - inputLength;

    $counter.text(counter);

    if (counter < 0) {
      $counter.addClass('red-class');
    }
    if (counter > 0) {
      $counter.removeClass('red-class');
    }
  });
});