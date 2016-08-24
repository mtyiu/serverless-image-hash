'use strict';

const Jimp = require('jimp');
const querystring = require('querystring');

module.exports.handler = function(event, context, cb) {
  const body = querystring.parse(event.body);
  const url = [body.url1, body.url2];
  var hashes = [];
  var images = [];

  // Read image
  Jimp.read(url[0])
    .then(function(image) {
      images[0] = image;
      hashes[0] = image.hash();
      return Jimp.read(url[1]);
    }).then(function(image) {
      images[1] = image;
      hashes[1] = image.hash();
      return cb(null, {
        hashes,
        diff: Jimp.distance(images[0], images[1])
      });
    }).catch(function(err) {
      return cb(null, {
        message: 'Invalid image path.'
      });
    });
};
