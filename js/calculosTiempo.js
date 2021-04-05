  function mostrarMapa(lat, long) {
      //Para sacar el mapa
      //------------------
      let mapa = '<h1 class="col-2">Mapa </h1> <iframe width="425" height="350" frameborder="0" scrolling="no" marginheight="0" marginwidth="0" src="https://www.openstreetmap.org/export/embed.html?bbox=' + long + '%2C' + (lat - 0.03) + '%2C' + long + '%2C' + lat + '&amp;layer=mapnik" style="border: 1px solid black"></iframe><br/><small><a href="https://www.openstreetmap.org/#map=11/' + lat + '/' + long + '">Ver mapa más grande</a></small>';

      $("#mapa").html(mapa);
  }
  //Para sacar la ciudad
  //---------------------

  function ciudad() {
      var ciudad;
      if (document.getElementById("ciudad").value == "") {
          ciudad = "Almeria";
      } else {
          ciudad = document.getElementById("ciudad").value + "," +
              document.getElementById("pais").value;
      }
      return ciudad;
  }

  $(function() {



      //Saco la polución
      //----------------
      $("#poluci").click(function() {




          $.getJSON(" https://api.weatherbit.io/v2.0/history/airquality", {
              key: 'd1e0f5c688744feda6112cfff91927eb',
              city: ciudad()
          }, function(datos_devueltos, estado) {


              console.log(datos_devueltos);
              try {
                  var cadena = "<h1>Actualmente</h1> O3:" + datos_devueltos.data[0].o3 + "  <br> Aqi: " + datos_devueltos.data[0].aqi + " <br> SO2: " + datos_devueltos.data[0].so2 + "<br> no2: " + datos_devueltos.data[0].no2 + " <br> PM10 " + datos_devueltos.data[0].pm10;
              } catch (Exception) {
                  $("#cambia").html("Los datos introducidos no parecen ser de un país o son erroneos");
                  $("#mapa").html("");
              }


              mostrarMapa(datos_devueltos.lat, datos_devueltos.lon);


              $("#cambia").html(cadena);




          });

      });

      $("#tiempo").click(function() { // Si se pulsa el boton
          var cadena = "";

          var dias = document.getElementById("dias").value; //Saco la opción elegida por el usuario
          try {
              if (dias != 0) {

                  //En caso de que sea en algún día distinto al de hoy
                  //---------------------------------------------------
                  $.getJSON("https://api.weatherbit.io/v2.0/forecast/daily", {
                      key: 'd1e0f5c688744feda6112cfff91927eb',
                      lang: "es",
                      city: ciudad()
                  }, function(datos_devueltos, estado) {
                      console.log(datos_devueltos);

                      cadena += " <h1>Día " + datos_devueltos.data[dias].datetime + "</h1> <br> Temperatura actual:" + datos_devueltos.data[dias].temp + " grados <br> Viento: " + datos_devueltos.data[dias].wind_spd + " dirección: " + datos_devueltos.data[dias].wind_dir + " degrees, " + datos_devueltos.data[dias].wind_cdir_full + "<br> Estado del tiempo: " + datos_devueltos.data[dias].weather.description + "<img src='https://www.weatherbit.io/static/img/icons/" + datos_devueltos.data[dias].weather.icon + ".png' width='50px'> <br> Presión atmosferica: " + datos_devueltos.data[dias].pres + " mb <br> Nubosidad: " + datos_devueltos.data[dias].clouds + " <br> Probabilidad de precipitaciones: " + datos_devueltos.data[dias].pop + "<br>País: " + datos_devueltos["country_code"];
                      mostrarMapa(datos_devueltos.lat, datos_devueltos.lon);
                      $("#cambia").html(cadena);




                  });
              } else {
                  //En caso de que sea el tiempo actualmente
                  //-----------------------------------------
                  $.getJSON("https://api.weatherbit.io/v2.0/current", {
                      key: 'd1e0f5c688744feda6112cfff91927eb',
                      lang: "es",
                      city: ciudad()
                  }, function(datos_devueltos, estado) {
                      console.log(datos_devueltos);
                      cadena += " <h1>Día " + datos_devueltos.data[dias].datetime + "</h1> <br> Temperatura actual:" + datos_devueltos.data[dias].temp + " grados <br> Viento: " + datos_devueltos.data[dias].wind_spd + " dirección: " + datos_devueltos.data[dias].wind_dir + " degrees," + datos_devueltos.data[dias].wind_cdir_full + "<br> Estado del tiempo: " + datos_devueltos.data[dias].weather.description + "<img src='https://www.weatherbit.io/static/img/icons/" + datos_devueltos.data[dias].weather.icon + ".png' width='50px'> <br> Presión atmosferica: " + datos_devueltos.data[dias].pres + " mb <br> Nubosidad: " + datos_devueltos.data[dias].clouds + " <br> Probabilidad de precipitaciones: " + datos_devueltos.data[dias].precip + "<br>País: " + datos_devueltos.data[dias]["country_code"];
                      mostrarMapa(datos_devueltos.data[dias].lat, datos_devueltos.data[dias].lon);
                      $("#cambia").html(cadena);




                  });
              }
          } catch (Exception) {
              $("#cambia").html("Hubo un problema con la búsqueda del tiempo de ese país :(");
              $("#mapa").html("");

          }
      });
  });