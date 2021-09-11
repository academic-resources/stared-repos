package com.lambdaschool.j51e1;

import java.text.DecimalFormat;

public abstract class AbstractPiggyBank {
    protected double pbTotal;

    public void AbstractPiggyBank(double pbTotal) {
        this.pbTotal = pbTotal;
    }

    public AbstractPiggyBank() {
        this.pbTotal = 0;
    }

    public double setAddAmount(double amountToAdd) {
        this.pbTotal = this.pbTotal + amountToAdd;

        return pbTotal;
    };

    public double setSubtractAmount(double amountToSubtract) {
        this.pbTotal -= amountToSubtract;
        return pbTotal;
    };

    public String getPbTotal() {
        DecimalFormat fp = new DecimalFormat("$###,###.00");
        return "The piggy bank holds " + fp.format(pbTotal);
    };

    public double setPbTotal() {
        this.pbTotal = pbTotal;
        return pbTotal;
    };
}
