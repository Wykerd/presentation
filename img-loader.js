// Copyright 2019, Daniel Wykerd
// Simple library to dynamically load images with progressbar
// Simply add a div to the spot you want the image to be added
// add a div "data-image-src" and set your own width and height
// the progress can be styled with class "imglib-progress"
// The className of the image DOM Element can be set with div "data-image-class"

// You are free to use this library for non-commercial purposes
// but credit is required.

// Change the way images load
Image.prototype.load = function(url){
    var thisImg = this;
    var xmlHTTP = new XMLHttpRequest();

    xmlHTTP.open('GET', url,true);

    xmlHTTP.responseType = 'arraybuffer';
    xmlHTTP.onload = function(e) {
        if (this.getResponseHeader('content-type').split('/')[0]) {
            var blob = new Blob([this.response]);
            thisImg.src = window.URL.createObjectURL(blob);
            thisImg.loadDone();
        } else {
            thisImg.loadFailed();
        }
    };

    xmlHTTP.onprogress = function(e) {
        thisImg.completedPercentage = parseInt((e.loaded / e.total) * 100);
        thisImg.loadChange(thisImg.completedPercentage);
    };

    xmlHTTP.onloadstart = function() {
        thisImg.completedPercentage = 0;
        thisImg.loadChange(thisImg.completedPercentage);
    };

    xmlHTTP.onerror = function () {
        thisImg.loadFailed();
    }

    xmlHTTP.send();
};

Image.prototype.completedPercentage = 0;

// Event that gets called each time progress is made
Image.prototype.loadChange = function (percentage){};

// Event that gets called after loading
Image.prototype.loadDone = function () {};

// Event that gets called if loading fails
Image.prototype.loadFailed = function () {};

function loadImage(div, url, classname) {
    // Create the progressBar element inside the div
    var progressBar = document.createElement('div');
    progressBar.style.height = `${div.offsetHeight}px`;
    div.appendChild(progressBar);
    progressBar.style.width = '0%';
    progressBar.className = 'imglib-progress';

    //Create the image element
    var img = new Image();

    // Update the progressbar
    img.loadChange = function(p) {
        progressBar.style.width = p + '%';
    }
    
    // Switch to image
    img.loadDone = function () {
        
        div.parentNode.replaceChild(img, div);

        // Added for masonary
        setTimeout(() => {
            refreshLayout();
        }, 10);
    }

    // In the event of an error
    img.loadFailed = function() {
        var errorDivWrap = document.createElement('div');
        errorDivWrap.className = 'imglib-error-wrap';
        
        var errorDiv = document.createElement('div');
        errorDiv.className = 'imglib-error-text';
        errorDiv.textContent = 'Could not load image'

        errorDivWrap.appendChild(errorDiv);
        
        div.parentNode.replaceChild(errorDivWrap, div);

        // Added for masonary
        setTimeout(() => {
            refreshLayout();
        }, 10);
    }

    // Set the class names
    img.className = div.getAttribute('data-image-class') || classname || 'imglib-class';

    img.load(div.getAttribute('data-image-src') || url);
}

// Auto div replace script after load 
window.addEventListener('load', ()=>{
    for (let div of document.querySelectorAll('div[data-image-src]')) {
        loadImage(div) ; 
    }
});