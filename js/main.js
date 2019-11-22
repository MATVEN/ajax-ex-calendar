/*
Calendario Festività
Creare un calendario dinamico con le festività.
Partiamo dal gennaio 2018 dando la possibilità di cambiare mese,
gestendo il caso in cui l’API non possa ritornare festività.
Il calendario partirà da gennaio 2018 e si concluderà a dicembre 2018
(unici dati disponibili sull’API).
Ogni volta che cambio mese dovrò:
Controllare se il mese è valido
(per ovviare al problema che l’API non carichi holiday non del 2018)
Controllare quanti giorni ha il mese scelto formando così una lista
Chiedere all’api quali sono le festività per il mese scelto
Evidenziare le festività nella lista
*/

$(document).ready(function () {

   var month = 1;

   generaMese(month);

   // funzione per andare avanti con in mesi sul calendario
   $("#next-month").click(function(){

     // pongo condizione per stabilire la lunghezza del calendario
      if(month == 12){

        // stabilisco mese di partenza
         month = 1;

         // svuota il contenuto di calendar e evita la concatenazione
         $(".calendar").html("")

         // richiamo la funzione
         generaMese(month);

      } else{

        // incremento la variabile month per arrivare
         month++;

         //
         $(".calendar").html("")

         // richiamo la funzione
         generaMese(month);

      }

   })

   // funzione per andare indietro con in mesi sul calendario
   $("#prev-month").click(function(){

      if(month == 1){

         month = 12;

         $(".calendar").html("")

         generaMese(month);

      }else {

      month--;

      $(".calendar").html("")

      generaMese(month);

      }

   })

  function generaMese(month) {
    //dinamicizzo

    $.ajax({

      url: "https://flynn.boolean.careers/exercises/api/holidays?year=2018&month=" + (month - 1),
      method: "GET",
      success: function (data) {

        // durata giorni nel mese
        var daysNumber = moment('01/' + month + '/2018', 'DD/MM/YYYY').daysInMonth();


        for (var i = 1; i <= daysNumber; i++) {

          // struttura la data del giorno consultato
          var currentDate = '2018-' + month + '-' + i;

          // fotmato calendario
          var dateForm = moment(currentDate).format("YYYY-MM-DD");

          // formato stampato in pagina
          var currentDay = moment('2018-' + month + '-' + i).format('DD dddd');

          // stampa
          $(".calendar").append('<li data-date="' + dateForm + '">'+ currentDay +'</li>');

        }

        // ciclo per generare festività
        for (var i = 0; i < data.response.length; i++) {

         $(".calendar [data-date='" + data.response[i].date + "']").css('color', 'red').append(' ' + data.response[i].name)
        }

      },

      error: function (request, condition, error) {
         alert("Errore " + " " + request + " " + condition + " " + error);

      }
    })
  };
});
