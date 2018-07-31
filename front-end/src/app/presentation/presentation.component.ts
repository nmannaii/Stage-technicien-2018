import { Component, OnInit } from '@angular/core';
@Component({
  selector: 'app-presentation',
  templateUrl: './presentation.component.html',
  styleUrls: ['./presentation.component.scss']
})
export class PresentationComponent implements OnInit {
  images: Array<string> = [
    "/assets/imgs/slide1.jpg",
    "/assets/imgs/slide2.jpg"
  ]
  constructor() { }

  ngOnInit() {
  }

}
