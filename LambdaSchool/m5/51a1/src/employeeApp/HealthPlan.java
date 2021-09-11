package employeeApp;

public class HealthPlan {

    private static int maxID = 0;
    private int id;
    private String name;

    // constructor
    public HealthPlan(String name){
        this.name = name;
    }

    public int getID(){
        return id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name){
        this.name = name;
    }
}