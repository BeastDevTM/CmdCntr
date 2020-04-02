require('./animations.js');
const cmds = require('../cmds.js');
const { globalShortcut } = require('electron');

//setApp(1, "name", "path")

function enterCmd(ele) {
  if(event.key === 'Enter') {
    let cmd = ele.value.split("(")[0];
    let args = ele.value.slice(cmd.length).split("(")[1].split(")")[0].split(",");

    for(let c in cmdList) {
      if(cmd == cmdList[c].name) {
        console.log(cmdList[c]);
        console.log(args);
      }
    }
    ele.value = "";
  }
}