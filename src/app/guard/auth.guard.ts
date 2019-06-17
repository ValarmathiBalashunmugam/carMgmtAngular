import { AuthService } from 'src/app/shared/services/AuthService/auth.service';
import { Injectable } from '@angular/core';
// tslint:disable-next-line: max-line-length
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
// tslint:disable-next-line: max-line-length
  constructor(private authService: AuthService, private router: Router, public route: ActivatedRoute) { }
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if (this.authService.isUser()) {
      return true;
    } else {
      this.router.navigate(['/login']);
      return false;  
    }
  }
}
