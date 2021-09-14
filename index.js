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
    document.querySelector("div#cat").append(catImg);
    document.querySelector("input#cat-input").addEventListener(`submit`, catSubmit(randoCat))
}
function catSubmit(randoCat){
    let catVote = randoCat.votes
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
    debugger;
}
function renderDog(dogs) {
    let randoDog = dogs[Math.floor(Math.random() * dogs.length)];
    const dogImg = document.createElement("img");
    dogImg.src = randoDog.image;
    dogImg.id = randoDog.id;
    document.querySelector("div#dog").prepend(dogImg);
    // document.querySelector("input#dog-input").addEventListener(`submit`
}