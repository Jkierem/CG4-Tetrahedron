import * as p5 from 'p5';
import { createCore } from './utils'
import { Colors } from './data'

const main = (p) => {
    const core  = createCore(p);
    const points = [
        p.createVector(10,10,0),
        p.createVector(-10,10,0),
        p.createVector(-10,-10,0),
        p.createVector(10,-10,0),
        p.createVector(10,-10,10),
        p.createVector(-10,-10,10),
        p.createVector(-10,10,10),
        p.createVector(10,10,10),
    ]
    p.setup = () => {
        p.createCanvas(400,400,p.WEBGL);
    };

    p.draw = () => {
        p.background(Colors.black);
        core.open( (p) => {
            const { width , height } = p;
            p.translate( 0 , 40 , 0);
            p.strokeWeight(3)
            p.rotateZ()
            p.stroke(Colors.red);
            p.fill(Colors.red);
        }).safe((p,core) => {
            points.forEach(
                x => 
                core.safe( () => {
                    p.translate(...x.array())
                    p.sphere(1)
                })
            )
        })
        .close()
    };
}

const P5 = new p5(main);