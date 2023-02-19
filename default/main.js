var roleHarvester = require('role.harvester');
var roleUpgrader = require('role.upgrader');
var roleBuilder = require('role.builder');
var spawnNew = require('spawnNew')
var gc = require('GC')

var count = 0;
var tick = 0;

for(var name in Game.creeps) {
    var index = name.split("-")[1];
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
    for(var name in Game.creeps) {
        var creep = Game.creeps[name];
        if(creep.memory.role == 'harvester') {
            roleHarvester.run(creep);
        }
        if(creep.memory.role == 'upgrader') {
            roleUpgrader.run(creep);
        }
        if(creep.memory.role == 'builder') {
            roleBuilder.run(creep);
        }
    }
    
    if(tick%1000 == 0 ){
        gc.removeDeadCreep()
    }
    tick++;
    
}