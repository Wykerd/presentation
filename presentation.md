# Slide 1
I was told to pick topic that I am passionate about and present it to the class in a speach. And as you know I an very passionate about coding

# Slide 2
To demonstrate this passion, I created this presentation website for this presentation to explain how I made this presentation website.

# Slide 3
So what do you use to build a website? You use 3 different languages, HTML, CSS and JS. HTML - Hypertext Markup Language, contains the content of the webpage, CSS - Cascading style sheets, is used to stylize the webpage. JS is used to add interactivity to the webpage.

# Slide 4
First we do the HTML, HTML consists of elements

I am not going to try to explain every element of this html document, all you need to know is that I made one div element which is a container in which the slide will be loaded into with javascript

# Slide 5
Next I created the basic slide's HTML which will be loaded into the container I made on the previous slide, it has a heading, center image,left text and image, right text and image.

# Slide 6

# Slide 7
Now lets make the site look good

First remove all the default styles like page margins and font

# Slide 8
Then stylize each element of the slide's HTML, in this code I basically tell the browser that the slide should fill the screen, text should be center, the images should fill the containers and the rigth text should allign right and the left left.

And for good measure I also added a background animation

# Slide 9

# Slide 10 
Now to make the HTML generate itself from a set of data using javascript.

You can't simply tell javascript to add some HTML to the page. You need to use an API, called DOM, Document Object Model which provides, me, the developer with a JS object that can be used to add the the web page.

It also allows the user to make virtual elements and only add it to the site later.

# Slide 11
This is what I did next

I wrote a JS function that takes the data of a slide and returns an virtual DOM element based on the input. I also wrote a function that can update this DOM element with other slide's data.

Next we call this function with default slide data and append it to the site container. Also I created a function to load slide data to a object.

# Slide 12
Lastly i stored all the slide data in an array and wrote an event that gets triggered on each time the arrow keys are pressed and then updates the DOM with the data of the next slide in the array.

And thats it