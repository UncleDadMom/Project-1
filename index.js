const dogURL = "http://localhost:3000/dogs"
const catURL = "http://localhost:3000/cats"
fetch(catURL)
.then(res => res.json())
.then((cats) => renderCat(cats))

fetch(dogURL)
.then(res => res.json())
.then((dog) => renderDog(dog))

function renderCat(cats) {
    let randoCat = cats[Math.floor(Math.random() * cats.length)];
    const catImg = document.createElement("img");
    catImg.src = randoCat.image;
    catImg.id = randoCat.id;
    catImg.alt = randoCat.breed;
    document.querySelector("#cat").prepend(catImg);
    document.querySelector("#cat-button").innerHTML = `${randoCat.breed}`
    document.querySelector("#cat-form").addEventListener(`submit`, () => catSubmit(randoCat))
}
function catSubmit(randoCat){ //handler function for cat vote
    let catVote = randoCat.votes;
    const votePojo = {
        votes: ++catVote
    }
    fetch(`${catURL}/${randoCat.id}`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(votePojo)
    })
    .then(res => res.json())
}
function renderDog(dogs) {
    let randoDog = dogs[Math.floor(Math.random() * dogs.length)];
    const dogImg = document.createElement("img");
    dogImg.src = randoDog.image;
    dogImg.id = randoDog.id;
    dogImg.alt = randoDog.breed;
    document.querySelector("#dog").prepend(dogImg);
    document.querySelector("#dog-button").innerHTML = `${randoDog.breed}`
    document.querySelector("#dog-form").addEventListener(`submit`, () => dogSubmit(randoDog))
}
function dogSubmit(randoDog){ //handler function for dog vote
    let dogVote = randoDog.votes;
    const votePojo = {
        votes: ++dogVote
    };
    fetch(`${dogURL}/${randoDog.id}`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(votePojo)
    })
    .then(res => res.json())
}