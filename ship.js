'use strict'

function insertShip(div, dna) {

  var highSlot = ["left: 75px; top: 90px", "left: 105px; top: 65px", "left: 140px; top: 47px", "left: 178px; top: 37px", "left: 212px; top: 37px", "left: 253px; top: 43px", "left: 287px; top: 63px", "left: 315px; top: 90px"],
    medSlot = ["left: 45px; top: 142px", "left: 37px; top: 180px", "left: 38px; top: 220px", "left: 49px; top: 257px", "left: 69px; top: 290px", "left: 100px; top:315px", "left: 128px; top: 332px", "left: 165px; top: 347px"],
    lowSlot = ["left: 228px; top: 355px", "left: 267px; top: 343px", "left: 300px; top: 320px", "left: 328px; top: 292px", "left: 345px; top: 260px", "left: 355px; top: 223px", "left: 353px; top: 185px", "left: 350px; top: 145px"],
    rigSlot = ["left: 120px; top: 228px", "left: 150px; top: 263px", "left: 192px; top: 276px"],
    subSystem = ["left: 122px; top: 163px", "left: 153px; top: 130px", "left: 195px; top: 115px", "left: 241px; top: 129px", "left: 270px; top: 165px"],
    url = "https://www.fuzzwork.co.uk/ships/parsedna.php?dna=" + dna,
    xmlHttp = new XMLHttpRequest(),
    shipDisplay = "",
    slot = 1,
    i = 0,
    key, num = 0,
    json, parts, topSpace, left, shipDisplay;

  xmlHttp.open("GET", url, true);

  xmlHttp.onload = function(e) {
    if (xmlHttp.readyState === 4) {
      if (xmlHttp.status === 200) {
        json = JSON.parse(xmlHttp.responseText);

    shipDisplay = "<div id='loadoutBg' style='background-repeat: no-repeat; background-position: 150px 150px; background-image: url(http://image.eveonline.com/Render/" + json.ship.shipid + "_128.png); height: 420px; width: 450px;' onclick=\"CCPEVE.showFitting('" + json.ship.dna + "')\">";

    shipDisplay += "<div class='shippic' style='height: 420px; width: 450px; position: relative; background-image: url(fitting.png);'>";

        if (json.hasOwnProperty("high")) {
          for (i = 0; i < json.high.length; i++) {
            for (key in json.high[i]) {
              for (num = 0; num < json.high[i][key]; num++) {
                parts = key.split(':');
                shipDisplay += "<div class='highSlot" + slot + "' style='position: absolute; height: 32px;" + highSlot[slot - 1] + "'><img src='http://image.eveonline.com/InventoryType/" + parts[1] + "_32.png' title='" + parts[0] + "'></div>";
                slot++;
              };
            };
          };
        };

        slot = 1;
        if (json.hasOwnProperty("medium")) {
          for (var i = 0; i < json.medium.length; i++) {
            for (var key in json.medium[i]) {
              for (var num = 0; num < json.medium[i][key]; num++) {
                parts = key.split(':');
                shipDisplay += "<div class='medSlot" + slot + "' style='position: absolute; height: 32px;" + medSlot[slot - 1] + "'><img src='http://image.eveonline.com/InventoryType/" + parts[1] + "_32.png' title='" + parts[0] + "'></div>";
                slot++;
              };
            };
          };
        };

        slot = 1;
        if (json.hasOwnProperty("low")) {
          for (var i = 0; i < json.low.length; i++) {
            for (var key in json.low[i]) {
              for (var num = 0; num < json.low[i][key]; num++) {
                parts = key.split(':');
                shipDisplay += "<div class='lowSlot" + slot + "' style='position: absolute; height: 32px;" + lowSlot[slot - 1] + "'><img src='http://image.eveonline.com/InventoryType/" + parts[1] + "_32.png' title='" + parts[0] + "'></div>";
                slot++;
              };
            };
          };
        };

        slot = 1;
        if (json.hasOwnProperty("rig")) {
          for (var i = 0; i < json.rig.length; i++) {
            for (var key in json.rig[i]) {
              for (var num = 0; num < json.rig[i][key]; num++) {
                parts = key.split(':');
                shipDisplay += "<div class='rigSlot" + slot + "' style='position: absolute; height: 32px;" + rigSlot[slot - 1] + "'><img src='http://image.eveonline.com/InventoryType/" + parts[1] + "_32.png' title='" + parts[0] + "'></div>";
                slot++;
              };
            };
          };
        };

        slot = 1;
        if (json.hasOwnProperty("subsystem")) {
          for (var i = 0; i < json.subsystem.length; i++) {
            for (var key in json.subsystem[i]) {
              for (var num = 0; num < json.subsystem[i][key]; num++) {
                parts = key.split(':');
                shipDisplay += "<div class='subsystem" + slot + "' style='position: absolute; height: 32px;" + subSystem[slot - 1] + "'><img src='http://image.eveonline.com/InventoryType/" + parts[1] + "_32.png' title='" + parts[0] + "'></div>";
                slot++;
              };
            };
          };
        };

        slot = 1;
        topSpace = 37;
        left = 400;

        if (json.hasOwnProperty("drones")) {
          for (var i = 0; i < json.drones.length; i++) {
            for (var key in json.drones[i]) {
              parts = key.split(':');
              shipDisplay += "<div class='drone" + slot + "' style='position: absolute; height: 32px;left: " + left + "px; top: " + topSpace + "px'><img src='http://image.eveonline.com/InventoryType/" + parts[1] + "_32.png' title='" + json.drones[i][key] + " x " + parts[0] + "'></div>";
              topSpace = topSpace + 35;
              slot++;
            };
          };
        };

        slot = 1;
        topSpace = topSpace + 35;

        if (json.hasOwnProperty("charge")) {
          for (var i = 0; i < json.charge.length; i++) {
            for (var key in json.charge[i]) {
              parts = key.split(':');
              shipDisplay += "<div class='charge" + slot + "' style='position: absolute; height: 32px;left: " + left + "px; top: " + topSpace + "px'><img src='http://image.eveonline.com/InventoryType/" + parts[1] + "_32.png' title='" + json.charge[i][key] + " x " + parts[0] + "'></div>";
              topSpace = topSpace + 35;
              slot++;
            };
          };
        };

        shipDisplay += "</div>";
        document.getElementById(div).innerHTML = shipDisplay;
      } else {
        shipDisplay = '<div>There was an error when requesting the ships fitting.</div>';
        document.getElementById(div).innerHTML = shipDisplay;
      };
    };
  };

  xmlHttp.onerror = function(e) {
    console.error(xhr.statusText);
  };

  xmlHttp.send();
  return false;
};