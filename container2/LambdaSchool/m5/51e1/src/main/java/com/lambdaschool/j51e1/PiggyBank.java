package com.lambdaschool.j51e1;

import java.text.DecimalFormat;

public interface PiggyBank {

    String getPbTotal();

    double setPbTotal(double pbTotal);

    double setSubtractAmount(double amountToSubtract);

    double setAddAmount(double amountToAdd);
}
