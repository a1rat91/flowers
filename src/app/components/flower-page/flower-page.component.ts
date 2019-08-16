import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {ActivatedRoute, Params} from '@angular/router';

@Component({
  selector: 'app-flower-page',
  templateUrl: './flower-page.component.html',
  styleUrls: ['./flower-page.component.scss']
})
export class FlowerPageComponent implements OnInit  {
  @Output() menuClosed: EventEmitter<any> = new EventEmitter<any>();
  id: string;

  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    this.id = this.route.snapshot.params['id'];
    this.id = this.route.snapshot.params['title'];
    this.id = this.route.snapshot.params['text'];

    this.route.params.subscribe((params: Params) => {
      this.id = this.route.snapshot.params['id'];
    });
  }
}
