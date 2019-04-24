/****************************************************************************
Copyright (c) 2016-2017 zilongshanren

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
****************************************************************************/

'use strict';
const Fs = require('fire-fs');
const Path = require('fire-path');
const Async = require('async');
const Del = require('del');

let sharpPath;
if (Editor.dev) {
  sharpPath = 'sharp';
} else {
  sharpPath = Editor.url('unpack://utils/sharp');
}
const Sharp = require(sharpPath);

const dontSelectCorrectAssetMsg = {
  type: 'warning',
  buttons: ['OK'],
  titile: 'Unpack Texture Packer Atlas',
  message: 'Please select a Texture Packer asset at first!',
  defaultId: 0,
  noLink: true
};

module.exports = {
  load () {
    // execute when package loaded
  },

  unload () {
    // execute when package unloaded
  },

  // register your ipc messages here
  messages: {
    'gen' () {
      Editor.Metrics.trackEvent({
        category: 'Packages',
        label: 'gen_nevmesh',
        action: 'Open By Menu'
      }, null);
      
      Editor.Scene.callSceneScript('gen_navmesh', 'gen_nevmesh', function (err, map) {
          Editor.log("Gen nav map data...");
          var path = Path.join(Editor.projectPath, 'assets', "maps");
          
          Fs.mkdirsSync(path);
          var json_data = JSON.stringify(map);
          json_data = "var " + "game_map_" + map.name + "=" + json_data + ";";
          json_data = json_data + "\n" + "module.exports = " + "game_map_" + map.name;

          Fs.writeFileSync(Path.join(path, "game_map_" + map.name + ".js"), json_data);
          Editor.log("Gen nav map Success !!!!!!!");

      });
      
    },
  },
};
