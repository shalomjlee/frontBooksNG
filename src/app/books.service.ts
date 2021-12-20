import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Book } from './books/books.model'
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';


const URL_PREFIX = "http://localhost:8082/api";

@Injectable({
  providedIn: 'root'
})
export class BooksService {

  constructor(private http: HttpClient) { }

  getBooks(): Observable<any> {
    return this.http.get(`http://localhost:8082/api/books`)
  }

  addBook(book: Book): Observable<any> {
    return this.http.post(`${URL_PREFIX}/books`, book)
    .pipe(
      catchError((error: HttpErrorResponse) => {
        console.log(error.message);
        return throwError("Error while creating a book" + error.message)
      })
    )
  }

  deleteBook(id:number) {
    return this.http.delete(`${URL_PREFIX}/books/${id}`)
    .pipe(
      catchError((error: HttpErrorResponse) => {
      console.log(error.message);
      return throwError("Error while deleting a book" + error.message)

    }))
  }

  // updateBook(id:number) {
  //   return this.http.patch(`${URL_PREFIX}/books/${id}`)
  // }
}
