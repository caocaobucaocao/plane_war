import { _decorator, Component, Node } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('bullet')
export class bullet extends Component {
    @property
    speed:number=200
    start() {

    }

    update(deltaTime: number) {
        const pos=this.node.position
        console.log(`p0s=${pos}`)
        console.log(`node p0s=${this.node.position}`)
        this.node.setPosition(this.node.x,this.node.y+this.speed*deltaTime,this.node.z)
        if(pos.y>780){
            this.node.destroy()
        }
    }
}