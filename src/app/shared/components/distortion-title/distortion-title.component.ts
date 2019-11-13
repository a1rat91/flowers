import {Component, DoCheck, ElementRef, HostListener, Inject, OnInit, ViewChild} from '@angular/core';
import {DOCUMENT} from '@angular/common';
import {MathUtils as MathUtils} from './utils';

declare var Blotter: any;

@Component({
  selector: 'app-distortion-title',
  templateUrl: './distortion-title.component.html',
  styleUrls: ['./distortion-title.component.scss']
})
export class DistortionTitleComponent implements OnInit, DoCheck {

  body;
  docEl;
  winsize;
  mousePos;
  @ViewChild('elem', {static: true}) elem: ElementRef;
  @ViewChild('textEl', {static: true}) textEl: ElementRef;
   // View child

  constructor(@Inject(DOCUMENT) private document: Document) {
    this.body = document.body;
    this.docEl = document.documentElement;
  }

  ngOnInit() {
    this.mousePos = {x: window.innerWidth / 2, y: window.innerHeight / 2};
    this.calcWinsize();

    window.addEventListener('mousemove', ev => this.mousePos = this.getMousePos(ev));
    this.createBlotterText();
  }

  ngDoCheck() {

  }

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.calcWinsize();
  }

  calcWinsize = () => {
    this.winsize = {width: window.innerWidth, height: window.innerHeight};
    console.log(this.winsize, 'winsize');
    return this.winsize;
  }

  getMousePos = (ev) => {
    let posx = 0;
    let posy = 0;
    if (!ev) {
      ev = window.event;
    }
    if (ev.pageX || ev.pageY) {
      posx = ev.pageX;
      posy = ev.pageY;
    } else if (ev.clientX || ev.clientY) {
      posx = ev.clientX + this.body.scrollLeft + this.docEl.scrollLeft;
      posy = ev.clientY + this.body.scrollTop + this.docEl.scrollTop;
    }
    return {x: posx, y: posy};
  }

  createBlotterText = () => {
    const text = new Blotter.Text(this.textEl.nativeElement.innerHTML, {
      family : "'Playfair Display',serif",
      weight: 700,
      size : 120,
      paddingLeft: 100,
      paddingRight: 100,
      paddingTop: 100,
      paddingBottom: 100,
      fill : 'white'
    });

    this.elem.nativeElement.removeChild(this.textEl.nativeElement);

    const material = new Blotter.LiquidDistortMaterial();
    material.uniforms.uSpeed.value = 0.5;
    material.uniforms.uVolatility.value = 0;
    material.uniforms.uSeed.value = 0.1;
    const blotter = new Blotter(material, {texts: text});
    const scope = blotter.forText(text);
    scope.appendTo(this.elem.nativeElement);

    let lastMousePosition = {x: this.winsize.width / 2, y: this.winsize.height / 2};
    let volatility = 0;

    const render = () => {
      const docScrolls = {left : this.body.scrollLeft + this.docEl.scrollLeft, top : this.body.scrollTop + this.docEl.scrollTop};
      const relmousepos = {x : this.mousePos.x - docScrolls.left, y : this.mousePos.y - docScrolls.top };
      const mouseDistance = MathUtils.distance(lastMousePosition.x, relmousepos.x, lastMousePosition.y, relmousepos.y);

      volatility = MathUtils.lerp(volatility, Math.min(MathUtils.lineEq(0.1, 0, 10, 0, mouseDistance), 0.1), 0.005);
      material.uniforms.uVolatility.value = volatility;

      lastMousePosition = {x: relmousepos.x, y: relmousepos.y};
      requestAnimationFrame(render);
    }
    requestAnimationFrame(render);
  }

}
