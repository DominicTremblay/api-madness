jQuery(document).ready(function($) {

  var city = 'San Francisco';


  $.ajax({
  url : "http://api.wunderground.com/api/5e068449d1033f54/conditions/q/CA/San_Francisco.json",
  dataType : "jsonp",
  success : function(parsed_json) {

    var location = parsed_json['current_observation']['display_location']['city'];
//  var temp_f = parsed_json['current_observation']['temp_f'];
//  alert("Current temperature in " + location + " is: " + temp_f);


    current_conditions(parsed_json['current_observation']);


  }

  });


function current_conditions (conditions) {
    
  console.log(conditions);


  var city = conditions['display_location']['full'];
  var locationHeading = "Current conditions for " + city;
  var time = conditions['observation_time'];
  var weather = conditions['weather'];
  var temperature = conditions['temperature_string'];
  var humidity = conditions['relative_humidity'];

  var list = '<dl><dt>Weather:</dt><dd>' + weather + '</dd><dt>Temperature</dt><dd>' + temperature + '</dd><dt>Humidity</dt><dd>' + humidity + '</dd></dl>';


  console.log(list);


  $('#city').text(locationHeading);

  $('#conditions').html(list);
debugger;


}

});