import * as PIXI from 'pixi.js';

export function startGame(resourceUrls, launch) {
  const app = new PIXI.Application({
    // transparent: true,
    antialias: true,
    // resolution: 0.5,
    autoResize: true,
  });
  app.renderer.view.style.position = 'absolute';
  app.renderer.view.style.display = 'block';
  document.body.appendChild(app.view);
  app.ticker.add(() => {
    if (app.preWitdh !== window.innerWidth || app.preHeight !== window.innerHeight) {
      app.preWitdh = window.innerWidth;
      app.preHeight = window.innerHeight;
      app.renderer.resize(window.innerWidth, window.innerHeight);
    }
  });
  PIXI.loader
    .add(resourceUrls)
    .load((loader, resources) => launch(app, resources));
}