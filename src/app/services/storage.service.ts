import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  private readonly tokenKey = 'token';
  private readonly expirationKey = 'tokenExpiration';

  constructor() { }

  setToken(token: string): void {
    localStorage.setItem(this.tokenKey, token);
    const expirationDate = new Date(Date.now() + 60 * 60 * 1000); // 60 minutes
    localStorage.setItem(this.expirationKey, expirationDate.toISOString());
  }

  getToken(): string | null {
    const expiration = localStorage.getItem(this.expirationKey);
    if (expiration && new Date(expiration) > new Date()) {
      return localStorage.getItem(this.tokenKey);
    }
    this.removeToken();
    return null;
  }

  removeToken(): void {
    localStorage.removeItem(this.tokenKey);
    localStorage.removeItem(this.expirationKey);
  }

  setClient(client: any): void {
    const clientString = JSON.stringify(client);
    localStorage.setItem('client', clientString);
  }

  getClient(): any | null {
    const clientString = localStorage.getItem('client');
    return clientString ? JSON.parse(clientString) : null;
  }

  removeClient(): void {
    localStorage.removeItem('client');
  }

  clearData(): void {
    localStorage.clear();
  }
}