package com.lambdaschool.j51e1;

import java.util.ArrayList;

public class Main {

    public static ArrayList<AbstractPiggyBank> filteredList = new ArrayList<AbstractPiggyBank>();

    public static void testCondition(ArrayList<AbstractPiggyBank> piggyBank, CheckMoney tester) {

        filteredList.clear();
        for (AbstractPiggyBank coin : piggyBank) {
            if (tester.test(coin)) {
                filteredList.add(coin);
            }
        }
    }

    public static void main(String[] args) {
        ArrayList<AbstractPiggyBank> piggyBank = new ArrayList<AbstractPiggyBank>();

        // collection 1
        System.out.println("\n*** Adding Money ***\n");
        System.out.println();
        piggyBank.add(new Quarter());
        piggyBank.add(new Dime());
        piggyBank.add(new Dollar(5));
        piggyBank.add(new Dime(7));
        piggyBank.add(new Dollar());
        piggyBank.add(new Penny(10));
        // System.out.println("The piggy bank holds " +
        // fp.format(piggyBank.getPbTotal()));
        System.out.println(Quarter.getPbTotal());
    }
}
