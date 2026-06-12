const RANDOM_IMG_ENDPOINT = "https://dog.ceo/api/breeds/image/random";

const BREEDS = ["affenpinscher", "african", "airedale", "akita", "appenzeller", "shepherd australian", "basenji", "beagle", "bluetick", "borzoi", "bouvier", "boxer", "brabancon", "briard", "norwegian buhund", "boston bulldog", "english bulldog", "french bulldog", "staffordshire bullterrier", "australian cattledog", "chihuahua", "chow", "clumber", "cockapoo", "border collie", "coonhound", "cardigan corgi", "cotondetulear", "dachshund", "dalmatian", "great dane", "scottish deerhound", "dhole", "dingo", "doberman", "norwegian elkhound", "entlebucher", "eskimo", "lapphund finnish", "bichon frise", "germanshepherd", "italian greyhound", "groenendael", "havanese", "afghan hound", "basset hound", "blood hound", "english hound", "ibizan hound", "plott hound", "walker hound", "husky", "keeshond", "kelpie", "komondor", "kuvasz", "labradoodle", "labrador", "leonberg", "lhasa", "malamute", "malinois", "maltese", "bull mastiff", "english mastiff", "tibetan mastiff", "mexicanhairless", "mix", "bernese mountain", "swiss mountain", "newfoundland", "otterhound", "caucasian ovcharka", "papillon", "pekinese", "pembroke", "miniature pinscher", "pitbull", "german pointer", "germanlonghair pointer", "pomeranian", "medium poodle", "miniature poodle", "standard poodle", "toy poodle", "pug", "puggle", "pyrenees", "redbone", "chesapeake retriever", "curly retriever", "flatcoated retriever", "golden retriever", "rhodesian ridgeback", "rottweiler", "saluki", "samoyed", "schipperke", "giant schnauzer", "miniature schnauzer", "english setter", "gordon setter", "irish setter", "sharpei", "english sheepdog", "shetland sheepdog", "shiba", "shihtzu", "blenheim spaniel", "brittany spaniel", "cocker spaniel", "irish spaniel", "japanese spaniel", "sussex spaniel", "welsh spaniel", "english springer", "stbernard", "american terrier", "australian terrier", "bedlington terrier", "border terrier", "cairn terrier", "dandie terrier", "fox terrier", "irish terrier", "kerryblue terrier", "lakeland terrier", "norfolk terrier", "norwich terrier", "patterdale terrier", "russell terrier", "scottish terrier", "sealyham terrier", "silky terrier", "tibetan terrier", "toy terrier", "welsh terrier", "westhighland terrier", "wheaten terrier", "yorkshire terrier", "tervuren", "vizsla", "spanish waterdog", "weimaraner", "whippet", "irish wolfhound"];


// Utility function to get a randomly selected item from an array
function getRandomElement(array) {
    const i = Math.floor(Math.random() * array.length);
    return array[i];
}

// Utility function to shuffle the order of items in an array in-place
function shuffleArray(array) {
    return array.sort((a, b) => Math.random() - 0.5);
}

// TODO 1
function getMultipleChoices(n, correctAnswer, array) {
    let choices = [correctAnswer]

    while (choices.length < n) {
        const randomOption = getRandomElement(array)

        if (!choices.includes(randomOption)) {
            choices.push(randomOption)
        }
    }

    return shuffleArray(choices)

}


// TODO 2
function getBreedFromURL(url) {
    const [, , , , breedName] = url.split('/')
    const [firstName, lastName] = breedName.split('-')

    return [lastName, firstName].join(" ")
}


// TODO 3
async function fetchMessage(url) {
    const response = await fetch(url)
    const body = await response.json()

    return body.message

}


// Function to add the multiple-choice buttons to the page
function renderButtons(choicesArray, correctAnswer) {

    function buttonHandler(e) {
        if (e.target.value === correctAnswer) {
            e.target.classList.add("correct");
        } else {
            e.target.classList.add("incorrect");
            document.querySelector(`button[value="${correctAnswer}"]`).classList.add("correct");
        }
    }

    const options = document.getElementById("options"); // Container for the multiple-choice buttons

    choicesArray.forEach((choice) => {
        const button = document.createElement("button");



        button.name = choice;
        button.value = choice;
        button.textContent = choice

        button.addEventListener("click", buttonHandler)

        options.appendChild(button)
    })
}

// Function to add the quiz content to the page
function renderQuiz(imgUrl, correctAnswer, choices) {
    const image = document.createElement("img");
    image.setAttribute("src", imgUrl);
    const frame = document.getElementById("image-frame");

    image.addEventListener("load", () => {
        // Wait until the image has finished loading before trying to add elements to the page
        frame.replaceChildren(image);
        renderButtons(choices, correctAnswer);
    })

}

// Function to load the data needed to display the quiz
async function loadQuizData() {
    document.getElementById("image-frame").textContent = "Fetching doggo...";

    const doggoImgUrl = await fetchMessage(RANDOM_IMG_ENDPOINT);
    const correctBreed = getBreedFromURL(doggoImgUrl);
    const breedChoices = getMultipleChoices(2, correctBreed, BREEDS);

    return [doggoImgUrl, correctBreed, breedChoices];
}

// TODO 5
// Asynchronously call the loadQuizData() function,
async function startQuiz() {
    const [imageUrl, correctAnswer, choices] = await loadQuizData()
    // Then call renderQuiz() with the returned imageUrl, correctAnswer, and choices
    renderQuiz(imageUrl, correctAnswer, choices);
}

startQuiz()