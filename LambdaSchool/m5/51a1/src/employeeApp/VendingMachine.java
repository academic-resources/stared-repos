package employeeApp;

public class VendingMachine {
    private static int maxID = 0;
    public int id;
    public String name;    

    public VendingMachine(String name){
        maxID++;
        this.id = maxID;
        this.name = name;
    }

    public int getID(){
        return id;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getName() {
        return name;
    }
}