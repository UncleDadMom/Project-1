const dogURL = "http://localhost:3000/dogs"
const catURL = "http://localhost:3000/cats"
const catDiv = document.querySelector("#cat")
const dogDiv = document.querySelector("#dog");

let catArray
fetch(catURL)
.then(res => res.json())
.then((cats) => {
    catArray = cats
    renderCat(catArray)
})

let dogArray
fetch(dogURL)
.then(res => res.json())
.then((dogs) => {
    dogArray = dogs 
    renderDog(dogArray)
})

const catImg = document.createElement("img");
const catButton = document.querySelector("#cat-button")
function renderCat(cats) {
    let randoCat = cats[Math.floor(Math.random() * cats.length)]; //randomly selects cat
    catDiv.dataset.catId = randoCat.id
    catDiv.dataset.lossCount = randoCat.losses;
    catImg.src = randoCat.image;
    catImg.id = randoCat.id;
    catImg.alt = randoCat.breed;
    
    catDiv.prepend(catImg);
    catButton.innerHTML = `${randoCat.breed}`
    document.querySelector("#cat-form").addEventListener(`submit`, (e) => catSubmit(e, randoCat))
}

function catSubmit(e, randoCat){ //handler function for cat vote
    e.preventDefault();
    const newCat = catArray[catArray.length - randoCat.id];
    let catVote = randoCat.wins;
    const catWin = {
        wins: ++catVote
    }
    fetch(`${catURL}/${randoCat.id}`, { //sends win to cat db
        method: "PATCH",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(catWin)
     })
    .then(res => res.json())
    
    //sends loss to dog db
    const dogLoss = { 
        losses: ++dogDiv.dataset.lossCount
    };
    fetch(`${dogURL}/${dogDiv.dataset.dogId}`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(dogLoss)
    })
    .then(res => res.json()) //adds +1 to dog's loss count
    randomizeCat()
}
function randomizeCat(){
    const newCat = catArray[catArray.length - catDiv.dataset.catId];
    [catImg.src, catImg.id] = [newCat.image, newCat.id];
    catButton.innerHTML = `${newCat.breed}`;
};

const dogImg = document.createElement("img");
const dogButton = document.querySelector("#dog-button")
function renderDog(dogs) {
    let randoDog = dogs[Math.floor(Math.random() * dogs.length)];
    dogImg.src = randoDog.image;
    dogImg.id = randoDog.id;
    dogImg.alt = randoDog.breed;
    dogDiv.dataset.dogId = randoDog.id; 
    dogDiv.dataset.lossCount = randoDog.losses;
    dogDiv.prepend(dogImg);
    dogButton.innerHTML = `${randoDog.breed}`
    document.querySelector("#dog-form").addEventListener(`submit`, (e) => dogVote(e,randoDog))
}
function dogVote(e, randoDog){ //handler function for dog vote
    e.preventDefault();
    const dogWin = {
        wins: ++randoDog.wins
    };
    fetch(`${dogURL}/${randoDog.id}`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(dogWin)
    })
    .then(res => res.json());

    const catLoss = {
        losses: ++catDiv.dataset.lossCount
    };
    fetch(`${catURL}/${catDiv.dataset.catId}`, { //+1 lost cat
        method: "PATCH",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(catLoss)
    })
    .then(res => res.json());
    randomizeDog()
}    
//     const catImg = document.createElement("img");
//     let randoCat = cats[Math.floor(Math.random() * cats.length)]; //randomly selects cat
//     catDiv.dataset.catId = randoCat.id
//     catDiv.dataset.lossCount = randoCat.losses;
//     catImg.src = randoCat.image;
//     catImg.id = randoCat.id;
//     catImg.alt = randoCat.breed;
    
//     catDiv.prepend(catImg);
//     document.querySelector("#cat-button").innerHTML = `${randoCat.breed}`
//     document.querySelector("#cat-form").addEventListener(`submit`, (e) => catSubmit(e, randoCat))
// }
function randomizeDog(){
    const newDog = dogArray[dogArray.length - dogDiv.dataset.dogId];
    [dogImg.src, dogImg.id] = [newDog.image, newDog.id];
    dogButton.innerHTML = `${newDog.breed}`;
}