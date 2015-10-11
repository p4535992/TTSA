var map, mappingLayer, vectorLayer, selectMarkerControl, selectedFeature;
var superlat;
var superlon;

        /*funzione per la cattura dell'evento click sulle icone nella mappa OpenStreetMap*/
        function onFeatureSelect(feature) {
           selectedFeature = feature;  
           
           popup = new OpenLayers.Popup.FramedCloud(
                       "tempId",                       
                        feature.geometry.getBounds().getCenterLonLat(),
                        null,
                       '<div class="markerContent">' + selectedFeature.attributes.salutation 
//                               +";Latlon:("+selectedFeature.attributes.Lat+","+ selectedFeature.attributes.Lon 
                               +'</div>',
                       null, 
                       true,
                       null);                                   
                                     
            feature.popup = popup;
            map.addPopup(popup);
            map.setCenter(
                        new OpenLayers.LonLat(selectedFeature.attributes.Lon,selectedFeature.attributes.Lat).transform(
                            new OpenLayers.Projection("EPSG:4326"),
                            map.getProjectionObject())

                        , 18
                    );

            prendiLefotoDellaLocazione(selectedFeature.attributes.salutation,selectedFeature.attributes.Lat,selectedFeature.attributes.Lon);
            getFourSquareInfo(selectedFeature.attributes.salutation,selectedFeature.attributes.Lat,selectedFeature.attributes.Lon);

        }
        
        /*funzione per la cattura dell'evento di chiusura dell'icona di popup sulla mappa OpenStreetMap*/
        function onPopupClose(feature) {
            map.removePopup(feature.popup);
            feature.popup.destroy();
            feature.popup = null
        }
       
        /*funzione per la cattura dell'evento di deselezione dell'icone o selzione di un'altra icona
         * sulla mappa OpenStreetMap*/
        function onFeatureUnselect(feature) {
            map.removePopup(feature.popup);
            feature.popup.destroy();
            feature.popup = null;
            cancellaLeFotoDellaLocazione();
        } 
        
        /*funzione per la inizializzaione dell mappa OpenStreetMap, attraverso uno dei tanti
         * Costruttori possibili abilitati dall'API*/
        function initMap2(position){
            
            if (navigator.geolocation) {
              var timeoutVal = 10 * 1000 * 1000;
              navigator.geolocation.getCurrentPosition(
                displayPosition, 
                displayError,
                { enableHighAccuracy: true, timeout: timeoutVal, maximumAge: 0 }
              );               
                 
              ////////////////////////////////////////////////////////////////////////
            }
         else {
              alert("Geolocation is not supported by this browser");
              
         }
      }
      
      /*mostra la posizione dell'utente sulla mappa OpenStreetMap*/
      function displayPosition(position){
        map = new OpenLayers.Map( 'map');
        mappingLayer = new OpenLayers.Layer.OSM("Simple OSM Map");


        map.addLayer(mappingLayer);

        vectorLayer = new OpenLayers.Layer.Vector("Vector Layer", {projection: "EPSG:4326"}); 

        selectMarkerControl = new OpenLayers.Control.SelectFeature(vectorLayer, {onSelect: onFeatureSelect, onUnselect: onFeatureUnselect});

        map.addControl(selectMarkerControl);

        selectMarkerControl.activate();

        map.addLayer(vectorLayer);


            zoom =18;
//           alert(position.coords.latitude);
//           alert(position.coords.longitude);
           map.setCenter(
                new OpenLayers.LonLat(position.coords.longitude,position.coords.latitude).transform(
                    new OpenLayers.Projection("EPSG:4326"),
                    map.getProjectionObject())

                , zoom
            );   
           lat=position.coords.latitude;
           lon=position.coords.longitude;
           superlat=lat;
           superlon=lon;

           var youarehere = "img/me.png";
           placeLocationMarker(lat,lon,"YOU ARE HERE",youarehere,false,false);
           buildInstagram(lat,lon);
        }
        /*funzione per il controllo di errore nell'atto della geolocalizzazione dell'utente*/
        function displayError(error) {
              var errors = { 
                1: 'Permission denied',
                2: 'Position unavailable',
                3: 'Request timeout'
              };
              alert("Error: " + errors[error.code]);
         }
        i=0;
         /*funzione per il piazzamento delle icone/immagini sulla mappa openstreetmap*/
        function placeLocationMarker(lat,lon,string,url,b,menu){

            var randomLat = lat;
            var randomLon = lon;
            var randomLonLat = new OpenLayers.Geometry.Point( randomLon, randomLat);
            randomLonLat.transform("EPSG:4326", map.getProjectionObject());

            if(url==null||menu==true){
                if(string=="YOU ARE HERE"){url= "img/me.png";}
                else{url= "img/cluster.png";}
                
                loww = 31;
                lowh = 35;
                var randomFeature = new OpenLayers.Feature.Vector(
                    randomLonLat,
//                    {salutation:string} ,
                    {salutation:string,Lon : randomLon, Lat : randomLat} ,
                    {externalGraphic: url, graphicHeight: lowh, graphicWidth: loww, graphicXOffset: -12, graphicYOffset: -25}
                            ); 
                  var randomFeature = new OpenLayers.Feature.Vector(
                    randomLonLat,
//                    {salutation:string} ,
                    {salutation:string,Lon : randomLon, Lat : randomLat} ,
                    {externalGraphic: url, graphicHeight: lowh, graphicWidth: loww, graphicXOffset: -12, graphicYOffset: -25}
                            );     
            }else if((b==false && url!=null)){
                loww = 31; //21
                lowh = 35; //25
                var randomFeature = new OpenLayers.Feature.Vector(
                    randomLonLat,
//                    {salutation:string} ,
                    {salutation:string,Lon : randomLon, Lat : randomLat} ,
                    {externalGraphic: url, graphicHeight: lowh, graphicWidth: loww, graphicXOffset: -12, graphicYOffset: -25}
                            ); 
            }else if(b==true && url!=null){
                loww = 31;
                lowh = 35;
                var randomFeature = new OpenLayers.Feature.Vector(
                    randomLonLat,
//                    {salutation:string} ,
                    {salutation:string,Lon : randomLon, Lat : randomLat} ,
                    {externalGraphic: url, graphicHeight: lowh, graphicWidth: loww, rotation:i*15}
                            );  
                i=i+1;
           }
          
            vectorLayer.addFeatures(randomFeature);
//            selectedFeature = randomFeature;
//            vectorLayer.addFeatures(selectedFeature);
            if((b==false && randomFeature.attributes.salutation=="YOU ARE HERE")||menu==true){
               var popup = new OpenLayers.Popup.FramedCloud(
                       "tempId",                       
                       new OpenLayers.LonLat( randomLon, randomLat).transform("EPSG:4326", map.getProjectionObject()),
                       null,
//                       randomFeature.attributes.salutation,
//                               + " Lat:" + randomFeature.attributes.Lat + " Lon:" + randomFeature.attributes.Lon,
                       '<div class="markerContent">' + randomFeature.attributes.salutation + '</div>',
                       null, 
                       true,
                       null);
            randomFeature.popup = popup;
            map.addPopup(popup); 
            if(menu != true){startWithFourSquare(randomFeature.attributes.salutation,lat,lon);}
            if(menu == true){ getFourSquareInfo(randomFeature.attributes.salutation,lat,lon);
            }
            prendiLefotoDellaLocazione(randomFeature.attributes.salutation,lat,lon);
            }           
        }     
        /////////////////////////////////////////////////////////////////////////////////////////////////////////77
        /*funzione che stampa sulla mappa tutte le locazioni vicine all'utente e ripsettivamente 
         * cattura tutte per ogni locazione tutte le immagini a lui vicine */
         function allLocationCoordinates(coord){              
           var images =[];           
            for (var key in coord) {
                var laty = coord[key].LAT;     
                var lngy = coord[key].LON; 
                var string = coord[key].NAME;
                placeLocationMarker(laty,lngy,string,null,false,false);
                mediaSearchxxx(laty,lngy,string,images);  
            }      
             
        }
        ///////////////////////////////////////////////////////////////////////////////////////
    /*funzione per il tracciamento delle immagini (inerenti a un luogo) sulla
     * mappa OpenmStreetMap resa inutilizzabile poichè inutile ai fini dell'elaborato*/
    function displayPosition4(lat,lon,images,name) {
                    var i=0;
                    for(var key in images){                                                     
                            var id=images[key].ID; 
                            var url = images[key].TU;
                            var ref = images[key].SRU;                                                                       
///////////////////////////////////////////////////////////////////////////////////////
//Nel caso si volesse inserire le imaagini inerenti si luoghi come icone sulle mappa basta
//abilitare la seguente linea di codice
//                            placeLocationMarker(lat,lon,name,url,true,false,null);     
                    }    
          }

