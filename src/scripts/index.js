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
const R = 600;
let vegetableStore = {
  maxIndex: 0,
};

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

function setDashBoard(app) {
  for (let i = 0; i < vegetables.length; i++) {
    let message = new PIXI.Text(vegetables[i][0] + " x " + 0);
    message.x = R + 100;
    message.y = 24 * i;
    message.height = 24;
    app.stage.addChild(message);
    app.ticker.add(() => {
      message.text = vegetables[i][0] + " x " + (vegetableStore[i] || 0);
    });
  }
}

function registVegetable(i, app) {
  let index = i % vegetables.length;
  vegetableStore[index] = vegetableStore[index] ? vegetableStore[index] + 1 : 1;
  let vege = getSprite(vegetables[index][1]);
  const size = 64;
  const B = app.height + size / 2;
  vege.x = R * Math.random() - size / 2;
  vege.y = B * Math.random() - size / 2;
  vege.i = i;
  vege.t = 0;
  vege.width = size;
  vege.height = size;
  app.stage.addChild(vege);
  app.ticker.add(() => {
    vege.t += 1;
    if (vege.t % 10 === 0) {
      vege.width = size + 5 * (Math.random() - 0.5);
      vege.height = size + 5 * (Math.random() - 0.5);
    }
    if (vegetableStore.maxIndex > vege.i + 1000) app.stage.removeChild(vege);
  });
}

startGame(resourceUrls, app => {
  setBackGround(app);
  setDish(app);
  setDashBoard(app);
  let t = 0;
  app.ticker.add(() => {
    t += 1;
    if (t % 1 == 0) {
      registVegetable(vegetableStore.maxIndex, app);
      vegetableStore.maxIndex += 1;
    }
  })
});