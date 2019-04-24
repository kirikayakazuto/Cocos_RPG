# COCOS CREATOR + TileMap 自动寻路


1. 使用TileMap制作地图, 
2. 将地图导入cocos creator中, 
3. 利用本插件制作障碍物地图, 
4. 在使用A星算法寻找路径, 自动寻路

** 在这里我们着重讲如何使用本插件制作障碍物地图 **

### 利用本插件制作障碍物

1. 下载本项目, 在根目录下找到packages目录
2. 双击进入 -> 找到 gen_navmesh 文件夹 将其复制并放到你的项目中对应packages文件夹
3. 打开cocos creator中你的项目 或者 本实例项目
4. 将tileMap结点拖入到层级管理器, 对应本项目的demo1结点
5. 将dome1结点的轴心改为坐下角 并使地图居中, 实例中结点position为(-480, -320)
6. 新建分组 NAV_MAP 和 MAP_OBSTACLE
7. 将demo1结点(上面挂着cc.TileMap组件)的分组修改为 NAV_MAP 
8. 将demo1结点的子节点中, 属于障碍物的结点分组修改为 MAP_OBSTACLE
9. 找到菜单栏中, 扩展 gen_navmesh -> gen 点击
10. 在资源管理器中出现maps文件夹, 部分版本不会自动刷新, 请重启
11. 将nap_map脚本挂在 demo1上, nav_agent挂在player结点上, 并将demo1结点拖到player上,(目的是让player知道在那个map上寻路), player结点以左下角为轴心
12. 监听触摸事件, 调用player的nav_agent的nav_to_map方法(参数是目标位置的世界坐标), 完成


### 关于插件的一些功能问题
1. 本项目中 地图块的大小是32 X 32
2. 本项目在1.10.2中编写使用, 2.x会出现兼容问题, 在ts版本中我会兼容2.x
2. 在player移动过程中, 更改目标位置, 会出现斜着走的问题
3. 本项目为js版本, 我会继续推出ts版本










