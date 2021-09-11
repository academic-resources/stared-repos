# Project Snack Bar:

A student that completes this project shows that they can:

* use the Java Development Kit (JDK)
* use and manipulate Java base data types
* construct Java classes including instantiating and using Java Objects
* use and manipulate Java base data types

# Introduction

Variations on the Snack Bar Project have been part of Java Education 
since Java was created. So, we will do one. The point is to set up 
vending machines where a person buys snacks from those machines.

# Instructions

## Snack

Snack has fields (so knows)
* [X] id
* [X] name
* [X] quantity 
* [X] cost
* [X] vending machine id

Snack has methods (so can) 
* [X] set and get id
* [X] set and get name
* [X] set and get cost
* [X] set and get vending machine id
* [X] get quantity
* [X] add quantity when given how many to add
* [X] buy snack when given how many to buy
* [X] get total cost given a quantity


## Vending Machine

Vending machine has fields (so knows)
* [X] id
* [X] name 

Vending Machine has methods (so can)
* [X] set and get id
* [X] set and get name


## Customer

[X] Customer has id, name, cash on hand. 
[X] Customer can add cash, buy given total cash used in purchase, get and set name, get cash on hand.  


## Instructions

* Instantiate 2 customers
    * [X] Jane with $45.25
    * [X] Bob with $33.14

* Instantiate 3 Vending Machines
    * [X] Food
    * [X] Drink
    * [X] Office

* Instantiate 5 snacks
    * [X] In Vending Machine Food
        * [X] 36 Chips at $1.75
        * [X] 36 Chocolate Bar at $1.00
        * [X] 30 Pretzel at $2.00
    * [X] In Vending Machine Drink
        * [X] 24 Soda at $2.50
        * [X] 20 Water at $2.75
	
* Processing

1. [X] Customer 1 (Jane) buys 3 of snack 4 (Soda). Print Customer 1 (Jane) Cash on hand. Print quantity of snack 4 (Soda).
1. [X] Customer 1 (Jane) buys 1 of snack 3 (Pretzel). Print Customer 1 (Jane) Cash on hand. Print quantity of snack 3 (Pretzel).
1. [X] Customer 2 (Bob) buys 2 of snack 4 (Sode). Print Customer 2 (Bob) Cash on Hand. Print quantity of snack 4 (Soda).
1. [X] Customer 1 (Jane) finds $10. Print Customer 1 (Jane) Cash on Hand.
1. [ ] Customer 1 (Jane) buys 1 of snack 2 (Chocolate Bar). Print Customer 1 (Jane) Cash on Hand. Print quantity of snack 2 (Chocolate Bar).
1. [X] Add 12 more items to snack 3 (Pretzel). Print quantity of snack 3 (Pretzel).
1. [X] Customer 2 (Bob) buys 3 of snack 3 (Pretzel). Print Customer 2 (Bob) Cash on hand. Print quantity of snack 3 (Pretzel).

* Stretch Goals

    * [X] Display each snack with
        * [X] Name
        * [X] Vending Machine Name
        * [X] Quantity on hand
        * [X] Total cost of all of the quantities of this snack on hand
	
