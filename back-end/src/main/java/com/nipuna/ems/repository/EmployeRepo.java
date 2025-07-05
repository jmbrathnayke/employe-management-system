package com.nipuna.ems.repository;

import com.nipuna.ems.model.EmployeModel;
import org.springframework.data.jpa.repository.JpaRepository;

public interface EmployeRepo extends JpaRepository<EmployeModel,Long> {

}
