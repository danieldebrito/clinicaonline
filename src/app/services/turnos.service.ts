import { Injectable } from '@angular/core';
import {
  collection,
  collectionData,
  deleteDoc,
  doc,
  docData,
  Firestore,
  orderBy,
  query,
  setDoc,
  updateDoc,
  where,
} from '@angular/fire/firestore';
import { catchError, map, Observable, throwError } from 'rxjs';
import { Especialista } from '../class/usuarios/especialista';
import { Especialidad } from '../class/especialidad';
import { Paciente } from '../class/usuarios/paciente';
import { Turno } from '../class/turno';

@Injectable({
  providedIn: 'root',
})
export class turnosService {

  public turnoPaciente: Paciente = { email: '', password: '' };
  public turnoAtencion: Turno = {};

  constructor(private firestore: Firestore) {}

  public addItem(item: Turno) {
    const col = collection(this.firestore, 'turnos');
    const newDoc = doc(col);

    item.id = newDoc.id; // guardo el id del documento que crea firebase
    setDoc(newDoc, item);
  }

  public getItems(): Observable<Turno[]> {
    const col = collection(this.firestore, 'turnos');
    const queryObservable = query(col, orderBy('fecha')); // ordenar por nombre
    const observable = collectionData(queryObservable).pipe(
      map((res) => {
        return res as Turno[];
      }),
      catchError((err) => {
        console.error('Error obteniendo datos:', err);
        return throwError(() => err);
      })
    );
    return observable;
  }

  public getItemById(id: string): Observable<Turno> {
    const col = collection(this.firestore, 'turnos');
    const documento = doc(col, id);

    const observable = docData(documento).pipe(
      map((res) => {
        return res as Turno;
      }),
      catchError((err) => {
        console.error('Error obteniendo el documento:', err);
        return throwError(() => err);
      })
    );
    return observable;
  }

  public update(id: string, Item: any) {
    const col = collection(this.firestore, 'turnos');
    const documento = doc(col, id);

    updateDoc(documento, Item);
  }

  public delete(id: string) {
    const col = collection(this.firestore, 'turnos');
    const documento = doc(col, id);

    deleteDoc(documento);
  }

  ///////////////////////////////////////////////////////////////////////////////////

  public getTurnosByEspecialistaAndEspecialidad(especialista: Especialista, especialidad: Especialidad) {
    const colRef = collection(this.firestore, 'turnos');

    // Create a query against the collection.
    const q = query(
      colRef,
      where('especialista.uid', '==', especialista.uid),
      where('especialidad.id', '==', especialidad.id)
    );

    return q;
  }
}
