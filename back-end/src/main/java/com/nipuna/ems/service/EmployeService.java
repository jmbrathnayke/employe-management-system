package com.nipuna.ems.service;


import com.nipuna.ems.model.EmployeModel;
import com.nipuna.ems.repository.EmployeRepo;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;


import java.util.List;
import java.util.Optional;

@Service
@AllArgsConstructor
@NoArgsConstructor
public class EmployeService {

    @Autowired
    private EmployeRepo employerepo;

    //Add employee
    public EmployeModel addEmploye(EmployeModel employe){
        return employerepo.save(employe);
    }

    //get all employe
    public List<EmployeModel> getAllEmployee(){
        return employerepo.findAll();
    }

    //get employe by id
    public Optional<EmployeModel> getEmployeById(int id){
        return employerepo.findById((long) id);
    }

    //Update employee
    public EmployeModel updateEmploye(int id, EmployeModel updatedEmploye) {
        Optional<EmployeModel> existingEmployeOpt = employerepo.findById((long) id);
        if (existingEmployeOpt.isPresent()) {
            EmployeModel existing = existingEmployeOpt.get();

            // Update fields
            existing.setFirst_name(updatedEmploye.getFirst_name());
            existing.setLast_name(updatedEmploye.getLast_name());
            existing.setEmail(updatedEmploye.getEmail());
            existing.setPhone_number(updatedEmploye.getPhone_number());
            existing.setAddress(updatedEmploye.getAddress());
            existing.setGender(updatedEmploye.getGender());
            existing.setDate_of_birth(updatedEmploye.getDate_of_birth());
            existing.setAge(updatedEmploye.getAge());
            existing.setId(updatedEmploye.getId());
            existing.setJob_title(updatedEmploye.getJob_title());
            existing.setDepartment(updatedEmploye.getDepartment());
            existing.setSalary(updatedEmploye.getSalary());
            existing.setEmp_type(updatedEmploye.getEmp_type());

            return employerepo.save(existing);
        } else {
            throw new RuntimeException("Employee not found with ID: " + id);
        }
    }

    //Delete employee
    public void deleteEmploye(int id) {
        if (employerepo.existsById((long) id)) {
            employerepo.deleteById((long) id);
        } else {
            throw new RuntimeException("Cannot delete. Employee not found with ID: " + id);
        }
    }
}
