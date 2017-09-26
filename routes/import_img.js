var express = require('express');
var router = express.Router();
var fs = require('fs-extra');
var request = require('sync-request');

var i = 0;

while(true){
  var url = 'http://localhost:5004/images/' + i + '.jpg';
  var response = request('GET', url);


  if(!response.error && response.statusCode === 200){
    var data = JSON.parse(response.body);
    var json = require('../manifest.json');
    json['@id'] = i
    
    var sequences = json.sequences[0];
    sequences['@id'] = i + '_sq'  
    
    var canvases = sequences.canvases[0];
    canvases['@id'] = i + '_cnv'
    canvases.height = data.height;
    canvases.width = data.width;
    
    var images = canvases.images[0];
    images['@id'] = i + '_img' 
    images.on = i + '_on';
    
    var resource = images.resource;
    resource['@id'] = url + '/full/full/0/default.jpg';    
    resource.height = data.height;
    resource.width = data.width;

    var service = images.resource.service;
    service['@context'] = data['@context'];
    service['@id'] = data['@id'];
    service.profile = data.profile;
    
    fs.writeFile('/home/kyoino/' + i + '_manifest.json', JSON.stringify(json, null, '  '));
    i += 1;
  } else {
      break;
    }
}



/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

module.exports = router;
