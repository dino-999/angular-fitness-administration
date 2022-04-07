import { Injectable, OnInit } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { catchError, map, tap } from 'rxjs/operators';
import { throwError, BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { News } from '../news/news.model';
import { NewsService } from '../news/news.service';




@Injectable({ providedIn: 'root' })
export class DataService {

  readonly APIUrl="https://localhost:5001/";

  constructor(private http:HttpClient) { }

  getList(endpoint:string):Observable<any[]>{
    return this.http.get<any>(this.APIUrl+endpoint);
  }

  getSingle(endpoint:string,id:number):Observable<any>{
    return this.http.get<any>(this.APIUrl+endpoint+'/'+ id);
  }

  add(val:any,endpoint:string){
    return this.http.post(this.APIUrl+endpoint,val,{ headers: new HttpHeaders().set('Content-Type', 'application/json') });
  }

  update(val:any,endpoint:string,id: string){
    return this.http.put(this.APIUrl+endpoint + '/' + id,val,{ headers: new HttpHeaders().set('Content-Type', 'application/json') });
  }

  delete(val:any,endpoint:string){
    return this.http.delete(this.APIUrl+endpoint+"/"+val);
  }

    
}
