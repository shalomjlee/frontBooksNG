import { Component, OnInit } from '@angular/core';
import { BooksService } from '../books.service';
import { Book } from './books.model'
@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.css']
})
export class BooksComponent implements OnInit {
  books: Book[] = [];
  bookData: Book = { title: '',
    subtitle: '',
    author: '',
    publisher: '',
    pages: 0,
    description: '',
    website: '',
    inCart: false,
    price: 0,
    id: 0 };
  constructor(
    private booksService: BooksService
    ) { }

  ngOnInit(): void {
    this.fillBookList()
  }

  fillBookList() {
    this.booksService.getBooks().subscribe(payload => {
      this.books = payload;
    });
  }
  eliminateBook(id:number) {
    this.booksService.deleteBook(id).subscribe(payload => {
      this.books = this.books.filter((book) => {
        return book.id != id
      } 
      )
    })
  }

  createBook(bookData: Book){
    this.booksService.addBook(bookData).subscribe(payload => {
      this.fillBookList()
    })
  }
}
