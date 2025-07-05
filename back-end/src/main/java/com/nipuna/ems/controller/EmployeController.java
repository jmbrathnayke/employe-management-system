package com.nipuna.ems.controller;


import com.nipuna.ems.model.EmployeModel;
import com.nipuna.ems.service.EmployeService;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@AllArgsConstructor
@NoArgsConstructor
@RequestMapping("/employes")
public class EmployeController {

    @Autowired
    public EmployeService employeService;

    //get all employee
    @GetMapping
    public ResponseEntity<?> getAllEmployee(){
        return  ResponseEntity.ok(employeService.getAllEmployee());
    }

    //add employee
    @PostMapping
    public ResponseEntity<?> addEmploye(@RequestBody EmployeModel emplye){
        return ResponseEntity.ok(employeService.addEmploye(emplye));
    }

    //get employe by id
    @PutMapping("/{id}")
    public ResponseEntity<?> updateEmploye(@PathVariable int id, @RequestBody EmployeModel employe) {
        try {
            return ResponseEntity.ok(employeService.updateEmploye(id, employe));
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }

    //delete employe
    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteEmploye(@PathVariable int id) {
        try {
            employeService.deleteEmploye(id);
            return ResponseEntity.ok("Employee deleted successfully");
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }
}
