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
        // let numOfRole = 3;
        // if (spawn.room.find(FIND_MY_CONSTRUCTION_SITES).length){
        //     numOfRole = 2;
        // }

        if(Memory.harvester<6){
            role = "harvester"
        }else if(num%3==0){
            if(Memory.harvester>=6){
                role = "longHarvester"
            }else{
                role = "harvester"
            }
        }else if (num%3==1){
            role = "upgrader"
        }else{
            role = "builder"
        }

        let roleArr = generateWorkLoad(spawn.room.energyAvailable)
        
        if(spawn.spawnCreep( roleArr, role +"-"+ num, {memory:{role:role, home:spawn.room.name}})==0){
            console.log("generate a creep " + roleArr)
            return 0;
        }
        return -1;
    }
};

function generateWorkLoad(energy){
    // create a balanced body as big as possible with the given energy
    var numberOfParts = Math.floor(energy / 200);
    // make sure the creep is not too big (more than 50 parts)
    numberOfParts = Math.min(numberOfParts, Math.floor(50 / 3));
    var body = [];
    for (let i = 0; i < numberOfParts; i++) {
        body.push(WORK);
    }
    for (let i = 0; i < numberOfParts; i++) {
        body.push(CARRY);
    }
    for (let i = 0; i < numberOfParts; i++) {
        body.push(MOVE);
    }
    return body

}

module.exports = spawnNew;