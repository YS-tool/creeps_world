/*
 * Module code goes here. Use 'module.exports' to export things:
 * module.exports.thing = 'a thing';
 *
 * You can import it from another modules like this:
 * let mod = require('role.upgrader');
 * mod.thing == 'a thing'; // true
 */
let roleHarvester = require('role.harvester');

let roleUpgrader = {

    /** @param {Creep} creep **/
    run: function(creep) {
        
        let index = creep.name.split("-")[1];
        index = parseInt(index)%(creep.room.find(FIND_SOURCES_ACTIVE).length)
        
        if(creep.store[RESOURCE_ENERGY] == 0 && creep.memory.upgrading) {
            creep.memory.upgrading = false;
            creep.say('🔄 harvest');
        }
        
        if(!creep.memory.upgrading && creep.store.getFreeCapacity() == 0) {
            creep.memory.upgrading = true;
            creep.say('upgrade');
        }
        
        if(creep.memory.upgrading){
            if(creep.upgradeController(creep.room.controller) == ERR_NOT_IN_RANGE) {
                creep.moveTo(creep.room.controller,{visualizePathStyle: {stroke: '#FF0040'}});
            }
        }else {

            if(Memory.containerUnlocked){
                let container = creep.room.find(FIND_STRUCTURES,{
                    filter:(structure)=>{
                        return (structure.structureType == STRUCTURE_CONTAINER && 
                            structure.store.getUsedCapacity()>0)
                    }})
                if(container.length>0){
                    // console.log("withdraw from container")
                    if(creep.withdraw(container[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(container[0]);
                    }
                }
            }else{
                roleHarvester.run(creep);
            }
        }

	}
};

module.exports = roleUpgrader;