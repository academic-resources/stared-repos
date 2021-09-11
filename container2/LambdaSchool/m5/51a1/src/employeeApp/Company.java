package employeeApp;

public class Company{
    private static int maxID = 0;
    // final = can't be changed
    public final static double match401K = 0.05;
    public int id;
    public String name;
    public int debt;

    public Company(String name, int debt){
        maxID++;
        this.id = maxID;
        this.name = name;
        this.debt = debt;
    }

}