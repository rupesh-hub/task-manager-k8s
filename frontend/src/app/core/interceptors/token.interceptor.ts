import { HttpInterceptorFn } from '@angular/common/http';

export const tokenInterceptor: HttpInterceptorFn = (req, next) => {
  // Step 1: Retrieve the user from localStorage and parse it.
  const user = localStorage.getItem('user');
  const accessToken = user ? JSON.parse(user).access_token : null; // Parse and get the access_token

  // Step 2: If access token exists, modify the request to include the Authorization header.
  if (accessToken) {
    req = req.clone({
      setHeaders: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
  }

  // Step 3: Pass the modified request to the next handler.
  return next(req);
};
