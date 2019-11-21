import {Injectable} from '@angular/core';

@Injectable({providedIn: 'root'})
export class UploadImgsService {
  private imgs: any = {
    distortionSliderImg: [], //996x1081
    distortionSliderMinImg: [], //123x123
    catalogImg: [], //330x450
    catalogTransitionImg: [], //1920x1080
  };
  getImgs(prefix) {
    return this.imgs[prefix];
  }
  addImgs(url: string, prefix) {
    this.imgs[prefix].push(url);
  }
  clearImgs() {
    this.imgs = {};
  }
}
