import { Injectable } from "@angular/core";
import { ApiService } from "./api.service";

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  constructor(private apiService: ApiService) {}

  login(username: string | null, password: string | null) {
    if (!username || !password) return;
    return this.apiService.login(username, password);
  }
}
