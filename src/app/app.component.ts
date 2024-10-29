import { AuthService } from './services/auth.service';
import { Component } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  public appPages = [
    { title: 'Home', url: '/home', icon: 'home', roles: ['TREINADOR', 'ATHLETE'] },
    { title: 'Grupo', url: '/club-list', icon: 'people', roles: ['TREINADOR'] },
    {
      title: 'Modalidade',
      url: '/event-list',
      icon: 'flame',
      roles: ['TREINADOR', 'ATHLETE'],
    },
    {
      title: 'Cronograma de treino',
      url: '/training-schedule',
      icon: 'calendar',
      roles: ['TREINADOR', 'ATHLETE'],
    },
    { title: 'Atletas', url: '/list-users', icon: 'person', roles: ['TREINADOR'] },
    {title: 'Criar treino', url: '/excel-upload', icon: 'add', roles: ['TREINADOR'] },
  ];

  emailLogado = '';
  showMenu = true;
  userRole = '';

  constructor(private router: Router, private authService: AuthService) {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.checkRoute(event.urlAfterRedirects);
      }
    });

    this.emailLogado = localStorage.getItem('email')!;
    this.userRole = localStorage.getItem('role')!;
  }

  getFilteredPages() {
    return this.appPages.filter((page) => page.roles.includes(this.userRole));
  }

  checkRoute(url: string) {
    const noMenuRoutes = ['/login', '/sign-up'];
    this.showMenu = !noMenuRoutes.includes(url);
    console.log(this.showMenu);
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}