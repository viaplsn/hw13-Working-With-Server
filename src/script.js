const getInfoForm = document.getElementById('characters');
getInfoForm.addEventListener('submit', getCharInfo);
const infoContainer = document.getElementById('info-container');

function getCharInfo(e) {
    const epidoseNumber = document.querySelector('input').value;
    if(epidoseNumber > 0 && epidoseNumber < 7) {
        e.preventDefault();
        while(infoContainer.firstChild) {
            infoContainer.removeChild(infoContainer.firstChild);
        };
        axios.get(`https://swapi.dev/api/films/${epidoseNumber}/`)
        .then((result) => {
            const charLinks = result.data.characters
            charLinks.forEach(element => {
                axios.get(element)
                    .then((result) => {
                        const name = result.data.name;
                        const birth = result.data.birth_year;
                        const gender = result.data.gender;
                        if(gender === "male") {
                            infoContainer.insertAdjacentHTML("beforeend", `<div class="character-container"><h3>${name}</h3><p class="char-info">Birth date: ${birth}</p><object class="gender" type="image/svg+xml" data="assets/images/man_icon.svg"></object></div>`);
                        } else if(gender === "female") {
                            infoContainer.insertAdjacentHTML("beforeend", `<div class="character-container"><h3>${name}</h3><p class="char-info">Birth date: ${birth}</p><object class="gender" type="image/svg+xml" data="assets/images/woman_icon.svg"></object></div>`);
                        } else {
                            infoContainer.insertAdjacentHTML("beforeend", `<div class="character-container"><h3>${name}</h3><p class="char-info">Birth date: ${birth}</p><object class="gender" type="image/svg+xml" data="assets/images/creature_icon.svg"></object></div>`);
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