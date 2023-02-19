/*
 * Module code goes here. Use 'module.exports' to export things:
 * module.exports.thing = 'a thing';
 *
 * You can import it from another modules like this:
 * var mod = require('role.harvester');
 * mod.thing == 'a thing'; // true
 */
var roleHarvester = require('role.harvester');

var rolecleanUp = {

    /** @param {Creep} creep **/
    run: function(creep) {
        
        if(creep.store.getFreeCapacity() > 0) {
            
            var index = creep.name.split("-")[1];
            var ruinList = getRuinList(creep)
            var dropList = getDropList(creep)
            
            if(ruinList.length>0){
                index = parseInt(index)%(ruinList.length)
                if(creep.withdraw(ruinList[index],RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(ruinList[index], {visualizePathStyle: {stroke: '#E81E1E'}});
                }
            }else if(dropList.length>0){
                index = parseInt(index)%(dropList.length)
                if(creep.pickup(dropList[index],RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(dropList[index], {visualizePathStyle: {stroke: '#E81E1E'}});
                }
            }else{
                roleHarvester.run(creep);
            }
        }
        else {
            var targets = creep.room.find(FIND_STRUCTURES, {
                    filter: (structure) => {
                        return (structure.structureType == STRUCTURE_EXTENSION || structure.structureType == STRUCTURE_SPAWN) &&
                            structure.store.getFreeCapacity(RESOURCE_ENERGY) > 0;
                    }
            });
            // console.log(targets)
            if(targets.length > 0) {
                if(creep.transfer(targets[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(targets[0], {visualizePathStyle: {stroke: '#ffffff'}});
                }
            }
        }
    }
};

function getRuinList(creep){
    var sources = creep.room.find(FIND_RUINS);
    var list=[];
    for(name in sources){
        if(sources[name].store[RESOURCE_ENERGY]>0){
            list.push(sources[name])
        }
    }
    return list;
}

function getDropList(creep){
    var sources = creep.room.find(FIND_DROPPED_RESOURCES);
    var list=[];
    for(name in sources){
        if(sources[name].amount>0){
            list.push(sources[name])
        }
    }
    return list;
}


module.exports = rolecleanUp;