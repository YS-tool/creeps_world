/*
 * Module code goes here. Use 'module.exports' to export things:
 * module.exports.thing = 'a thing';
 *
 * You can import it from another modules like this:
 * let mod = require('displayStatus');
 * mod.thing == 'a thing'; // true
 */


let displayStatus = {
    run: function(){
        for(const key in Game.rooms){
            console.log(key)
        }

        let returnArr = []
        for(const key in Game.spawns){
            const spawn = Game.spawns[key];
            let roomName = spawn.room.name;

            console.log("Spawn " + key+ " is in " + roomName +
                        "\nEnergy capacity is " + spawn.room.energyCapacityAvailable +
                        "\ncurrent energy is " + spawn.room.energyAvailable)

            let container = spawn.room.find(FIND_STRUCTURES,{
                filter:(structure)=>{
                    return (structure.structureType == STRUCTURE_CONTAINER)
                }})
            if(container.length>0){
                console.log("container exist")
                Memory.containerUnlocked = true;
            }else{
                console.log("there is no container")
                Memory.containerUnlocked = false;
            }
        }

        let creepStatus = updateCreepStatus()

        console.log("there are " + creepStatus[0] + " harvester\n" + 
                    "there are " + creepStatus[1] + " upgader\n" +
                    "there are " + creepStatus[2] + " builder\n" +
                    "there are " + creepStatus[3] + " longHarvester\n")

        return creepStatus;
    },

    updateStatusArr: function(){
        return updateCreepStatus()
    }
}

function updateCreepStatus(){
    let returnArr = []
    let har = 0;
    let upg = 0;
    let bud = 0;
    let longH = 0;
    for(let name in Game.creeps) {
        let creep = Game.creeps[name];
        if(creep.memory.role == 'harvester') {
            har++
        }
        if(creep.memory.role == 'upgrader') {
            upg++
        }
        if(creep.memory.role == 'builder') {
            bud++;
        }
        if(creep.memory.role == 'longHarvester') {
            longH++;
        }
    }

    Memory.harvester = har;
    Memory.upgrader = upg;
    Memory.builder = bud;
    Memory.longHarvester = longH

    returnArr.push(har)
    returnArr.push(upg)
    returnArr.push(bud)
    returnArr.push(longH)

    return returnArr;
}

module.exports = displayStatus