# test-coocoon-canvas-capture

[![experimental](http://badges.github.io/stability-badges/dist/experimental.svg)](http://github.com/badges/stability-badges)

```sh
git clone -b equirect https://github.com/mattdesl/test-coocoon-canvas-capture.git
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

Run with CocoonJS to see the memory log; only 1 WebGL texture and 2 canvases total should be created, instead one is created for each new tile.

## License

MIT, see [LICENSE.md](http://github.com/mattdesl/test-coocoon-canvas-capture/blob/master/LICENSE.md) for details.
