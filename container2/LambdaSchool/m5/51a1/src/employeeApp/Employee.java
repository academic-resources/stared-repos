package employeeApp;

public class Employee {
    // fields first
    private static int maxID = 0;
    private int employeeID;
    private String firstName;
    private String lastName;
    private double salary;
    private boolean has401K;
    private int companyID;
    private int healthPlanID;

    // constructor
    // initial state of the object

    public Employee(String firstName, String lastName, double salary, boolean has401K, int companyID, int healthPlanID) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.salary = salary;
        this.has401K = has401K;
        this.companyID = companyID;
        this.healthPlanID = healthPlanID;


    }
    public int getID(){
        return employeeID;
    }

    // methods == getters & setters
    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getFirstName() {
        return firstName;
    }

    public void setLastName(String lastName){
        this.lastName = lastName;
    }

    public String getLastName(){
        return lastName;
    }

    public void setSalary(double salary){
        this.salary = salary;
    }

    public double getSalary(){
        return salary;
    }

    public void setHas401K(boolean has401K){
        this.has401K = has401K;
    }

    public boolean getHas401K(){
        return has401K;
    }
    
    public void setCompanyID(int companyID){
        this.companyID = companyID;
    }

    public int getCompanyID(){
        return companyID;
    }
    
    public void setHealthPlanID(int healthPlanID){
        this.healthPlanID = healthPlanID;
    }

    public int getHealthPlanID(int healthPlanID){
        return healthPlanID;
    }

    public String getName(){
        return firstName + " " +lastName;
    }
    @Override
    public String toString(){
        String rtnStr = "employeeID: " + employeeID + "\n" + 
                        "lastName: " + lastName + "\n" + 
                        "firstName: " + firstName + "\n" + 
                        "salary: " + salary + "\n" + 
                        "has401k: " + has401K + "\n" + 
                        "companyID: " + companyID + "\n" + 
                        "healthPlanID: " + healthPlanID;
        return rtnStr;
    }

    // methods == other

}