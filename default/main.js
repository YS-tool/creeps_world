let roleHarvester = require('role.harvester');
let roleUpgrader = require('role.upgrader');
let roleBuilder = require('role.builder');
let spawnNew = require('spawnNew')
let gc = require('GC')
let showLog = require('displayStatus')
let tower = require('tower')

var creepStatus = showLog.run()

let tick = 0;

// Memory.creepIndex = 0

module.exports.loop = function () {
    // respone new creep section
    if(tick>100){
        for(const key in Game.spawns){
            const spawn = Game.spawns[key];
            if(!spawn.room.controller || !spawn.room.controller.my){
                continue;
            }
            if(spawnNew.run(spawn, Memory.creepIndex,creepStatus)==0){
                Memory.creepIndex = Memory.creepIndex+1
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