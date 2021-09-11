require "byebug"

class Employee
    def initialize(name, title, salary, boss)
        @name, @title, @salary, @boss = 
        name, title, salary, boss
        @boss.hire(self) unless @boss.nil?
    end

    def bonus(multiplier)
        salary * multiplier
    end

    protected

    attr_accessor :name, :title, :salary, :boss
end

class Manager < Employee
    def initialize(name, title, salary, boss)
       super
       @employees = []
    end

    def bonus(multiplier)
      sum = 0
      @employees.each do |emp|
        sum += emp.salary + calculate_subs_salary(emp)
      end
      sum * multiplier
    end

    def calculate_subs_salary(employee)
      return 0 if !employee.is_a?(Manager)
      employee.employees.inject(0) do |acc, sub|
        acc + sub.salary + calculate_subs_salary(sub)
      end
    end

    def hire(employee)
      @employees << employee
    end

    protected

    attr_accessor :employees
end

ned = Manager.new("Ned", "Founder",	1000000	,	nil)
darren = Manager.new("Darren", "TA Manager", 78000, ned)
shawna = Employee.new("Shawna", "TA", 12000, darren)
david = Employee.new("David", "TA" , 10000,	darren)

p "ned - #{ned.bonus(5)}" # => 500_000
p "darren - #{darren.bonus(4)}" # => 88_000
p "shawna - #{shawna.bonus(3)}" # => 36_000
p "david #{david.bonus(3)}" # => 30_000
