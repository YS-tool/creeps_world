/*
 * Module code goes here. Use 'module.exports' to export things:
 * module.exports.thing = 'a thing';
 *
 * You can import it from another modules like this:
 * var mod = require('To');
 * mod.thing == 'a thing'; // true
 */

var fromTo = {
    
    harvestFromSource : function(creep){
      // if it is a long range, and in home; go out
        if(creep.memory.longRange && creep.memory.home == creep.room.name){
          this.toRoom(creep, Memory.neighbor);
          return;
        }

        let sourcesInRoom = creep.room.find(FIND_SOURCES_ACTIVE)
        let sources = creep.pos.findClosestByPath(sourcesInRoom)
        var harvestReturnValue = creep.harvest(sources);

        if(harvestReturnValue == ERR_INVALID_TARGET){
          if(creep.memory.home == creep.room.name){
            creep.memory.longRange = true;
            // FUTURE: when neighbor is more than one
            // creep.memory.target = one of the neighbor
          }

        }else if(harvestReturnValue == ERR_NOT_IN_RANGE) {
            creep.moveTo(sources, {visualizePathStyle: {stroke: '#FFFFFF'}});
        }

        return harvestReturnValue;
    },

    withdrawFromContainer: function(creep){
        if(!Memory.containerUnlocked){return false}
        let container = creep.room.find(FIND_STRUCTURES,{
            filter:(structure)=>{
                return (structure.structureType == STRUCTURE_CONTAINER && 
                    structure.store.getUsedCapacity()>0)
        }})

        if(container.length>0){
            if(creep.withdraw(container[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                creep.moveTo(container[0]);
            }
            return true;
        }
        return false;
    },

    transferTo: function(creep, targetNames){

      if(creep.memory.home != creep.room.name){
        this.toRoom(creep, creep.memory.home)
        return;
      }
        var targetArr = []
        for(let structureName in targetNames){
            let tempArr = creep.room.find(FIND_MY_STRUCTURES, {
                filter: (structure) => {
                    return (structure.structureType == targetNames[structureName]) &&
                        structure.store.getFreeCapacity(RESOURCE_ENERGY) > 0;
                }
            })
            if(tempArr.length>0){
                targetArr = targetArr.concat(tempArr)
            }
        }
        if(targetArr.length > 0) {
          let transferRes = creep.transfer(targetArr[0], RESOURCE_ENERGY);
          if(transferRes == 0){
            delete creep.memory.longRange;
          }else if( transferRes== ERR_NOT_IN_RANGE) {
              creep.moveTo(targetArr[0], {visualizePathStyle: {stroke: '#FF0040'}});
          }
        }
    },

    toRoom: function(creep, roomName){
        var exit = creep.room.findExitTo(roomName);
        let toExit = creep.pos.findClosestByRange(exit);
        creep.moveTo(toExit);
    }
    
}

module.exports = fromTo;