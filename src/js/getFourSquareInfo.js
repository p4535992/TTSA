
tokengg = null;

function getFourSquareInfo(namew,latw,lonw){

  var namegg = namew;
  var latgg = latw;
  var longg = lonw;

  array=new Array();
  today = new Date();
  day = today.getDay();
  month = today.getMonth()+1;
  year = today.getYear();
  date =today.getDate();
  if(year<1900)year=year+1900;
  
  if($("#descriptionFoursquare").has("ul")){
     jQuery('#descriptionFoursquare').html('');
     array.splice(0, array.length);   //svuotiamo l'array
    
  }
  fourSquarePhotos(namegg,latgg,longg);
 
  /*Prendiamo le foto in una locazione foursquare*/
  function fourSquarePhotos(namegg,latgg,longg){
      var URL =" https://api.foursquare.com/v2/venues/search?ll="+latgg+","+longg+"&oauth_token="+tokengg+"&v="+year+month+date;
//      location.href = URL;  //Reindirizza alla risposta JSON di Foursquare
      console.log(URL);
      
   
   function ajaxRequest(){
    var activexmodes=["Msxml2.XMLHTTP", "Microsoft.XMLHTTP"] //activeX versions to check for in IE
    if (window.ActiveXObject){ //Test for support for ActiveXObject in IE first (as XMLHttpRequest in IE7 is broken)
     for (var i=0; i<activexmodes.length; i++){
      try{
       return new ActiveXObject(activexmodes[i])
      }
      catch(e){
       //suppress error
      }
     }
    }
    else if (window.XMLHttpRequest) // if Mozilla, Safari etc
     return new XMLHttpRequest()
    else
     return false
   }
   
   var mygetrequest=new ajaxRequest();
    mygetrequest.onreadystatechange=function(){
     if (mygetrequest.readyState==4){
      if (mygetrequest.status==200 || window.location.href.indexOf("http")==-1){

       var jsondata=eval("("+mygetrequest.responseText+")") //retrieve result as an JavaScript object
         if(jsondata.meta.code == 200){
             
             var info= jsondata.response.venues;
             if(typeof info !='undefined'){
                 //risposta json standard di Foursquare
                 var infox=info;
             }else {
                  //una risposta json con differente struttura da parte di Foursquare
                  var info2 =jsondata.response.groups[0].items;
                  
                  if(typeof info2 !='undefined'){
                       var infox=info2;
                  }
                  else{
                     alert("Errore in fase di elaborazione della risposta JSON di Foursquare");
                  }
             }
            
              for(var i = 0; i <= infox.length; i += 1) {                 
                  var oggetto = infox[i];
//                  var id = oggetto.id;             
                  var namey=namegg;   
                  var namex = oggetto.name;
                  var phone = oggetto.contact.phone;
//                  var fphone = oggetto.contact.formattedPhone;
                  var address =oggetto.location.address;
                  var crossStreet =oggetto.location.crossStreet;
//                  var lat=lat;
//                  var lng=lon;
                  var distance =oggetto.location.distance;
                  var postalCode =oggetto.location.postalCode;
                  var cc =oggetto.location.cc;
                  var city =oggetto.location.city;
                  var state =oggetto.location.state;
                  var country =oggetto.location.country;
                  var url = oggetto.url;
                  
                  if(namex!=null &&  phone != null && 
                     address!=null && crossStreet !=null && distance!=null &&
                     postalCode!=null && cc!=null && city!=null &&
                     state!=null && country!=null){
                    
//                    alert("COMPLETA --> Name:"+namex+",Phone:"+phone
//                            +",Address:"+address+",CrossStreet:"+crossStreet+",Distance:"+
//                            distance+",PostalCode:"+postalCode+",CC:"+cc+",City"+city+
//                            ",State:"+state+",Country:"+country+",URL:"+url);
                    creaListaInfoFoursquare(namex,namey,phone,address,
                                            crossStreet,latgg,longg,distance,postalCode,
                                            cc,city,state,country,url);
                    
                    return;
                 }else if(i=infox.length){
//                    alert("NON COMPLETA --> Name:"+namex+",Phone:"+phone
//                            +",Address:"+address+",CrossStreet:"+crossStreet+",Distance:"+
//                            distance+",PostalCode:"+postalCode+",CC:"+cc+",City"+city+
//                            ",State:"+state+",Country:"+country);
                    creaListaInfoFoursquare(namex,namey,phone,address,
                                            crossStreet,latgg,longg,distance,postalCode,
                                            cc,city,state,country,url);
                    return;
                 }
             }
         }else{
           alert("Errore nella risposta del server Foursquare");
         }
      }
      else{
       alert("Errore nella richiesta al server Foursquare");
      }
     }
    }


//mygetrequest.open("GET", "javascriptkit.json", true)
mygetrequest.open("GET", URL, true);
mygetrequest.send(null);

   
}  
  //]]>
 function creaListaInfoFoursquare(namex,namey,phone,address,
                                            crossStreet,lat,lng,distance,postalCode,
                                            cc,city,state,country,url){
   
//   var array = new Array();
   var namex = "Nome 1: "+namex+".";
   var namey = "Nome 2: "+namey+".";
   var phone = "Telefono-Cellulare: "+phone+".";
//   var fphone ="Cellulare:"+fphone;
   var address ="Indirizzo: "+address+"."
   var crossStreet ="Strada-Incrocio: "+crossStreet+".";
   var lat ="Latitudine: "+lat+".";
   var lng ="Longitudine: "+lng+".";
   var distance ="Distanza:"+distance+".";
   var postalCode ="Codice Postale: "+postalCode+".";
   var cc = "CC: "+cc+".";
   var city ="Città: "+city+".";
   var state ="Provincia: "+state+".";
   var country ="Nazione: "+country+".";
   
   
   array.push(namex,namey,phone,address,
              crossStreet,lat,lng,distance,postalCode,
              cc,city,state,country);
   var output='<p>Informazioni sulla località da FourSquare:</p>\n\
               <ul>';
       for (var i=0; i<array.length; i++){
        var elem = array[i];
        output+='<li>';
        output+='<p>'+elem+'</p>';
        output+='</li>';
       }
       output+='<li>';
       output+='<a href="'+url+'" title="link for info">'+url+'</a>';
       output+='</li>';
       output+='</ul>'; 

       $(output).appendTo('#descriptionFoursquare');
 }

}

