class Employee
    attr_reader :name, :title, :salary
    def initialize(name, title, salary, boss)
        @name = name
        @title = title
        @salary = salary
        @boss = boss
    end

    def bonus(multiplier)
        self.salary * multiplier
    end

end

class Manager < Employee

    attr_reader :employees

    def initialize(name, title, salary, boss)
        super(name, title, salary, boss)
        @employees = []
    end

    def add_employee(employee)
        @employees << employee
        #employee
    end

    def bonus(multiplier)
        sub_manager_salary(self) * multiplier
    end

    def sub_manager_salary(manager)
        sum = 0
        manager.employees.each do |employee|
            if employee.is_a?(Manager)
               sum += sub_manager_salary(employee) + employee.salary
            else
                sum += employee.salary
            end
        end
        sum
    end

end