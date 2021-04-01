const getInfoForm = document.getElementById('characters');
getInfoForm.addEventListener('submit', getCharInfo);
const infoContainer = document.getElementById('info-container');
const getPlanetsButton = document.getElementById('planet-button');
getPlanetsButton.addEventListener('click', getPlanets);

function getCharInfo(e) {
    const epidoseNumber = document.querySelector('input').value;
    if(epidoseNumber > 0 && epidoseNumber < 7) {
        e.preventDefault();
        while(infoContainer.firstChild) {
            infoContainer.removeChild(infoContainer.firstChild);
        };
        infoContainer.insertAdjacentHTML("beforeend", `<h2>Characters from episode ${epidoseNumber}:</h2>`);
        axios.get(`https://swapi.dev/api/films/${epidoseNumber}/`)
        .then((result) => {
            const charLinks = result.data.characters
            charLinks.forEach(element => {
                const newElement = element.replace('http', 'https');
                axios.get(newElement)
                    .then((result) => {
                        const name = result.data.name;
                        const birth = result.data.birth_year;
                        const gender = result.data.gender;
                        if(gender === "male") {
                            infoContainer.insertAdjacentHTML("beforeend", `<div class="character-container"><h4>${name}</h4><p class="char-info">Birth date: ${birth}</p><object class="gender" type="image/svg+xml" data="assets/images/man_icon.svg"></object></div>`);
                        } else if(gender === "female") {
                            infoContainer.insertAdjacentHTML("beforeend", `<div class="character-container"><h4>${name}</h4><p class="char-info">Birth date: ${birth}</p><object class="gender" type="image/svg+xml" data="assets/images/woman_icon.svg"></object></div>`);
                        } else {
                            infoContainer.insertAdjacentHTML("beforeend", `<div class="character-container"><h4>${name}</h4><p class="char-info">Birth date: ${birth}</p><object class="gender" type="image/svg+xml" data="assets/images/creature_icon.svg"></object></div>`);
                        }
                    })
            });
        });
    } else {
        e.preventDefault();
        while(infoContainer.firstChild) {
            infoContainer.removeChild(infoContainer.firstChild);
        };
        infoContainer.insertAdjacentHTML("beforeend", `<h2>please enter episode number from 1 to 6</h2>`);
    };
};

async function getPlanets() {
    let currentPage = 1;
    while(infoContainer.firstChild) {
        infoContainer.removeChild(infoContainer.firstChild);
    };
    infoContainer.insertAdjacentHTML("afterbegin", `<h2>planet list in the star wars universe:</h2>`);
    infoContainer.insertAdjacentHTML("beforeend", `<div class="planet_list"></div>`);
    let planetContainer = document.querySelector('.planet_list');
    await axios.get(`https://swapi.dev/api/planets/?page=${currentPage}`)
        .then((result) => {
            const planetList = result.data.results;
            planetList.forEach(element => {
                planetContainer.insertAdjacentHTML("beforeend", `<div class="planet-container"><h3>${element.name}</h3></div>`);
            });
        });
    infoContainer.insertAdjacentHTML("beforeend", `<button id="next-page" type="button">next page</button>`);
    const nextButton = document.getElementById('next-page');
    nextButton.addEventListener("click", changePage);
    function changePage() {
        currentPage += 1;
        while(planetContainer.firstChild) {
            planetContainer.removeChild(planetContainer.firstChild);
        };
        axios.get(`https://swapi.dev/api/planets/?page=${currentPage}`)
        .then((result) => {
            const planetList = result.data.results;
            planetList.forEach(element => {
                planetContainer.insertAdjacentHTML("beforeend", `<div class="planet-container"><h3>${element.name}</h3></div>`);
            });
        });
        if(currentPage === 6) {
            infoContainer.removeChild(nextButton);
        }
    }
};