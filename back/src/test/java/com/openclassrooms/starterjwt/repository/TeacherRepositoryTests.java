package com.openclassrooms.starterjwt.repository;

import java.time.LocalDateTime;
import java.util.Date;
import java.util.Optional;

import org.junit.jupiter.api.Test;
import org.assertj.core.api.Assertions;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.annotation.DirtiesContext;
import org.springframework.test.annotation.DirtiesContext.ClassMode;

import com.openclassrooms.starterjwt.models.Teacher;

@SpringBootTest(classes = { com.openclassrooms.starterjwt.SpringBootSecurityJwtApplication.class })
@AutoConfigureTestDatabase(replace = AutoConfigureTestDatabase.Replace.NONE)
@DirtiesContext(classMode = ClassMode.AFTER_EACH_TEST_METHOD)
public class TeacherRepositoryTests {
    @Autowired
    TeacherRepository teacherRepository;

    private Teacher teacher1;
    private LocalDateTime date;

    @Test
    public void SaveTeacher_ReturnSavedTeacher() {
        date = LocalDateTime.now();
        teacher1 = Teacher.builder().firstName("firstname").lastName("lastname").id(1L).createdAt(date)
                .updatedAt(date).build();
        teacherRepository.save(teacher1);

        Optional<Teacher> collectedTeacher = teacherRepository.findById(1L);

        Assertions.assertThat(collectedTeacher.get()).isNotNull();
        Assertions.assertThat(collectedTeacher.get().getId()).isGreaterThan(0);
        Assertions.assertThat(collectedTeacher.get().getId()).isEqualTo(teacher1.getId());
        Assertions.assertThat(collectedTeacher.get().getFirstName()).isEqualTo(teacher1.getFirstName());
        Assertions.assertThat(collectedTeacher.get().getLastName()).isEqualTo(teacher1.getLastName());
    }
}
