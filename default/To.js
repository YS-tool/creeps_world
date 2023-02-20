/*
 * Module code goes here. Use 'module.exports' to export things:
 * module.exports.thing = 'a thing';
 *
 * You can import it from another modules like this:
 * var mod = require('To');
 * mod.thing == 'a thing'; // true
 */

var goTo = {
    destinationArr : function(creep, str){
        creep.room.find(FIND_STRUCTURES,{
                    filter:(structure)=>{
                        return (structure.structureType == str && 
                            structure.store.getUsedCapacity()>0)
                    }})
    }
}

module.exports = goTo;