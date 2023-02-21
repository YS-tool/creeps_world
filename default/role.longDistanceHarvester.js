/*
 * Module code goes here. Use 'module.exports' to export things:
 * module.exports.thing = 'a thing';
 *
 * You can import it from another modules like this:
 * let mod = require('role.harvester');
 * mod.thing == 'a thing'; // true
 */

// in console   Memory.neighbor = "W7N1"
let fromTo = require('helper.fromTo')

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
            if(creep.room.name == Memory.neighbor){
                fromTo.harvestFromSource(creep)
            }else{
                fromTo.toRoom(creep, Memory.neighbor)
            }
        } else {
            if(creep.room.name == creep.memory.home){
                let targetArr = ["extension", "spawn", "tower"];
                if(howManyHarvester>5){
                    targetArr.push("container")
                }
                fromTo.transferTo(creep, targetArr)
            }else{
                fromTo.toRoom(creep, creep.memory.home)
            }
        }
    }
};

module.exports = roleHarvester;