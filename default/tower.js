/*
 * Module code goes here. Use 'module.exports' to export things:
 * module.exports.thing = 'a thing';
 *
 * You can import it from another modules like this:
 * var mod = require('tower');
 * mod.thing == 'a thing'; // true
 */

var tower = {
    run : function(tower){
        var closestDamagedStructure = tower.pos.findClosestByRange(FIND_STRUCTURES, {
            filter: (structure) => structure.hits < structure.hitsMax
        });

        var target = tower.pos.findClosestByRange(FIND_HOSTILE_CREEPS);

        if(closestDamagedStructure) {
            tower.repair(closestDamagedStructure);
        }

        // if one is found...
        if (target != undefined) {
            // ...FIRE!
            tower.attack(target);
        }
    }
}

module.exports = tower