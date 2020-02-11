import * as p5 from 'p5';
import { createCore } from './utils'
import { Colors } from './data'

const base = 40;

const main = (p) => {
    const core  = createCore(p);
    const points = [
        p.createVector(base,base,-base),
        p.createVector(-base,base,-base),
        p.createVector(-base,-base,-base),
        p.createVector(base,-base,-base),
        p.createVector(base,-base,base),
        p.createVector(-base,-base,base),
        p.createVector(-base,base,base),
        p.createVector(base,base,base),
    ]
    p.setup = () => {
        p.createCanvas(400,400,p.WEBGL);
    };
    let t = 0.001
    const deltaT = 0.01;
    p.draw = () => {
        p.background(Colors.black);
        t += deltaT;
        core.open( (p) => {
            // p.translate( 0 , 0 , 0);
            p.rotateY(t)
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