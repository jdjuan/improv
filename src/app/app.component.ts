import { Component } from '@angular/core';
import {
  Firestore,
  collectionData,
  collection,
  addDoc,
  CollectionReference,
  getCountFromServer,
  query,
  orderBy,
  doc,
  deleteDoc,
  PartialWithFieldValue,
  QueryDocumentSnapshot,
} from '@angular/fire/firestore';

export interface Message {
  text: string;
  createdAt: number;
  id?: string;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  messagesRef: CollectionReference<Message>;
  messageCount: number = 0;
  messages: Message[] = [];
  readonly COLLECTION_NAME = 'messages';

  constructor(private db: Firestore) {
    this.messagesRef = collection(db, this.COLLECTION_NAME).withConverter(this.converter<Message>());
    collectionData(query(this.messagesRef, orderBy('createdAt')), { idField: 'id' }).subscribe(
      (data) => (this.messages = data)
    );
    this.getMessageCount();
  }

  converter = <T>() => ({
    toFirestore: (data: PartialWithFieldValue<T>) => data,
    fromFirestore: (snap: QueryDocumentSnapshot) => snap.data() as T,
  });

  async addMessage(event: Event) {
    const input = event.target as HTMLInputElement;
    const createdAt = new Date().getTime();
    await addDoc(this.messagesRef, { text: input.value, createdAt });
    await this.getMessageCount();
    input.value = '';
  }

  async getMessageCount() {
    this.messageCount = (await getCountFromServer(query(this.messagesRef))).data().count;
  }

  async eraseAllMessages() {
    this.messages.forEach(async ({ id }) => deleteDoc(doc(this.db, this.COLLECTION_NAME, id ?? '')));
  }
}
