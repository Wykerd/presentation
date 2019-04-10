// The actual app
function App (initdata) {
    let el;

    const render = (data)=>{
        return div({class: 'slide'}, null, null, [
            mkEl('h1', null, null, null, data.heading),
            div({class:'center'}, null, 
            data.centerback ? {'background-image':`url('${data.centerback}')`, 'font-size': data.font} : null, [
                div({class: `left ${data.centerline ? 'line' : 'no-line'}`}, null, {'background-image':`url('${data.leftback}')`}, 
                    data.leftinnerhtml),
                div({class: 'right'}, null, {'background-image':`url('${data.rightback}')`}, 
                    data.rightinnerhtml)
            ])
        ])
    }

    const update = (preEl, data)=> {
        const newEl = render(data);

        if (newEl.isEqualNode(preEl)) {
            console.warn('Update called but state not changed')
            return preEl;
        } else {
            preEl.parentElement.replaceChild(newEl, preEl);
        }

        return newEl;
    }

    el = render(initdata);

    updater.link(initdata.id, initdata, (data)=>{
        el = update(el, data);
    });

    return el;
}

// Append the App to the DOM
document.querySelector('#app').appendChild(App({
    id: 'slide-element', 
    centerline: false,
    leftinnerhtml: '',
    rightinnerhtml: '',
    centerback: './',
    leftback: './',
    rightback: './',
    heading: '',
    font: '1em'
}));

// Object to create slide data
function Slide(heading, centerback, font, leftinnerhtml, leftback, centerline, rightinnerhtml, rightback) {
    this.heading = heading || '';
    this.font = font || '1em',
    this.centerback = centerback || './';
    this.leftinnerhtml = leftinnerhtml || '';
    this.centerline = centerline || false;
    this.rightinnerhtml = rightinnerhtml || '';
    this.rightback = rightback || './';
    this.leftback = leftback || './';
}

