import { mouse, left, right, up, down, Point } from "@nut-tree/nut-js";

export default class MouseMove {

  constructor(command) {
    const typeOfCommand = command.split(' ')[0].split('_')[0];
    const coord = +command.split(' ')[1];
    console.log('draw command : ', typeOfCommand );
    if(typeOfCommand=== 'mouse') {
      this.move(command);
    } if (typeOfCommand === 'draw') {
      this.drawCircle(coord);

    }
  }

   move(command) {
    const mouseCommand = command.split(' ')[0];
    const coord = +command.split(' ')[1];
    
    const moves = {
      'mouse_up' : up,
      'mouse_right': right,
      'mouse_left': left,
      'mouse_down': down,
      
    };

    // let result = `${moves[mouseCommand]}(${mouseCoord})`
    let result =  (async () => {
      await mouse.move(moves[mouseCommand](coord));
      
    })();
    return result;
  }

  async drawCircle(coord) {
    const currentPosition = await mouse.getPosition();

    const centerX = +currentPosition.x;
    const centerY = +currentPosition.y;
    const radius = coord;

    // an array to save circle points
    const points=[];

    for(let degree=0; degree<360; degree++){
      let radians = degree * Math.PI/180;
      let x = centerX + radius * Math.cos(radians);
      let y = centerY + radius * Math.sin(radians);
      points.push({x:x,y:y});
    }
    async function getPoint(x, y) {
      let target = new Point(x, y)
    
        mouse.config.mouseSpeed = 0.2;
        await mouse.setPosition(target,  0.5);

    
    }
    let circle =  points.forEach(async p => await getPoint(+p.x, +p.y));

    return circle;
  }
  
}
