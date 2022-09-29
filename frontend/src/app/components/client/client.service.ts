import { Product } from './../product/product.model';
import { catchError, EMPTY, map, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Injectable } from '@angular/core';
import { Client } from './client.model';

@Injectable({
  providedIn: 'root'
})
export class ClientService {

  baseUrl= "http://localhost:3001/clients"

  constructor(private snackBar: MatSnackBar,
    private http:HttpClient) { }

  showMessage(msg: string, isError: boolean = false): void{
    this.snackBar.open(msg, 'X',{
      duration: 3000,
      horizontalPosition: "right",
      verticalPosition: "top",
      panelClass: isError ? ['msg-error'] : ['msg-success']
    })
  }

  create(client:Client):Observable<Client>{
    return this.http.post<Client>(this.baseUrl, client)
  }

  read(): Observable<Client[]>{
    return this.http.get<Client[]>(this.baseUrl).pipe(
      map(obj=> obj),
      catchError(e=> this.errorHandler(e))
    )
  }

  errorHandler(e: any): Observable<any>{
    this.showMessage("Ocorreu um erro!", true);
    return EMPTY;
  }



}
