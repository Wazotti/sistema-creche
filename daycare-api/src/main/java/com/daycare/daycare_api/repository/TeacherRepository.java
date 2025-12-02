package com.daycare.daycare_api.repository;

import com.daycare.daycare_api.model.Teacher;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TeacherRepository extends JpaRepository<Teacher, Long> {
}
