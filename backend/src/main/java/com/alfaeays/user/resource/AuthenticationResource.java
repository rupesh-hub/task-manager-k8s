package com.alfaeays.user.resource;

import com.alfaeays.shared.GlobalResponse;
import com.alfaeays.user.entity.User;
import com.alfaeays.user.model.AuthenticationRequest;
import com.alfaeays.user.model.RegistrationRequest;
import com.alfaeays.user.service.AuthenticationService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping(path = "/authentication")
@RequiredArgsConstructor
public class AuthenticationResource {

    private final AuthenticationService authenticationService;

    @PostMapping("/sign-in")
    public ResponseEntity<GlobalResponse<?>> authenticate(@RequestBody @Valid AuthenticationRequest request) {
        return ResponseEntity.ok(authenticationService.authenticate(request));
    }

    @PostMapping("/sign-up")
    @ResponseStatus(HttpStatus.ACCEPTED)
    public ResponseEntity<GlobalResponse<?>> register(@RequestBody @Valid RegistrationRequest request) {
        return new ResponseEntity<>(authenticationService.register(request), HttpStatus.OK);
    }

    @GetMapping("/sign-out")
    public ResponseEntity<GlobalResponse<?>> logout(Authentication authentication) {
        authenticationService.logout((User) authentication.getPrincipal());
        return ResponseEntity.ok(GlobalResponse.success("Logged out successfully."));
    }

}