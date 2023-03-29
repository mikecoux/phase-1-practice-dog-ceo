const breedsArray = []

document.addEventListener('DOMContentLoaded', init())

function init () {
    //add images to DOM
    addImages()
    //add breeds to list
    addBreeds()
}

function addImages () {
    fetch ('https://dog.ceo/api/breeds/image/random/4')
        .then (res => res.json())
        .then (data => {
            //add images to DOM
            data.message.forEach((img) => {
                dogImg = document.createElement('img')
                dogImgDiv = document.querySelector('#dog-image-container')
                dogImg.src = img
                dogImg.width = 250
                dogImgDiv.append(dogImg)
            })
        })
}

function addBreeds () {
    fetch ('https://dog.ceo/api/breeds/list/all')
        .then (res => res.json())
        .then (data => {
            breeds = Object.keys(data.message)
            updateBreedsList(breeds)
            filterBreeds(breeds)
        })
}

function updateBreedsList (breeds) {
    let breedsList = document.querySelector('#dog-breeds');
    removeChildren(breedsList);
    breeds.forEach(breed => addBreed(breed));
}

function addBreed(breed) {
    let breedsList = document.querySelector('#dog-breeds');
    let breedsListItem = document.createElement('li');
    breedsListItem.innerText = breed;
    breedsListItem.style.cursor = 'pointer';
    breedsList.appendChild(breedsListItem);
    breedsListItem.addEventListener('click', updateColor)
  }

function updateColor (event) {
    event.target.style.color = 'blue'
}

function filterBreeds (breeds) {
    let dropdown = document.getElementById('breed-dropdown')
    dropdown.addEventListener('change', () => {
        let selection = dropdown.options[dropdown.selectedIndex].value
        newBreeds = breeds.filter(breed => breed.startsWith(selection))
        console.log(newBreeds)
        updateBreedsList(newBreeds)
    })
}

function removeChildren (element) {
    let child = element.lastElementChild;
    while (child) {
      element.removeChild(child);
      child = element.lastElementChild;
    }
}