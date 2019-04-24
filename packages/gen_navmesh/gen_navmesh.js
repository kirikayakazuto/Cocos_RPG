const Fs = require('fire-fs');

var item_size = 32;
var gen_tools = {
	
	find_map: function(root) {
		if (root.active === false) {
			return null;
		}

		if(root.group === "NAV_MAP" && root.getComponent(cc.TiledMap)) {
			return root;
		}

		for(var i = 0; i < root.children.length; i ++) {
			var node = this.find_map(root.children[i]);
			if (node) {
				return node;
			}
		}

		return null;
	},
	
	

	gen_obstacle_data: function(map_root, item, map) {
		// 找到了要设置为障碍物的结点
		if(item.group !== "MAP_OBSTACLE") {
			return;
		}
		
		var layerCom = item.getComponent(cc.TiledLayer);
		if(!layerCom) return ;
		// 该结点中的tile为障碍物
		// 遍历整张地图的格子, 判断其是否为障碍物, 如果是障碍物, 取其左下角点为障碍物点
		for(var i=0; i<map.height; i++) {
			for(var j=0; j<map.width; j++) {
				var flag = layerCom.getTileGIDAt(cc.v2(j, i));
				if(flag) {		// 表示是障碍物
					map.data[(map.height-1 -i) * map.width + j] = 1;
				}
			}
		}
		
		
	},

	gen_map_data: function(map_root) {
		var map_width = Math.floor((map_root.width + item_size - 1) / item_size);
		var map_height = Math.floor((map_root.height + item_size - 1) / item_size);
		

		var map_data = [];
		for(var i = 0; i < map_height; i ++) {
			for(var j = 0; j < map_width; j ++) {
				map_data.push(0);
			}
		}
		
		var map = {};
		map.name = map_root.name;
		map.data = map_data;
		map.width = map_width;
		map.height = map_height;
		map.item_size = item_size;

		for(var i = 0; i < map_root.children.length; i ++) {
			this.gen_obstacle_data(map_root, map_root.children[i], map);
		}
		return map;
	},

    'gen_nevmesh': function (event) {
        /*;
        Editor.log('children length : ' + canvas.children.length);
        var pos = canvas.convertToWorldSpaceAR(cc.p(0, 0));
        Editor.log(pos);
		*/
		var canvas = cc.find('Canvas')

        var map = gen_tools.find_map(canvas);
		cc.log(map.name);

        var game_map = null;
        if(map) {
        	game_map = gen_tools.gen_map_data(map);
        }

        if (event.reply) {
            event.reply("OK", game_map);
        }
    },
};

module.exports = gen_tools;