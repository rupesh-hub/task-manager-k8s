import {CanActivateFn, Router} from '@angular/router';
import {AuthenticationService} from "../services/authentication.service";
import {inject} from "@angular/core";
import {map} from "rxjs";

export const authGuard: CanActivateFn = (route, state) => {
  const _authenticationService: AuthenticationService = inject(
    AuthenticationService
  );
  const router = inject(Router);

  return _authenticationService.isAuthenticated$
    .pipe(
      map((isAuthenticated: boolean) => {
        const loginUrl = '/login';
        const homeUrl = '/dashboard';

        if (isAuthenticated && state.url.includes('/login')) {
          router.navigateByUrl(homeUrl);
          return false;
        }

        if (!isAuthenticated && isProtectedRoute(state.url)) {
          router.navigateByUrl(loginUrl);
          return false;
        }

        return true;
      })
    );
};

// Helper function to determine if the route is protected
const isProtectedRoute = (url: string): boolean => {
  const protectedRoutes = ['/dashboard'];
  return protectedRoutes.some((route) => url.startsWith(route));
};
