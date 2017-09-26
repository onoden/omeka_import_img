var express = require('express');
var router = express.Router();

/* connect mysql server */

var mysql = require('mysql');
var connection = mysql.createConnection({
  host: 'localhost',
  user: 'kyoino',
  password: 'kyoino039',
  database: 'omeka'
});


if(connection){
//console.log('ok');
} else {
// console.log(typeOf(connection));
}

connection.query("select text from omeka_element_texts where record_id = 10", function(error, result, fields){
  if(error){
//    console.error('error connection:' + err.stack);
    return;
  }


  array = result[0].text.split(':');
  annotation = array[1];
//  console.log(annotation);

  range = result[3].text;
//  console.log(range);
  
});


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('annotaion', { title: 'Success' });
});

module.exports = router;
