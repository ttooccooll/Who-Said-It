const quotes = [
    {
        quote: `"Think for yourself, or others will think for you without thinking of you."`,
        author: "Henry David Thoreau",
        image: "https://theplaidzebra.com/wp-content/uploads/2014/11/Anarchy_Plaid-Zebra.jpg"
    },
    {
        quote: `"It is difficult for me to imagine what “personal liberty” is enjoyed by an unemployed hungry person. True freedom can only be where there is no exploitation and oppression of one person by another; where there is not unemployment, and where a person is not living in fear of losing his job, his home and his bread. Only in such a society personal and any other freedom can exist for real and not on paper."`,
        author: "Joseph Stalin",
        image: "https://dyatlovpass.com/resources/340/Gulag-01.jpg"
    },
    {
        quote: `"A revolution is not a dinner party, or writing an essay, or painting a picture, or doing embroidery. It cannot be so refined, so leisurely and gentle, so temperate, kind, courteous, restrained and magnanimous. A revolution is an insurrection, an act of violence by which one class overthrows another."`,
        author: "Chairman Mao",
        image: "https://images.nationalgeographic.org/image/upload/v1638892492/EducationHub/photos/soldiers-marching-in-beijing.jpg"
    },
    {
        quote: `"Enthusiasm is one of the most powerful engines of success. When you do a thing, do it with all your might. Put your whole soul into it. Stamp it with your own personality. Be active, be energetic, be enthusiastic and faithful, and you will accomplish your object. Nothing great was ever achieved without enthusiasm."`,
        author: "Ralph Waldo Emerson",
        image: "https://getwallpapers.com/wallpaper/full/9/5/6/1105001-large-beautiful-forest-wallpaper-3840x2160.jpg"
    },
    {
        quote: `"We have to put a stop to the idea that it is a part of everybody's civil rights to say whatever he pleases."`,
        author: "Adolf Hitler",
        image: "https://collections.ushmm.org/iiif-b/assets/745674"
    },
    {
        quote: `"Everyone who does not agree with me is a traitor and a scoundrel."`,
        author: "King George III",
        image: "https://www.americanrevolutioninstitute.org/wp-content/uploads/2020/11/Death-of-Major-Peirson-by-Copley-1783-detail-Tate.jpg"
    },
    {
        quote: `"You can't separate peace from freedom because no one can be at peace unless he has his freedom."`,
        author: "Malcolm X",
        image: "https://assets.editorial.aetnd.com/uploads/2020/02/black-power-civil-rights-movement-gettyimages-515574856.jpg"
    },
    {
        quote: `"Depopulation should be the highest priority of foreign policy towards the third world, because the US economy will require large and increasing amounts of minerals from abroad, especially from less developed countries."`,
        author: "Henry Kissinger",
        image: "https://media.defense.gov/2021/Mar/22/2002605823/1280/1280/0/681220-O-ZZ999-001.JPG"
    },
    {
        quote: `"It is not the nation which generate the government; that is an antiquated naturalistic concept which afforded a basis for nineteenth-century publicity in favor of national governments. Rather is it the government which creates the nation, conferring volition and therefore real life on a people made aware of their moral unity."`,
        author: "Benito Mussolini",
        image: "https://cdn.britannica.com/47/129647-050-9C3CFF1B.jpg"
    }
];

let currentQuote = 0;
let selectedAuthors = [];

displayQuote();

document.getElementById("author1").addEventListener("click", selectAuthor);
document.getElementById("author2").addEventListener("click", selectAuthor);
document.getElementById("author3").addEventListener("click", selectAuthor);
document.getElementById("author4").addEventListener("click", selectAuthor);
document.getElementById("author5").addEventListener("click", selectAuthor);
document.getElementById("author6").addEventListener("click", selectAuthor);
document.getElementById("author7").addEventListener("click", selectAuthor);
document.getElementById("author8").addEventListener("click", selectAuthor);
document.getElementById("submit-btn").addEventListener("click", submitAnswer);

function displayQuote() {
    const quoteElement = document.getElementById("quote");
    const author1Element = document.getElementById("author1");
    const author2Element = document.getElementById("author2");
    const author3Element = document.getElementById("author3");
    const author4Element = document.getElementById("author4");
    const author5Element = document.getElementById("author5");
    const author6Element = document.getElementById("author6");
    const author7Element = document.getElementById("author7");
    const author8Element = document.getElementById("author8");

    quoteElement.textContent = quotes[currentQuote].quote;
    author1Element.textContent = "Kamala Harris";
    author2Element.textContent = "Donald Trump";
    author3Element.textContent = "Tim Walz";
    author4Element.textContent = "JD Vance";
    author5Element.textContent = "Joe Biden";
    author6Element.textContent = "Mike Johnson";
    author7Element.textContent = "Elizabeth Warren";
    author8Element.textContent = "Mitch McConnell";
}

