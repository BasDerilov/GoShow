import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LocalService {
  constructor() {}

  public saveData<Type>(key: string, value: Type) {
    localStorage.setItem(key, JSON.stringify(value));
  }

  public getData<Type>(key: string): Type | null {
    let data = localStorage.getItem(key);
    return data ? JSON.parse(data) : null;
  }
  public removeData(key: string) {
    localStorage.removeItem(key);
  }

  public clearData() {
    localStorage.clear();
  }
}
