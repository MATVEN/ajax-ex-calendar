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

  function generaMese(mese) {
    //dinamicizzo

    $.ajax({

      url: "https://flynn.boolean.careers/exercises/api/holidays?year=2018&month=" + (month - 1),
      method: "GET",
      success: function (data) {

        var daysNumber = moment('01/' + month + '/2018', 'DD/MM/YYYY').daysInMonth();

        for (var i = 1; i <= daysNumber; i++) {

          var currentDate = '2018-' + month + '-' + i;

          var dateForm = moment(currentDate).format("YYYY-MM-DD");

          var currentDay = moment('2018-' + month + '-' + i).format('DD dddd');

          $(".calendar").append('<li data-date="' + dateForm + '">'+ currentDay +'</li>');

        }

            for (var i = 0; i < data.response.length; i++) {

               $(".calendar [data-date='" + data.response[i].date + "']").addClass("holidays").append(' ' + data.response[i].name)
            }


      }

    })
  };

  generaMese(month);

});
