import { _decorator, Component, instantiate, Node, Prefab } from 'cc';
const { ccclass, property } = _decorator;
import { math } from 'cc';
@ccclass('enemy_manager')
export class enemy_manager extends Component {

    @property
    enemy_0_spawn_rate:number=1
    @property(Prefab)
    enemy_0_prefab:Prefab=null;

    
    @property
    enemy_1_spawn_rate:number=3
    @property(Prefab)
    enemy_1_prefab:Prefab=null;

    @property
    enemy_2_spawn_rate:number=10
    @property(Prefab)
    enemy_2_prefab:Prefab=null
  
    start() {

        this.schedule(this.enemy_0_spawn,this.enemy_0_spawn_rate)
        this.schedule(this.enemy_1_spawn,this.enemy_1_spawn_rate)
        this.schedule(this.enemy_2_spawn,this.enemy_2_spawn_rate)


    }

    update(deltaTime: number) {
        
    }

    enemy_0_spawn(){
        const enm=instantiate(this.enemy_0_prefab)
        this.node.addChild(enm)
        const x=math.randomRangeInt(-240,240)
        enm.setPosition(x,0,0)
    }
    protected onDestroy(): void {
        this.schedule(this.enemy_0_spawn)
        this.schedule(this.enemy_1_spawn)
        this.schedule(this.enemy_2_spawn)
    }
    enemy_1_spawn(){
        const enm=instantiate(this.enemy_1_prefab)
        this.node.addChild(enm)
        const x=math.randomRangeInt(-191,187)
        enm.setPosition(x,0,0)
    }
    enemy_2_spawn(){
        const enm=instantiate(this.enemy_2_prefab)
        this.node.addChild(enm)
        const x=math.randomRangeInt(-165,158)
        enm.setPosition(x,0,0)
    }
}


