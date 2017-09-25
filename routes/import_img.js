var express = require('express');
var router = express.Router();
var request = require('request');
var fs = require('fs-extra');


var url = 'http://localhost:5004/images/0.jpg';

request(
{method: 'GET', url: url, encoding: null},
function(error, response, body){
  if(!error, response.statusCode === 200){
    var data = JSON.parse(body);
    
    var json = require('../manifest.json');
    json['@id'] = '0'
    
    var sequences = json.sequences[0];
    sequences['@id'] = '0_sq'  
    
    var canvases = sequences.canvases[0];
    canvases['@id'] = '0_cnv'
    canvases.height = data.height;
    canvases.width = data.width;
    
    var images = canvases.images[0];
    images['@id'] = '0_img' 
    images.on = '0_on';
    
    var resource = images.resource;
    resource['@id'] = url + '/full/full/0/default.jpg';    
    resource.height = data.height;
    resource.width = data.width;

    var service = images.resource.service;
    service['@context'] = data['@context'];
    service['@id'] = data['@id'];
    service.profile = data.profile;
    
    fs.writeFile('/home/kyoino/0_manifest.json', JSON.stringify(json, null, '  '));
  }
}
);

//var dimensions = sizeOf('./tmp/01.png');
//console.log(typeOf(dimensions));

//fs.removeSync('./tmp');
//return;




/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

module.exports = router;
