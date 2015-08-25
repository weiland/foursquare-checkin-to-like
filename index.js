'use strict';

import config from './config';
import got from 'got';

const URL = 'https://api.foursquare.com/v2/';

export function getRecentCheckins() {
  let date = new Date();
  date = 20150825;
  return got(`${URL}/users/self?oauth_token=${config.token}&v=${date}`).then((response) => {
    let json = JSON.parse(response.body).response.user;
    json.checkins.items.forEach((checkin) => {
      if (isLiked(checkin)) {
        let venueId = checkin.venue.id;
        likeVenue(venueId);
      }
    });
  }).catch((err) => {
    console.error('an error: ', err);
  });
}

function isLiked(checkin) {
   return checkin.shout === '😍';
}

function likeVenue(venueId) {
  console.log(venueId);
  let data = {
    oauth_token: config.token
  };
  return got.post(URL + 'venues/' + venueId + '/like', data)
    .then((response) => {
      console.log(response);
    })
    .catch((err) => {
      console.error('an error: ', err);
    });

}