function selectAuthor(event) {
    const buttons = document.querySelectorAll("#authors-container button");
    buttons.forEach(button => button.style.backgroundColor = "#4c65af");
    event.target.style.backgroundColor = "#52a7e5";
    selectedAuthors[currentQuote] = event.target.textContent;
}

function submitAnswer() {
    if (selectedAuthors[currentQuote] === null || selectedAuthors[currentQuote] === undefined) {
        alert("Please select an author");
        return;
    }

    currentQuote++;

    if (currentQuote >= quotes.length) {
        displayFinalResult();
        saveState(); 
    } else {
        displayQuote();
        saveState();
    }
}

function saveState() {
    localStorage.setItem("currentQuote", currentQuote);
    localStorage.setItem("selectedAuthors", JSON.stringify(selectedAuthors));
}

function loadState() {
    const storedCurrentQuote = localStorage.getItem("currentQuote");
    const storedSelectedAuthors = localStorage.getItem("selectedAuthors");

    if (storedCurrentQuote !== null && storedSelectedAuthors !== null) {
        currentQuote = parseInt(storedCurrentQuote);
        selectedAuthors = JSON.parse(storedSelectedAuthors);

        if (currentQuote >= quotes.length) {
            displayFinalResult();
        } else {
            displayQuote();
        }
    }
}

loadState();

function displayFinalResult() {
    const finalResultContainerElement = document.getElementById("final-result-container");
    finalResultContainerElement.innerHTML = "";

    for (let i = 0; i < quotes.length; i++) {
        const imageContainerElement = document.createElement("div");
        imageContainerElement.style.position = "relative";

        const backgroundImageElement = document.createElement("img");
        backgroundImageElement.src = quotes[i].image;
        backgroundImageElement.style.width = "99%";
        backgroundImageElement.style.height = "auto";
        backgroundImageElement.style.borderRadius = "10px";
        backgroundImageElement.style.border = "5px inset #964B00";
        backgroundImageElement.style.boxShadow = "0 0 10px rgba(0, 0, 0, 0.5)";

        const authorImageElement = document.createElement("img");
        authorImageElement.src = getAuthorImage(selectedAuthors[i]);
        authorImageElement.style.position = "absolute";
        authorImageElement.style.top = "50%";
        authorImageElement.style.left = "50%";
        authorImageElement.style.transform = "translate(-50%, -50%)";
        authorImageElement.style.width = "auto";
        authorImageElement.style.height = "70%";
        authorImageElement.style.borderRadius = "10px";
        authorImageElement.style.border = "5px inset #964B00";
        authorImageElement.style.boxShadow = "0 0 10px rgba(0, 0, 0, 0.5)";

        const quoteInfoElement = document.createElement("div");
        quoteInfoElement.style.marginTop = "10px";
        quoteInfoElement.style.padding = "10px";
        quoteInfoElement.style.border = "1px solid #ccc";
        quoteInfoElement.style.borderRadius = "10px";
        quoteInfoElement.style.marginBottom = "30px";

        const quoteAuthorElement = document.createElement("p");
        quoteAuthorElement.textContent = `You attributed this quote to: ${selectedAuthors[i]}`;
        quoteAuthorElement.style.fontWeight = "bold";

        const quoteTextElement = document.createElement("p");
        quoteTextElement.textContent = quotes[i].quote;

        const quoteActualAuthorElement = document.createElement("p");
        quoteActualAuthorElement.textContent = `Actual author: ${quotes[i].author}`;
        quoteActualAuthorElement.style.fontWeight = "bold";

        const quoteBlurbElement = document.createElement("p");
        switch (quotes[i].author) {
            case "Henry David Thoreau":
                quoteBlurbElement.textContent = "Henry David Thoreau was an American philosopher, poet, and environmentalist who is best known for his book 'Walden.' He is associated with anarchism.";
                break;
            case "Joseph Stalin":
                quoteBlurbElement.textContent = "Joseph Stalin was the leader of the Soviet Union from 1922 until his death in 1953. He is known for his brutal policies and his role in World War II. This quote is a classic demonstration of his communist view of state as a provider first and foremost, with the idea of freedom taking a back seat.";
                break;
            case "Chairman Mao":
                quoteBlurbElement.textContent = "Chairman Mao was the leader of the Communist Party of China from 1943 until his death in 1976. He is known for his role in the Chinese Civil War and the brutal cultrual revolution.";
                break;
            case "Ralph Waldo Emerson":
                quoteBlurbElement.textContent = "Ralph Waldo Emerson was an American philosopher, poet, and essayist who is best known for his role in the Transcendentalist movement.";
                break;
            case "Adolf Hitler":
                quoteBlurbElement.textContent = "Adolf Hitler was the leader of Nazi Germany from 1933 until his death in 1945. He is known for his role in World War II and the Holocaust. This view of free speech as a priviledge is one of the most consistent ideas in both his speaking and policy.";
                break;
            case "King George III":
                quoteBlurbElement.textContent = "King George III was the King of England from 1760 until his death in 1820. He is known for his role in the American Revolution and his struggles with mental illness.";
                break;
            case "Malcolm X":
                quoteBlurbElement.textContent = "Malcolm X was an American civil rights leader who advocated for the rights of African Americans during the Civil Rights Movement. He is known for his powerful speeches and his association with, and departure from the Nation of Islam.";
                break;
            case "Henry Kissinger":
                quoteBlurbElement.textContent = "Henry Kissinger was the United States Secretary of State from 1973 to 1977. He is known for his role in shaping U.S. foreign policy, particularly in regards to the developing world. This quote reflects his views on the importance of resource extraction and the need for the U.S. to secure access to minerals and other resources from less developed countries, a policy that has been criticized for its implications on global inequality and environmental degradation.";
                break;
            case "Benito Mussolini":
                quoteBlurbElement.textContent = "Benito Mussolini was the dictator of Italy from 1922 to 1943. He is known for his fascist ideology and his role in World War II. This quote reflects his views on the relationship between the government and the nation, with the government playing a central role in shaping the nation's identity and will.";
                break;
            default:
                quoteBlurbElement.textContent = "";
                break;
        }

        quoteInfoElement.appendChild(quoteAuthorElement);
        quoteInfoElement.appendChild(quoteTextElement);
        quoteInfoElement.appendChild(quoteActualAuthorElement);
        quoteInfoElement.appendChild(quoteBlurbElement);

        imageContainerElement.appendChild(backgroundImageElement);
        imageContainerElement.appendChild(authorImageElement);
        finalResultContainerElement.appendChild(imageContainerElement);
        finalResultContainerElement.appendChild(quoteInfoElement);
    }

    finalResultContainerElement.style.display = "block";

    document.getElementById("quote-container").style.display = "none";
    document.getElementById("authors-container").style.display = "none";
    document.getElementById("submit-btn").style.display = "none";
    document.getElementById("yep").style.display = "none";
    document.getElementById("nope").style.display = "block";
}

