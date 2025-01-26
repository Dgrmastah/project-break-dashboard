// IMAGENES RANDOM
const images = [
    "images/foto-1.jpg",
    "images/foto-2.jpg",
    "images/foto-3.jpg",
    "images/foto-4.jpg",
    "images/foto-5.jpg",
    "images/foto-6.jpg",
    "images/foto-7.jpg",
    "images/foto-8.jpg",
    "images/foto-9.jpg",
    "images/foto-10.jpg"
];

let currentIndex = 0;
const container = document.getElementById("container");

function imagesRandom() {
    container.style.backgroundImage = `url(${images[currentIndex]})`;
    currentIndex = (currentIndex + 1) % images.length;
};

setInterval(imagesRandom, 15000);
imagesRandom();

const botonOk = document.getElementById("botonok");
const inputUrl = document.querySelector(".urlcontainer input");
const urlList = document.getElementById("urllist");

botonOk.addEventListener("click",() => {
    const urlText = inputUrl.value.trim();
    if(urlText) {
        const urlElement = document.createElement("p");
        urlElement.textContent =urlText;
        urlList.appendChild(urlElement);
        inputUrl.value = "";
    }
} );

// GENERADOR DE PASSWORD
document.addEventListener('DOMContentLoaded', function () {
    const botonGenerar = document.getElementById('botonok2');
    const inputPassword = document.getElementById('password');

    function generarContraseña(longitud) {
        const caracteres = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_-+=<>?";
        let password = "";
        for (let i = 0; i < longitud; i++) {
            const randomIndex = Math.floor(Math.random() * caracteres.length);
            password += caracteres[randomIndex];
        }
        return password;
    }

    botonGenerar.addEventListener('click', function () {
        const nuevaContraseña = generarContraseña(10);
        inputPassword.value = nuevaContraseña;
    });
});

// RELOJ DIGITAL
document.addEventListener('DOMContentLoaded', function () {
    let reloj = document.getElementById('reloj');
    let fecha = document.getElementById('fecha');
    let mensage = document.getElementById('mensage');

    if (!reloj) {
        reloj = document.createElement('div');
        reloj.id = 'reloj';
        document.body.appendChild(reloj);
    }

    if (!fecha) {
        fecha = document.createElement('header');
        fecha.id = 'fecha';
        document.body.appendChild(fecha);
    }

    function horario() {
        const ahora = new Date();

        let horas = ahora.getHours();
        let minutos = ahora.getMinutes();
        let segundos = ahora.getSeconds();

        horas = horas < 10 ? "0" + horas : horas;
        minutos = minutos < 10 ? "0" + minutos : minutos;
        segundos = segundos < 10 ? "0" + segundos : segundos;

        const tiempo = `${horas}:${minutos}:${segundos}`;
        reloj.innerHTML = tiempo;

        let dia = ahora.getDate();
        let mes = ahora.getMonth() + 1;
        let año = ahora.getFullYear();

        dia = dia < 10 ? "0" + dia : dia;
        mes = mes < 10 ? "0" + mes : mes;

        const fechaTexto = `${dia}/${mes}/${año}`;
        fecha.innerHTML = fechaTexto;

        let mensajeTexto = '';
        if (horas >= 0 && horas < 7) {
            mensajeTexto = 'Es hora de descansar. Apaga y sigue mañana';
        } else if (horas >= 7 && horas < 12) {
            mensajeTexto = 'Buenos días, desayuna fuerte y a darle al código';
        } else if (horas >= 12 && horas < 14) {
            mensajeTexto = 'Echa un rato más, pero no olvides comer';
        } else if (horas >= 14 && horas < 16) {
            mensajeTexto = 'Espero que hayas comido';
        } else if (horas >= 16 && horas < 18) {
            mensajeTexto = 'Buenas tardes, el último empujón';
        } else if (horas >= 18 && horas < 20) {
            mensajeTexto = 'Esto ya son horas extras, ... piensa en parar pronto';
        } else if (horas >= 20 && horas < 22) {
            mensajeTexto = 'Buenas noches, es hora de pensar en parar y descansar';
        }
        mensage.innerHTML = mensajeTexto;
    }

    setInterval(horario, 1000);
});

// CLIMA
const apiKey = "56bdd02739aa470fbca224045252501";
const climaContainer = document.getElementById("clima");
const previsionContainer = document.getElementById("prevision");

fetch(`https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=valencia,spain&aqi=no&hours=24`)
    .then(response => {
        if (!response.ok) {
            throw new Error('Error en la solicitud');
        }
        return response.json();
    })
    .then(data => {
       
        const clima = document.createElement('p');
        const iconoClima = document.createElement('img');
        const gradosCelcius = document.createElement('p');
        const precipitaciones = document.createElement('p');
        const paisCiudad = document.createElement('p');
        const viento = document.createElement('p');
    
        paisCiudad.textContent = `${data.location.country}, ${data.location.name}`;
        clima.textContent = `Condición: ${data.current.condition.text}`;
        iconoClima.src = `https:${data.current.condition.icon}`;
        gradosCelcius.textContent = `Temperatura: ${data.current.temp_c}°C`;
        precipitaciones.textContent = `Precipitaciones: ${data.current.precip_in} in, ${data.current.precip_mm} mm`;
        viento.textContent = `Viento: ${data.current.wind_kph} km/h`;
    
        climaContainer.appendChild(paisCiudad);
        climaContainer.appendChild(clima);
        climaContainer.appendChild(iconoClima);
        climaContainer.appendChild(gradosCelcius);
        climaContainer.appendChild(precipitaciones);
        climaContainer.appendChild(viento);

       
        const forecast = data.forecast.forecastday[0].hour;

        forecast.forEach(hourData => {
            const hora = new Date(hourData.time);
            const horas = hora.getHours();
            const tempCelsius = hourData.temp_c;
            const condicion = hourData.condition.text;
            const iconoClima = document.createElement('img');
            iconoClima.src = `https:${hourData.condition.icon}`;

            const prevision = document.createElement('div');
            prevision.classList.add("prevision-item"); 

            prevision.innerHTML = `
                <p><strong>${horas}:00 - ${condicion}</strong></p>
                <p>Temperatura: ${tempCelsius}°C</p>
                <img src="${iconoClima.src}" alt="${condicion}">
            `;
            previsionContainer.appendChild(prevision);
        });

        console.log(data);  
        console.log("Clima:", data.current.condition.text);
        console.log("Temperatura:", data.current.temp_c);
    })
    .catch(error => {
        console.error('Hubo un error:', error);
    });
