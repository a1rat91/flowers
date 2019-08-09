import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent implements OnInit {
  public menuOpen: boolean;

  ngOnInit() {
  }

  changeMenuState(data) {
    this.menuOpen = data;
  }

  setNavClosed(data) {
    console.log(data);
  }
}
