import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';
import { ChatService } from '../chat.service';

@Component({
  selector: 'app-chat-room',
  templateUrl: './chat-room.component.html',
  styleUrls: ['./chat-room.component.scss']
})
export class ChatRoomComponent implements OnInit {
  Chat : any;
  Messages : any;
  newMsg: string;
  chatId: string;
  userData: any;
  adminData: any;
  constructor(private route: ActivatedRoute,private chat:ChatService,private auth:AuthService) { }

  ngOnInit(): void {
    this.chatId = this.route.snapshot.paramMap.get('id');
    console.log(this.chatId);
   this.chat.getMessagesForChat(this.chatId).subscribe({ 
     next: (res)=> {this.Messages=res; 
      console.log(this.Messages);},
     error:(err)=>{alert(err)}
   })
   
    this.auth.getCurrentUser().subscribe({
      next:(res)=>{
        this.adminData=res
        console.log(this.adminData)
      },
      error: (err) => {alert(err)}
    })
    this.chat.getChat(this.chatId).subscribe({
      next: (res)=> {
        this.Chat=res;
        this.auth.getUser(this.Chat.users.user).subscribe({
          next: (res)=>{this.userData=res},
          error: (err) => {alert(err)}
        })
      },
      error:(err)=>{alert(err.message)}
    })
  }

  submit() {
    if (!this.newMsg) {
      return alert('you need to enter something');
    }
    this.chat.sendMessage(this.chatId, this.newMsg);
    this.newMsg = '';
    this.scrollBottom();
  }

  private scrollBottom() {
    setTimeout(() => window.scrollTo(0, document.body.scrollHeight), 500);
  }
  trackByCreated(i, msg) {
    return msg.createdAt;
  } 

}
