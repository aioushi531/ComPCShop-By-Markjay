const chatToggle = document.getElementById('chatToggle');
const chatContainer = document.getElementById('chatContainer');
const closeChat = document.getElementById('closeChat');
const chatMessages = document.getElementById('chatMessages');
const chatSuggestions = document.getElementById('chatSuggestions');
const userInput = document.getElementById('userInput');
const sendBtn = document.getElementById('sendBtn');

const botResponses = {
    "bakit ang mahal": "ganon talaga ang buhay sir/ma'am but dekalidad ang mga items",
    "nagsasarado kayo?": "oo 8am hanggang 7pm lang kami.",
    "daddy **** moko daddy": "pho qing mai tha hei - toni follower",
    "hello": "Hello! Anong maipaglilingkod ko today?",
    "magkano?": "Loko nasa Shop tignan mo",
    "pwede magtanong?": "oo naman sir",
    "bakla": "lumayas ka nga dito kung hindi ka naman bibili!",
    "bulok naman yan lahat": "eh kung ipukpuk ko kaya 'tong mega giant sword ko sa mukha mo?",
    "bulok": "eh kung ipukpuk ko kaya 'tong mega giant sword ko sa mukha mo?",
    "nigga": "hoy, bawal racist dito.",
    "para-sa-taas": "hello sir/maam, ano ang maipaglilingkod ko?",
    "i love you": "wag ako iba nalang pag pinilit mo ang gusto mo masasaktan kalang.",
    "may jowa ka?": "meron, si chat gpt",
    "kupal kaba boss?": "medyo",
    "anong magandang specs": "lahat ng nvdia 50 series tapos newest ryzen processors",
    "kupal": "ka din",
    "wag kana magalit": "kiss mo muna ako hehe",
    "mwaa": "ugh sarap",
    "who are you?": "edi si compcshop bot",
    "sino ka?": "edi si compcshop bot",
    "anong tinda niyo?": "kupal pala ito eh",
    "1+1?": "2 bobo",
    "saan ang icct?": "ICCT - Main, ICCT Bldg, V.V. Soliven Ave II, Cainta",
    "sino may ari nito?": "si reyden,markjay,joshua at emarie bakit?",
    "edi wow?": "takot ka sa argumento no? kasi bobo ka",
    "sino pumatay kay magellan?": "si gusion",
    "may tinda kayong ulam?": "bangkay mo ititinda namin",
    "ma ano ulam?": "corny ampt",
    "paano pumatay?": "darkweb yon boss bilihan lang 'to ng pc",
    "may isda kayo?": "mukhang aquarium bayung cpu unit namin?",
    "tell me a joke": "pre, bilihan 'to hindi comedy shit",
    "ai ka ba": "medyo",
    "hatdog": "wala na corny na",
    "secret code": "AT Dahil Diyan May Libre Kang Lyrics Mula Kay Toni Fowler Yehey!!---------------------------------------------Ako'y tahimik lang sa umpisa Kahit 'di mo 'ko pilitin Malasing mo lang ako agad sasama Kahit 'di mo 'ko akitin Meron ka bang lemon gusto ko tequila Pagkatapos kong mag-shot sipsipin mo aking dila Wag mong subukan buo kitang isusubo Sige sige sige 'lika 'lika dito Ramdam kong nag-iinit ka Lalo na't 'pag lasing ka Lasing ka lasing ka na Sa bawat tagay nagiging tigre Nangangagat lalo't 'pag lasing ka Malibog 'pag lasing Malibog 'pag lasing Sige sige sige 'lika 'lika dito Gusto ko 'yung nakakapa kong malaki Ngiti mong daks matsutsupa ka sa tabi Oops wait baka bigla kitang mahila Shot puno bago Ka-ka-kantutan na agad 'di na kailangan ng ligaw Kaya mo 'ko nilasing iba 'ko 'pag nauuhaw Nag-aala-madre isang bucket lang naman Tipsy na naman Walang presyo ang laman Tuluy-tuloy mo na higupin ang aking sabaw Wow ang masasabi mo 'pag ako umibabaw Sorbetes na tunaw pumutok sa aking siopao (ugh) Sige sige sige 'lika 'lika dito Ramdam kong nag-iinit ka Lalo na't 'pag lasing ka Lasing ka lasing ka na Sa bawat tagay nagiging tigre Nangangagat lalo't 'pag lasing ka Malibog 'pag lasing Malibog 'pag lasing Sige sige sige 'lika 'lika dito Malibog 'pag lasing Sige sige sige 'lika 'lika dito",
    "pogi ba si sir noel?": "syempre naman matik yan",
    "ano magandang laro?": "red dead redemption 2, kingdom come deliverance 2, god of war ragnarok, syempre ikaw",
    "ano tagalog ng buto?": "bastos mo pre",
    "may shabu kayo?": "wala boss sa iba yon",
    "pogi ba si noel sasi?": "mabaho bibig, dejok",
    "anong magandang bilhin?": "lahat boss",
    "pogi ba si reyden": "matik yan boss",
    "resty?": "sino yon?",
    "markjay": "pogi syempre",
    "wala": "gago amputa",
    "pogi ba si dennis": "medyo pero mas pogi paden si master markjay",
    "pogi ba si markjay": "oo naman pinaka pogi sa lahat",
    "eh si noriel?": "oo naman pati yan syempre",
    "hindi maintindihan": "ngongo kaba? di kita maintindihan boss"

};

chatToggle.addEventListener('click', () => {
    chatContainer.style.display = 'block';
    if (chatMessages.children.length === 0) {
        addBotMessage(botResponses["para-sa-taas"]);
    }
});

closeChat.addEventListener('click', () => {
    chatContainer.style.display = 'none';
});


function sendMessage() {
    const message = userInput.value;
    if (message.trim() !== "") {
        const chatMessages = document.getElementById('chatMessages');
        const newMessage = document.createElement('div');
        newMessage.textContent = message;
        chatMessages.appendChild(newMessage);
        userInput.value = "";
    }
}

sendBtn.addEventListener('click', () => sendMessage());
userInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') sendMessage();
});

chatSuggestions.addEventListener('click', (e) => {
    if (e.target.classList.contains('suggestion')) {
        const suggestion = e.target.textContent.toLowerCase();
        sendMessage(suggestion);
    }
});


function sendMessage(message = null) {
    const userMessage = message || userInput.value.trim().toLowerCase();
    if (!userMessage) return;

    addMessage(userMessage, 'user');
    userInput.value = '';

    const response = getBotResponse(userMessage);
    if (response) {
        setTimeout(() => addBotMessage(response), 1000);
    }
}

function getBotResponse(message) {
    const keywords = Object.keys(botResponses);
    for (const keyword of keywords) {
        if (message.includes(keyword)) {
            return botResponses[keyword];
        }
    }
    return botResponses["hindi maintindihan"];
}

function addMessage(message, sender) {
    const messageDiv = document.createElement('div');
    messageDiv.classList.add('message', `${sender}-message`);
    messageDiv.textContent = message;
    chatMessages.appendChild(messageDiv);
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

function addBotMessage(message) {
    const typingIndicator = document.createElement('div');
    typingIndicator.classList.add('message', 'bot-message', 'typing-animation');
    typingIndicator.textContent = '...';
    chatMessages.appendChild(typingIndicator);
    chatMessages.scrollTop = chatMessages.scrollHeight;

    setTimeout(() => {
        typingIndicator.remove();
        addMessage(message, 'bot');
    }, 1500);
}