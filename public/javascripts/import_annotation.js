var xmlHttpRequest = new XMLHttpRequest();

xmlHttpRequest.onreadystatechange = function()
{
    if( this.readyState == 4 && this.status == 200 )
    {
       if( this.response )
        {
            console.log(this.response);
            // 読み込んだ後処理したい内容をかく

        }
   }
}

xmlHttpRequest.open( 'GET', 'http://localhost/oa/items/6/manifest.json', true );
xmlHttpRequest.responseType = 'json';
xmlHttpRequest.send( null );

xmlHttpRequest.onload = function(){
  var result = xmlHttpRequest.response;
  console.log(result);
}

