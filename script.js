(function () {
    "use strict";

    //clock

    document.addEventListener("DOMContentLoaded", function () {

        let c = document.getElementById("clock");

        //setTimeout(updateClock, 2000);
        setInterval(updateClock, 1000);

        function updateClock() {

            let date = new Date();
            let h = date.getHours();
            let m = date.getMinutes();
            let s = date.getSeconds();
            s += 1
            let ELorPL;
            if (h > 12) {
                h = h - 12
                ELorPL = "PL"
            } else {
                ELorPL = "EL"
            }

            if (m < 10) {
                m = "0" + m;
            }

            if (s < 10) {
                s = "0" + s;
            }

            c.innerHTML = h + ":" + m + ":" + s + ELorPL;

        };

    });

    // forms

    document.getElementById("form").addEventListener("submit", estimateDelivery);

    let e = document.getElementById("delivery");
    e.innerHTML = "0,00 &euro;";

    function estimateDelivery(event) {
        event.preventDefault();
        let v1 = document.getElementById("v1")
        let v2 = document.getElementById("v2")
        let deliverySpeed = document.querySelector('input[name="deliverySpeed"]:checked');
        let price = 0
        let fname = document.getElementById("fname").value
        let lname = document.getElementById("lname").value

        if (fname.length < 1 || lname.length < 1 || /\d/.test(fname) || /\d/.test(lname)){
            alert("Palun sisestage korrektne ees ja perekonnanimi");

            return;
        }

        if (deliverySpeed === null) {
            alert("Palun valige kohaletoomise kiirus");
            return;

        }
        if (deliverySpeed.value === "express") price += 5
        if (v1.checked) {
            price += 5
        }
        if (v2.checked) {
            price += 1
        }
        let linn = document.getElementById("linn");
        if (linn.value === "") {

            alert("Palun valige linn nimekirjast");

            linn.focus();

            return;


        } else {
            let selectedCity = linn.value
            if (selectedCity == "tln") {
                price += 0
            } else if (selectedCity == "trt" || selectedCity == "nrv") {
                price += 2.5
            } else {
                price += 3
            }
            e.innerHTML = price + " &euro;";

        }

        console.log("Tarne hind on arvutatud");
    }

})();

// map

let mapAPIKey = "AqLLRE37SJGqIxXEYxezPUa6fF2oCzl3cvG4n05FtFIVBrotBYxchpMYYpwuxBak";

let map;

function GetMap() {
    var infobox
    "use strict";
    let centerPoint = new Microsoft.Maps.Location(
        58.6809619,
        26.2177061
    );

    let tartu = new Microsoft.Maps.Location(
        58.38104,
        26.71992
    );
    let tallinn = new Microsoft.Maps.Location(
        59.438448,
        24.771427
    );

    map = new Microsoft.Maps.Map("#map", {
        credentials: mapAPIKey,
        center: centerPoint,
        zoom: 7,
        mapTypeId: Microsoft.Maps.MapTypeId.road,
        disablePanning: true
    });
    //Create an infobox at the center of the map but don't show it.
    infobox = new Microsoft.Maps.Infobox(map.getCenter(), {
        visible: false
    });

    //Assign the infobox to a map instance.
    infobox.setMap(map);

    var pushpin = new Microsoft.Maps.Pushpin(tartu);
    pushpin.metadata = {
        title: 'Tartu Ülikool',
        description: 'Tartu ülikooli hoone'
    };

    var pushpin2 = new Microsoft.Maps.Pushpin(tallinn);
    pushpin2.metadata = {
        title: 'Tallinna ülikool',
        description: 'Tallinna ülikooli hoone'
    };
    Microsoft.Maps.Events.addHandler(pushpin, 'click', pushpinClicked);
    Microsoft.Maps.Events.addHandler(pushpin2, 'click', pushpinClicked);


    map.entities.push(pushpin);
    map.entities.push(pushpin2);

    function pushpinClicked(e) {
        //Make sure the infobox has metadata to display.
        if (e.target.metadata) {
            //Set the infobox options with the metadata of the pushpin.
            infobox.setOptions({
                location: e.target.getLocation(),
                title: e.target.metadata.title,
                description: e.target.metadata.description,
                visible: true
            });
        }
    }

}

// https://dev.virtualearth.net/REST/v1/Locations?q=1000 Vin Scully Ave, Los Angeles,CA&key=YOUR_KEY_HERE

