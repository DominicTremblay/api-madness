$(document).ready(function() {

  var apiUrl = 'http://api.wunderground.com/api/5e068449d1033f54/conditions';

  $('#search-btn').on('click', function() {

    var searchTerm = $('#city-search').val();
    url = 'http://autocomplete.wunderground.com/aq?query=' + searchTerm;
    autoCompleteRequest(url, 'GET', autoCompleteResults);

  });



  var autoCompleteRequest = function (url, type, successFn) {

    $.ajax({
      url: url,
      type: type,
      dataType: 'jsonp',
      jsonp: 'cb'
    })
    .done(successFn)
    .fail(errorFn)
    .always(function (data, textStatus, jqXHR) {
      console.log("The request is complete!");
    });    


  };

  var autoCompleteResults = function (data, textStatus, jqXHR) {

    $('#autocomplete').append(buildCityList(data))  ;

    $('.city-link').on('click', function(e){
    
      e.preventDefault();
      getCityConditions(this.href);
      

    });

  }; 

  var errorFn = function (data, textStatus, jqXHR) {
    console.log('there was an error');
  };

  var buildCityList = function (data) {

    var cityList = "<ul>";

    $.each(data, function(index, cityObjects) {

      $.each(cityObjects, function(index, cityObject){

        cityList = $(cityList).append ("<li>" + "<a href = '" + apiUrl + cityObject.l + ".json' class = 'city-link'>" + cityObject.name + "</a></li>");

      });


    });

    $(cityList).append("</ul");
    return cityList;

  }

  var getCityConditions = function (url) {
    $.ajax({
    url : url,
    dataType : "jsonp",
    success : function(parsed_json) {

      var location = parsed_json['current_observation']['display_location']['city'];
  //  var temp_f = parsed_json['current_observation']['temp_f'];
  //  alert("Current temperature in " + location + " is: " + temp_f);

      current_conditions(parsed_json['current_observation']);

    }

    });

  }


  function current_conditions (conditions) {
    
    console.log(conditions);

    var city = conditions['display_location']['full'];
    var locationHeading = "Current conditions for " + city;
    var time = conditions['observation_time'];
    var weather = conditions['weather'];
    var temperature = conditions['temperature_string'];
    var humidity = conditions['relative_humidity'];

    var list = '<dl><dt>Weather:</dt><dd>' + weather + '</dd><dt>Temperature:</dt><dd>' + temperature + '</dd><dt>Humidity:</dt><dd>' + humidity + '</dd></dl>';

    console.log(list);

    $('#city').text(locationHeading);

    $('#conditions').html(list);
  }

});