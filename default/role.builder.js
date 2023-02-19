/*
 * Module code goes here. Use 'module.exports' to export things:
 * module.exports.thing = 'a thing';
 *
 * You can import it from another modules like this:
 * var mod = require('role.builder');
 * mod.thing == 'a thing'; // true
 */
var roleUpgrader = require('role.upgrader');
var rolecleanUp = require('role.cleanUp');
var roleHarvester = require('role.harvester');

var roleBuilder = {

    /** @param {Creep} creep **/
    run: function(creep) {
        
        // rand 2 because 2 temp job
        var rand = Math.floor(Math.random() * 2);
        var index = creep.name.split("-")[1];
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
	        var targets = creep.room.find(FIND_CONSTRUCTION_SITES);
            if(targets.length) {
                delete creep.memory.tempJob
                if(creep.build(targets[0]) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(targets[0], {visualizePathStyle: {stroke: '#ffffff'}});
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
            roleHarvester.run(creep);
	    }
	}
};

module.exports = roleBuilder;