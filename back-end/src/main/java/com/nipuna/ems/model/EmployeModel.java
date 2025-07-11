package com.nipuna.ems.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.Date;

@Entity
@Table(name = "employees")
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class EmployeModel {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int emp_id;
    private String first_name;
    private String last_name;
    private String email;
    private String phone_number;
    private String address;
    private String gender;
    private Date date_of_birth;
    private int age;
    private String id;

    private String job_title;
    private String department;
    private Double salary;
    private String emp_type;

}
