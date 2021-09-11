package com.lambdaschool.j51e1;

public class Dime extends AbstractPiggyBank {
    public double amount;
    public int quantity;

    public Dime(int quantity) {
        this.amount = 0.1;
        this.quantity = quantity;
    }

    public Dime() {
        this.amount = 0.1;
        this.quantity = 1;
    }

    public double getAmount() {
        return amount;
    }

    public void setAmount() {
        this.amount = 0.10;
    }

    public int getQuantity() {
        return quantity;
    }

    public void setQuantity(int quantity) {
        this.quantity = quantity;
    }

    public void setQuantity() {
        setQuantity(1);
    }

    public double setAddReturnValue(double amount, int quantity) {
        return setAddAmount(amount * quantity);
    }

    public double setSubtractReturnValue(double amount, int quantity) {
        return setSubtractAmount(amount * quantity);
    }

    public String setReturnQuantity() {
        if (this.quantity == 1) {
            return "1 Dime";
        } else
            return this.quantity + " Dimes";

    }
}