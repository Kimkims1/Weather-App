window.addEventListener('load', () => {
    let long;
    let lat;

    let temperatureDescription = document.querySelector('.temperature-description');
    let temperatureDegree = document.querySelector('.temperature-degree');
    let locationTimezone = document.querySelector('.location-timezone');

    let temperatureSection = document.querySelector('.temperature');
    let temperatureSpan = document.querySelector('.temperature span');

    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
            //console.log(position);
            long = position.coords.longitude;
            lat = position.coords.latitude;

            const proxy = `http://cors-anywhere.herokuapp.com/`;

            const api = `${proxy}https://api.darksky.net/forecast/8a881711522e0ce4df7b1273f6d3b22f/${lat},${long}`;


            fetch(api)
                .then(response => {
                    return response.json();
                }).then(data => {
                    console.log(data);
                    const { temperature, summary, icon } = data.currently;

                    //set elements from api
                    temperatureDegree.textContent = temperature;
                    temperatureDescription.textContent = summary;
                    locationTimezone.textContent = data.timezone;

                    //Formula for Celcius
                    let celcius = (temperature - 32) * (5 / 9);

                    //set icons
                    setIcons(icon, document.querySelector('.icon'));

                    //Change degrees to Celcius on Click Event
                    temperatureSection.addEventListener('click', () => {
                        if (temperatureSpan.textContent === "F") {
                            temperatureSpan.textContent = "C";
                            temperatureDegree.textContent = Math.floor(celcius);
                        } else {
                            temperatureSpan.textContent = "F";
                            temperatureDegree.textContent = temperature;
                        }
                    })
                });
        });
    }
    function setIcons(icon, iconID) {
        const skycon = new Skycons({ color: "white" });
        const currentIcon = icon.replace(/-/g, "_").toUpperCase();
        skycon.play();
        return skycon.set(iconID, Skycons[currentIcon]);
    }
});