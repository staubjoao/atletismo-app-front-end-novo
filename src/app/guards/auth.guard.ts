import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    const token = localStorage.getItem('token');
    const userRole = localStorage.getItem('role');

    console.log("teste");

    return true;
  //   if (token && userRole) {
  //   //   const roles = next.data['roles'] as Array<string>;
  //   //   if (roles && roles.includes(userRole)) {
  //   //     return true;
  //   //   } else {
  //   //     console.log("teste");
  //   //     this.router.navigate(['/home']);
  //   //     return false;
  //   //   }
  //   // } else {
  //   //   console.log("teste1");
  //   //   this.router.navigate(['/login']);
  //   //   return false;
  //   // }
  }
}
