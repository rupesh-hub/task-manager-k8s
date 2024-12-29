package com.alfaeays.user.model;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class AuthenticationRequest {

    @NotBlank(message = "email address is required.")
    @Email(message = "please enter a valid email address.")
    private String email;

    @NotBlank(message = "password is required.")
    private String password;

}
