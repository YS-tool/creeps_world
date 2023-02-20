let roleHarvester = require('role.harvester');
let roleUpgrader = require('role.upgrader');
let roleBuilder = require('role.builder');
let spawnNew = require('spawnNew')
let gc = require('GC')
let showLog = require('displayStatus')
let tower = require('tower')

var creepStatus = showLog.run()

let count = 0;
let tick = 0;

for(let name in Game.creeps) {
    let index = name.split("-")[1];
    index = parseInt(index)
    if(index>count){
        count = index
    }
}
count = count+1

module.exports.loop = function () {
    // respone new creep section
    if(tick>1){
        for(const key in Game.spawns){
            // console.log(key)
            const spawn = Game.spawns[key];
            if(!spawn.room.controller || !spawn.room.controller.my){
                continue;
            }
            if(Object.keys(Memory.creeps).length<=100 && spawnNew.run(spawn, count,creepStatus)==0){
                count++;
                tick = 0;
                gc.removeDeadCreep()
            }
        }
    }

    // tower behavior

    for(let name in Game.structures){
        if(Game.structures[name].structureType==STRUCTURE_TOWER){
            tower.run(Game.structures[name])
        }
    }


    // main section
    for(let name in Game.creeps) {
        let creep = Game.creeps[name];
        if(creep.memory.role == 'harvester') {
            roleHarvester.run(creep, creepStatus[0]);
        }
        if(creep.memory.role == 'upgrader') {
            // creep.memory.role = 'harvester'
            roleUpgrader.run(creep);
        }
        if(creep.memory.role == 'builder') {
            // creep.memory.role = 'upgrader'
            roleBuilder.run(creep);
        }
    }

    tick++;
    
}