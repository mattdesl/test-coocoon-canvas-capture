# test-coocoon-canvas-capture

[![experimental](http://badges.github.io/stability-badges/dist/experimental.svg)](http://github.com/badges/stability-badges)

Testing a bug in CocoonJS with toDataURL. Steps to reproduce:

```sh
git clone https://github.com/mattdesl/test-coocoon-canvas-capture.git
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


Expected output (Webview+)
![screen](http://i.imgur.com/hwPRe4N.png)

Actual output (Canvas+)
![screen2](http://i.imgur.com/Vx6T3Y7.png)

## License

MIT, see [LICENSE.md](http://github.com/mattdesl/test-coocoon-canvas-capture/blob/master/LICENSE.md) for details.
