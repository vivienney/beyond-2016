import $ from 'jquery';
import mailchimp from './mailchimp';

var form = $('.news-signup__form');

form.on('submit', function (event) {
  mailchimp.register(form);
  event.preventDefault();
});
