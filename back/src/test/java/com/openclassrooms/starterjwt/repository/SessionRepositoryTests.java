package com.openclassrooms.starterjwt.repository;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Date;
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

import com.openclassrooms.starterjwt.models.Session;
import com.openclassrooms.starterjwt.models.Teacher;
import com.openclassrooms.starterjwt.models.User;

@SpringBootTest(classes = { com.openclassrooms.starterjwt.SpringBootSecurityJwtApplication.class })
@AutoConfigureTestDatabase(replace = AutoConfigureTestDatabase.Replace.NONE)
@DirtiesContext(classMode = ClassMode.AFTER_EACH_TEST_METHOD)
public class SessionRepositoryTests {

        @Autowired
        private SessionRepository sessionRepository;
        @Autowired
        private UserRepository userRepository;
        @Autowired
        private TeacherRepository teacherRepository;

        private LocalDateTime date = LocalDateTime.now();

        private Teacher teacher1 = Teacher.builder().firstName("firstname").lastName("lastname").id(3L).createdAt(date)
                        .updatedAt(date).build();
        private User user1 = User.builder().id(2L).firstName("firstname").lastName("lastname").password("password")
                        .email("email@email.com").build();
        private User user2 = User.builder().id(3L).firstName("firstname2").lastName("lastname2").password("password2")
                        .email("email2@email.com").build();

        @Test
        @DisplayName("Save() saves a Session")
        public void SaveSession_ReturnSavedSession() {
                teacherRepository.save(teacher1);
                userRepository.save(user1);
                userRepository.save(user2);
                List<User> userList = new ArrayList<>();
                userList.add(user1);
                userList.add(user2);
                Session session = Session.builder().name("name").teacher(teacher1).description("description")
                                .date(new Date())
                                .id(1L).users(userList).build();
                sessionRepository.save(session);
                Optional<Session> collectedSession = sessionRepository.findById(1L);
                Assertions.assertThat(collectedSession.get()).isNotNull();
                Assertions.assertThat(collectedSession.get().getId()).isGreaterThan(0);
                Assertions.assertThat(collectedSession.get().getId()).isEqualTo(session.getId());
        }

        @Test
        @DisplayName("FindAll() returns the 2 expected Sessions.")
        public void FindAllSessions() {
                teacherRepository.save(teacher1);
                userRepository.save(user1);
                userRepository.save(user2);
                List<User> userList = new ArrayList<>();
                userList.add(user1);
                userList.add(user2);
                Session session1 = Session.builder().name("name").teacher(teacher1).description("description")
                                .date(new Date())
                                .id(1L).users(userList).build();
                sessionRepository.save(session1);
                Session session2 = Session.builder().name("name2").teacher(teacher1).description("description2")
                                .date(new Date())
                                .id(2L).users(userList).build();
                sessionRepository.save(session2);
                List<Session> sessions = sessionRepository.findAll();
                Iterator<Session> it = sessions.iterator();
                Session retrievedSession1 = it.next();
                Session retrievedSession2 = it.next();
                Assertions.assertThat(retrievedSession1).isNotNull();
                Assertions.assertThat(retrievedSession2).isNotNull();
                // more assertions needed
        }

        @DisplayName("FindById() returns the expected Session")
        @Test
        public void findById_ReturnOneTargetSession() {
                teacherRepository.save(teacher1);
                userRepository.save(user1);
                userRepository.save(user2);
                List<User> userList = new ArrayList<>();
                userList.add(user1);
                userList.add(user2);
                Session session = Session.builder().name("name").teacher(teacher1).description("description")
                                .date(new Date())
                                .id(1L).users(userList).build();
                sessionRepository.save(session);
                Optional<Session> collectedSession = sessionRepository.findById(1L);
                Assertions.assertThat(collectedSession.get()).isNotNull();
                Assertions.assertThat(collectedSession.get().getId()).isGreaterThan(0);
                Assertions.assertThat(collectedSession.get().getId()).isEqualTo(session.getId());
        }

        @DisplayName("Delete() returns an empty Optional")
        @Test
        public void delete_ReturnAnEmptyOptional() {
                teacherRepository.save(teacher1);
                userRepository.save(user1);
                userRepository.save(user2);
                List<User> userList = new ArrayList<>();
                userList.add(user1);
                userList.add(user2);
                Session session = Session.builder().name("name").teacher(teacher1).description("description")
                                .date(new Date())
                                .id(1L).users(userList).build();
                sessionRepository.save(session);
                Optional<Session> collectedSession = sessionRepository.findById(1L);
                Assertions.assertThat(collectedSession.isPresent()).isTrue();
                sessionRepository.deleteById(collectedSession.get().getId());
                Optional<Session> postDeletionCollectedSession = sessionRepository.findById(1L);
                Assertions.assertThat(postDeletionCollectedSession.isEmpty()).isTrue();
        }

        @DisplayName("Update() replaces the expected Teacher")
        @Test
        public void update_ReplaceTheExpectedSession() {
                teacherRepository.save(teacher1);
                userRepository.save(user1);
                userRepository.save(user2);
                List<User> userList = new ArrayList<>();
                userList.add(user1);
                userList.add(user2);
                Session session = Session.builder().name("name").teacher(teacher1).description("description")
                                .date(new Date())
                                .id(1L).users(userList).build();
                sessionRepository.save(session);
                Optional<Session> collectedSession = sessionRepository.findById(1L);
                Assertions.assertThat(collectedSession.get()).isNotNull();
                Assertions.assertThat(collectedSession.get().getId()).isGreaterThan(0);
                Assertions.assertThat(collectedSession.get().getId()).isEqualTo(session.getId());
                Assertions.assertThat(collectedSession.get().getDescription())
                                .isEqualTo(session.getDescription());
                Assertions.assertThat(collectedSession.get().getName()).isEqualTo(session.getName());

                Session sessionReplacement = Session.builder().name("nameRep").teacher(teacher1)
                                .description("descriptionRep")
                                .date(new Date())
                                .id(1L).users(userList).build();
                sessionRepository.save(sessionReplacement);
                Optional<Session> updatedSession = sessionRepository.findById(1L);
                Assertions.assertThat(updatedSession.get()).isNotNull();
                Assertions.assertThat(updatedSession.get().getId()).isGreaterThan(0);
                Assertions.assertThat(updatedSession.get().getId()).isEqualTo(sessionReplacement.getId());
                Assertions.assertThat(updatedSession.get().getDescription())
                                .isEqualTo(sessionReplacement.getDescription());
                Assertions.assertThat(updatedSession.get().getName()).isEqualTo(sessionReplacement.getName());
        }

}
