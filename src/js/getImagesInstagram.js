var images;
function prendiLefotoDellaLocazione(idLocation,lat,lng){
    if(images.length>0 || $("#photo").has("div")){cancellaLeFotoDellaLocazione();}
//    alert("prendiLeFotoDellaLocazione");
    var INSTAJAM = new Instajam({
//                  access_token: '553232369.d342186.dd6fb4d88d964ca8a7777ff1b660c13a',
                    access_token: localStorage.getItem("access_token"), //trucco per tenere nascosot il nostro access_token
                    client_id: 'd342186d12db4d56a0c2c1bb28c69b34'
                  });
//     alert("Option: idLocation="+idLocation+", LAT="+lat+",LON="+lng);            
     var options = {"lat":lat,"lng":lng,"distance":100};
     
     INSTAJAM.user.feed(function(data) { 
                    mediaSearch8();
                      
                    //Secondo metodo prendiamo tutte le immagini vicine a una certa locazione,
                    //stavolta abbiamo un sacco di dati in più ma non le coordinate geografiche lat e lng
//                  alert("mediasearhc8");
                  if(images.length>0) {
//                      alert("Cancellazione premeditata");
                      cancellaLeFotoDellaLocazione();
                  }
                  function mediaSearch8(){
                    INSTAJAM.media.search(options,function(data){
                        if(data.meta.code == 200) {                        
                         var IMAGES = new Array();  
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
                                           
//                                                                 
                                }
                                                              
//                                alert("VISUALIZZA FOTO");
//                                visualizzaFoto(images);
//                                for (var key in IMAGES){
//                                   alert("ATTENZIONE"+key+":"+IMAGES[key].ID); 
//                                }
                                visualizzaFoto(IMAGES);
//                                
                         }else{
                            alert('nessuna foto nelle vicinanze');
                         }
                        }else{
                        alert(data.meta.error_message);
            
                    }
                    });
                    return images;
                   }                  
                   
                    
                   function visualizzaFoto(images){
                        for(var key in images){
                            var id=images[key].ID; 
                            var url = images[key].TU;
                            var ref = images[key].SRU;
                           
                             $('<div id"' + id + '"><a href="'+ref+'" data-lightbox="roadtrip">\n\
                                <img id="' + id + '" class="expando" src="'+ url +'" width="'+screen.width+'" height="'+screen.width/2+'"></a></div>').appendTo('.photo');
                        }
//                        getFourSquareInfo(idLocation,lat,lng);
                    }                
                  });
     
}

function  cancellaLeFotoDellaLocazione(){
//    alert("cancellaLeFotoDellaLocazione");
//     $("#photo").css( "display", "none" );
     jQuery('#photo div').html('');

//    console.log("Prima:"+images);
//    alert("Array prima dello svuotamento:"+images);
    images.splice(0, images.length);   //svuotiamo l'array
//    alert("Array dopo che è stato svuotato:"+images);
//    console.log("Dopo:"+images);
}