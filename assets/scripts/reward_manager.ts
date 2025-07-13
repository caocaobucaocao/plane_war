import { _decorator, Component, instantiate, macro, Node, Prefab, repeat } from 'cc';
const { ccclass, property } = _decorator;
import { math } from 'cc';
import { Logger } from './util/log';
import { reward } from './reward';
@ccclass('reward_manager')

export class reward_manager extends Component {

    @property
    reward_1_spawn_rate: number = 5
    @property(Prefab)
    reward_1_prefab: Prefab = null;
    @property
    reward_2_spawn_rate: number = 10
    @property(Prefab)
    reward_2_prefab: Prefab = null;
    start() {
        Logger.info("奖励生成中")
        this.schedule(this.reward_1__spawn, this.reward_1_spawn_rate)
        this.schedule(this.reward_2_spawn, this.reward_2_spawn_rate)
    }

    update(deltaTime: number) {

    }

    reward_1__spawn() {
        const enm = instantiate(this.reward_1_prefab)
        this.node.addChild(enm)
        const x = math.randomRangeInt(-240, 240)
        enm.setPosition(x, 0, 0)
        Logger.info("奖励1生成中", enm.getPosition())
    }
    reward_2_spawn() {
        const enm = instantiate(this.reward_2_prefab)
        this.node.addChild(enm)
        const x = math.randomRangeInt(-191, 187)
        enm.setPosition(x, 0, 0)
        Logger.info("奖励2生成中", enm.getPosition())
    }
    protected onDestroy(): void {
        Logger.info("reward_manager_onDestroy")
        this.schedule(this.reward_1__spawn)
        this.schedule(this.reward_2_spawn)
    }
}


