import { Injectable } from '@angular/core';
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { AngularFireAuth } from '@angular/fire/compat/auth';


@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor(private auth: AngularFireAuth) { }

  async uploadFile(file: File): Promise<string> {
    const storage = getStorage();
    // const userId = (await this.auth.currentUser)?.uid; // Puedes obtener el ID del usuario si estás autenticado
    // const filePath = `imagenes/${userId}/${file.name}`;

    const filePath = `imagenes/registro/${file.name}`;
    const storageRef = ref(storage, filePath);
    const uploadTask = uploadBytesResumable(storageRef, file);

    return new Promise((resolve, reject) => {
      uploadTask.on('state_changed',
        null,
        (error) => reject(error),
        async () => {
          const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
          resolve(downloadURL);
        }
      );
    });
  }
}
