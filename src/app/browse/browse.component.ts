import { BrowseService } from './browse.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-browse',
  templateUrl: './browse.component.html',
  styleUrls: ['./browse.component.scss'],
})
export class BrowseComponent implements OnInit {
  constructor(private route: ActivatedRoute, private browse: BrowseService) {}

  ngOnInit(): void {
    this.browse.load();
  }
}
