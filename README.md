# PWA Text Editor
[![License: CC0-1.0](https://licensebuttons.net/l/zero/1.0/80x15.png)](http://creativecommons.org/publicdomain/zero/1.0/)

## Table of contents
* [Description](#description)
* [User Story](#installIns)
* [Acceptance Criteria](#usage)
* [Deployed Page](#testIns)
* [License](#license)
* [Questions](#questions)

<a name="description"></a>
## Description 
A simple Text Edtior that is a progressive web application. It works in offline and online mode (with service worker), stores your text to a server when possible, and can be installed and ran locally.

<a name="installIns"></a>
## User Story 
```md
AS A developer
I WANT to create notes or code snippets with or without an internet connection
SO THAT I can reliably retrieve them for later use
```

<a name="usage"></a>
## Acceptance Criteria 

```md
GIVEN a text editor web application
WHEN I open my application in my editor
THEN I should see a client server folder structure
WHEN I run `npm run start` from the root directory
THEN I find that my application should start up the backend and serve the client
WHEN I run the text editor application from my terminal
THEN I find that my JavaScript files have been bundled using webpack
WHEN I run my webpack plugins
THEN I find that I have a generated HTML file, service worker, and a manifest file
WHEN I use next-gen JavaScript in my application
THEN I find that the text editor still functions in the browser without errors
WHEN I open the text editor
THEN I find that IndexedDB has immediately created a database storage
WHEN I enter content and subsequently click off of the DOM window
THEN I find that the content in the text editor has been saved with IndexedDB
WHEN I reopen the text editor after closing it
THEN I find that the content in the text editor has been retrieved from our IndexedDB
WHEN I click on the Install button
THEN I download my web application as an icon on my desktop
WHEN I load my web application
THEN I should have a registered service worker using workbox
WHEN I register a service worker
THEN I should have my static assets pre cached upon loading along with subsequent pages and static assets
WHEN I deploy to Heroku
THEN I should have proper build scripts for a webpack application
```

<a name="testIns"></a>
## Deployed Page

https://git.heroku.com/enigmatic-atoll-85822.git

<a name="license"></a>
## License
CC0 1.0
- https://creativecommons.org/publicdomain/zero/1.0/
    The person who associated a work with this deed has dedicated the work to the public domain by waiving all of his or her rights to the work worldwide under copyright law, including all related and neighboring rights, to the extent allowed by law.

    You can copy, modify, distribute and perform the work, even for commercial purposes, all without asking permission. See Other Information below.

<a name="questions"></a>   
## Questions
How can I be reached?
- My Github: https://github.com/nicholewilburn
- My Email: nicholewilburn@gmail.com
