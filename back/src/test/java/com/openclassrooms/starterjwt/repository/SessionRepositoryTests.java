package com.openclassrooms.starterjwt.repository;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Date;
import java.util.ArrayList;
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

    private LocalDateTime date;

    @Test
    @DisplayName("Save() saves a Session")
    public void SaveSession_ReturnSavedSession() {
        date = LocalDateTime.now();
        Teacher teacher1 = Teacher.builder().firstName("firstname").lastName("lastname").id(3L).createdAt(date)
                .updatedAt(date).build();
        teacherRepository.save(teacher1);
        User user1 = User.builder().id(2L).firstName("firstname").lastName("lastname").password("password")
                .email("email@email.com").build();
        User user2 = User.builder().id(3L).firstName("firstname2").lastName("lastname2").password("password2")
                .email("email2@email.com").build();
        userRepository.save(user1);
        userRepository.save(user2);
        List<User> userList = new ArrayList<>();
        userList.add(user1);
        userList.add(user2);
        Session session = Session.builder().name("name").teacher(teacher1).description("description").date(new Date())
                .id(1L).users(userList).build();
        sessionRepository.save(session);
        Optional<Session> collectedSession = sessionRepository.findById(1L);
        Assertions.assertThat(collectedSession.get()).isNotNull();
        Assertions.assertThat(collectedSession.get().getId()).isGreaterThan(0);
        Assertions.assertThat(collectedSession.get().getId()).isEqualTo(session.getId());
    }
}
