var astar = require("astar");

cc.Class({
    extends: cc.Component,

    properties: {
        
        is_debug: true,
    },

    // use this for initialization
    onLoad: function () {
        this.draw_node = new cc.DrawNode();
        this.node.parent.getChildByName("debug")._sgNode.addChild(this.draw_node);
    },

    map_degbu_draw: function() {
        var x_line = 0;
        var ypos = 0;
        

        for(var i = 0; i < this.map.height; i ++) {
            var xpos = x_line;
            for(var j = 0; j < this.map.width; j ++) {
                if (this.map.data[i * this.map.width + j] === 0) {
                    this.draw_node.drawSegment(cc.p(xpos, ypos), 
                                          cc.p(xpos + 1, ypos + 1),
                                          1, cc.color(0, 255, 0, 255))
                }
                else {
                    this.draw_node.drawSegment(cc.p(xpos, ypos), 
                                          cc.p(xpos + 1, ypos + 1),
                                          1, cc.color(0, 0, 255, 255));
                }   
                xpos += this.map.item_size;
            }
            ypos += this.map.item_size;
        }
    },

    start: function() {
        this.map = require("game_map_" + this.node.name);
        if(this.is_debug) {
            this.map_degbu_draw();
        }


    },

    astar_search: function(src_w, dst_w) {
        var src = this.node.convertToNodeSpaceAR(src_w);
        var dst = this.node.convertToNodeSpaceAR(dst_w);

        var src_mx = Math.floor((Math.round(src.x)) / this.map.item_size);
        var src_my = Math.floor((Math.round(src.y)) / this.map.item_size);

        var dst_mx = Math.floor((Math.round(dst.x)) / this.map.item_size);
        var dst_my = Math.floor((Math.round(dst.y)) / this.map.item_size);
        
        var path = astar.search(this.map, src_mx, src_my, dst_mx, dst_my);
        
        var world_offset = this.node.convertToWorldSpaceAR(cc.p(0, 0));
        var path_pos = [];
        // console.log(path_pos);

        for(var i = 0; i < path.length; i ++) {
            var x = path[i].x * this.map.item_size;
            var y = path[i].y * this.map.item_size;

            var pos = cc.p(world_offset.x + x, world_offset.y + y);
            path_pos.push(pos);
        }

        return path_pos;
    },
    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
});
