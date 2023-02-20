/*
 * Module code goes here. Use 'module.exports' to export things:
 * module.exports.thing = 'a thing';
 *
 * You can import it from another modules like this:
 * let mod = require('role.harvester');
 * mod.thing == 'a thing'; // true
 */

let fromTo = require('fromTo')

let roleHarvester = {

    /** @param {Creep} creep **/
    run: function(creep, howManyHarvester) {

        // state switch
        if(!creep.memory.harvesting && creep.store[RESOURCE_ENERGY] == 0) {
            creep.memory.harvesting = true;
            creep.say('🔄 harvest');
	    }
        if(creep.memory.harvesting && creep.store.getFreeCapacity() == 0) {
	        creep.memory.harvesting = false;
	        creep.say('transfer');
	    }
        
        // find source transfer to spawn, extension, container
        // when harvesting < 5, spawn and extension only
        // find closest target
        if(creep.memory.harvesting) {

            // fromTo.harvestFromSource(creep)

            let sources = creep.pos.findClosestByPath(FIND_SOURCES_ACTIVE)
            if(creep.harvest(sources) == ERR_NOT_IN_RANGE) {
                creep.moveTo(sources, {visualizePathStyle: {stroke: '#FFFFFF'}});
            }
        } else {
            let targets;
            if(howManyHarvester<5){
                //------------------------
                // var targetNames == [extension, spawn]
                // fromTo.transferTo(creep, targetNames)
                targets = creep.pos.findClosestByPath(FIND_STRUCTURES, {
                    filter: (structure) => {
                        return (structure.structureType == STRUCTURE_EXTENSION || 
                                structure.structureType == STRUCTURE_SPAWN ) &&
                            structure.store.getFreeCapacity(RESOURCE_ENERGY) > 0;
                    }
                });
                //-----------------------
            }else{
                //--------------------------
                // var targetNames == [extension, spawn, container]
                // fromTo.transferTo(creep, targetNames)
                targets = creep.pos.findClosestByPath(FIND_STRUCTURES, {
                    filter: (structure) => {
                        return (structure.structureType == STRUCTURE_EXTENSION || 
                                structure.structureType == STRUCTURE_SPAWN ||
                                 structure.structureType == STRUCTURE_CONTAINER) &&
                            structure.store.getFreeCapacity(RESOURCE_ENERGY) > 0;
                    }
                });  
                // -------------------
            }
            if(creep.transfer(targets, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                creep.moveTo(targets, {visualizePathStyle: {stroke: '#FF0040'}});
            }
        }
    }
};

module.exports = roleHarvester;