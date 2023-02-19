/*
 * Module code goes here. Use 'module.exports' to export things:
 * module.exports.thing = 'a thing';
 *
 * You can import it from another modules like this:
 * let mod = require('GC');
 * mod.thing == 'a thing'; // true
 */

let gc = {
    removeDeadCreep : function(){
        for(let i in Memory.creeps) {
            if(!Game.creeps[i]) {
                delete Memory.creeps[i];
            }
        }
    }
}


module.exports = gc;