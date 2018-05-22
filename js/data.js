var app = angular.module("ciandt", []);
var PRIV_KEY = "46a5a60bc9bf1460faae92351abfdc95c39c5b11";
var PUBLIC_KEY = "bf0d050ebfb36234ef20995728551091";


function apresentacao(){ 
  $("#img1").hide(1500).show(10000);
  document.getElementById("img1").src = 'img/marvel.png'
}

app.controller("homeCTRL", function($scope) {
  

});

app.controller("offlineCTRL", function($scope) {
  
  $("#consultaoffline").on("pageshow", function(event) {
    $scope.favoritos = JSON.parse(getLocalStorage("favoritos"));
    $scope.$apply();
  });

});

app.controller("heroisCTRL", function($scope) {
  
  function ajustatextofavoritos(){
    var favs = getLocalStorage("favoritos");
    if(favs != "undefined"){
      $scope.favoritos = JSON.parse(favs);
      if($scope.favoritos != null && $scope.favoritos.length > 0){
        $.each($scope.favoritos, function(i, item) {
          $("#fav"+item.h.id).text("Favorito");
        });
      }
    }
  }

  var ts = new Date().getTime();
  var hash = CryptoJS.MD5(ts + PRIV_KEY + PUBLIC_KEY).toString();                                                                             
  var url = 'http://gateway.marvel.com/v1/public/characters';

  $scope.limparfavoritos = function(){
    $scope.favoritos = [];
    setLocalStorage("favoritos", JSON.stringify($scope.favoritos));
    $scope.atualizartextofavoritos();
    alert("Favoritos apagados com sucesso");
  };

  $scope.atualizartextofavoritos = function(){
    $.each($scope.herois, function(i, item) {
      $("#fav"+item.id).text("Não Favorito");
    });
  };

  $("#herois").on("pageshow", function(event) {                                                                                 
    apresentacao();
    $.getJSON(url, {
      ts: ts,
      apikey: PUBLIC_KEY,
      hash: hash
      }).done(function(data) {
        $scope.herois = data.data.results;
        var favs = getLocalStorage("favoritos");
        if(favs != "undefined"){
          $scope.favoritos = JSON.parse(favs);
        }
        $scope.$apply();
        window.setTimeout(function(){$scope.atualizartextofavoritos();}, 1000);
        window.setTimeout(function(){ajustatextofavoritos();}, 2000);

      }).fail(function(err){
        // the error codes are listed on the dev site
        console.log(err);
    });
  });

  $scope.configmodal = function(obj){
    $scope.hero = obj;
    $scope.events = obj.events.items;
    $.each($scope.events, function(i, item) {
      $.getJSON(item.resourceURI, {
        ts: ts,
        apikey: PUBLIC_KEY,
        hash: hash
        }).done(function(data) {
          item.foto = data.data.results[0].thumbnail.path + "." + data.data.results[0].thumbnail.extension;
          $scope.$apply();
        }).fail(function(err){
          console.log(err);
      });
    });
    document.getElementById("linkmodalhero").setAttribute("href", obj.urls[0].url);
    $("#modalhero").modal("show");
    document.getElementById("imgmodal").src = obj.thumbnail.path + "." + obj.thumbnail.extension;
  };

  $scope.selevt = function(e){
    $.getJSON(e.resourceURI, {
      ts: ts,
      apikey: PUBLIC_KEY,
      hash: hash
      }).done(function(data) {
        $scope.event = data.data.results[0];
        $scope.$apply();
        document.getElementById("linkmodalevent").setAttribute("href", $scope.event.urls[0].url);
        $("#modalevent").modal("show");
      }).fail(function(err){
        console.log(err);
    });
  };

  $scope.favoritar = function(h){
    var favs = getLocalStorage("favoritos");
    if(favs != "undefined"){
      $scope.favoritos = JSON.parse(favs);
      var podefavoritar=true;
      $.each($scope.favoritos, function(ix, itemm){
        if(itemm.h.id == h.id){
          podefavoritar = false;
        }
      });

      if(podefavoritar){
        if($scope.favoritos != null && $scope.favoritos.length > 0){
          $scope.favoritos.push({h});
        }else{
          $scope.favoritos = [{h}];
        }
        $("#fav"+h.id).text("Favorito");
      }else{
        alert("Você já marcou como favorito esse herói");
      }

    }else{
      $scope.favoritos = [{h}];
      $("#fav"+h.id).text("Favorito");
    }  

    setLocalStorage("favoritos", JSON.stringify($scope.favoritos));
  };

  $scope.limparfavorito = function(h){
    
    var v = 0;
    var favs = getLocalStorage("favoritos");
    if(favs != "undefined"){
      $scope.favoritos = JSON.parse(favs);
      if($scope.favoritos != null){
        if($scope.favoritos.length > 0){
          if($scope.favoritos.length == 1){
            $scope.favoritos = [];
          }else{
            var favoritos = [];
            $.each($scope.favoritos, function(ix, itemm){
              if(itemm.h.id != h.id){
                favoritos[v] = itemm;
                v++;
              }
            });
            $scope.favoritos = favoritos;
          }
        }
      }
    } 
    setLocalStorage("favoritos", JSON.stringify($scope.favoritos));
    $("#fav"+h.id).text("Não Favorito");
  };

});
