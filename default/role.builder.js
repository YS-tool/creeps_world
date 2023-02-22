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
let fromTo = require('helper.fromTo');

let roleBuilder = {

    /** @param {Creep} creep **/
    run: function(creep) {

        // rand 2 because 2 temp job
        let rand = Math.floor(Math.random() * 2);
        let targetsArr = []

        for(const name in Game.rooms){
          var sites = Game.rooms[name].find(FIND_CONSTRUCTION_SITES);
          for(var siteName in sites){
            targetsArr.push(sites[siteName])
          }
        }
        // console.log(targetsArr)
        var targets = targetsArr[0]
        // if target exist, do build
        // else, do temp job
        if(targets){
            if(creep.memory.building && creep.store[RESOURCE_ENERGY] == 0) {
                creep.memory.building = false;
                creep.say('🔄 harvest');
            }
            if(!creep.memory.building && creep.store.getFreeCapacity() == 0) {
                creep.memory.building = true;
                creep.say('🚧 build');
            }

            if(creep.memory.building) {
                if(creep.build(targets) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(targets, {visualizePathStyle: {stroke: '#FF0040'}});
                }
            } else {
                if(!fromTo.withdrawFromContainer(creep)){
                    fromTo.harvestFromSource(creep)
                }
            }
        }else{
          if(creep.room.name != creep.memory.home){
            fromTo.toRoom(creep, creep.memory.home)
          }else if(!creep.memory.tempJob){
                if(rand == 0){
                    creep.memory.tempJob = "harvest"
                }else{
                    creep.memory.tempJob = "upgrade"
                }
            }
            if (creep.memory.tempJob == "harvest"){
                // console.log("tempjob harvest")
                rolecleanUp.run(creep)
            }else if(creep.memory.tempJob == "upgrade"){
                roleUpgrader.run(creep)
            }
        }
	}
};

module.exports = roleBuilder;