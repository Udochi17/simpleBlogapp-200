const newArticle = document.getElementById('form');
const sectUpdate = document.getElementById('updates');
const sectEntertainment = document.getElementById('entertainment');
const sectCourse = document.getElementById('course');
const sectComedy = document.getElementById('comedy');
const uploadBtn = document.getElementById('add');
const titleInput = document.getElementById('title-input');
const tagInput = document.getElementById('tag');
const categoryInput = document.getElementsByTagName('option');
const fileInput = document.getElementById('article-image');
const textInput = document.getElementById('article-txt');
const viewPage = document.getElementById('view');
const sectionContainer = document.querySelectorAll('.section-container');
const writeArticle = document.getElementById('write');

const contents = JSON.parse(localStorage.getItem('article')) || [];
let optionSelect = 'selected';
let chooseSect;
let article = {};
let articleArr = [];
const imageArr = [
    'img/9910414.jpg',
    'img/twitwall.jpg',
    'img/Screenshot (261).png'
];

/* Store content objects locally when document is loaded */
document.addEventListener('DOMContentLoaded', () => {
    const arr = [
        {
            id: `Software is the New thing1${Date.now()}2`,
            title: 'Software is the New thing',
            tag: '#trending #challenge',
            chooseSect: 'update',
            text: `With increasing rate of technological advancements.. tech is sure going to be in every human mind in the coming age. Lorem ipsum dolor sit amet consectetur adipisicing elit. Harum fugiat necessitatibus, eius placeat repudiandae odio in minima voluptates voluptatibus laborum at consequatur cumque cum libero earum, vero repellat tempora similique.With increasing rate of technological advancements.. tech is sure going to be in every human mind in the coming age. Lorem ipsum dolor sit amet consectetur adipisicing elit. Harum fugiat necessitatibus, eius placeat repudiandae odio in minima voluptates voluptatibus laborum at consequatur cumque cum libero earum, vero repellat tempora similique.`
        },

        {
            id: `Man who wore Softwares..1${Date.now()}2`,
            title: 'Man who wore Softwares..',
            tag: '#comedy #challenge',
            chooseSect: 'comedy',
            text: `I met a man so soft that he only wore software.. tech is sure going to be in every human mind in the coming age. Lorem ipsum dolor sit amet consectetur adipisicing elit. Harum fugiat necessitatibus, eius placeat repudiandae odio in minima voluptates voluptatibus laborum at consequatur cumque cum libero earum, vero repellat tempora similique. bus, eius placeat repudiandae odio in minima voluptates voluptatibus laborum at consequatur cumque cum libero earum, vero repellat tempora similique.With increasing rate of technological advancements.. tech is sure going to be in every human mind in the coming age. Lorem ipsum dolor sit amet consectetur adipisicing elit. Harum fugiat necessitatibus, eius placeat repudiandae odio in minima voluptates voluptatibus laborum at consequatur cumque cum libero earum, vero repellat tempora similique.`
        },

        {
            id: `Data Analysis courses1${Date.now()}2`,
            title: 'Data Analysis courses',
            tag: '#courses #challenge',
            chooseSect: 'course',
            text: `There are courses made available by different organisations that can help you learn and develop. um dolor sit amet consectetur adipisicing elit. Harum fugiat necessitatibus, eius placeat repudiandae odio in minima voluptates voluptatibus laborum at consequatur cumque cum libero earum, vero repellat tempora similique. bus, eius placeat repudiandae odio in minima voluptates voluptatibus laborum at consequatur cumque cum libero earum, vero repellat tempora similique.With increasing rate of technological advancements.. tech is sure going to be in every human mind in the coming age. Lorem ipsum dolor sit amet consectetur adipisicing elit. Harum fugiat necessitatibus, eius placeat repudiandae odio in minima voluptates voluptatibus laborum at consequatur cumque cum libero earum, vero repellat tempora similique`
        },

        {
            id: `Screaming Entertainment!1${Date.now()}2`,
            title: 'Screaming Entertainment!',
            tag: '#fun #entertainment',
            chooseSect: 'entertainment',
            text: `Writing code is a lot fun, especially when you make use of the right tools. um dolor sit amet consectetur adipisicing elit. Harum fugiat necessitatibus, eius placeat repudiandae odio in minima voluptates voluptatibus laborum at consequatur cumque cum libero earum, vero repellat tempora similique. bus, eius placeat repudiandae odio in minima voluptates voluptatibus laborum at consequatur cumque cum libero earum, vero repellat tempora similique.With increasing rate of technological advancements.. tech is sure going to be in every human mind in the coming age. Lorem ipsum dolor sit amet consectetur adipisicing elit. Harum fugiat necessitatibus, eius placeat repudiandae odio in minima voluptates voluptatibus laborum at consequatur cumque cum libero earum, vero repellat tempora similique`
        }
    ];

    localStorage.setItem(`article`, JSON.stringify(arr));
});

