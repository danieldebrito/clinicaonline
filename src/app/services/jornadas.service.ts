import { Injectable } from '@angular/core';
import { collection, collectionData, deleteDoc, doc, docData, Firestore, orderBy, query, setDoc, updateDoc } from '@angular/fire/firestore';
import { catchError, map, Observable, throwError } from 'rxjs';
import { Jornada } from '../class/jornada';

@Injectable({
  providedIn: 'root'
})
export class JornadasService {
  constructor(private firestore: Firestore) { }

  public addItem(item: Jornada) {
    const col = collection(this.firestore, 'jornadas');
    const newDoc = doc(col);

    item.id = newDoc.id; // guardo el id del documento que crea firebase
    setDoc(newDoc, item);
  }

  public getItems(): Observable<Jornada[]> {
    const col = collection(this.firestore, 'jornadas');
    const queryObservable = query(col, orderBy('diaDeSemanaEnNumeros')); // ordenar por nombre
    const observable = collectionData(queryObservable).pipe(
      map(res => {
        return res as Jornada[];
      }),
      catchError(err => {
        console.error('Error obteniendo datos:', err);
        return throwError(() => err);
      })
    );
    return observable;
  }

  public getItemById(id: string): Observable<Jornada> {
    const col = collection(this.firestore, 'jornadas');
    const documento = doc(col, id);

    const observable = docData(documento).pipe(
      map(res => {
        return res as Jornada;
      }),
      catchError(err => {
        console.error('Error obteniendo el documento:', err);
        return throwError(() => err);
      })
    );
    return observable;
  }

  public update(id: string, Item: any) {
    const col = collection(this.firestore, 'jornadas');
    const documento = doc(col, id);

    updateDoc(documento, Item);
  }

  public delete(id: string) {
    const col = collection(this.firestore, 'jornadas');
    const documento = doc(col, id);

    deleteDoc(documento);
  }
}