///////////////////////////////////
/*funzione che abilita la ricerca delle immagini a una certa distanza da un luogo di certe coordiante*/
function mediaSearchxxx(laty,lngy,name,images){
    var INSTAJAM = new Instajam({
               access_token: localStorage.getItem("access_token"), //trucco per tenere nascosto il nostro access_token
               client_id: 'd342186d12db4d56a0c2c1bb28c69b34'
                  });
            var optionsx = {"lat":laty,"lng":lngy,"distance":100};
            INSTAJAM.user.feed(function(data) { 

              INSTAJAM.media.search(optionsx,function(data){
                  if(data.meta.code == 200) {
                   var IMAGES = new Array();
                      var k=0;      
                    var photos = data.data;
                    if(photos.length > 0) {
                          for (var key in photos){
                              var photo = photos[key];
                              var imagesObject = {
                                               ID: photo.id,
                                               LRU: photo.images.low_resolution.url,
                                               LRW: photo.images.low_resolution.width,
                                               LRH: photo.images.low_resolution.height,
                                               TU: photo.images.thumbnail.url,
                                               TW: photo.images.thumbnail.width,
                                               TH: photo.images.thumbnail.height,
                                               SRU: photo.images.standard_resolution.url,
                                               SRW: photo.images.standard_resolution.width,
                                               SRH: photo.images.standard_resolution.height
                                           };
                                           
                                           IMAGES.push(imagesObject);
                          }
                   }else{
                      alert('nessuna foto nelle vicinanze');
                   }
                }else{
                  alert(data.meta.error_message);
              }
              displayPosition4(laty,lngy,IMAGES,name);
           });                                 
         });
}
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/*funziona che richiama tutte le locazioni trovate da Instagram per inserirle nel nostro menu a cascata*/
function addLocationToMenu(locations){
    for (var key in locations) {
        var laty = locations[key].LAT;     
        var lngy = locations[key].LON; 
        var name = locations[key].NAME;
        searchEPopup(name,laty,lngy);
    }
}
/*funzione che aggiunge il pulsantre YOU ARE HERE al menù*/
function addMeToMenu(){
    var lat = superlat;
    var lon = superlon;
    var name = "YOU ARE HERE";
    searchEPopup(name,lat,lon);
}
/*funzione che abilita all'evento di click sull'elemento della lista delle località
 * lo zoom sulla locazione e la creazione del popup*/   
function searchEPopup(name,lat,lng){
    if(name=="YOU ARE HERE"){
          centraEPopup(name,lat,lng);
        
    }else{
                var ee =new $('<li><a href='+'javascript:'+nothing+' title="'+name+'">'+name+'</a></li>');
                ee.on('click',function(e) {                    
                    centraEPopup(name,lat,lng);
                    event.preventDefault();
                }); 
                ee.appendTo('.localita');
    }          
}
/*funzione che abilita il centramento della mappa alla locazione desiderata*/
function centraEPopup(name,lat,lng){               
        map.setCenter(
                        new OpenLayers.LonLat(lng,lat).transform(
                            new OpenLayers.Projection("EPSG:4326"),
                            map.getProjectionObject())

                        , 18
                    );
        placeLocationMarker(lat,lng,name,null,false,true);
}
/*funzione che non fa nulla è stata messa per evitare il lancio di un'eccezione in fase
 * di chiamata dell'API foursquare*/
function nothing(){}

