import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from "@angular/router";
import { UserServiceService } from "../services/user-service.service";
import { Observable } from "rxjs";
import { Injectable } from "@angular/core";

@Injectable({
    providedIn: 'root'
})
export class AuthGuard implements CanActivate {
    constructor(private auth: UserServiceService, private router: Router) { }
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
        var userInfo = this.auth.loadUserFromLocalStorage();
        if (route.data['userType'] === 'guest') {
            return true;
        } else if (route.data['userType'] === 'logged-in') {
            if (userInfo.userID > 0) return true;
            this.router.navigate(['/login'])
            return false;
        }
        this.router.navigate(['/']);
        return false;
    }
}
