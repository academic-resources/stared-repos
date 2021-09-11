package employeeApp;

public class Main {
    // fields == information
    // methods  == do behaviors
    // javac file.java
    // cat file.class
    // jar cvfe empApp.jar employeeApp.Main employeeApp/*.class
    // java -jar empApp.jar


    public static void main (String[] args) {
        {
            System.out.println("*******************");
            HealthPlan h1 = new HealthPlan("My HealthPlan 1");
            HealthPlan h2 = new HealthPlan("My HealthPlan 2");

            Company c1 = new Company("A Quo Co.", 100000);
            Company c2 = new Company("WRTS", 50000);

            Employee emp1 = new Employee("Erica", "Ingram", 50000, true, c1.id, h1.getID());

            Employee emp2 = new Employee("Adam", "Ingram", 50000, true, c2.id, h2.getID());
            System.out.println("***End of Query Data***");
            System.out.println("*******************");

            System.out.println("***** Strings *****");
            String localString;
            localString = emp1.getFirstName() + " " + emp2.getLastName();
            System.out.println(localString);
            String noVowels = localString.toLowerCase().replaceAll("[a,e,i,o,u]", "_");
            System.out.println(noVowels);
            System.out.println("*******************");

            System.out.println();
            System.out.println("***** Numbers *****");
            System.out.println("Original / 5 " + (c1.debt / 5));
            System.out.println("Original / 7 " + (c1.debt / 7));
            System.out.println("Original / 7.0 " + (c1.debt / 7.0));
            System.out.println("Original / 7 " + ((double)c1.debt/ 7));
            System.out.println("Original mod 3 " + (c1.debt % 3));
            System.out.println();

/*
* Instantiate 2 customers
    * [ ] Jane with $45.25
    * [ ] Bob with $33.14
    (String name, long cashOnHand, long cashToAdd)
*/
    // Employee emp1 = new Employee("Erica", "Ingram", 50000, true, c1.id, h1.getID());

            Customer cJane = new Customer("Jane Doe", 45.25, 0);
            Customer cBob = new Customer("Bob Doe", 33.14, 0);

/*
* Instantiate 3 Vending Machines
    * [ ] Food
    * [ ] Drink
    * [ ] Office
(String name)
*/
            VendingMachine foodVM = new VendingMachine("Food");
            VendingMachine drinkVM = new VendingMachine("Drink");
            VendingMachine officeVM = new VendingMachine("Office");
/*
* Instantiate 5 snacks
    * [ ] In Vending Machine Food
        * [ ] 36 Chips at $1.75
        * [ ] 36 Chocolate Bar at $1.00
        * [ ] 30 Pretzel at $2.00
    * [ ] In Vending Machine Drink
        * [ ] 24 Soda at $2.50
        * [ ] 20 Water at $2.75
(String name, int vmID, int quantity, long cost, long total)
*/
            int vmFoodID = foodVM.getID();
            int vmDrinkID = drinkVM.getID();

            Snack snackChips = new Snack("Chips", vmFoodID, 36, 1.75, 36*1.75);
            Snack snackChocolateBar = new Snack("Chocolate Bar", vmFoodID, 36, 1.00, 36*1.00);
            Snack snackPretzel = new Snack("Pretzel", vmFoodID, 30, 2.00, 30*2.00);
            Snack snackSoda = new Snack("Soda", vmDrinkID, 24, 2.50, 24*2.50);
            Snack snackWater = new Snack("Water", vmDrinkID, 20, 2.75, 20*2.75);
/*
1. [ ] Customer 1 (Jane) buys 3 of snack 4 (Soda). Print Customer 1 (Jane) Cash on hand. Print quantity of snack 4 (Soda).
*/
            double newCash = (cJane.subtractCash(3*snackSoda.cost));
            double afterSnack = snackSoda.buySnacks(3);
            System.out.println(newCash + " " + afterSnack);

/*
1. [ ] Customer 1 (Jane) buys 1 of snack 3 (Pretzel). Print Customer 1 (Jane) Cash on hand. Print quantity of snack 3 (Pretzel).
*/
            System.out.println((cJane.subtractCash(1*snackPretzel.cost)) + " " + snackPretzel.buySnacks(1));


/*
1. [ ] Customer 2 (Bob) buys 2 of snack 4 (Sode). Print Customer 2 (Bob) Cash on Hand. Print quantity of snack 4 (Soda).
*/

            System.out.println((cBob.subtractCash(2*snackSoda.cost)) + " " + (snackPretzel.buySnacks(2)));
/*
1. [ ] Customer 1 (Jane) finds $10. Print Customer 1 (Jane) Cash on Hand.
*/

            System.out.println((cJane.addCash(10)));

/*
1. [ ] Customer 1 (Jane) buys 1 of snack 2 (Chocolate Bar). Print Customer 1 (Jane) Cash on Hand. Print quantity of snack 2 (Chocolate Bar).
*/
    // Snacks (String name, int vmID, int quantity, long cost, long total)
    // VMs (String name)
    // Customers (String name, long cashOnHand, long cashToAdd)
    // Customer cJane = new Customer("Jane Doe", 45.25, 0);
    // Customer cBob = new Customer("Bob Doe", 33.14, 0);
            System.out.println((cJane.subtractCash(1*snackChocolateBar.cost)) + " " + (snackChocolateBar.buySnacks(1)));

/*
1. [ ] Add 12 more items to snack 3 (Pretzel). Print quantity of snack 3 (Pretzel).
*/
            System.out.println((snackPretzel.addQuantity(12)));

/*
1. [ ] Customer 2 (Bob) buys 3 of snack 3 (Pretzel). Print Customer 2 (Bob) Cash on hand. Print quantity of snack 3 (Pretzel).
*/
            System.out.println((cBob.subtractCash(3*snackPretzel.cost)) + " " + (snackPretzel.buySnacks(3)));

/*
* Stretch Goals

    * [X] Display each snack with
        * [X] Name
        * [X] Vending Machine Name
        * [X] Quantity on hand
        * [X] Total cost of all of the quantities of this snack on hand
*/
            String vmFoodName = foodVM.name;
            String vmDrinkName = drinkVM.name;
            String sChips;
            sChips = snackChips.getName() + " " + vmFoodName + " " + snackChips.quantity+ " " + (snackChips.cost*snackChips.quantity);
            System.out.println(sChips);
            String sChocBar;
            sChocBar = snackChocolateBar.getName() + " " + vmFoodName + " " + snackChocolateBar.quantity+ " " + (snackChocolateBar.cost*snackChocolateBar.quantity);
            System.out.println(sChocBar);
            String sPretzels;
            sPretzels = snackPretzel.getName() + " " + vmFoodName + " " + snackPretzel.quantity+ " " + (snackPretzel.cost*snackPretzel.quantity);
            System.out.println(sPretzels);
            String sSoda;
            sSoda = snackSoda.getName() + " " + vmDrinkName + " " + snackSoda.quantity+ " " + (snackSoda.cost*snackSoda.quantity);
            System.out.println(sSoda);
            String sWater;
            sWater = snackWater.getName() + " " + vmDrinkName + " " + snackWater.quantity+ " " + (snackWater.cost*snackWater.quantity);
            System.out.println(sWater);


        }
    }
}