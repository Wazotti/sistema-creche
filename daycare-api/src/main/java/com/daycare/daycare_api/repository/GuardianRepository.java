package com.daycare.daycare_api.repository;

import com.daycare.daycare_api.model.Guardian;
import org.springframework.data.jpa.repository.JpaRepository;

public interface GuardianRepository extends JpaRepository<Guardian, Long> {
}