/* Function to push article or new posts to the main page*/
const pushArticle = () => {
    contents.forEach(article => {
        const topicCard = document.createElement('div');
        topicCard.id = article.id;
        const imageNo = Math.round(Math.random() * 3);
        topicCard.classList.add('topic-card');
        topicCard.innerHTML = ` 
                    <div class="topic-head">
                        <h2 id="title-txt">${article.title}</h2>
                        <p class="tags">${article.tag}</p>
                    </div>
                    <div class="topic-content">
                        <div class="topic-text">
                            <p>${article.text}</p>
                        </div>
                     <div class="topic-image"><img class='img-div' src='${imageArr[imageNo]}'></div>
                    </div>
                    
                    <button class="read btn" onclick="readArticle(this)">Read article</button>`;

    /* append topicCard element based on the selected section*/
        switch (article.chooseSect) {
            case 'entertainment': sectEntertainment.appendChild(topicCard);
                break;
            case 'update': sectUpdate.appendChild(topicCard);
                break;
            case 'comedy': sectComedy.appendChild(topicCard);
                break;
            case 'course': sectCourse.appendChild(topicCard);
                break;
        };
    });
};

/* Function to clear form when adding new article */
const clearInput = () => {
    titleInput.value = '';
    tagInput.value = '';
    chooseSect = '';
    textInput.value = '';
    fileInput.value = '';
    article = {};

    sectionContainer.forEach(section => {
        section.classList.toggle('hidden');
    });
    newArticle.classList.toggle('hidden');
};


/* submit event is handled by a function 
which stores various inputs in an object that is stored locally.
The upload() and ClearInput() are invoked to add the article summary to the main page
and to clear the input fields respectively. */

uploadBtn.addEventListener('click', e => {
    e.preventDefault();

    if (!titleInput.value && !textInput.value) {
        alert('Please provide a title');
    } else {
        let title = titleInput.value;
        let id = `${titleInput.value}1${Date.now()}2`
        let tag = tagInput.value;
        let text = textInput.value;
        Array.from(categoryInput).forEach(opt => {
            if (opt.selected == true) chooseSect = opt.value;
        });
        
        article = { id, title, tag, chooseSect, text };
        articleArr.push(article);
        localStorage.setItem(`article`, JSON.stringify(articleArr));

    }

    pushArticle();
    clearInput();

});

/* function to display the article in as a full page.
This is achieved accessing the object containing the selected article
through it's id. Then the other HTML elements are set to display none.*/

const readArticle = (button) => {
    const selectElement = button.parentElement.id;
    const ObjIndex = contents.findIndex(content => content.id === selectElement);

    const { id, title, tag, chooseSect, text } = contents[ObjIndex];
    document.querySelector('.write-btn').classList.toggle('hidden');

    viewPage.innerHTML += ` 
            <div class="view-card" id=${id}>
                <div class="topic-head">
                    <h2 id="title">${(title).toUpperCase()}</h2>
                </div>
                <div class="view-image"><img src="img/Screenshot (261).png" alt="${chooseSect} image"></div>
                <p class="tags">${tag}</p>

                <div class="article-text">
                    <p>${text}</p>
                </div>

            </div>`;

    viewPage.classList.toggle('hidden');

    Array.from(sectionContainer).forEach(section => {
        section.classList.toggle('hidden');
    });

    /* Adding event listener to back button when viewPage is shown*/
    const backBtn = document.getElementById('back');
    backBtn.addEventListener('click', () => {
        pushArticle();
        Array.from(sectionContainer).forEach(section => {
            section.classList.toggle('hidden');
        });
        viewPage.innerHTML = '<button id="back">Go Back</button>'
        viewPage.classList.toggle('hidden');
        document.querySelector('.write-btn').classList.toggle('hidden');
    })

};

/* Event listener to cancel adding new article operation */
document.getElementById('cancel').addEventListener('click', () => {
    pushArticle();
    newArticle.classList.toggle('hidden');
    sectionContainer.forEach(section => {
        section.classList.toggle('hidden');
    });
    document.querySelector('.write-btn').classList.toggle('hidden');
});

/* Function to display form and add hidden class to all sections */
writeArticle.addEventListener('click', () => {
    newArticle.classList.toggle('hidden');
    sectionContainer.forEach(section => {
        section.classList.toggle('hidden');
    });
    document.querySelector('.write-btn').classList.toggle('hidden');
})


pushArticle();
