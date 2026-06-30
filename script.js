// ----------------------------
// TARANG Voice Assistant V2
// ----------------------------

const SpeechRecognition =
    window.SpeechRecognition ||
    window.webkitSpeechRecognition;

const recognition = new SpeechRecognition();

recognition.lang = "en-US";
recognition.continuous = false;
recognition.interimResults = false;

let currentLanguage = "en";

function speak(text, callback = null) {

    speechSynthesis.cancel();

    const speech = new SpeechSynthesisUtterance(text);

    speech.volume = 1;
    speech.rate = 0.9;
    speech.pitch = 1;

    // Language selection

    if(currentLanguage=="en")
        speech.lang="en-US";

    if(currentLanguage=="hi")
        speech.lang="hi-IN";

    if(currentLanguage=="pa")
        speech.lang="pa-IN";

    speech.onend=function(){

        if(callback)
            callback();

    };

    speechSynthesis.speak(speech);

}


// Start listening

function listen(){

    recognition.start();

}


// Ask language

function askLanguage(){

    currentLanguage="en";

    speak(
        "Welcome to Tarang Smart R F Finder. " +
        "Please choose your language. " +
        "For English say English. " +
        "Hindi ke liye Hindi kahiye. " +
        "Punjabi layi Punjabi kaho.",
        function(){

            listen();

        });

}

recognition.onresult=function(event){

    let command=event.results[0][0].transcript.toLowerCase();

    console.log(command);

    // ---------------- English ----------------

    if(command.includes("english")){

        currentLanguage="en";

        speak(
        "Welcome to Tarang Smart RF Finder. I am your voice assistant. How may I help you today?"
        );

        return;

    }

    // ---------------- Hindi ----------------

    if(command.includes("hindi") ||
       command.includes("हिन्दी")){

        currentLanguage="hi";

        speak(
        "तरंग स्मार्ट आर एफ फाइंडर में आपका स्वागत है। मैं आपकी वॉइस सहायक हूँ। मैं आपकी कैसे सहायता कर सकती हूँ?"
        );

        return;

    }

    // ---------------- Punjabi ----------------

    if(command.includes("punjabi") ||
       command.includes("ਪੰਜਾਬੀ")){

        currentLanguage="pa";

        speak(
        "ਤਰੰਗ ਸਮਾਰਟ ਆਰ ਐਫ ਫਾਈਂਡਰ ਵਿੱਚ ਤੁਹਾਡਾ ਸਵਾਗਤ ਹੈ। ਮੈਂ ਤੁਹਾਡੀ ਵੌਇਸ ਸਹਾਇਕ ਹਾਂ। ਮੈਂ ਤੁਹਾਡੀ ਕਿਵੇਂ ਮਦਦ ਕਰ ਸਕਦੀ ਹਾਂ?"
        );

        return;

    }

    speak(
        "Sorry. I did not understand. Please say English, Hindi or Punjabi.",
        function(){

            listen();

        });

};


window.onload=function(){

    askLanguage();

};
