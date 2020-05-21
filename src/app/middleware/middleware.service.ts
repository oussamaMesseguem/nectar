import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { SpacyDep, SpacyEnt, SpacyResponse } from './middleware.model';

@Injectable({
  providedIn: 'root'
})
export class MiddlewareService {

  baseUrl = environment.middlewareBaseUrl;
  headers = { 'Content-Type': 'application/json' };

  constructor(private http: HttpClient) { }

  /**
   * The content must be a sentence.
   * @param text the content
   * @param lang the language
   */
  public dep(text: string, lang: string): Observable<SpacyDep> {
    const body = { text, model: lang };
    const headers = this.headers;
    return this.http.post<SpacyDep>(this.baseUrl + 'dep', body, { headers });
  }

  /**
   * The content must be a sentence.
   * @param text the content
   * @param lang the language
   */
  public ent(text: string, lang: string): Observable<SpacyEnt> {
    const body = { text, model: lang };
    const headers = this.headers;
    return this.http.post<SpacyEnt>(this.baseUrl + 'ent', body, { headers });
  }

  /**
   * The content must be a text.
   * @param text the content
   * @param lang the language
   */
  public sentsDep(text: string, lang: string): Observable<SpacyResponse[]> {
    const body = { text, model: lang };
    const headers = this.headers;
    return this.http.post<SpacyResponse[]>(this.baseUrl + 'sents_dep', body, { headers });
  }

  /**
   * The content must be a text.
   * @param text the content
   * @param lang the language
   */
  public sents(text: string, lang: string): Observable<string[]> {
    const body = { text, model: lang };
    const headers = this.headers;
    return this.http.post<string[]>(this.baseUrl + 'sents', body, { headers });
  }
}