function getAuthorImage(author) {
    switch (author) {
        case "Kamala Harris":
            return "https://upload.wikimedia.org/wikipedia/commons/4/41/Kamala_Harris_Vice_Presidential_Portrait.jpg";
        case "Donald Trump":
            return "https://upload.wikimedia.org/wikipedia/commons/0/0e/Donald_Trump_Pentagon_2017.jpg";
        case "Tim Walz":
            return "https://upload.wikimedia.org/wikipedia/commons/e/e1/Tim_Walz_by_Gage_Skidmore.jpg";
        case "JD Vance":
            return "https://upload.wikimedia.org/wikipedia/commons/8/83/Senator_Vance_official_portrait._118th_Congress.jpg";
        case "Joe Biden":
            return "https://upload.wikimedia.org/wikipedia/commons/6/68/Joe_Biden_presidential_portrait.jpg";
        case "Mike Johnson":
            return "https://upload.wikimedia.org/wikipedia/commons/0/05/Speaker_Mike_Johnson_Official_Portrait.jpg";
        case "Elizabeth Warren":
            return "https://upload.wikimedia.org/wikipedia/commons/6/6a/Elizabeth_Warren%2C_official_portrait%2C_114th_Congress.jpg";
        case "Mitch McConnell":
            return "https://upload.wikimedia.org/wikipedia/commons/0/0b/Mitch_McConnell_2016_official_photo_%281%29.jpg";        
        default:
            return "";
    }
}

const resetButton = document.createElement("button");
resetButton.textContent = "Reset";
resetButton.style.marginTop = "20px";
document.getElementById("final-result-container").appendChild(resetButton);

resetButton.addEventListener("click", resetState);

function resetState() {
    localStorage.removeItem("currentQuote");
    localStorage.removeItem("selectedAuthors");
    currentQuote = 0;
    selectedAuthors = [];
    displayQuote();
    document.getElementById("final-result-container").style.display = "none";
    document.getElementById("quote-container").style.display = "block";
    document.getElementById("authors-container").style.display = "block";
    document.getElementById("submit-btn").style.display = "block";
    document.getElementById("yep").style.display = "block";
    document.getElementById("nope").style.display = "none";
}