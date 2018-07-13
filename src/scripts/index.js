import * as PIXI from 'pixi.js';
import {
  vegetables
} from './vegetable';
import {
  startGame
} from './game';
// https://github.com/kittykatattack/learningPixi
// .x .y .width .height .position.set(x,y) .scale.x .scale.set()
// .rotation(radian) .anchor.x .pivot.x .visible
// ticker: delta =>
// new PIXI.Container().addChild
// ParticleContainer
// rectangle , circle... , Text, TextStyle
// helper libraries
let backgroundImage = "aozora.png";
let dishImage = "osara.png";
let resourceUrls = vegetables.map(x => x[1]).concat([backgroundImage, dishImage]);
let getTexture = key => PIXI.loader.resources['/static/images/' + key].texture;
let getSprite = key => new PIXI.Sprite(getTexture(key));

function setBackGround(app) {
  let background1 = getSprite(backgroundImage);
  background1.width = app.width;
  background1.height = app.height;
  background1.x = 0;
  let background2 = getSprite(backgroundImage);
  background2.width = app.width;
  background2.height = app.height;
  background2.x = -app.width;
  app.stage.addChild(background1);
  app.stage.addChild(background2);
  app.ticker.add(() => {
    background1.x += 1;
    background2.x += 1;
    if (background1.x >= app.width - 10) background1.x = background2.x - app.width;
    if (background2.x >= app.width - 10) background2.x = background1.x - app.width;
  });
}

function setDish(app) {
  let dish = getSprite(dishImage);
  dish.x = -240;
  dish.y = -120;
  dish.height = app.height * 1.4;
  dish.width = app.height * 1.2;
  app.stage.addChild(dish);
}
startGame(resourceUrls, app => {
  setBackGround(app);
  setDish(app);
  for (let i = 0; i < vegetables.length * 10; i++) {
    let vege = getSprite(vegetables[i % vegetables.length][1]);
    vege.width = 64;
    vege.height = 64;
    vege.x = 64 * (i % 10);
    vege.y = 64 * Math.floor(i / 10);
    app.stage.addChild(vege);
    app.ticker.add(() => {
      let g = Math.floor(vegetables.length * Math.random());
      vege.texture = getTexture(vegetables[g][1]);
      vege.x += 10 * (Math.random() - 0.5);
      vege.y += 10 * (Math.random() - 0.5);
    });
  }
});