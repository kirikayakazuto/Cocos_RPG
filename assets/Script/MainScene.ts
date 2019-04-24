
const {ccclass, property} = cc._decorator;

@ccclass
export default class MainScene extends cc.Component {

    @property(cc.Node)
    player: cc.Node = null;

    onLoad () {
        this.node.on(cc.Node.EventType.TOUCH_START, this.playerMove, this)
    }

    playerMove(e: cc.Event.EventTouch) {
        let pos = e.getLocation();
        this.player.getComponent("nav_agent").nav_to_map(pos);
    }

    start () {

    }

    // update (dt) {}
}
