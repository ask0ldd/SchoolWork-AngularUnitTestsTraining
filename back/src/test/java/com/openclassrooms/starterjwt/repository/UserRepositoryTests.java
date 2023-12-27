package com.openclassrooms.starterjwt.repository;

import java.time.LocalDateTime;
import java.util.Optional;

import org.assertj.core.api.Assertions;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.annotation.DirtiesContext;
import org.springframework.test.annotation.DirtiesContext.ClassMode;

import com.openclassrooms.starterjwt.models.User;

@SpringBootTest(classes = { com.openclassrooms.starterjwt.SpringBootSecurityJwtApplication.class })
@AutoConfigureTestDatabase(replace = AutoConfigureTestDatabase.Replace.NONE)
@DirtiesContext(classMode = ClassMode.AFTER_EACH_TEST_METHOD)
public class UserRepositoryTests {
    @Autowired
    private UserRepository userRepository;

    private LocalDateTime date;
    private User user1;

    @Test
    @DisplayName("Save() saves a User")
    public void SaveTeacher_ReturnSavedTeacher() {
        date = LocalDateTime.now();
        user1 = User.builder().id(2L).firstName("firstname").lastName("lastname").password("password")
                .email("email@email.com").build();
        userRepository.save(user1);

        Optional<User> collectedUser = userRepository.findById(2L);

        Assertions.assertThat(collectedUser.get()).isNotNull();
        Assertions.assertThat(collectedUser.get().getId()).isGreaterThan(0);
        Assertions.assertThat(collectedUser.get().getId()).isEqualTo(user1.getId());
        Assertions.assertThat(collectedUser.get().getFirstName()).isEqualTo(user1.getFirstName());
        Assertions.assertThat(collectedUser.get().getLastName()).isEqualTo(user1.getLastName());
        userRepository.delete(user1);
        System.out.println("ici : " + collectedUser.get());
        // !!! test if not in db anymore
    }
}
