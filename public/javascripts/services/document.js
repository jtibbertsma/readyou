angular.module('readyou.document', [])
  .factory('initialText', function initialTextFactory() {
    var text = "Ace (Ajax.org Cloud9 Editor)\n\
============================\n\
\n\
_Note_: The new site at http://ace.c9.io contains all the info below along with an embedding guide and all the other resources you need to get started with Ace.\n\
\n\
Ace is a standalone code editor written in JavaScript. Our goal is to create a browser based editor that matches and extends the features, usability and performance of existing native editors such as TextMate, Vim or Eclipse. It can be easily embedded in any web page or JavaScript application. Ace is developed as the primary editor for [Cloud9 IDE](https://c9.io/) and the successor of the Mozilla Skywriter (Bespin) Project.\n\
\n\
Features\n\
--------\n\
\n\
* Syntax highlighting for over 120 languages (TextMate/Sublime/_.tmlanguage_ files can be imported)\n\
* Over 20 themes (TextMate/Sublime/_.tmtheme_ files can be imported)\n\
* Automatic indent and outdent\n\
* An optional command line\n\
* Handles huge documents (at last check, 4,000,000 lines is the upper limit)\n\
* Fully customizable key bindings including vim and Emacs modes\n\
* Search and replace with regular expressions\n\
* Highlight matching parentheses\n\
* Toggle between soft tabs and real tabs\n\
* Displays hidden characters\n\
* Drag and drop text using the mouse\n\
* Line wrapping\n\
* Code folding\n\
* Multiple cursors and selections\n\
* Live syntax checker (currently JavaScript/CoffeeScript/CSS/XQuery)\n\
* Cut, copy, and paste functionality\n\
\n\
Take Ace for a spin!\n\
--------------------\n\
\n\
Check out the Ace live [demo](http://ace.c9.io/build/kitchen-sink.html) or get a [Cloud9 IDE account](https://c9.io/) to experience Ace while editing one of your own GitHub projects.\n\
\n\
If you want, you can use Ace as a textarea replacement thanks to the [Ace Bookmarklet](http://ajaxorg.github.io/ace/build/demo/bookmarklet/index.html).\n\
\n\
Embedding Ace\n\
-------------\n\
\n\
Ace can be easily embedded into any existing web page. You can either use one of pre-packaged versions of [ace](https://github.com/ajaxorg/ace-builds/) (just copy one of `src*` subdirectories somewhere into your project), or use requireJS to load contents of [lib/ace](https://github.com/ajaxorg/ace/tree/master/lib/ace) as `ace`\n\
\n\
\n\
The easiest version is simply:\n\
\n\
```html\n\
    <div id=\"editor\">some text</div>\n\
    <script src=\"src/ace.js\" type=\"text/javascript\" charset=\"utf-8\"></script>\n\
    <script>\n\
        var editor = ace.edit(\"editor\");\n\
    </script>\n\
```\n\
\n\
With \"editor\" being the id of the DOM element, which should be converted to an editor. Note that this element must be explicitly sized and positioned `absolute` or `relative` for Ace to work. e.g.\n\
\n\
```css\n\
    #editor {\n\
        position: absolute;\n\
        width: 500px;\n\
        height: 400px;\n\
    }\n\
```\n\
\n\
To change the theme simply include the Theme's JavaScript file\n\
\n\
```html\n\
    <script src=\"src/theme-twilight.js\" type=\"text/javascript\" charset=\"utf-8\"></script>\n\
```\n\
\n\
and configure the editor to use the theme:\n\
\n\
```javascript\n\
    editor.setTheme(\"ace/theme/twilight\");\n\
```\n\
\n\
By default the editor only supports plain text mode; many other languages are available as separate modules. After including the mode's JavaScript file:\n\
\n\
```html\n\
    <script src=\"src/mode-javascript.js\" type=\"text/javascript\" charset=\"utf-8\"></script>\n\
```\n\
\n\
The mode can then be used like this:\n\
\n\
```javascript\n\
    var JavaScriptMode = ace.require(\"ace/mode/javascript\").Mode;\n\
    editor.session.setMode(new JavaScriptMode());\n\
```\n\
\n\
to destroy editor use\n\
\n\
```javascript\n\
    editor.destroy();\n\
    editor.container.remove();\n\
```\n\
\n\
\n\
Documentation\n\
-------------\n\
\n\
Additional usage information, including events to listen to and extending syntax highlighters, can be found [on the main Ace website](http://ace.c9.io).\n\
\n\
You can also find API documentation at [http://ace.c9.io/#nav=api](http://ace.c9.io/#nav=api).\n\
\n\
Also check out the sample code for the kitchen sink [demo app](https://github.com/ajaxorg/ace/blob/master/demo/kitchen-sink/demo.js).\n\
\n\
If you still need help, feel free to drop a mail on the [ace mailing list](http://groups.google.com/group/ace-discuss), or at `irc.freenode.net#ace`.\n\
\n\
Running Ace\n\
-----------\n\
\n\
After the checkout Ace works out of the box. No build step is required. To try it out, simply start the bundled mini HTTP server: \n\
\n\
```bash\n\
    ./static.py\n\
```\n\
\n\
Or using Node.JS\n\
\n\
```bash\n\
    npm install mime\n\
    node ./static.js\n\
```\n\
\n\
The editor can then be opened at http://localhost:8888/kitchen-sink.html. \n\
\n\
To open the editor with a file:/// URL see [the wiki](https://github.com/ajaxorg/ace/wiki/Running-Ace-from-file).\n\
\n\
Building Ace\n\
-----------\n\
\n\
You do not generally need to build ACE. The [ace-builds repository](https://github.com/ajaxorg/ace-builds/) endeavours to maintain the latest build, and you can just copy one of _src*_ subdirectories somewhere into your project.\n\
\n\
However, all you need is Node.js and npm installed to package ACE. Just run `npm install` in the ace folder to install dependencies:\n\
\n\
```bash\n\
    npm install\n\
    node ./Makefile.dryice.js\n\
```\n\
\n\
To package Ace, we use the dryice build tool developed by the Mozilla Skywriter team. Call `node Makefile.dryice.js` on the command-line to start the packing. This build script accepts the following options\n\
\n\
```bash\n\
-m                 minify build files with uglify-js          \n\
-nc                namespace require and define calls with \"ace\"\n\
-bm                builds the bookmarklet version\n\
--target ./path    specify relative path for output folder (default value is \"./build\")\n\
```\n\
\n\
To generate all the files in the ace-builds repository, run `node Makefile.dryice.js full --target ../ace-builds`\n\
\n\
Running the Unit Tests\n\
----------------------\n\
\n\
The Ace unit tests can run on node.js. Assuming you have already done `npm install`, just call:\n\
\n\
```bash\n\
    node lib/ace/test/all.js\n\
```\n\
\n\
You can also run the tests in your browser by serving:\n\
\n\
    http://localhost:8888/lib/ace/test/tests.html\n\
\n\
This makes debugging failing tests way more easier.\n\
\n\
Contributing\n\
-----------------------------\n\
\n\
Ace is a community project and wouldn't be what it is without contributions! We actively encourage and support contributions. The Ace source code is released under the BSD License. This license is very simple, and is friendly to all kinds of projects, whether open source or not. Take charge of your editor and add your favorite language highlighting and keybindings!\n\
\n\
Feel free to fork and improve/enhance Ace any way you want. If you feel that the editor or the Ace community will benefit from your changes, please open a pull request. For more information on our contributing guidelines, see [CONTRIBUTING.md](https://github.com/ajaxorg/ace/blob/master/CONTRIBUTING.md).\n\
\n\
Continuous Integration status\n\
-----------------------------\n\
\n\
This project is tested with [Travis CI](http://travis-ci.org)\n\
[![Build Status](https://secure.travis-ci.org/ajaxorg/ace.png?branch=master)](http://travis-ci.org/ajaxorg/ace)\n\
"
    return {
      text: text
    };
  });