import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-time-pie-chart',
  templateUrl: './time-pie-chart.component.html',
  styleUrls: ['./time-pie-chart.component.css']
})
export class TimePieChartComponent implements OnInit {

  @ViewChild('pieCanvas') canvasRef: ElementRef;
  private running: boolean;
  private readonly WIDTH: number = 500;
  private readonly HEIGHT: number = 500;
  private startTime: number;
  private interval: number = 1000 * 5;

  constructor() { }

  ngOnInit() {
    this.startTime = new Date().getTime();
    this.running = true;
    this.paint();
  }

  ngOnDestroy() {
    this.running = false;
  }

  private paint() {
    // Check that we're still running.
    if (!this.running) {
      return;
    }
    
    var now = new Date().getTime();
    var ellapsed = now - this.startTime;
    var ellapsedNormed = Math.min(1, ellapsed / this.interval);
    console.log(ellapsed + ' ' + ellapsedNormed);
    if (ellapsed > this.interval) {
      this.running = false;
      return;  
    }


    // Paint current frame
    let ctx: CanvasRenderingContext2D =
      this.canvasRef.nativeElement.getContext('2d');
  
    // Draw background (which also effectively clears any previous drawing)
    ctx.fillStyle = 'rgb(221, 0, 49)';
    ctx.fillRect(0, 0, 800, 500);



    ctx.fillStyle = 'rgb(0, 255, 0)';
    var startAngle = 0;
    var endAngle = Math.PI;
    ctx.moveTo(this.WIDTH / 2, this.HEIGHT / 2);
    //ctx.arc(this.WIDTH / 2, this.HEIGHT / 2, 200, 1.5*Math.PI,  ellapsedNormed * 1.5 * Math.PI);
    //ctx.arc(this.WIDTH / 2, this.HEIGHT / 2, 200, 1.5*Math.PI,  1.5*Math.PI + ellapsedNormed * 1.5 * Math.PI);
    ctx.arc(this.WIDTH / 2, this.HEIGHT / 2, 200, 1.5*Math.PI,  1.5*Math.PI + 2 * ellapsedNormed * Math.PI);
    ctx.lineTo(this.WIDTH / 2, this.HEIGHT / 2);
    ctx.fill()
        
    // Schedule next
    requestAnimationFrame(() => this.paint());
  }

}
