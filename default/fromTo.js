/*
 * Module code goes here. Use 'module.exports' to export things:
 * module.exports.thing = 'a thing';
 *
 * You can import it from another modules like this:
 * var mod = require('To');
 * mod.thing == 'a thing'; // true
 */

var goTo = {
    
    harvestFromSource : function(creep){
        let sources = creep.pos.findClosestByPath(FIND_SOURCES_ACTIVE)
        if(creep.harvest(sources) == ERR_NOT_IN_RANGE) {
            creep.moveTo(sources, {visualizePathStyle: {stroke: '#FFFFFF'}});
        }
    },

    withdrawFromContainer: function(creep){
        let container = creep.room.find(FIND_STRUCTURES,{
            filter:(structure)=>{
                return (structure.structureType == STRUCTURE_CONTAINER && 
                    structure.store.getUsedCapacity()>0)
        }})

        if(container.length>0){
            if(creep.withdraw(container[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                creep.moveTo(container[0]);
            }
            return true;
        }
        return false;
    },

    transferTo: function(creep, targetNames){

        var targetArr = []

        for(let structureName in targetNames){
            targetArr.concat( creep.room.find(FIND_STRUCTURES, {
                filter: (structure) => {
                    return (structure.structureType == structureName) &&
                        structure.store.getFreeCapacity(RESOURCE_ENERGY) > 0;
                }
            }))
        }
        if(targetArr.length > 0) {
            if(creep.transfer(targets[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                creep.moveTo(targets[0], {visualizePathStyle: {stroke: '#FF0040'}});
            }
        }
    }
    
}

module.exports = goTo;