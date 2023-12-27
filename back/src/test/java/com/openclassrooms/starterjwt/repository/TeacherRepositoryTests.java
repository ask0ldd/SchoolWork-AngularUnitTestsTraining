package com.openclassrooms.starterjwt.repository;

import java.lang.reflect.Method;
import java.time.LocalDateTime;
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
    private Teacher teacherReplacement;
    private LocalDateTime date;

    @Test
    @DisplayName("Save() saves a Teacher")
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
        System.out.println("ici : " + collectedTeacher.get());
        // !!! test if not in db anymore
    }
    // testSave(row, )

    @Test
    @DisplayName("FindAll() returns the 2 expected Teachers.")
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

    @DisplayName("FindById() returns the expected Teacher")
    @Test
    public void findById_ReturnOneTargetTeacher() {
        Optional<Teacher> teacher = teacherRepository.findById(1L);
        Assertions.assertThat(teacher.isPresent()).isTrue();
        Assertions.assertThat(teacher.get().getId()).isEqualTo(1L);
        Assertions.assertThat(teacher.get().getFirstName()).isEqualTo("Margot");
        Assertions.assertThat(teacher.get().getLastName()).isEqualTo("DELAHAYE");
    }

    @DisplayName("Delete() returns an empty Optional")
    @Test
    public void delete_ReturnAnEmptyOptional() {
        teacher1 = Teacher.builder().firstName("firstname").lastName("lastname").id(3L).createdAt(date)
                .updatedAt(date).build();
        teacherRepository.save(teacher1);
        Optional<Teacher> teacher = teacherRepository.findById(3L);
        Assertions.assertThat(teacher.isPresent()).isTrue();
        teacherRepository.deleteById(teacher.get().getId());
        Optional<Teacher> postDeletionCollectedTeacher = teacherRepository.findById(3L);
        Assertions.assertThat(postDeletionCollectedTeacher.isEmpty()).isTrue();
    }

    @DisplayName("Update() replaces the expected Teacher")
    @Test
    public void update_ReplaceTheExpectedTeacher() {
        teacher1 = Teacher.builder().firstName("firstname").lastName("lastname").id(3L).createdAt(date)
                .updatedAt(date).build();
        // Method[] methods = Teacher.class.getMethods();
        // for (Method method : methods) {
        // System.out.println(method.getName());
        // }
        teacherRepository.save(teacher1);
        Optional<Teacher> teacher = teacherRepository.findById(3L);
        Assertions.assertThat(teacher.get().getId()).isEqualTo(3L);
        Assertions.assertThat(teacher.get().getFirstName()).isEqualTo("firstname");
        Assertions.assertThat(teacher.get().getLastName()).isEqualTo("lastname");

        teacherReplacement = Teacher.builder().firstName("firstnameRep").lastName("lastnameRep").id(3L).createdAt(date)
                .updatedAt(date).build();
        teacherRepository.save(teacherReplacement);
        Optional<Teacher> postUpdateCollectedTeacher = teacherRepository.findById(3L);
        Assertions.assertThat(postUpdateCollectedTeacher.get().getId()).isEqualTo(3L);
        Assertions.assertThat(postUpdateCollectedTeacher.get().getFirstName())
                .isEqualTo(teacherReplacement.getFirstName());
        Assertions.assertThat(postUpdateCollectedTeacher.get().getLastName())
                .isEqualTo(teacherReplacement.getLastName());
    }
}
