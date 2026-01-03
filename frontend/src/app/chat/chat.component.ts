import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpDownloadProgressEvent, HttpEventType } from '@angular/common/http';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css'],
})
export class ChatComponent implements OnInit {
  query: string = '';
  response: any;
  progress: boolean = false;

  constructor(private http: HttpClient) {}

  ngOnInit(): void {}

  askAgent(): void {
    this.response = '';
    this.progress = true;
    this.http
      .get('http://localhost:8085/askAgent?query=' + this.query, {
        responseType: 'text',
        observe: 'events',
        reportProgress: true,
      })
      .subscribe({
        next: (evt) => {
          if (evt.type === HttpEventType.DownloadProgress) {
            this.response =
              (evt as HttpDownloadProgressEvent).partialText || '';
          }
        },
        error: (err) => {
          console.error(err);
          this.progress = false;
        },
        complete: () => {
          this.progress = false;
        },
      });
  }
}
