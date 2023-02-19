let roleHarvester = require('role.harvester');
let roleUpgrader = require('role.upgrader');
let roleBuilder = require('role.builder');
let spawnNew = require('spawnNew')
let gc = require('GC')
let showLog = require('displayStatus')

showLog.run()

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
    // if(tick%100==0){
        for(const key in Game.spawns){
            // console.log(key)
            const spawn = Game.spawns[key];
            if(!spawn.room.controller || !spawn.room.controller.my){
                continue;
            }
            if(spawnNew.run(spawn, count)==0){
                count++;
                tick = 0;
            }
        }
    // }


    // main section
    for(let name in Game.creeps) {
        let creep = Game.creeps[name];
        if(creep.memory.role == 'harvester') {
            roleHarvester.run(creep);
        }
        if(creep.memory.role == 'upgrader') {
            // creep.memory.role = 'harvester'
            roleUpgrader.run(creep);
        }
        if(creep.memory.role == 'builder') {
            // creep.memory.role = 'harvester'
            roleBuilder.run(creep);
        }
    }
    
    if(tick%1000 == 0 ){
        gc.removeDeadCreep()
    }
    tick++;
    
}