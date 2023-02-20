/*
 * Module code goes here. Use 'module.exports' to export things:
 * module.exports.thing = 'a thing';
 *
 * You can import it from another modules like this:
 * let mod = require('role.harvester');
 * mod.thing == 'a thing'; // true
 */
let roleHarvester = require('role.harvester');
let towerMaintain = require('role.towerMaintain');

let rolecleanUp = {

    /** @param {Creep} creep **/
    run: function(creep) {
        
        if(creep.store.getFreeCapacity() > 0) {
            
            let index = creep.name.split("-")[1];
            let ruinList = getRuinList(creep)
            let dropList = getDropList(creep)
            let towerList = getTowerList(creep)
            if(ruinList.length>0){
                index = parseInt(index)%(ruinList.length)
                if(creep.withdraw(ruinList[index],RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(ruinList[index], {visualizePathStyle: {stroke: '#FFFFFF'}});
                }
            }else if(dropList.length>0){
                index = parseInt(index)%(dropList.length)
                if(creep.pickup(dropList[index],RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(dropList[index], {visualizePathStyle: {stroke: '#FFFFFF'}});
                }
            }else if (towerList.length>0){
                towerMaintain.run(creep, towerList[0])
                // console.log("going to add power to tower")
            }else{
                roleHarvester.run(creep);
            }
        }
        else {
            let targets = creep.room.find(FIND_STRUCTURES, {
                    filter: (structure) => {
                        return (structure.structureType == STRUCTURE_EXTENSION || structure.structureType == STRUCTURE_SPAWN) &&
                            structure.store.getFreeCapacity(RESOURCE_ENERGY) > 0;
                    }
            });
            // console.log(targets)
            if(targets.length > 0) {
                if(creep.transfer(targets[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(targets[0], {visualizePathStyle: {stroke: '#FF0040'}});
                }
            }
        }
    }
};

function getRuinList(creep){
    let sources = creep.room.find(FIND_RUINS);
    let list=[];
    for(key in sources){
        if(sources[key].store[RESOURCE_ENERGY]>0){
            list.push(sources[key])
        }
    }
    return list;
}

function getDropList(creep){
    let sources = creep.room.find(FIND_DROPPED_RESOURCES);
    let list=[];
    for(key in sources){
        if(sources[key].amount>0){
            list.push(sources[key])
        }
    }
    return list;
}

function getTowerList(creep){
    let towerList = creep.room.find(FIND_MY_STRUCTURES, {filter: { structureType: STRUCTURE_TOWER }});
    return towerList;
}


module.exports = rolecleanUp;