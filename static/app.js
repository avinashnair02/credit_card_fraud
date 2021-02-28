
const baseurl="https://devop12.herokuapp.com/"
function getBathValue() {
    var uiBathrooms = document.getElementsByName("uiBathrooms");
    for(var i in uiBathrooms) {
      if(uiBathrooms[i].checked) {
          return parseInt(i)+1;
      }
    }
    return -1; // Invalid Value
  }
  
  function getBHKValue() {
    var uiBHK = document.getElementsByName("uiBHK");
    for(var i in uiBHK) {
      if(uiBHK[i].checked) {
          return parseInt(i)+1;
      }
    }
    return -1; // Invalid Value
  }
  
  function onClickedEstimatePrice() {
    console.log("Estimate price button clicked");
    var time = document.getElementById("time");
    var amount = document.getElementById("amount");
    var url = baseurl+"isfraud";
    var estPrice = document.getElementById("uiEstimatedPrice");
    estPrice.innerHTML = "<h2 class=\"result\">Loading...</h2>";
    console.log(time.value,amount.value,url,estPrice)
    $.post(url, {
      time: time.value,
      amount: amount.value,
    },function(data, status) {
        console.log(data.estimated_price);
        estPrice.innerHTML = "<h2 class=\"result\">This is a " + data.message.toString() + " transaction</h2>";
    });
  }
  
  function onPageLoad() {
    console.log( "document loaded" );
    var url = baseurl+"get_location_names";
  
    $.get(url,function(data, status) {
        console.log("got response for get_location_names request");
        if(data) {
            var locations = data.locations;
            var uiLocations = document.getElementById("uiLocations");
            $('#uiLocations').empty();
            for(var i in locations) {
                var opt = new Option(locations[i]);
                $('#uiLocations').append(opt);
            }
        }
    });
  }
  
  window.onload = onPageLoad;
