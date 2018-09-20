# palazzo alfeo official website

Official repository for palazzo alfeo website

## Prerequisites

- Nodejs
- npm
- browser-sync (optional)

## Building

From root folder run

    $ npm install

If everything goes fine you should simply not see any error messages.

## Running

In the `package.json` some script for quick starting are provided.
To start the webserver simply run the following command from the project root folder:

    $ npm run start

You should get somthing like this:

    > palazzoalfeo@1.0.0 start [path]/palazzo alfeo
    > node ./index.js
     
    Server ready 5000

Now you can go to http://localhost:5000 with your favorite browser to see the website being served.


Or if you want to attach a b-sync instance for live reloading:

    $ npm run b-sync

Indeed, you can look into the file `output.txt` for the parsed input.

If you were to feed a bad program to the parser the makefile recipe will fail and you can look into `output.txt` to have more info about where the parser got stuck.

## Project Structure

The website uses `ejs` engine to preprocess the html page before serving it. Especially it is used to make the website conviniently multi-language. Under path `/locales` you can find the files with the different languange text. The text pieces are simple variables which will be substituted by the preprocessor.

`/html/one-pages/palazzoalfeo` contains the index.ejs and the assets folder.

