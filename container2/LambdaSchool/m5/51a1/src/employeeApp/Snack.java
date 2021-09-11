package employeeApp;


public class Snack {
    
    // fields first
    private static int maxID = 0;
    public int id;
    public String name;
    public int vmID;
    public int quantity;
    public double cost;
    public double total;

    public Snack(String name, int vmID, int quantity, double cost, double total){
        maxID++;
        this.id = maxID;
        this.name = name;
        this.vmID = vmID;
        this.quantity = quantity;
        this.cost = cost;
        this.total = total;
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

    public void setCost(double cost){
        this.cost = cost;
    }

    public double getCost(){
        return cost;
    }

    public void setVMID(int vmID){
        this.vmID = vmID;
    }

    public int getVMID(){
        return vmID;
    }
    
    public void setQuantity(int quantity){
        this.quantity = quantity;
    }

    public int getQuantity(){
        return quantity;
    }

    public double addQuantity(int additionalQuantity){
        this.quantity += additionalQuantity;
        return this.quantity;
    }


    public double buySnacks(int numbertoBuy){
        // buy snack when given how many to buy
        this.quantity -= numbertoBuy;
        return this.quantity;
    }

    public double sumTotal(int cost, int quantity){
        // get total cost given a quantity
        this.total= this.cost*quantity;
        return this.total;
    }
}