package com.daycare.daycare_api.repository;

import com.daycare.daycare_api.model.Child;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ChildRepository extends JpaRepository<Child, Long> {
}