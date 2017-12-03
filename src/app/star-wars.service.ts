import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/map';


@Injectable()
export class StarWarsService {
  private characters = [];
  charactersChanged = new Subject<void>();

  constructor(private http: Http) {
  }

  fetchCharacters() {
    this.http.get('https://swapi.co/api/people/')
      .map((response: Response) => {
        const data = response.json();
        const extractedChars = data.results;
        return extractedChars.map((char) => {
          return {name: char.name};
        });
      })
      .subscribe(
        (data) => {
          console.log(data);
          this.characters = data;
          this.charactersChanged.next();
        }
      );
  }

  getCharacters() {
    return this.characters.slice();
  }
}
