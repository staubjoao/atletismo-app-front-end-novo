import { AuthService } from './services/auth.service';
import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit {
  public appPages: { title: string; url: string; icon: string; roles: string[] }[] = [
    { title: 'Home', url: '/home', icon: 'home', roles: ['TREINADOR', 'ATLETA'] },
    { title: 'Grupo', url: '/club-list', icon: 'people', roles: ['TREINADOR'] },
    { title: 'Evento', url: '/event-list', icon: 'flame', roles: ['TREINADOR', 'ATLETA'] },
    { title: 'Cronograma de treino', url: '/training-schedule', icon: 'calendar', roles: ['TREINADOR', 'ATLETA'] },
    { title: 'Atletas', url: '/list-users', icon: 'person', roles: ['TREINADOR'] },
    { title: 'Criar treino', url: '/excel-upload', icon: 'add', roles: ['TREINADOR'] },
  ];

  emailLogado = '';
  showMenu = true;
  userRole = '';
  filteredPages: { title: string; url: string; icon: string; roles: string[] }[] = [];

  constructor(private router: Router, private authService: AuthService) {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.checkRoute(event.urlAfterRedirects);
      }
    });
  }

  ngOnInit() {
    this.emailLogado = localStorage.getItem('email') || '';
    this.userRole = localStorage.getItem('role') || '';
    this.filteredPages = this.appPages.filter((page) => page.roles.includes(this.userRole));
  }

  checkRoute(url: string) {
    const noMenuRoutes = ['/login', '/sign-up'];
    this.showMenu = !noMenuRoutes.includes(url);
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
