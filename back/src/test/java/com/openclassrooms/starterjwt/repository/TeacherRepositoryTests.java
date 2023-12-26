package com.openclassrooms.starterjwt.repository;

import java.time.LocalDateTime;
import java.util.Date;
import java.util.Iterator;
import java.util.List;
import java.util.Optional;

import org.junit.jupiter.api.DisplayName;
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
        teacher1 = Teacher.builder().firstName("firstname").lastName("lastname").id(3L).createdAt(date)
                .updatedAt(date).build();
        teacherRepository.save(teacher1);

        Optional<Teacher> collectedTeacher = teacherRepository.findById(3L);

        Assertions.assertThat(collectedTeacher.get()).isNotNull();
        Assertions.assertThat(collectedTeacher.get().getId()).isGreaterThan(0);
        Assertions.assertThat(collectedTeacher.get().getId()).isEqualTo(teacher1.getId());
        Assertions.assertThat(collectedTeacher.get().getFirstName()).isEqualTo(teacher1.getFirstName());
        Assertions.assertThat(collectedTeacher.get().getLastName()).isEqualTo(teacher1.getLastName());
        teacherRepository.delete(teacher1);
        // !!! test if not in db anymore
    }

    @Test
    @DisplayName("FindAll() returns the 2 expected Messages.")
    public void FindAllTeachers() {
        List<Teacher> teachers = teacherRepository.findAll();
        Iterator<Teacher> it = teachers.iterator();
        Teacher teacher1 = it.next();
        Teacher teacher2 = it.next();
        Assertions.assertThat(teacher1).isNotNull();
        Assertions.assertThat(teacher1.getFirstName()).isEqualTo("Margot");
        Assertions.assertThat(teacher1.getLastName()).isEqualTo("DELAHAYE");
        Assertions.assertThat(teacher2).isNotNull();
        Assertions.assertThat(teacher2.getFirstName()).isEqualTo("Hélène");
        Assertions.assertThat(teacher2.getLastName()).isEqualTo("THIERCELIN");
    }
}
