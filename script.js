function speakText(text) {

    speechSynthesis.cancel();

    const speech = new SpeechSynthesisUtterance(text);

    // Speech settings
    speech.lang = "en-US";
    speech.rate = 0.9;
    speech.pitch = 1;
    speech.volume = 1.0;   // Maximum allowed by browser

    // Try to select a female voice
    const voices = speechSynthesis.getVoices();

    let femaleVoice =
        voices.find(v => v.name.includes("Female")) ||
        voices.find(v => v.name.includes("Zira")) ||
        voices.find(v => v.name.includes("Samantha")) ||
        voices.find(v => v.name.includes("Google US English")) ||
        voices.find(v => v.name.includes("Microsoft Zira")) ||
        voices.find(v => v.lang.startsWith("en"));

    if (femaleVoice) {
        speech.voice = femaleVoice;
        console.log("Using voice:", femaleVoice.name);
    }

    speechSynthesis.speak(speech);
}

// Required because some browsers load voices asynchronously
speechSynthesis.onvoiceschanged = () => {
    console.log("Voices loaded");
};

async function loadGuide() {
    try {
        const params = new URLSearchParams(window.location.search);
        const id = params.get("id") || "LAB101";

        const response = await fetch("data.json");

        if (!response.ok) {
            throw new Error("Cannot load data.json");
        }

        const guides = await response.json();

        const guide = guides[id];

        if (!guide) {
            document.getElementById("title").innerText = "Guide Not Found";
            document.getElementById("content").innerText = "No guide for: " + id;
            return;
        }

        document.getElementById("title").innerText = guide.title;
        document.getElementById("content").innerText = guide.text;

        setTimeout(() => {
            speakText(guide.text);
        }, 500);

        document.getElementById("playBtn").onclick = function () {
            speakText(guide.text);
        };

    } catch (err) {
        document.getElementById("title").innerText = "ERROR";
        document.getElementById("content").innerText = err.message;
        console.error(err);
    }
}

window.onload = loadGuide;