function startWithFourSquare(namew,latw,lonw){
    if(tokengg==null){     
//    console.log(getFourSquareInfo);  
    var config = {
      apiKey: 'MVN2V1LO2CVRACE4PIHDELBND5WAQLNX5JD3JLEPMLX3PKI4',
      authUrl: 'https://foursquare.com/',
      apiUrl: 'https://api.foursquare.com/'
    };
    //<![CDATA[
    /* Attempt to retrieve access token from URL. */
    function doAuthRedirect() {
      var redirect = window.location.href.replace(window.location.hash, '');
      var url = config.authUrl + 'oauth2/authenticate?response_type=token&client_id=' + config.apiKey +
          '&redirect_uri=' + encodeURIComponent(redirect) +
          '&state=' + encodeURIComponent($.bbq.getState('req') || 'users/self');
      window.location.href = url;
//      alert("doAuthRedirect");
    };

    if ($.bbq.getState('access_token')) {
      // If there is a token in the state, consume it
      tokengg = $.bbq.getState('access_token');
      $.bbq.pushState({}, 2);
//         alert("ACCESS_TOKEN:"+tokengg);
         getFourSquareInfo(namew,latw,lonw);
    } else if ($.bbq.getState('error')) {
    } else {
      doAuthRedirect();
    }
 } //if token==null
//else{fourSquarePhotos(token);}
}
