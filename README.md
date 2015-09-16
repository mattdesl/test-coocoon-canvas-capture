# test-coocoon-canvas-capture

[![experimental](http://badges.github.io/stability-badges/dist/experimental.svg)](http://github.com/badges/stability-badges)

Testing a bug with predictive keyboard.

```sh
git clone -b keyboard https://github.com/mattdesl/test-coocoon-canvas-capture.git
cd test-cocoon-canvas-capture

npm install
```

To get a ZIP for testing through the CocoonJS launcher:

```sh
npm run build
```

Will save a `test-capture.zip` file.

To test locally in the browser:

```sh
npm run start
```

And then open `localhost:9966` -- file changes to `index.js` will trigger a live reload event.


On Android devices with Preditive Keyboard enabled, typing in text will start to "double up."

1. Open ZIP in CocoonJS Launcher with Canvas+
2. Tap on screen to open keyboard
3. Type in "C", "A", "T"
4. Close keyboard ("Done" key)
5. Check console, result is below:

```
user entered: ccacat
ccacat
cca
c
user starts editing
```

This seems to be because `insertText` is giving the predictive characters, instead of the character last pressed on the user's keyboard. Expected result:

```
user entered: cat
t
a
c
user starts editing
```

On HTC One, no keyboard appears at all in Canvas+.

## License

MIT, see [LICENSE.md](http://github.com/mattdesl/test-coocoon-canvas-capture/blob/master/LICENSE.md) for details.
