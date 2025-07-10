import { _decorator, Animation, Component, Node } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('enemy')
export class enemy_0 extends Component {
    @property
    speed:number=10;
    @property(Animation)
    down_anima:Animation
    start() {
        //  this.down_anima.play()
    }

    update(deltaTime: number) { 
        const p=this.node.getPosition()
        this.node.setPosition(p.x,p.y-deltaTime*this.speed,p.z)
    }
}


