/*
 * Module code goes here. Use 'module.exports' to export things:
 * module.exports.thing = 'a thing';
 *
 * You can import it from another modules like this:
 * let mod = require('role.harvester');
 * mod.thing == 'a thing'; // true
 */

let fromTo = require('helper.fromTo')
let longHarvester = require('role.longDistanceHarvester')

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
        
        if(creep.room.name != creep.room.home){
            longHarvester.run(creep);
        }else{
            // find source transfer to spawn, extension, container
            // when harvesting < 5, spawn and extension only
            // find closest target
            if(creep.memory.harvesting) {
                fromTo.harvestFromSource(creep)
            } else {
                let targetArr = ["extension", "spawn", "tower"];
                if(howManyHarvester>5){
                    targetArr.push("container")
                }
                fromTo.transferTo(creep, targetArr)
            }
        }

    }
};

module.exports = roleHarvester;