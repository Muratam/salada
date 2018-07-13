import * as PIXI from 'pixi.js';
const app = new PIXI.Application({
  // width:window.innderWidth
  transparent: true,
  antialias: true,
  // resolution: 0.5,
  autoResize: true,
});
// renderer.view.style.position = 'absolute';
// renderer.view.style.display = 'block';
// renderer.resize(window.innderWidth, window.innerHeight);
document.body.appendChild(app.view);
const vegetables = [
  ['白菜', 'hakusai.png'],
  ['ほうれん草', 'hourensou.png'],
  ['じゃがいも', 'jagaimo.png'],
  ['ケール', 'kale.png'],
  ['金時草', 'kinjisou.png'],
  ['小松菜', 'komatsuna.png'],
  ['空芯菜', 'kuusinsai.png'],
  ['モロヘイヤ', 'moroheiya.png'],
  ['ナス', 'nasu.png'],
  ['ネギ', 'negi.png'],
  ['人参', 'ninjin.png'],
  ['ピーマン', 'piman.png'],
  ['ロマネスコ', 'romanesco.png'],
  ['ルッコラ', 'rucola.png'],
  ['春菊', 'syungiku.png'],
  ['玉ねぎ', 'tamanegi.png'],
  ['てんさい', 'tensai.png'],
  ['トマト', 'tomato.png'],
].map((x) => [x[0], '/static/images/' + x[1]]);

function launch(loader, resources) {
  let getSprite = (key) => new PIXI.Sprite(resources[key].texture);
  let cat = getSprite(vegetables[0][1]);
  app.stage.addChild(cat);
  app.ticker.add(() => {
    cat.rotation += 0.01;
  });
}
PIXI.loader
  .add(vegetables.map((x) => x[1]))
  .load(launch);