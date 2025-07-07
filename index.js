import { catsData } from "./data.js";

const emotionRadios = document.querySelector("#emotion-radios");


function getEmotionsArray(cats) {
    const emotionsArray = [];
    for (const cat of cats) {
        for (const emotion of cat.emotionTags) {
            emotionsArray.push(emotion);
        }
    }
    return emotionsArray;
}

function renderEmotionsRadios(cats) {
    let html = "";
    const emotions = getEmotionsArray(cats);
    for (const emotion of emotions) {
        html += `
        <p>${emotion}</p>
        `;
    }
    emotionRadios.innerHTML = html;
}

renderEmotionsRadios(catsData);
