import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import * as PrettyMs from 'pretty-ms';

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
  private interval: number = 1000 * 60 * 1;

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
    //console.log(ellapsed + ' ' + ellapsedNormed);
   


    // Paint current frame
    let ctx: CanvasRenderingContext2D =
      this.canvasRef.nativeElement.getContext('2d');
  
    // Draw background (which also effectively clears any previous drawing)
    ctx.fillStyle = '#fff';
    ctx.fillRect(0, 0, 800, 500);


    //pie
    ctx.fillStyle = "#eee"
    ctx.beginPath();
    ctx.arc(this.WIDTH / 2, this.HEIGHT / 2, 200, 0, 2 * Math.PI);
    ctx.fill();

    ctx.fillStyle = '#68B684';
    var startAngle = 0;
    var endAngle = Math.PI;
    ctx.moveTo(this.WIDTH / 2, this.HEIGHT / 2);
    var from = 1.5*Math.PI;
    var to = 1.5*Math.PI + 2 * ellapsedNormed * Math.PI;
    ctx.beginPath();
    ctx.arc(this.WIDTH / 2, this.HEIGHT / 2, 200, from, to);
    ctx.lineTo(this.WIDTH / 2, this.HEIGHT / 2);
    ctx.fill();
    
    

    //text
    ctx.fillStyle = '#fff';
    ctx.beginPath();
    ctx.moveTo(this.WIDTH / 2, this.HEIGHT / 2);
    ctx.arc(this.WIDTH / 2, this.HEIGHT / 2, 100, 0, 2 * Math.PI);
    ctx.fill();
    ctx.fillStyle = '#68B684';
    ctx.textAlign = "center";
    ctx.font = "16px Arial";
    ctx.fillText(PrettyMs(this.interval - ellapsed, {compact: true}), this.WIDTH / 2, this.HEIGHT / 2 + 6); 
    
        
    if (ellapsed > this.interval) {
      this.running = false;
      return;  
    }

    // Schedule next
    requestAnimationFrame(() => this.paint());
  }

}
