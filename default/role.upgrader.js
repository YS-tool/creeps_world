/*
 * Module code goes here. Use 'module.exports' to export things:
 * module.exports.thing = 'a thing';
 *
 * You can import it from another modules like this:
 * var mod = require('role.upgrader');
 * mod.thing == 'a thing'; // true
 */

var roleUpgrader = {

    /** @param {Creep} creep **/
    run: function(creep) {
        
        var index = creep.name.split("-")[1];
        index = parseInt(index)%(creep.room.find(FIND_SOURCES_ACTIVE).length)
        
        if(creep.store[RESOURCE_ENERGY] == 0 && creep.memory.upgrading) {
            creep.memory.upgrading = false;
            creep.say('🔄 harvest');
        }
        
        if(!creep.memory.upgrading && creep.store.getFreeCapacity() == 0) {
            creep.memory.upgrading = true;
            creep.say('upgrade');
        }
        
        var sources = creep.room.find(FIND_SOURCES_ACTIVE);
        
        if(creep.memory.upgrading){
            if(creep.upgradeController(creep.room.controller) == ERR_NOT_IN_RANGE) {
                creep.moveTo(creep.room.controller);
            }
        }else {
            if(creep.harvest(sources[index]) == ERR_NOT_IN_RANGE) {
                creep.moveTo(sources[index],{visualizePathStyle: {stroke: '#E81E1E'}});
            }
        }

	}
};

module.exports = roleUpgrader;