// Array of slide data
const slides = [
    new Slide(`My 'Soap Box' Moment`),

    new Slide('Coding, my passion', null, '1.5em','I built this presentation website in 2 hours for this presentation to explain how I created this presentation software'),

    new Slide('First, what\'s the web built on?', null, '2em', 
    mkEl('ol', null, null, null, [
        mkEl('li', null, null, null, 'HTML'),
        mkEl('li', null, null, null, 'CSS'),
        mkEl('li', null, null, null, 'JAVASCRIPT'),
    ]), null, true, null, './slide-images/html.png'),

    new Slide('The Basic HTML', null, null, 
    mkEl('code', null, null, null, [
        mkEl('pre', null, null, {'font-size' : '1vw'},
`<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <title>Daniel Wykerd Presentation</title>
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link rel="stylesheet" type="text/css" media="screen" href="main.css">
    <script src="view-lib.js"></script>
    <script src="ui-updater.js"></script>
</head>
<body>
    <noscript>Oh no! Javascript is disabled!</noscript>
    <div id="app">
        <!-- This is where the magic will happen! -->
    </div>
    <script src="img-loader.js"></script>
    <script src="app.js"></script>
</body>
</html>
`)
    ]), null, true, mkEl('code', null, null, null, [
        mkEl('pre', null, null, {'font-size' : '1vw'},
`// Defines the file type
// Shows where the document starts
// All the data used by the browser 
   or seach engine that is'n visible
   to the user
    

// The element that links to the css   
   
   

// Everything visible
// Only visible if javascript is disabled
// The element that we append all the dynamically
   generated elements to in the javascript section
   
// The element that links to the javascript code


// Closing tags for the html
`)
    ])),

    new Slide ('The Slide Element HTML', null, null, mkEl('code', null, null, null, [
        mkEl('pre', null, null, {'font-size' : '1.5vw'},
`<div class="slide">
    <h1>Heading</h1>
    <div class="center" style="background-image: url('./'); font-size: 1em;">
        <div class="left line" style="background-image: url('./');"></div>
        <div class="right" style="background-image: url('./');"></div>
    </div>
</div>



<!-- 
    The slide element will go in the div I showed in the previous slide
-->
`)
    ])),

    new Slide ('How it looks', './slide-images/1.png'),

    new Slide ('Lets make it look good with CSS -- First remove the default styles', null, null, mkEl('code', null, null, null, [
        mkEl('pre', null, null, {'font-size' : '1.5vw'},
`@import 
url('https://fonts.googleapis.com/css?family=Ubuntu');

html, body, h1 {
    margin: 0;
    padding: 0;
    overflow: hidden;
    font-family: 'Ubuntu', sans-serif;
}
`)
    ]), null, true, null, './slide-images/3.png'),

    new Slide ('Lets make it look good with CSS -- Add custom styles to all the used elements', null, null, mkEl('code', null, null, null, [
        mkEl('pre', null, null, {'font-size' : '0.8vw'},
`#app {
    width: 100vw;
    height: 100vh;

    display: flex;
    justify-content: center;
    align-items: center;

    transition: 100ms all ease;
    -moz-transition: 100ms all ease;
    -webkit-transition: 100ms all ease;
    -o-transition: 100ms all ease;
    -ms-transition: 100ms all ease;

    animation: backgroundanimate 60s infinite;
}

@keyframes backgroundanimate {
    0% { background: #fb939f }
    25% { background: #fee96c }
    50% { background: #6fffe9 }
    75% { background: #eaeae8 }
    100% { background: #fb939f }
}

.slide {
    width: 90vw;
    height: 90vh;

    display: flex;
    flex-flow: column;
}
`)
    ]), null, false, mkEl('code', null, null, null, [
        mkEl('pre', null, null, {'font-size' : '0.8vw'},
`* {
    background-size: contain;
    background-repeat: no-repeat;
    background-position: center;
}

.slide .center {
    flex-grow: 1;

    display: flex;
}

.center .left {
    flex-grow: 1;
    margin-left: 16px;
    padding-right: 16px;
    max-width: 55%;
}

.center .line {
    border-right: 2px solid black;
}

.center .right {
    flex-grow: 1;
    padding-left: 16px;
    margin-right: 16px;
}

.slide h1 {
    text-align: center;
    padding-bottom: 5vh;
    font-size: 3vw;
}
`)
    ])),

    new Slide ('Heading', null, null, null, null, true),

    new Slide ('Adding interactivity with javascript'),
    
    new Slide ('Creating the slide in the virtual DOM', null, null, mkEl('code', null, null, null, [
        mkEl('pre', null, null, {'font-size' : '0.8vw'},
`function App (initdata) {
    let el;

    const render = (data)=>{
        return div({class: 'slide'}, null, null, [
            mkEl('h1', null, null, null, data.heading),
            div({class:'center'}, null, 
            data.centerback ? {'background-image':\`url('\${data.centerback}')\`, 'font-size': data.font} : null, [
                div({class: \`left \${data.centerline ? 'line' : 'no-line'}\`}, null, {'background-image':\`url('\${data.leftback}')\`}, 
                    data.leftinnerhtml),
                div({class: 'right'}, null, {'background-image':\`url('\${data.rightback}')\`}, 
                    data.rightinnerhtml)
            ])
        ])
    }

    const update = (preEl, data)=> {
        const newEl = render(data);

        if (newEl.isEqualNode(preEl)) {
            console.warn('Update called but state not changed')
            return preEl;
        } else {
            preEl.parentElement.replaceChild(newEl, preEl);
        }

        return newEl;
    }

    el = render(initdata);

    updater.link(initdata.id, initdata, (data)=>{
        el = update(el, data);
    });

    return el;
}
`)
    ])),

    new Slide ('Initializing the App', null, null, mkEl('code', null, null, null, [
        mkEl('pre', null, null, {'font-size' : '0.8vw'},
`// Append the App to the DOM
document.querySelector('#app').appendChild(App({
    id: 'slide-element', 
    centerline: false,
    leftinnerhtml: '',
    rightinnerhtml: '',
    centerback: './',
    leftback: './',
    rightback: './',
    heading: '',
    font: '1em'
}));

// Object to create slide data
function Slide(heading, centerback, font, leftinnerhtml, leftback, centerline, rightinnerhtml, rightback) {
    this.heading = heading || '';
    this.font = font || '1em',
    this.centerback = centerback || './';
    this.leftinnerhtml = leftinnerhtml || '';
    this.centerline = centerline || false;
    this.rightinnerhtml = rightinnerhtml || '';
    this.rightback = rightback || './';
    this.leftback = leftback || './';
}
`)
    ])),

    new Slide ('Slides and navigation', null, null, mkEl('code', null, null, null, [
        mkEl('pre', null, null, {'font-size' : '0.8vw'},
`const slides = [
    new Slide(\`My 'Soap Box' Moment\`)]'

// Set slide
let slide = 0;

// Load the first slide
updater.update('slide-element', slides[0]);

// Slide navigation functions
function nextSlide() {
    slide++;
    if (slide <= slides.length - 1) {
        updater.update('slide-element', slides[slide]);
        console.log('Loading next slide');
    } else {
        updater.update('slide-element', new Slide ('End of presentation'));
        slide--;
    }
}

function preSlide () {
    slide--;
    if (slide >= 0) {
        updater.update('slide-element', slides[slide]);
        console.log('Loading previous slide');
    } else {
        slide = 0;
    }
}

// Check keydown for navigation
window.addEventListener('keydown', e=>{
    if (e.keyCode === 32 || e.keyCode == 39) {
        nextSlide();
    } else if (e.keyCode === 37) {
        preSlide();
    } else if (e.keyCode === 123) {
        console.clear();
        console.log(document);
    }
});
`)
    ]))


];

// Set slide
let slide = 0;

// Load the first slide
updater.update('slide-element', slides[0]);

// Slide navigation functions
function nextSlide() {
    slide++;
    if (slide <= slides.length - 1) {
        updater.update('slide-element', slides[slide]);
        console.log('Loading next slide');
    } else {
        updater.update('slide-element', new Slide ('End of presentation'));
        slide--;
    }
}

function preSlide () {
    slide--;
    if (slide >= 0) {
        updater.update('slide-element', slides[slide]);
        console.log('Loading previous slide');
    } else {
        slide = 0;
    }
}

// Check keydown for navigation
window.addEventListener('keydown', e=>{
    if (e.keyCode === 32 || e.keyCode == 39) {
        nextSlide();
    } else if (e.keyCode === 37) {
        preSlide();
    } else if (e.keyCode === 123) {
        console.clear();
        console.log(document);
    }
});

window.addEventListener('click', ()=>{
    nextSlide();
})