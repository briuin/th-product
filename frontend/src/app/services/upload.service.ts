import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UploadService {
  private uploadUrl = 'http://localhost:8080/upload';
  constructor(private http: HttpClient) {}

  uploadImage(file: File): Observable<{ url: string }> {
    const formData = new FormData();
    formData.append('image', file);

    return this.http.post<{ url: string }>(this.uploadUrl, formData);
  }
}
