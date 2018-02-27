import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { MessagesService } from './messages.service';
import { catchError, map, tap } from 'rxjs/operators';
import { Hero } from './hero';
import { HEROES } from './mock-heroes';

@Injectable()
export class HeroService {

  private heroesUrl = '/api/heroes'

  constructor(
    private http: HttpClient,
    private messagesService: MessagesService
  ) { 
  }

  getHeroes(): Observable<Hero[]> {
    return this.http.get<Hero[]>(this.heroesUrl)
      .pipe(
        tap(_ => this.log(`fetched heroes`)),
        catchError(this.handleError('getHeroes', []))
      );  
  }

  getHero(id: number): Observable<Hero> {
    const url = `${this.heroesUrl}/${id}`;
    return this.http.get<Hero>(url)
      .pipe(
        tap(_ => this.log(`fetched hero id=${_.id}`)),
        catchError(this.handleError<Hero>(`getHero id=${id}`))
      ); 
  }

  searchHeroes(term: string): Observable<Hero[]> {
    if (!term.trim()) {
      return of([]);
    } 

    return this.http.get<Hero[]>(`api/heroes/?name=${term}`)
      .pipe(
        tap(_ => this.log(`found heroes matching "${term}"`)),
        catchError(this.handleError<Hero[]>('searchHeroes', []))
      );
  }

  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.log(error);
      this.log(`${operation} failed: ${error.message}`);
      return of(result as T);
    }
  } 

  private log(message: string) {
    this.messagesService.add('Hero Service: ' + message);
  }

}
