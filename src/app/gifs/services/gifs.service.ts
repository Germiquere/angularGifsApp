import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Gif, SearchResponse } from '../interfaces/gifs.interfaces';

@Injectable({
  providedIn: 'root',
})
export class GifsService {
  public gifList: Gif[] = [];
  private _tagHistory: string[] = [];
  private apiKey: string = 'RJmpKRpPLrDbYRAH8P0O4xF4nNDkuI24';
  constructor(private http: HttpClient) {}
  get tagsHistory() {
    // TODO averigurar sobre referencia en clases de javascript
    return [...this._tagHistory];
  }
  private organizeHistory(tag: string) {
    tag = tag.toLowerCase();
    if (this._tagHistory.includes(tag)) {
      this._tagHistory = this._tagHistory.filter((oldTag) => oldTag !== tag);
    }
    this._tagHistory.unshift(tag);
    this._tagHistory = this._tagHistory.splice(0, 10);
  }
  searchTag(tag: string): void {
    if (tag.trim().length === 0) return;
    this.organizeHistory(tag);
    const params = new HttpParams()
      .set('api_key', this.apiKey)
      .set('q', tag)
      .set('limit', '10');
    this.http
      .get<SearchResponse>(`https://api.giphy.com/v1/gifs/search`, { params })
      .subscribe((res) => {
        this.gifList = res.data;
      });
  }
}
