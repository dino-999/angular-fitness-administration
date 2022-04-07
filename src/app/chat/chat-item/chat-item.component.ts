import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-chat-item',
  templateUrl: './chat-item.component.html',
  styleUrls: ['./chat-item.component.scss']
})
export class ChatItemComponent implements OnInit {

  @Input() chat: any;
  user:any;
  constructor(private router:Router,private auth:AuthService) { }

  ngOnInit(): void {
    console.log(this.chat.users.user)
    this.auth.getUser(this.chat.users.user).subscribe({
      next: (res) => {
        this.user = res
      },
      error: (err) => {alert(err)}
    })
    
  }

  openChat(){
    this.router.navigate(['chat',this.chat.id])
  }

}
