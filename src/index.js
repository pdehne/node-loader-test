import nodeloadertest from '../build/Release/nodeloadertest.node';

const main = new nodeloadertest.NodeLoaderTestMain();

document.addEventListener('DOMContentLoaded', function () {
    console.log(main.echo("Hello World from Node.js"));
});
