import { catsData } from "./data.js";

const emotionRadios = document.querySelector("#emotion-radios");
const getImageBtn = document.querySelector("#get-image-btn");

getImageBtn.addEventListener("click", getMatchingCatsArray);

function getMatchingCatsArray(e) {
    if (document.querySelector('input[name="emotion"]:checked')) {
        const checkedRadio = document.querySelector('input[name="emotion"]:checked');
        console.log(checkedRadio.value);
    }
}

function highlightCheckedOption(e) {
    const radioArray = document.querySelectorAll(".radio");
    for (const radio of radioArray) {
        radio.classList.remove('highlight');
    }

    document.querySelector(`#${e.target.id}`).parentElement.classList.add('highlight');
}

emotionRadios.addEventListener("change", highlightCheckedOption);

function getEmotionsArray(cats) {
    const emotionsArray = [];
    for (const cat of cats) {
        for (const emotion of cat.emotionTags) {
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
    let html = "";
    const emotions = getEmotionsArray(cats);
    for (const emotion of emotions) {
        html += `
        <div class="radio">
            <label for="${emotion}">${emotion}</label>
            <input type="radio" name="emotion" id="${emotion}" value="${emotion}">
        </div>
        `;
    }
    emotionRadios.innerHTML = html;
}

renderEmotionsRadios(catsData);
