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
let fromTo = require('fromTo');

let rolecleanUp = {

    /** @param {Creep} creep **/
    run: function(creep) {
        let towerList = getTowerList(creep)

        if (towerList.length>0){
            // console.log("towermaintain")
            towerMaintain.run(creep, towerList[0])
            // console.log("going to add power to tower")
        } else if(creep.store.getFreeCapacity() > 0) {
            let index = creep.name.split("-")[1];
            let ruinList = getRuinList(creep)
            let dropList = getDropList(creep)

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
            }else {
                roleHarvester.run(creep);
            }
        }
        else {
            let targetArr = ["extension", "spawn"]
            fromTo.transferTo(creep, targetArr)
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