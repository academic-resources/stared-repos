package com.lambdaschool.j51e1;

import java.text.DecimalFormat;

public class Quarter extends AbstractPiggyBank {
    public double amount;
    public int quantity;

    public Quarter(int quantity) {
        this.amount = 0.25;
        this.quantity = quantity;
    }

    public Quarter() {
        this.amount = 0.25;
        this.quantity = 1;
    }

    public double getAmount() {
        return amount;
    }

    public void setAmount() {
        this.amount = 0.25;
    }

    public int getQuantity() {
        return quantity;
    }

    public void setQuantity(int quantity) {
        this.quantity = quantity;
    }

    public void setQuantity() {
        setQuantity(1);
        ;
    }

    public double setAddReturnValue(double amount, int quantity) {
        return setAddAmount(amount * quantity);
    }

    public double setSubtractReturnValue(double amount, int quantity) {
        return setSubtractAmount(amount * quantity);
    }

    public String setReturnQuantity() {
        if (this.quantity == 1) {
            return "1 Quarter";
        } else
            return this.quantity + " Quarters";
    }
    @Override
    public String getPbTotal() {
        DecimalFormat fp = new DecimalFormat("$###,###.00");
        return "The piggy bank holds " + fp.format(pbTotal);
    }
}