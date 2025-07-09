import { catsData } from "./data.js";

const emotionRadios = document.querySelector("#emotion-radios");
const getImageBtn = document.querySelector("#get-image-btn");
const gifsOnlyOption = document.querySelector("#gifs-only-option");
const memeModalInner = document.getElementById('meme-modal-inner');
const memeModal = document.getElementById('meme-modal');
const memeModalCloseBtn = document.getElementById('meme-modal-close-btn');

emotionRadios.addEventListener("change", highlightCheckedOption);

memeModalCloseBtn.addEventListener("click", closeModal);

getImageBtn.addEventListener("click", renderCat);

function highlightCheckedOption(e) {
    const radios = document.querySelectorAll(".radio");
    for (let radio of radios) {
        radio.classList.remove('highlight');
    }
    document.querySelector(`#${e.target.id}`).parentElement.classList.add('highlight');
}

function closeModal() {
    memeModal.style.display = 'none';
};

function renderCat() {
    const catObject = getSingleCatObject();
    memeModalInner.innerHTML = `
        <img 
        class="cat-img" 
        src="./images/${catObject.image}"
        alt="${catObject.alt}"
        >`;
    memeModal.style.display = 'flex';
}

function getSingleCatObject() {
    const catsArray = getMatchingCatsArray();

    if (catsArray.length === 1) {
        return catsArray[0];
    } else {
        const randomCatIndex = Math.floor(Math.random() * catsArray.length);
        return catsArray[randomCatIndex];
    }
}

function getMatchingCatsArray(e) {
    if (document.querySelector('input[type="radio"]:checked')) {
        const selectedEmotion = document.querySelector('input[name="emotion"]:checked').value;
        const isGif = gifsOnlyOption.checked;

        const matchingCatsArray = catsData.filter(function (cat) {

            if (isGif) {
                return cat.isGif && cat.emotionTags.includes(selectedEmotion);
            } else {
                return cat.emotionTags.includes(selectedEmotion);
            }

        });
        return matchingCatsArray;
    }
}

function getEmotionsArray(cats) {
    const emotionsArray = [];
    for (let cat of cats) {
        for (let emotion of cat.emotionTags) {
            if (!emotionsArray.includes(emotion)) {
                emotionsArray.push(emotion);
            } else {
                continue;
            }
        }
    }
    return emotionsArray;
}

function renderEmotionsRadios(cats) {

    let radioItems = ``;
    const emotions = getEmotionsArray(cats);
    for (let emotion of emotions) {
        radioItems += `
        <div class="radio">
            <label for="${emotion}">${emotion}</label>
            <input type="radio" name="emotion" id="${emotion}" value="${emotion}">
        </div>
        `;
    }
    emotionRadios.innerHTML = radioItems;
}

renderEmotionsRadios(catsData);
