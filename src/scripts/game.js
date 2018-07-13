import * as PIXI from 'pixi.js';

export function keyboard(keyCode) {
  let key = {};
  key.code = keyCode;
  key.isDown = false;
  key.isUp = true;
  key.press = undefined;
  key.release = undefined;
  //The `downHandler`
  key.downHandler = event => {
    if (event.keyCode === key.code) {
      if (key.isUp && key.press) key.press();
      key.isDown = true;
      key.isUp = false;
    }
    event.preventDefault();
  };

  //The `upHandler`
  key.upHandler = event => {
    if (event.keyCode === key.code) {
      if (key.isDown && key.release) key.release();
      key.isDown = false;
      key.isUp = true;
    }
    event.preventDefault();
  };

  //Attach event listeners
  window.addEventListener(
    "keydown", key.downHandler.bind(key), false
  );
  window.addEventListener(
    "keyup", key.upHandler.bind(key), false
  );
  return key;
}

export function startGame(resourceUrls, launch) {
  const app = new PIXI.Application({
    transparent: true,
    // antialias: true,
    // resolution: 0.5,
    // autoResize: true,
  });
  app.width = 1024;
  app.height = 720;
  app.renderer.resize(app.width, app.height);
  app.renderer.view.style.display = 'block';
  app.renderer.view.style.position = 'absolute';
  // app.renderer.view.style.left = '50%';
  // app.renderer.view.style.top = '50%';
  document.body.appendChild(app.view);
  app.view
  PIXI.loader
    .add(resourceUrls.map(x => '/static/images/' + x))
    // .on("progress", () => { })
    .load(() => {
      launch(app);
    });
}