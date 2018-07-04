import {Component, ElementRef, OnInit} from '@angular/core';
import * as d3Selection from 'd3-selection';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  title = 'SVG & animateMotion: Solar System POC';

  svgContainer;
  defs;
  orbitalPath;
  planets;

  constructor(private element: ElementRef) {
  }

  ngOnInit() {
    console.log('AppComponent ngOnInit');

    this.svgContainer = this.element.nativeElement.querySelector('#svg');

    this.buildDefs();
    this.generatePath();
    this.generateCircle();
  }

  buildDefs() {

    let svg = d3Selection.select(this.svgContainer);
    this.defs = svg.append('defs');

    this.defs.append('pattern')
      .attr('id', 'sun')
      .attr('x', 50)
      .attr('y', 50)
      .attr('patternUnits', 'userSpaceOnUse')
      .attr('height', 100)
      .attr('width', 100)
      .append('image')
      .attr('xlink:href', 'assets/sun.png');

    this.buildPattern('mercury', 16, 'assets/mercury.png');
    this.buildPattern('venus', 16, 'assets/venus.png');
    this.buildPattern('earth', 24, 'assets/earth.png');
    this.buildPattern('mars', 24, 'assets/mars.png');
    this.buildPattern('jupiter', 48, 'assets/jupiter.png');
    this.buildPattern('saturne', 48, 'assets/saturne.png');
    this.buildPattern('uranus', 32, 'assets/uranus.png');
    this.buildPattern('neptune', 32, 'assets/neptune.png');
    this.buildPattern('pluto', 8, 'assets/pluto.png');

  }

  buildPattern(id, d, href) {

    this.defs.append('pattern')
      .attr('id', id)
      .attr('height', d)
      .attr('width', d)
      .append('image')
      .attr('xlink:href', href);
  }

  generatePath() {

    let svg = d3Selection.select(this.svgContainer);
    this.orbitalPath = svg.append('g').attr('id', 'orbitalPath');

    this.buildPath('mercury', 70);
    this.buildPath('venus', 90);
    this.buildPath('earth', 115);
    this.buildPath('mars', 150);
    this.buildPath('jupiter', 190);
    this.buildPath('saturne', 240);
    this.buildPath('uranus', 270);
    this.buildPath('neptune', 320);
    this.buildPath('pluto', 350);
  }

  circleToPath(cx, cy, r) {
    return 'M' + cx + ',' + cy + 'm' + (-r) + ',0a' + r + ',' + r + ' 0 1,0 ' + (r * 2) + ',0a' + r + ',' + r + ' 0 1,0 ' + (-r * 2) + ',0';
  }

  buildPath(name, r) {

    let pathColor = '#ccc';

    this.orbitalPath.append('path')
      .attr('d', this.circleToPath(500, 400, r))
      .attr('id', `${name}-orbite`)
      .attr('fill', 'none')
      .attr('stroke', pathColor)
      .attr('stroke-width', '1');

  }

  generateCircle() {

    let svg = d3Selection.select(this.svgContainer);
    this.planets = svg.append('g').attr('id', 'planets');

    this.planets.append('circle')
      .attr('cx', 500)
      .attr('cy', 400)
      .attr('r', 50)
      .attr('fill', 'url(#sun)');

    this.buildCircle('mercury',8,12,'#mercury-orbite');
    this.buildCircle('venus',8,11,'#venus-orbite');
    this.buildCircle('earth',12,10,'#earth-orbite');
    this.buildCircle('mars',12,12,'#mars-orbite');
    this.buildCircle('jupiter',24,14,'#jupiter-orbite');
    this.buildCircle('saturne',24,16,'#saturne-orbite');
    this.buildCircle('uranus',16,18,'#uranus-orbite');
    this.buildCircle('neptune',16,20,'#neptune-orbite');
    this.buildCircle('pluto',4,22,'#pluto-orbite');

  }

  buildCircle(name, r, duration, href) {

    this.planets.append('circle')
      .attr('r', r)
      .attr('fill', `url(#${name})`)
      .append('animateMotion')
      .attr('dur', `${duration}s`)
      .attr('repeatCount', 'indefinite')
      .append('mpath')
      .attr('xlink:href', href);

  }

}


