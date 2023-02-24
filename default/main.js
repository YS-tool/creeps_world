let roleHarvester = require('role.harvester');
let roleUpgrader = require('role.upgrader');
let roleBuilder = require('role.builder');
let spawnNew = require('spawnNew')

let displayStatus = require('displayStatus')
let tower = require('tower')


displayStatus.run()
let tick = 0;

// Memory.creepIndex = 0

module.exports.loop = function () {

  // let creep = Game.creeps.self;

  // let goals = _.map(creep.room.find(FIND_FLAGS), function(source) {
  //   // We can't actually walk on sources-- set `range` to 1
  //   // so we path next to it.
  //   return { pos: source.pos, range: 1 };
  // });

  // //  str = JSON.stringify(goals)
  // //  console.log(str)

  // let ret = PathFinder.search(
  //   creep.pos, goals,
  //   {
  //     // We need to set the defaults costs higher so that we
  //     // can set the road cost lower in `roomCallback`
  //     plainCost: 2,
  //     swampCost: 10,

  //     roomCallback: function(roomName) {

  //       let room = Game.rooms[roomName];
  //       // In this example `room` will always exist, but since 
  //       // PathFinder supports searches which span multiple rooms 
  //       // you should be careful!
  //       if (!room) return;
  //       let costs = new PathFinder.CostMatrix;

  //       room.find(FIND_STRUCTURES).forEach(function(struct) {
  //         if (struct.structureType === STRUCTURE_ROAD) {
  //           // Favor roads over plain tiles
  //           costs.set(struct.pos.x, struct.pos.y, 1);
  //         } else if (struct.structureType !== STRUCTURE_CONTAINER &&
  //                    (struct.structureType !== STRUCTURE_RAMPART ||
  //                     !struct.my)) {
  //           // Can't walk through non-walkable buildings
  //           costs.set(struct.pos.x, struct.pos.y, 0xff);
  //         }
  //       });

  //       // Avoid creeps in the room
  //       room.find(FIND_CREEPS).forEach(function(creep) {
  //         costs.set(creep.pos.x, creep.pos.y, 0xff);
  //       });

  //         str = JSON.stringify(costs)
  //       console.log(str)

  //       return costs;
  //     },
  //   }
  // );

  // str = JSON.stringify(ret)
  // console.log(str)


  // let pos = ret.path[0];
  // creep.move(creep.pos.getDirectionTo(pos));




    // respone new creep
    if(tick == 0 || tick>80){
        for(const key in Game.spawns){
            const spawn = Game.spawns[key];
            // if(!spawn.room.controller || !spawn.room.controller.my){
            //     continue;
            // }
            if(spawnNew.run(spawn, Memory.creepIndex)==0){
                tick = 1;
            }
        }
    }
    // tower behavior
    for(let name in Game.structures){
        if(Game.structures[name].structureType==STRUCTURE_TOWER){
            tower.run(Game.structures[name])
        }
    }
    // main section
    for(let name in Game.creeps) {
        let creep = Game.creeps[name];
        // creep.memory.home = creep.room.name
        if(creep.memory.role == 'harvester') {
            roleHarvester.run(creep);
        }
        if(creep.memory.role == 'upgrader') {
            // creep.memory.role = 'builder'
            roleUpgrader.run(creep);
        }
        if(creep.memory.role == 'builder') {
            // creep.memory.role = 'harvester'
            roleBuilder.run(creep);
        }
    }

    tick++;
    
}