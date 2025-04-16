const newArticle = document.getElementById('form');
const sectUpdate = document.getElementById('updates');
const sectEntertainment = document.getElementById('entertainment');
const sectCourse = document.getElementById('course');
const sectComedy = document.getElementById('comedy');
const uploadBtn = document.getElementById('add');
const titleInput = document.getElementById('title');
const tagInput = document.getElementById('tag');
const categoryInput = document.getElementsByTagName('option');
const fileInput = document.getElementById('article-image');
const textInput = document.getElementById('article-txt');
const viewPage = document.getElementById('view');
const sectionContainer = document.querySelectorAll('.section-container')

const contents = JSON.parse(localStorage.getItem(article)) || [];
let optionSelect = 'selected';
let section;
let article = {};

const upload = () => {
    const topicCard = document.createElement('div');
    contents.forEach(article => {
        topicCard.id = article.id;
        topicCard.classList.add('topic-card');
        topicCard.innerHTML = ` 
                    <div class="topic-head">
                        <h2 id="title">${article.title}</h2>
                        <p class="tags">${article.tag}</p>
                    </div>
                    <div class="topic-content">
                        <div class="topic-text">
                            <p>${article.text}</p>
                        </div>
                        <div class="topic-image"><img class='img-div' src=${article.imageFile}></div>
                    </div>
                    
                    <button class="read-btn" onclick="readArticle(this)">Read article</button>`;

        switch (article.option) {
            case 'entertainment': sectEntertainment.appendChild(topicCard)
                break;
            case 'update': sectUpdate.appendChild(topicCard)
                break;
            case 'comedy': sectComedy.appendChild(topicCard)
                break;
            case 'course': sectCourse.appendChild(topicCard)
                break;
        };
    });
};

const clearInput = () => {
    titleInput.value = '';
    tagInput.value = '';
    categoryInput.forEach(option => {
        if (option.disabled) { return }
        else {
            option.selected = false;
        }
    });
    textInput.value = '';
    fileInput.value = '';

     = { };

newArticle.classList.toggle('hidden');
};

/* removeSpecialChars function was copied from freeCodeCamp's Todo app*/
const removeSpecialChars = str => str.replace(/[^a-zA-Z0-9. ]/g, "");

/* submit event is handled by a function 
which stores various inputs in an object that is stored locally.
The upload() and ClearInput() are invoked to add the article summary to the main page
and to clear the input fields respectively. */

uploadBtn.addEventListener('click', e => {
    e.preventDefault();

    let title = titleInput.value;
    let id = `${removeSpecialChars(title).split(' ').join('-')}1${Date.now()}2`
    let tag = tagInput.value;
    let text = textInput.value;
    let option = categoryInput.forEach(opt => {
        if (opt.selected === true && opt.disabled != true) {
            return opt.value;
        }
    });
    let imageFile;

    fileInput.addEventListener('change', e => {
        const image = e.target.files[0];
        const reader = new FileReader();

        reader.addEventListener('load', () => {
            imageFile = reader.result;
        })

        if (image) {
            reader.readAsDataURL(image);
        }
    });



    article = { id, title, tag, option, imageFile, text };
    localStorage.setItem("", JSON.stringify(article));

    upload();
    clearInput();

});

/* function to display the article in as a full page.
This is achieved accessing the object containing the selected article
through it's id. Then the other HTML elements are set to display none.*/

const readArticle = (button) => {
    const selectElement = button.parentElement.id;
    const ObjIndex = contents.findIndex(content => content.id === selectElement);

    const { id, title, tag, option, image, text } = contents[ObjIndex];

    viewPage.innerHTML = ` <button id="back">Go Back</button>
            <div class="view-card" id=${id}>
                <div class="topic-head">
                    <h2 id="title">${(title).toUpperCase()}</h2>
                </div>
                <div class="view-image"><img src="${image}" alt="${option} image"></div>
                <p class="tags">${tag}</p>

                <div class="article-text">
                    <p>${text}</p>
                </div>

            </div>`;

    Array.from(sectionContainer).forEach(section => {
        section.classList.toggle('hidden');
    });

};

document.getElementById('back').addEventListener('click', () => {

    upload();
    Array.from(sectionContainer).forEach(section => {
        section.classList.toggle('hidden');
    });

});

upload();