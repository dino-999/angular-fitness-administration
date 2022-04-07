import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { ChatService } from './chat.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit {
  chats:any;
  isLoading = true;
  constructor(private db: AngularFirestore,private chat:ChatService,private router: Router) {
    const things = db.collection('chats').doc('2Htc7WDHnwmECzTzBZNf').collection('messages').valueChanges();
      things.subscribe(console.log);
   }

  ngOnInit(): void {
    this.chat.getChatRooms().subscribe({
      next:(res)=>{
        this.isLoading=false;
        this.chats= res;
      },
      error:(err)=>{alert('Error occuerd')}
    });
  }

  openChat(id:string){
    this.router.navigate(['chat',id]);
  }

}
