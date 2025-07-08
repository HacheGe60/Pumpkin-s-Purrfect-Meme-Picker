import { catsData } from "./data.js";

const emotionRadios = document.querySelector("#emotion-radios");

emotionRadios.addEventListener("change", highlightCheckedOption);

function highlightCheckedOption(e) {
    document.querySelector(`#${e.target.id}`).parentElement.classList.add('highlight');
}

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
