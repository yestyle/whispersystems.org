 var xml = new XMLHttpRequest();
 xml.open("GET", "https://bithub.herokuapp.com/v1/status/payment/commit?format=json", true);

 xml.onreadystatechange = function() {
   if (xml.readyState != 4)  { return; }

   document.getElementsByClassName("bithub-payout-amount")[0].innerHTML = "<code>$" + JSON.parse(xml.responseText).payment + " USD</code>";
 };

 xml.send(null);
