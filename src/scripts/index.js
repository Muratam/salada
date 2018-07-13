import * as PIXI from 'pixi.js';
import {
  vegetables
} from './vegetable';
import {
  startGame
} from './game';

let resourceUrls = vegetables.map(x => x[1]);
startGame(resourceUrls, (app, resources) => {
  let getSprite = (key) => new PIXI.Sprite(resources[key].texture);
  let cat = getSprite(vegetables[0][1]);
  app.stage.addChild(cat);
  app.ticker.add(() => {
    cat.rotation += 0.01;
  });
});