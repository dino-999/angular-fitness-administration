import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root',
})
export class ChatService {
  constructor(
    private auth: AuthService,
    private afs: AngularFirestore,
    private router: Router
  ) {}

  getUsers() {
    return this.afs.collection<any>('users').snapshotChanges();
  }

  getChat(chatId) {
    return this.afs
      .collection<any>('chats')
      .doc(chatId)
      .snapshotChanges()
      .pipe(
        map((doc) => {
          return { id: doc.payload.id, ...doc.payload.data() };
        })
      );
  }

  getMessagesForChat(chatId) {
    return this.afs
      .doc('chats/' + chatId)
      .collection('messages')
      .valueChanges();
  }

  async sendMessage(chatId, text) {
    const uid = '9EAXrUIg5ffzH6ZBA7rAIkiMjwp1';
    const current = new Date();
    current.setHours(0);

    current.setMinutes(0);

    current.setSeconds(0);

    current.setMilliseconds(0);
    const data = {
      uid: uid,
      text,
      createdAt: current.getTime(),
    };

    if (uid) {
      this.afs.collection('chats').doc(chatId).collection('messages').add(data);
      console.log("added");
    }
  }

  getChatRooms() {
    return this.afs
      .collection<any>('chats')
      .snapshotChanges()
      .pipe(
        map((actions) => {
          return actions.map((a) => {
            const data = a.payload.doc.data();
            const id = a.payload.doc.id;
            return { id, ...data };
          });
        })
      );
  }
}
