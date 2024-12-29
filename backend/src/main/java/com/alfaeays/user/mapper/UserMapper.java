package com.alfaeays.user.mapper;

import com.alfaeays.user.entity.User;
import com.alfaeays.user.model.RegistrationRequest;
import com.alfaeays.user.model.UserResponse;

public class UserMapper {

    public static User toEntity(final RegistrationRequest request) {

        return User.builder()
                .firstName(request.getFirstName())
                .lastName(request.getLastName())
                .email(request.getEmail())
                .password(request.getPassword())
                .build();

    }

    public static UserResponse toResponse(final User user) {

        return UserResponse
                .builder()
                .firstName(user.getFirstName())
                .lastName(user.getLastName())
                .email(user.getEmail())
                .createdOn(user.getCreatedOn())
                .modifiedOn(user.getModifiedOn())
                .createdBy(user.getCreatedBy())
                .modifiedBy(user.getModifiedBy())
                .enabled(user.getEnabled())
                .build();
    }

}
