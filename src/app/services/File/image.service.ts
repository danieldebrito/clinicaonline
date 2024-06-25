import { Injectable } from '@angular/core';
import { Storage, ref, uploadBytes, listAll, getDownloadURL } from '@angular/fire/storage';

@Injectable({
  providedIn: 'root',
})
export class ImageService {
  downloadURL: any;

  constructor(private _storage: Storage) { }

  saveImage(image: File, uidUsuario: string) {
    var filePath = `${image.name}_${new Date().getTime()}`;

    const imgRef = ref(this._storage, `images/${uidUsuario}/${filePath}`);

    return uploadBytes(imgRef, image)
  }

  saveImages(images: File[], uidUsuario: string) {
    images.forEach(img => this.saveImage(img, uidUsuario))
  }

  async getImagesById(uid: string): Promise<string[]> {
    const urls: string[] = [];
    const imagesRef = ref(this._storage, `images/${uid}`);

    const result = await listAll(imagesRef);

    for (const item of result.items) {
      const downloadURL = await getDownloadURL(item);
      urls.push(downloadURL);
    }

    return urls;
  }

  getSingleImage(imageName: string) {
    const imageRef = ref(this._storage, `images/${imageName}`);

    getDownloadURL(imageRef)
      .then(url => {
        console.log(url);
        return url;
      })
      .catch(error => console.log(error));
  }
}
