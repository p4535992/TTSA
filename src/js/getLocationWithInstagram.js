//Andiamo a utilizzare l'API Instagram per tracciare tutte le località vicino alla mia posizione
            var images = [];
            var coordinates = [];
            function buildInstagram(lat,lng){
//                  alert(screen.width);
                  console.log("Start buildInstagram");
                  var INSTAJAM = new Instajam({
                    access_token: localStorage.getItem("access_token"), //trucco per tenere nascosot il nostro access_token
                    client_id: 'd342186d12db4d56a0c2c1bb28c69b34'
                  });
                  //la distanza può essere variata molto facilemente ma l'API Instagram
                  //a seconda della quantità di foto che traccia nell'arco della distanza potrebbe
                  //lanciare o meno l'errore di codice 500 che sta per un errore di timeout della risposta
                  //cioè ci sono cosi tante foto nel raggio della distanza da richiedere troppo tempo
                  //100-800 sono distanze sicure 
                  var options = {"lat":lat,"lng":lng,"distance":300};
                  INSTAJAM.user.feed(function(data) { 

                        locationSearch();
                      
                    //Prima chiamata all'API Instagram prendiamo lat e lng di tutte le foto vicine a noi
                    //purtroppo non abbiamo il collegamnto alla sorgente della nostra immagine.
                    //NOTA: Il nostro ID qui  è il Location ID.
                    function locationSearch(){
                      INSTAJAM.location.search(options,function(data){
                       if(data.meta.code == 200) {
                          var LOCATION = new Array();
                          var photos = data.data;
                          if(photos.length > 0) {
                                for (var key in photos){
                                    var photo = photos[key];
                                           var k=0;
                                           var locationObject = {
                                               ID: photo.id,
                                               LAT: photo.latitude,
                                               LON: photo.longitude,
                                               NAME:photo.name
                                           };
                                           
                                           LOCATION.push(locationObject);                                         
                                 }                    
                         allLocationCoordinates(LOCATION);
                         addLocationToMenu(LOCATION);
                            }else{
                                alert('nessuna foto nelle vicinanze');
                            }
                        }else{
                            alert(data.meta.error_message);
            
                    }
                    });  
                   
                   }                    
                    
                 
                  });
            
       
        }  