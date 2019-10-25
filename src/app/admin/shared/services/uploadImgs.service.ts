import {Injectable} from '@angular/core';

@Injectable({providedIn: 'root'})
export class UploadImgsService {
  private imgs: string[] = [];
  getImgs() {
    return this.imgs;
  }
  addImgs(url: string) {
    this.imgs.push(url);
  }
  clearImgs() {
    this.imgs = [];
  }
}
