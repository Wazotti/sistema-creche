package com.daycare.daycare_api.repository;

import com.daycare.daycare_api.model.Classroom;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ClassroomRepository extends JpaRepository<Classroom, Long> {
}
