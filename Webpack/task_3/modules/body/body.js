import $ from 'jquery';
import _ from 'lodash';
import './body.css';

$(function() {
  $('body').append('<button id="click-btn">Click here to get started</button>');
  $('body').append('<p id="count"></p>');
  let count = 0;
  const updateCounter = () => {
    count++;
    $('#count').text(`${count} clicks on the button`);
  };
  $('#click-btn').on('click', _.debounce(updateCounter, 500));
});
