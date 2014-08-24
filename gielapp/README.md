

Mobile web version of Giel Beelen app
=====================================

Site shows an overview of items related to the Giel Beelen morning show on 3FM.
Put together with HTML5, CSS3, and JavaScript (by Kirsten Ruys).
Tested in Chrome, Safari, Firefox, and iOS7.
Site is fully responsive: Item tiles, margins, font-sizes, buttons, icons all resize accordingly.

Getting started:
----------------
Site can be run using a Python server: In Terminal go to 'gielapp' folder and start a server with '$ python -m SimpleHTTPServer'. In your favorite browser go to 'localhost:8000'.

Site is also publicly available at 'http://kiruys.github.io/gielapp/'.

SASS files are compiled to 'showcase.css' with compass (in Terminal go to 'gielapp/static/scss' and start compass with '$ compass watch').

Structure:
----------
index.html contains a navigation part, an overview of items part (one row of three item tiles), and an item part. When the page is loaded, the navigation part and the item overview are visible, while the item part is hidden.

On document ready, javascript code ('gielapp/static/js/giel-app.js') creates a temporary clone of the row of item tiles and removes the row. Next, a function is called that clones the temporary clone a specified number of times and adds the rows below the navigation part. This creates a specified number of rows of 3 grey tiles each. Next, the horizontal margins are obtained to set the vertical margins accordingly, which is also done on resize.  

Content for the items is retrieved from a json file 'gielapp/static/ajax/tilecontent.json' and stored into a global variable to be used by different functions. Next, the content for each item is placed in the tiles. The looks of an item vary: item title, font color, background color, background picture, and icon type are all retrieved from the json file.

The item view is partly specified in index.html (h2 header with the closing icon and a content div) and part of its content is retrieved from the json file ('gielapp/static/ajax/tilecontent.json'). The latter part is inserted into the content div when a specific item has been clicked/touched.

Event related javascript can be found in 'gielapp/static/js/events.js':
- A tile with content can be clicked/touched to see more detailed information on the item. The transition between the item overview and the item view is animated with jQuery. 
- An item can be closed by clicking/touching the close icon cross, or by clicking/touching the menu icon in the upper, navigation part. Closing the item triggers a reverse transition back to the item overview.
- The music icon in the upper, navigation part can be clicked/touched to show the playlist. At this point, only a message is displayed.

When specific item content is ready, an event called "itemSet" is fired, which triggers the activation of item specific event handlers to make sure that buttons can actually be clicked/touched to send a form, make a photo, or play a video.