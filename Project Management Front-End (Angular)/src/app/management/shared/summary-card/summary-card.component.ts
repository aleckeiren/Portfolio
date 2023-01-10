import { AfterViewInit, Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { IonCard, IonicModule } from '@ionic/angular';
import { ManagementComponent } from '../../management.component';

@Component({
  standalone:true,
  imports:[ManagementComponent,IonicModule],
  selector: 'summary-card',
  templateUrl: './summary-card.component.html',
  styleUrls: ['./summary-card.component.scss']
})
export class SummaryCardComponent implements OnInit, AfterViewInit {
  @Input() title !: string;
  @Input() icon !: string;
  @Input() total !: Number;
  @ViewChild('container') containerWidth !: IonCard; 
  constructor() { }

  ngOnInit(): void {
  }
  ngAfterViewInit(): void {
  }
}
