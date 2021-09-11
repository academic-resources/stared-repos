package com.lambdaschool.j51d1;

// import org.apache.coyote.Response;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;

@RestController
// Beans = POJOs managed by Spring
@RequestMapping("/data")
public class EmployeeController {
    // localhost:2019/data/employees
    @GetMapping(value = "/employees/all",
                produces = {"application/json"})

    public ResponseEntity<?> getAllEmployees() {
        j51d1.ourEmpList.empList.sort(
                (e1, e2) -> e1.getFirstName().compareToIgnoreCase(e2.getFirstName())
        );
        return new ResponseEntity<>(j51d1.ourEmpList, HttpStatus.OK);
    }

    // localhost:2019/data/employees/2
    // j51d1.ourEmpList.findEmployee(e ->(e.getId() == empID))
    @GetMapping(value = "/employee/{empID}",
                produces = {"application/json"})

    public ResponseEntity<?> getEmployeeByID(@PathVariable long empID) {
        return new ResponseEntity<>((j51d1.ourEmpList.findEmployee(e ->(e.getId() == empID))), HttpStatus.OK);
    }

    // localhost:2019/data/employees/s
    // j51d1.ourEmpList.findEmployee(e ->(e.getId() == empID))
    @GetMapping(value="/employees/{letter}",
                produces = {"application/json"})

    public ResponseEntity<?> getEmployeesbyFirstLetter(@PathVariable char letter){

        ArrayList<Employee> rtnEmps = j51d1.ourEmpList.findEmployees(
                e -> e.getFirstName().toUpperCase().charAt(0) ==
                        Character.toUpperCase((letter))
        );
        return new ResponseEntity<>(rtnEmps, HttpStatus.OK);


    }
}
