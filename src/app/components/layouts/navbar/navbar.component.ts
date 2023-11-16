import { Component, Input } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent {
  user: any;
  loading = false;
  constructor(private authS: AuthService) {}

  ngOnInit(): void {
    this.user = this.authS.getAuth();
  }

  logout() {
    this.loading = true;
    this.authS.logout();
  }
}
