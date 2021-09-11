const { Employee } = require('./Employee');

class Manager extends Employee {

  constructor(name, salary, title, manager) {
		super(name, salary, title, manager);
    this.employees = [];
  }

  addEmployee(employee) {

    this.employees.push(employee);
    return employee;
  }

  bonus(multiplier) {
    return (this.salary + this.totalSubsalary()) * multiplier;
  }
  
  totalSubsalary() {
		let totalSubsalary = 0;

    this.employees.forEach((employee) => {
      if (employee instanceof Manager) {
        totalSubsalary += employee.salary + employee.totalSubsalary();
      } else {
        totalSubsalary += employee.salary;
      }
    });

    return totalSubsalary;
  }
}

let hobbes = new Manager('Hobbes', 1000000, 'Founder');
let calvin = new Manager('Calvin', 130000, 'Director', hobbes);
let susie = new Manager('Susie', 100000, 'TA Manager', calvin);
lily = new Employee('Lily', 90000, 'TA', susie);
clifford = new Employee('Clifford', 90000, 'TA', susie);

console.log(hobbes.bonus(0.05)); //  70500
console.log(calvin.bonus(0.05)); // 20500
console.log(susie.bonus(0.05)); // 14000
console.log(lily.bonus(0.05)); // 4500
console.log(clifford.bonus(0.05)); // 4500

console.log(hobbes instanceof Manager) // true
console.log(lily instanceof Manager) // false
