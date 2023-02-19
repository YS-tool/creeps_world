/*
 * Module code goes here. Use 'module.exports' to export things:
 * module.exports.thing = 'a thing';
 *
 * You can import it from another modules like this:
 * let mod = require('spawnNew');
 * mod.thing == 'a thing'; // true
 */
 
 
let spawnNew = {
    run: function(spawn, num){
        // console.log("inside spawnNew")
        // console.log(num)
        let role;
        if(num%3==0){
            role = "harvester"
        }else if (num%3==1){
            role = "upgrader"
        }else{
            role = "builder"
        }

        if(spawn.room.energyAvailable >=500 && spawn.room.energyCapacityAvailable == 550 ){
            return spawn.spawnCreep( [WORK, WORK, WORK, CARRY, CARRY, MOVE, MOVE], role +"-"+ num,{
                memory:{role:role}
            } );
        }else if (spawn.room.energyAvailable>=300 && spawn.room.energyCapacityAvailable <=550){
            // console.log("else if")
            let a= spawn.spawnCreep( [WORK,WORK,CARRY,MOVE], role +"-"+ num,{
                memory:{role:role}
            } );
            return a;
        }else{
            return -1;
        }
    }
};

module.exports = spawnNew;