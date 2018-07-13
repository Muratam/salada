import {
  autoDetectRenderer,
  Container,
  loader,
  Sprite,
  // Application
} from 'pixi.js';
let renderer = autoDetectRenderer(256, 256, {
  antialias: true,
  transparent: true,
  resolution: 1,
  autoResize: true
});
document.body.appendChild(renderer.view);
// renderer.view.style.position = 'absolute';
// renderer.view.style.display = 'block';
// renderer.resize(window.innderWidth, window.innerHeight);
let scene = new Container();
let vegetables = [
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
let getTexture = (key) => loader.resources[key].texture;
let getSprite = (key) => new Sprite(getTexture(key))

function setup() {
  let cat = getSprite(vegetables[0][1]);
  scene.addChild(cat);
  renderer.render(scene);
}
loader
  .add(vegetables.map((x) => x[1]))
  .load(setup);