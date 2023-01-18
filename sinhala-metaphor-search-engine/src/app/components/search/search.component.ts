import { HttpClient } from '@angular/common/http';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { SearchService } from 'src/app/services/search.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  @Output() resultEvent: EventEmitter<any> = new EventEmitter();
  aggregations: any[];
  hits: any[];

  query: string;
  searched: boolean;

  constructor(private searchService: SearchService, private http: HttpClient) { }

  ngOnInit() { }

  search() {
    this.searchService.search(this.query).subscribe({
      next: result => {
        this.resultEvent.emit(result.hits);
        this.aggregations = result.aggs;
        this.hits = result.hits;
        this.searched = true;
        console.log(result)
      }
    });
  }

  clear() {
    this.query = '';
    this.resultEvent.emit([]);
    this.searched = false;
  }

  filterByArtist(key: any) {
    const newArr: any[] = [];
    this.hits.forEach(hit => {
      if (hit._source.artist_si) {
        if (hit._source.artist_si === key) {
          newArr.push(hit);
        }
      }
    });
    this.resultEvent.emit(newArr);
  }

  filterByWriter(key: any) {
    const newArr: any[] = [];
    this.hits.forEach(hit => {
      if (hit._source.writer_si) {
        if (hit._source.writer_si === key) {
          newArr.push(hit);
        }
      }
    });
    this.resultEvent.emit(newArr);
  }

  filterByYear(key: any) {
    const newArr: any[] = [];
    this.hits.forEach(hit => {
      if (hit._source.year) {
        if (hit._source.year === key) {
          newArr.push(hit);
        }
      }
    });
    this.resultEvent.emit(newArr);
  }

  // filterByMusic(key: any) {
  //   const newArr: any[] = [];
  //   this.hits.forEach(hit => {
  //     if (hit._source.composer) {
  //       hit._source.artist.forEach((composer: any) => {
  //         if (composer === key) {
  //           newArr.push(hit);
  //         }
  //       });
  //     }
  //   });
  //   this.resultEvent.emit(newArr);
  // }
  //
  // filterByComposer(key: any) {
  //   const newArr: any[] = [];
  //   this.hits.forEach(hit => {
  //     if (hit._source.writer) {
  //       hit._source.writer.forEach((writer: any) => {
  //         if (writer === key) {
  //           newArr.push(hit);
  //         }
  //       });
  //     }
  //   });
  //   this.resultEvent.emit(newArr);
  // }
  //
  // filterByGenre(key: any) {
  //   const newArr: any[] = [];
  //   this.hits.forEach(hit => {
  //     if (hit._source.genre) {
  //       hit._source.genre.forEach((genre: any) => {
  //         if (genre === key) {
  //           newArr.push(hit);
  //         }
  //       });
  //     }
  //   });
  //   this.resultEvent.emit(newArr);
  // }
}
