import './style.css'
import { Contents } from './parts/contents';
import { OutlineData } from './parts/outlineData';
import { Vector2 } from "three/src/math/Vector2";

const pointData:Array<Vector2> = [];

const data = new OutlineData();
const src = './assets/9.svg';

data.load(src, pointData, () => {
  for(let i = 0; i < 3; i++) {
    new Contents({
      data:pointData,
      el:document.querySelector('.l-main'),
      id:i,
    })
  }
})



