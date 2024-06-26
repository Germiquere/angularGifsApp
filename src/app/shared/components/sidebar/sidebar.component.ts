import { Component } from '@angular/core';
import { GifsService } from 'src/app/gifs/services/gifs.service';

@Component({
  selector: 'shared-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],
})
export class SidebarComponent {
  constructor(private gifsServer: GifsService) {}

  get tags(): string[] {
    return this.gifsServer.tagsHistory;
  }
  searchTags(tag: string): void {
    this.gifsServer.searchTag(tag);
  }
}
