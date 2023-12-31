package com.openclassrooms.starterjwt.repository;

import java.time.LocalDateTime;
import java.util.Iterator;
import java.util.List;
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

        // private LocalDateTime date = LocalDateTime.now();
        private User user1 = User.builder().id(2L).firstName("firstname").lastName("lastname").password("password")
                        .email("email@email.com").build();

        @Test
        @DisplayName("Save() saves a User")
        public void SaveUser_ReturnSavedUser() {
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

        @Test
        @DisplayName("FindAll() returns the 2 expected Users.") // !! encrypt password
        public void FindAllUsers() {
                userRepository.save(user1);
                List<User> users = userRepository.findAll();
                Iterator<User> it = users.iterator();
                User user1 = it.next();
                User user2 = it.next();
                Assertions.assertThat(user1).isNotNull();
                Assertions.assertThat(user1.getFirstName()).isEqualTo("Admin");
                Assertions.assertThat(user1.getLastName()).isEqualTo("Admin");
                Assertions.assertThat(user1.getEmail()).isEqualTo("yoga@studio.com");

                Assertions.assertThat(user2).isNotNull();
                Assertions.assertThat(user2.getFirstName()).isEqualTo("firstname");
                Assertions.assertThat(user2.getLastName()).isEqualTo("lastname");
                Assertions.assertThat(user2.getEmail()).isEqualTo("email@email.com");
        }

        @DisplayName("FindById() returns the expected User")
        @Test
        public void findById_ReturnOneTargetUser() {
                Optional<User> user1 = userRepository.findById(1L);
                Assertions.assertThat(user1.isPresent()).isTrue();
                Assertions.assertThat(user1.get().getId()).isEqualTo(1L);
                Assertions.assertThat(user1.get().getFirstName()).isEqualTo("Admin");
                Assertions.assertThat(user1.get().getLastName()).isEqualTo("Admin");
                Assertions.assertThat(user1.get().getEmail()).isEqualTo("yoga@studio.com");
        }

        @DisplayName("Delete() returns an empty Optional")
        @Test
        public void delete_ReturnAnEmptyOptional() {
                userRepository.save(user1);
                Optional<User> User = userRepository.findById(3L);
                Assertions.assertThat(User.isPresent()).isTrue();
                userRepository.deleteById(User.get().getId());
                Optional<User> postDeletionCollectedUser = userRepository.findById(3L);
                Assertions.assertThat(postDeletionCollectedUser.isEmpty()).isTrue();
        }

        @DisplayName("Update() replaces the expected User")
        @Test
        public void update_ReplaceTheExpectedUser() {
                userRepository.save(user1);
                Optional<User> user = userRepository.findById(2L);
                Assertions.assertThat(user.get().getId()).isEqualTo(2L);
                Assertions.assertThat(user.get().getFirstName()).isEqualTo("firstname");
                Assertions.assertThat(user.get().getLastName()).isEqualTo("lastname");
                Assertions.assertThat(user.get().getEmail()).isEqualTo("email@email.com");

                User replacementUser = User.builder().id(2L).firstName("firstnameRep").lastName("lastnameRep")
                                .password("passwordRep")
                                .email("emailRep@email.com").build();
                userRepository.save(replacementUser);
                Optional<User> updatedUser = userRepository.findById(2L);
                Assertions.assertThat(updatedUser.get().getId()).isEqualTo(2L);
                Assertions.assertThat(updatedUser.get().getFirstName())
                                .isEqualTo(replacementUser.getFirstName());
                Assertions.assertThat(updatedUser.get().getLastName())
                                .isEqualTo(replacementUser.getLastName());
                Assertions.assertThat(updatedUser.get().getEmail()).isEqualTo(replacementUser.getEmail());
        }
}
