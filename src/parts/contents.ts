import { MyDisplay } from "../core/myDisplay";
import { Tween } from "../core/tween";
import { Util } from "../libs/util";
import { Segment } from "./segment";
import { Vector2 } from "three/src/math/Vector2";

// -----------------------------------------
//
// -----------------------------------------
export class Contents extends MyDisplay {

  private _id:number;
  private _segment:Array<Segment> = [];

  private _pointData:Array<Vector2>;
  private _nowPointId:number = 0;

  constructor(opt:any) {
    super(opt)

    this._id = opt.id;
    this._pointData = opt.data;
    this._nowPointId = ~~(this._id * (this._pointData.length / 3));

    // あらかじめ一定数作っておく
    this._makeSegment();

    this._resize();
  }


  private _makeSegment(): void {
    const num = 30;
    for(let i = 0; i < num; i++) {
      const el = document.createElement('div')
      el.classList.add('item')
      this.getEl().append(el);
      const item = new Segment({
        el:el,
        id:this._segment.length,
        conId:this._id,
      })
      this._segment.push(item);

      // 最初は非表示
      Tween.instance.set(item.getEl(), {
        opacity:0.00001
      })
    }
  }




  // 描画するラインをひとつ進める
  private _updateLinePos(): void {

    // 次の
    let nextId = this._nowPointId + 1;
    // if(nextId >= this._pointData.length) {
    //   nextId = 0;
    // }
    const nextData = this._pointData[nextId % (this._pointData.length - 1)];

    // 今の
    const nowData = this._pointData[this._nowPointId % (this._pointData.length - 1)];

    const segKey = this._nowPointId % (this._segment.length - 1);
    const seg = this._segment[segKey];
    seg.isActive = true;
    seg.setPos(nowData.x, nowData.y);

    // 傾き計算
    const dx = nextData.x - nowData.x;
    const dy = nextData.y - nowData.y;

    const radian = Math.atan2(dy, dx);
    seg.setRot(Util.instance.degree(radian));

    // 反映
    Tween.instance.set(seg.getEl(), {
      opacity:1,
      x:nowData.x,
      y:nowData.y,
      rotationZ:seg.getRot()
    });

    this._nowPointId++;
    // if(this._nowPointId >= this._pointData.length) {
    //   // this._isStart = false;
    //   this._nowPointId = 0;
    // }
  }


  protected _update(): void {
    super._update();

    for(let i = 0; i < 1; i++) {
      this._updateLinePos();
    }
  }
}