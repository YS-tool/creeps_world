/*
 * Module code goes here. Use 'module.exports' to export things:
 * module.exports.thing = 'a thing';
 *
 * You can import it from another modules like this:
 * var mod = require('role.towerMaintain');
 * mod.thing == 'a thing'; // true
 */
let fromTo = require('helper.fromTo');
var maintainTower = {
    run : function(creep, tower){

        if(creep.memory.towerMaintain && creep.store[RESOURCE_ENERGY] == 0) {
            creep.memory.towerMaintain = false;
            creep.say('🔄 harvest');
        }
        if(!creep.memory.towerMaintain && creep.store.getFreeCapacity() == 0) {
            creep.memory.towerMaintain = true;
            creep.say('🚧 build');
        }

        if(creep.memory.towerMaintain) {
            if(creep.transfer(tower, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                creep.moveTo(tower, {visualizePathStyle: {stroke: '#FF0040'}});
            }
        } else {
            if(!fromTo.withdrawFromContainer(creep)){
                fromTo.harvestFromSource(creep)
            }
        }
        
    }
}


module.exports = maintainTower