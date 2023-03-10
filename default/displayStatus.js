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

        this.updateStatusArr()
    },

    updateStatusArr: function(){

      Memory.creepSizeStat = {}
      let har = 0;
      let upg = 0;
      let bud = 0;
      for(let name in Game.creeps) {
          let creep = Game.creeps[name];

          var size = creep.hitsMax.toString();

          if(Memory.creepSizeStat[size]){
            Memory.creepSizeStat[size]++
          }else{
            Memory.creepSizeStat[size] =1;
          }

          if(creep.memory.role == 'harvester') {
              har++
          }
          if(creep.memory.role == 'upgrader') {
              upg++
          }
          if(creep.memory.role == 'builder') {
              bud++;
          }
      }

     Memory.creepRoleStat = {harvester : har, upgrader : upg, builder : bud}
    }
}

module.exports = displayStatus