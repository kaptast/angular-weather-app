import { Component, OnInit, Input } from '@angular/core';
import { Gauge } from '../gauge';

@Component({
  selector: 'app-gauge',
  templateUrl: './gauge.component.html',
  styleUrls: ['./gauge.component.css']
})
export class GaugeComponent implements OnInit {
  @Input() gaugeValue: Gauge;

  constructor() { }

  ngOnInit(): void {
  }
}
