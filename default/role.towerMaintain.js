/*
 * Module code goes here. Use 'module.exports' to export things:
 * module.exports.thing = 'a thing';
 *
 * You can import it from another modules like this:
 * var mod = require('role.towerMaintain');
 * mod.thing == 'a thing'; // true
 */

var maintainTower = {
    run : function(creep, tower){

        if(creep.memory.building && creep.store[RESOURCE_ENERGY] == 0) {
            creep.memory.towerMaintain = false;
            creep.say('🔄 harvest');
        }
        if(!creep.memory.building && creep.store.getFreeCapacity() == 0) {
            creep.memory.towerMaintain = true;
            creep.say('🚧 build');
        }

        if(creep.memory.towerMaintain) {
            if(creep.transfer(tower) == ERR_NOT_IN_RANGE) {
                creep.moveTo(tower, {visualizePathStyle: {stroke: '#FF0040'}});
            }
        } else {
            // if(fromTo.withdrawFromContainer(creep)){
            //-------------------------------------------------
            let container = creep.room.find(FIND_STRUCTURES,{
                filter:(structure)=>{
                    return (structure.structureType == STRUCTURE_CONTAINER && 
                        structure.store.getUsedCapacity()>0)
                }})
            if(container.length>0){
                if(creep.withdraw(container[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(container[0]);
                }
            // ------------------------------------------------
            }else {
                // fromTo.harvestFromSource(creep)
                let sources = creep.pos.findClosestByPath(FIND_SOURCES_ACTIVE)
                if(creep.harvest(sources) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(sources, {visualizePathStyle: {stroke: '#FFFFFF'}});
                }
            }
        }
        
    }
}


module.exports = maintainTower