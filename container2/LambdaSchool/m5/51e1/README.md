# Introduction

This sprint challenge combines the knowledge from this week's Java Fundamentals lessons in order to create a Magical Piggy Bank using Java and the JDK.

# Instructions

We have a magical "piggy bank" (a piggy bank is the traditional name of a place to store coins, bills, money). The piggy bank is magical because it can hold unlimited amounts of money. However, you can not get the money out of it.

- [X] Create a collection (array, arraylist, or hashmap) to represent the piggy bank. 
- [X] The collection can hold money.  
This money can be
- [X] A Dollar worth $1.00
- [X] A Quarter worth $0.25
- [X] A Dime worth $0.10
- [X] A Nickel worth $0.05
- [X] A Penny worth $0.01  

When creating a coin object, you can optionally give the number of coins being added. If no number is given, the default is 1 coin being added to the piggy bank.  

Each coin object should know:

- [X] its value
- [X] how many of that coin was added when that object was created
- [X] how to print its total value which is value * number of coins added.

The main program will look something like this pseudocode:
(remember pseudocode is not meant to be syntactically correct but explain the algorithm)

- [X] Create collection
- [X] piggyBank.add(new Quarter())
- [X] piggyBank.add(new Dime())
- [X] piggyBank.add(new Dollar(5))
- [X] piggyBank.add(new Nickel(3))
- [X] piggyBank.add(new Dime(7))
- [X] piggyBank.add(new Dollar())
- [X] piggyBank.add(new Penny(10))
- [ ] Print the contents of the Piggy Bank
  - on the console should appear  
    [ ] `1 Quarter`  
    [ ] `1 Dime`  
    [ ] `$5`  
    [ ] `3 Nickels`  
    [ ] `7 Dimes`  
    [ ] `$1`  
    [ ] `10 Pennies`  
    
- [X] Print the value of the Piggy Bank
  - [X] on the console should appear  
    
    `The piggy bank holds $7.30`  

  - Note:
      - In order to format the output appropriately
          - [X] You will need to import java.text.DecimalFormat
          - [X] At the beginning your program, initialize the format with this statement  
                  [X] `DecimalFormat fp = new DecimalFormat("$###,###.00");`
          - [X] When you ready to print out the piggy bank value, use a statement like  
                  [X] `System.out.println("The piggy bank holds " + fp.format(myValue));`  

      - Also notice that when you have more than 1 coin, the pural of the coins name is printed.

## Stretch Goals:

- [X] Add the ability to remove coins from the piggy bank
    - [ ] Prevent taking more coins than present in the piggy bank
    - [X] Coins do not have to be removed in the same quantity that were added. For example based on the main program above, removing 3 dimes would be allowed. The Piggy Bank should adjust appropriately.
    - [X] Just the amount to be removed should be given. The program will figure out which coins to remove.
    
    - [ ] subtract(1.50)
    - [ ] print contents of the Piggy Bank
      - [ ] on the console on possible out come is  
        [ ] `$4`  
        [ ] `7 Dimes`  
        [ ] `$1`  
        [ ] `10 Pennies`  
        
        
