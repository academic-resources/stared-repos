package employeeApp;

public class Customer {
    private static int maxID = 0;
    public int id;
    public String name; 
    public double cashOnHand;
    public double cashToChange;

    public Customer(String name, double cashOnHand, double cashToChange){
        maxID++;
        this.id = maxID;
        this.name = name;
        this.cashOnHand = cashOnHand;
        this.cashToChange = cashToChange;
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

    public double setCashOnHand(double cashOnHand) {
        this.cashOnHand = cashOnHand;
        return this.cashOnHand;
    }

    public double getCashOnHand() {
        return cashOnHand;
    }
    public double addCash(double cashToChange){
        this.cashOnHand +=cashToChange;        
        // Customer can add cash.  
        return this.cashOnHand;
    }
    public double subtractCash(double cashToChange){        
        // Customer can buy given total cash used in purchase.
        // idk what this sentence means
        this.cashOnHand -=cashToChange;     
        return this.cashOnHand;   
    }

}