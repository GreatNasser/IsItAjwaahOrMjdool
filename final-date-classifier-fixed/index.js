
let model, labelContainer;

async function loadModel() {
    const URL = "./";
    model = await tmImage.load(URL + "model.json", URL + "metadata.json");
    labelContainer = document.getElementById("label-container");
}

async function predict(image) {
    const prediction = await model.predict(image);
    prediction.sort((a, b) => b.probability - a.probability);
    const top = prediction[0];
    labelContainer.innerHTML = `🥇 النوع: ${top.className} (${(top.probability * 100).toFixed(2)}%)`;
}

document.getElementById("imageUpload").addEventListener("change", async (event) => {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = async function(e) {
            const img = document.getElementById("preview");
            img.src = e.target.result;
            img.onload = () => predict(img);
        };
        reader.readAsDataURL(file);
    }
});

window.addEventListener("load", loadModel);
