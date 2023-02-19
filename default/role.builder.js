/*
 * Module code goes here. Use 'module.exports' to export things:
 * module.exports.thing = 'a thing';
 *
 * You can import it from another modules like this:
 * let mod = require('role.builder');
 * mod.thing == 'a thing'; // true
 */
let roleUpgrader = require('role.upgrader');
let rolecleanUp = require('role.cleanUp');
let roleHarvester = require('role.harvester');

let roleBuilder = {

    /** @param {Creep} creep **/
    run: function(creep) {

        // rand 2 because 2 temp job
        let rand = Math.floor(Math.random() * 2);
        let index = creep.name.split("-")[1];
        index = parseInt(index)%(creep.room.find(FIND_SOURCES_ACTIVE).length)

	    if(creep.memory.building && creep.store[RESOURCE_ENERGY] == 0) {
            creep.memory.building = false;
            creep.say('🔄 harvest');
	    }
	    if(!creep.memory.building && creep.store.getFreeCapacity() == 0) {
	        creep.memory.building = true;
	        creep.say('🚧 build');
	    }
	    
        if (creep.memory.tempJob == "harvest"){
	        rolecleanUp.run(creep)
	    }else if(creep.memory.tempJob == "upgrade"){
	        roleUpgrader.run(creep)
	    }

	    if(creep.memory.building) {
	        let targets = creep.pos.findClosestByRange(FIND_CONSTRUCTION_SITES);
            if(targets) {
                delete creep.memory.tempJob
                if(creep.build(targets) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(targets, {visualizePathStyle: {stroke: '#FF0040'}});
                }
            }else if(!creep.memory.tempJob){
                if(rand == 0){
                    creep.memory.tempJob = "harvest"
                }else{
                    creep.memory.tempJob = "upgrade"
                }
            }
	    }
	    else {
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
	    }
	}
};

module.exports = roleBuilder;