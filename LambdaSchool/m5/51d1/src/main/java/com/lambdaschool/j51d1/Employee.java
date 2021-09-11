package com.lambdaschool.j51d1;

import java.util.concurrent.atomic.AtomicLong;

public class Employee {
    private static final AtomicLong counter= new AtomicLong();
    private long id;
    private String firstName;
    private String lastName;
    private double salary;
    private boolean has401K;
    private int companyID;
    private int healthPlanID;

    public Employee(String firstName, String lastName, double salary, boolean has401K,
                    int companyID, int healthPlanID) {
        this.id=counter.incrementAndGet();
        this.firstName = firstName;
        this.lastName = lastName;
        this.salary = salary;
        this.has401K = has401K;
        this.companyID = companyID;
        this.healthPlanID = healthPlanID;
    }

    public Employee(Employee toClone) {
        this.id=toClone.getId();
        this.firstName = toClone.getFirstName();
        this.lastName = toClone.getLastName();
        this.salary = toClone.getSalary();
        this.has401K = toClone.isHas401K();
        this.companyID = toClone.getCompanyID();
        this.healthPlanID = toClone.getHealthPlanID();
    }

    public long getId() {
        return id;
    }

    public String getFirstName() {
        return firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public double getSalary() {
        return salary;
    }

    public void setSalary(double salary) {
        this.salary = salary;
    }

    public boolean isHas401K() {
        return has401K;
    }


    public int getCompanyID() {
        return companyID;
    }


    public int getHealthPlanID() {
        return healthPlanID;
    }

    @Override
    public String toString() {
        return "Employee{" +
                "id=" + id +
                ", firstName='" + firstName + '\'' +
                ", lastName='" + lastName + '\'' +
                ", salary=" + salary +
                ", has401K=" + has401K +
                ", companyID=" + companyID +
                ", healthPlanID=" + healthPlanID +
                '}';
    }
}
