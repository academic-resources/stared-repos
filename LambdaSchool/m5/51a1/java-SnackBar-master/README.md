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
* id
* name
* quantity 
* cost
* vending machine id

Snack has methods (so can) 
* set and get id
* set and get name
* set and get cost
* set and get vending machine id
* get quantity
* add quantity when given how many to add
* buy snack when given how many to buy
* get total cost given a quantity


## Vending Machine

Vending machine has fields (so knows)
* id
* name 

Vending Machine has methods (so can)
* set and get id
* set and get name


## Customer

Customer has id, name, cash on hand. 
Customer can add cash, buy given total cash used in purchase, get and set name, get cash on hand.  


## Instructions

* Instantiate 2 customers
    * Jane with $45.25
    * Bob with $33.14

* Instantiate 3 Vending Machines
    * Food
    * Drink
    * Office

* Instantiate 5 snacks
    * In Vending Machine Food
        * 36 Chips at $1.75
        * 36 Chocolate Bar at $1.00
        * 30 Pretzel at $2.00
    * In Vending Machine Drink
        * 24 Soda at $2.50
        * 20 Water at $2.75
	
* Processing

1. Customer 1 (Jane) buys 3 of snack 4 (Soda). Print Customer 1 (Jane) Cash on hand. Print quantity of snack 4 (Soda).
1. Customer 1 (Jane) buys 1 of snack 3 (Pretzel). Print Customer 1 (Jane) Cash on hand. Print quantity of snack 3 (Pretzel).
1. Customer 2 (Bob) buys 2 of snack 4 (Sode). Print Customer 2 (Bob) Cash on Hand. Print quantity of snack 4 (Soda).
1. Customer 1 (Jane) finds $10. Print Customer 1 (Jane) Cash on Hand.
1. Customer 1 (Jane) buys 1 of snack 2 (Chocolate Bar). Print Customer 1 (Jane) Cash on Hand. Print quantity of snack 2 (Chocolate Bar).
1. Add 12 more items to snack 3 (Pretzel). Print quantity of snack 3 (Pretzel).
1. Customer 2 (Bob) buys 3 of snack 3 (Pretzel). Print Customer 2 (Bob) Cash on hand. Print quantity of snack 3 (Pretzel).

* Stretch Goals

    * Display each snack with
        * Name
        * Vending Machine Name
        * Quantity on hand
        * Total cost of all of the quantities of this snack on hand
	
