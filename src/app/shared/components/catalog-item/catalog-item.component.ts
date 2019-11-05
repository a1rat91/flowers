import {Component, Input, OnInit} from '@angular/core';
import {Post} from '../../../admin/shared/interfaces';

@Component({
  selector: 'app-catalog-item',
  templateUrl: './catalog-item.component.html',
  styleUrls: ['./catalog-item.component.scss']
})
export class CatalogItemComponent implements OnInit {

  @Input() post: Post;
  @Input() index;

  constructor() {}

  ngOnInit() {
  }

}
