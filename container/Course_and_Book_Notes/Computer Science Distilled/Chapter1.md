## Guidelines for Flowcharts:

- Write states and instruction steps inside rectangles
- Write decision steps, where the process might go in different directions, inside diamonds
- Never mix an instruction step with a decision step
- Connect sequential steps with arrows
- Mark the start and end of the process
  (ISO spec for how software systems diagrams should be drawn: UML - http://code.energy/UML )

#### Example: Finding maximum value between three variables:

![FlowchartExample](./flowchart.jpeg)

**Pseudocode**: Human-friendly code not understood by machines.

#### Example:

```
function maximum (A, B, C)
if A > B
    if A > C
        max <- A
    else
        max <- C
else
    if B > C
        max <- B
    else
        max <- C
print max
```

**Model**: A set of concepts that represents a problem and its characteristics

### Livestock Fence:

Your farm has two types of livestock. You have 100 units of barbed wire to make a rectangular fence for the animals with a straight division for separating them. How do you frame the fence in order to maximize the pasture area?

```
A = w x l
100 = 2w + 3l
l = (100 - 2w)/3
A = 100/3w - 2/3w^2
```

Quadratic eqautation! Set A = 0, solve the equation, and the maximum is the midway point between the two roots.

### Logic

In mathematical logic, variables and operators represent validity or truth of things.

Example statement:
"If the water is warm, I'll swim" can be broken down into two logical variables, A and B

```
A: The water is warm
B: I swim
```

Dependency between the variables is represented by a conditional operator (`->`). A->B is used to represent the idea that A = True implies B = True.

To negate ideas, use `!` operator (negation operator)

**Contrapositive**: For any two variables, A and B, `A->B = !A->!B`

**Biconditional**: If A->B and B->A, can be represented as A<->B. A->B does not necessarily mean that B->A.

|  A  |  B  | !A  | A->B | A<->B | A AND B | A OR B | A XOR B |
| :-: | :-: | :-: | :--: | :---: | :-----: | :----: | :-----: |
|  ✓  |  ✓  | ❌  |  ✓   |   ✓   |    ✓    |   ✓    |   ❌    |
|  ✓  | ❌  | ❌  |  ❌  |  ❌   |   ❌    |   ✓    |    ✓    |
| ❌  |  ✓  |  ✓  |  ✓   |  ❌   |   ❌    |   ✓    |    ✓    |
| ❌  | ❌  |  ✓  |  ✓   |   ✓   |   ❌    |   ❌   |   ❌    |

### Boolean Algebra (Simplifies logical expressions)

**Associativity**: Parentheses are irrelevant for sequences of AND or OR operations - can be calculated in any order.

```
A AND (B AND C) = (A AND B) AND C,
A OR (B OR C) = (A OR B) OR C
```

**Distributivity**: ANDing after an OR is equivalent to ORing results of ANDs and vice versa

```
A AND (B OR C) = (A AND B) OR (A AND C)
A OR (B AND C) = (A OR B) AND (A OR C)
```

**DeMorgan's Law**
"It can't be summer and winter at once, so it's either not summer or not winter. And it's not summer and not winter if and only if it's not the case it's either summer or winter" Following this logic, ANDs can be transformed into ORs and vice versa:

```
!(A AND B) = !A OR !B,
!A AND !B = !(A OR B)
```

### Problem: Hot Server

A server crashes if it's overheating while the air conditioning is off. It also crashes if it's overheating and its chassis cooler fails. In which conditions does the server work?

#### Modeling it in logical variables:

```
A:  Server overheats
B:  Air conditioning is off
C:  Chassis cooler fails
D:  Server crashes

(A AND B) OR (A AND C)->D

Distributivity: A AND (B OR C)->D
Server works when (!D)

Contrapositive: !D->!(A AND (B OR C))

DeMorgan to remove parens: !D->!A OR (B OR C)

DeMorgan again: !D->!A OR (!B AND !C)

Whenever the server works, either !A (it's not overheating)
or !B AND !C (both air conditioning and chassis cooler are working)
```

### Truth Tables

Columns for each variable, rows for possible combinations. One variable requires two rows, one for outcomes if true and one for if false.

### Problem: Fragile System

We have to create a database system with the following requirements:

```
I       If database is locked, we can save data
II      A database lock on a full write queue cannot happen
III     Either the write queue is full or the cache is loaded
IV      If the cache is loaded, the database cannot be locked

Is it possible?  Under which conditions will it work?
```

#### Model the database

```
A   The database is locked      I       A->B
B   Able to save data           II      !(A AND C)
C   Write queue is full         III     C OR D
D   Cache is loaded             IV      D->!A
```

| State # | A   | B   | C   | D   | I   | II  | III | IV  | All four |
| ------- | --- | --- | --- | --- | --- | --- | --- | --- | -------- |
| 1       | X   | X   | X   | X   | ✓   | ✓   | X   | ✓   | X        |
| 2       | X   | X   | X   | ✓   | ✓   | ✓   | ✓   | ✓   | ✓        |
| 3       | X   | X   | ✓   | X   | ✓   | ✓   | ✓   | ✓   | ✓        |
| 4       | X   | X   | ✓   | ✓   | ✓   | ✓   | ✓   | ✓   | ✓        |
| 5       | X   | ✓   | X   | X   | ✓   | ✓   | X   | ✓   | X        |
| 6       | X   | ✓   | X   | ✓   | ✓   | ✓   | ✓   | ✓   | ✓        |
| 7       | X   | ✓   | ✓   | X   | ✓   | ✓   | ✓   | ✓   | ✓        |
| 8       | X   | ✓   | ✓   | ✓   | ✓   | ✓   | ✓   | ✓   | ✓        |
| 9       | ✓   | X   | X   | X   | X   | ✓   | X   | ✓   | X        |
| 10      | ✓   | X   | X   | ✓   | X   | ✓   | ✓   | X   | X        |
| 11      | ✓   | X   | ✓   | X   | X   | X   | ✓   | ✓   | X        |
| 12      | ✓   | X   | ✓   | ✓   | X   | X   | ✓   | X   | X        |
| 13      | ✓   | ✓   | X   | X   | ✓   | ✓   | X   | ✓   | X        |
| 14      | ✓   | ✓   | X   | ✓   | ✓   | ✓   | ✓   | X   | X        |
| 15      | ✓   | ✓   | ✓   | X   | ✓   | X   | ✓   | ✓   | X        |
| 16      | ✓   | ✓   | ✓   | ✓   | ✓   | X   | ✓   | X   | X        |

All requirements are met in states 2-4 and 6-8. In those states, A = False, so database can't ever be locked. The cache will not be loaded in states 3 and 7.

### Test what you've learned by solving the Zebra Puzzle

(http://code.energy/zebra-puzzle)

#### Zebra Puzzle (15 clues, two questions):

1. There are five houses
2. The Englishman lives in the red house
3. The Spaniard owns the dog
4. The coffee is drunk in the green house
5. The Ukranian drinks tea
6. The green house is immediately to the right of the ivory house
7. The Old Gold smoker owns snails
8. Kools are smoked in the yellow house
9. Milk is drunk in the middle house
10. The Norwegian lives in the first house
11. The man who smokes Chesterfields lives in the house next to the man with the fox
12. Kools are smoked in the house next to the house where the horse is kept
13. The Lucky Strike smoker drinks orange juice
14. The Japanese smokes Parliaments
15. The Norwegian lives next to the blue house

Who drinks water? Who owns the zebra?

EnglishRed(2) XOR EnglishRed(3) XOR EnglishRed(4) XOR EnglishRed(5)

- Because Norwegian lives in first house

SpainDog(2) XOR SpainDog(3) XOR SpainDog(4) XOR SpainDog(5)

- Same reason

GreenCoffee(1) XOR GreenCoffee(2) XOR GreenCoffee(3) XOR GreenCoffee(4) XOR GreenCoffee(5)

UkraineTea(2) UkraineTea(3) UkraineTea(4) UkraineTea(5)

(Ivory(1) AND GreenCoffee(2)) XOR (Ivory(2) AND GreenCoffee(3)) XOR (Ivory(3) AND GreenCoffee(4)) XOR (Ivory(4) AND GreenCoffee(5))

- This eliminates possibility of GreenCoffee(1)

OldGoldSnail(1) OldGoldSnail(2) OldGoldSnail(3) OldGoldSnail(4) OldGoldSnail(5)

KoolsYellow(1) KoolsYellow(2) KoolsYellow(3) KoolsYellow(4) KoolsYellow(5)

Milk(3)

Norwegian(1)

(Chester(2) AND Fox(1)) XOR (Chester(1) AND FOX(2)) XOR (Chester(2) AND Fox(3)) XOR (Chester(3) AND Fox(2)) XOR (Chester(3) AND Fox(4)) XOR (Chester(4) AND Fox(3)) XOR Chester(4) AND Fox(5)) XOR (Chester(5) AND FOX(4))

(Kools(1) AND Horse(2)) XOR (Kools(2) AND Horse(1)) XOR (Kools(2) AND Horse(3)) XOR (Kools(3) AND Horse(2)) XOR (Kools(3) AND Horse(4)) XOR (Kools(4) AND Horse(3)) XOR Kools(4) AND Fox(5)) XOR (Kools(5) AND Horse(4))

LuckyJuice(1) XOR LuckyJuice(2) XOR LuckyJuice(3) XOR LuckyJuice(4) XOR LuckyJuice(5)

JapanParliament(2) XOR JapanParliament(3) XOR JapanParliament(4) XOR JapanParliament(5)

Norwegian(1) AND Blue(2)

- House I belongs to the Norwegian, which means that it can't be red because the Englishman owns the red house. It can't be blue because it's next door to the blue house. It can't be green because green is to the right of ivory. It can't be ivory because the house next to it is blue. This leaves House I being yellow

- Kools is smoked by the person in the yellow house, which means that it's the Norwegian living in House I

- Kools are smoked in the house next to where the horse is kept, which means that the horse has to live in the blue house next door.

+-------------+-----------+-------+------+---+---+
| | 1 | 2 | 3 | 4 | 5 |
+-------------+-----------+-------+------+---+---+
| Nationality | Norwegian | | | | |
+-------------+-----------+-------+------+---+---+
| House color | Yellow | Blue | | | |
+-------------+-----------+-------+------+---+---+
| Animal | | Horse | | | |
+-------------+-----------+-------+------+---+---+
| Drink | | | Milk | | |
+-------------+-----------+-------+------+---+---+
| Cigarette | Kools | | | | |
+-------------+-----------+-------+------+---+---+

EnglishRed(3) XOR EnglishRed(4) XOR EnglishRed(5)

- Now that House I is yellow and House II is blue, eliminates EnglishRed(2)

SpainDog(3) XOR SpainDog(4) XOR SpainDog(5)

- House II now has a horse and can't have a dog, so SpainDog(2) is eliminated

GreenCoffee(4) XOR GreenCoffee(5)

- Now that House I is yellow and House II is blue, eliminates GreenCofee(1) and GreenCofee(2). GreenCofee(3) can be further eliminated as green needs to be to the right of Ivory. Now this rule is redundant in conjunction with Ivory(3) AND GreenCofee(4) XOR (Ivory(4) AND GreenCoffee(5))

UkraineTea(2) UkraineTea(4) UkraineTea(5)

- Ukraine can't be 3 because milk is drunk in the third house

Ivory(3) AND GreenCoffee(4) XOR (Ivory(4) AND GreenCoffee(5))

- House I and House II being blue eliminates a few possibilities here

OldGoldSnail(3) XOR OldGoldSnail(4) XOR OldGoldSnail(5)

- Horse lives at House II, so that rules OldGoldSnail(2) out. Kools are smoked in House I, so eliminates House I

(Chester(2) AND Fox(1)) XOR (Chester(2) AND Fox(3)) XOR (Chester(3) AND Fox(2)) XOR (Chester(3) AND Fox(4)) XOR (Chester(4) AND Fox(3)) XOR Chester(4) AND Fox(5)) XOR (Chester(5) AND FOX(4))

- Chesterfields are not smoked in House I, so that option can be taken out

LuckyJuice(2) XOR LuckyJuice(4) XOR LuckyJuice(5)

- Kools are smoked in House I, so that option can be removed. House III drinks milk, so that can be removed

JapanParliament(2) XOR JapanParliament(3) XOR JapanParliament(4) XOR JapanParliament(5)

--- Didn't add any new values to table on this pass ---

Can combine some rules (since red, green, and ivory are the three colors left to assign)

EnglishRed(3) AND (Ivory(4) AND GreenCoffee(5)) XOR (Ivory(3) AND GreenCoffee(4) AND EnglishRed(5))

UkraineTea(2) UkraineTea(4) UkraineTea(5)

OldGoldSnail(3) XOR OldGoldSnail(4) XOR OldGoldSnail(5)

(Chester(2) AND Fox(1)) XOR (Chester(2) AND Fox(3)) XOR (Chester(3) AND Fox(2)) XOR (Chester(3) AND Fox(4)) XOR (Chester(4) AND Fox(3)) XOR Chester(4) AND Fox(5)) XOR (Chester(5) AND FOX(4))
LuckyJuice(2) XOR LuckyJuice(4) XOR LuckyJuice(5)

JapanParliament(2) XOR JapanParliament(3) XOR JapanParliament(4) XOR JapanParliament(5)

A: Ivory(3) AND GreenCoffe(4) AND EnglishRed(5)

B: Ivory(4) AND GreenCoffe(5) AND EnglishRed(3)

| OK? | EspDog(3) | EspDog(4) | EspDog(5) | UkrTea(2) | UkrTea(4) | UkrTea(5) | A   | B   |
| --- | --------- | --------- | --------- | --------- | --------- | --------- | --- | --- |
| x   | 1         | 0         | 0         | 1         | 0         | 0         | 0   | 1   |
| YES | 0         | 1         | 0         | 1         | 0         | 0         | 0   | 1   |
| YES | 0         | 0         | 1         | 1         | 0         | 0         | 0   | 1   |
| x   | 1         | 0         | 0         | 0         | 1         | 0         | 0   | 1   |
| x   | 0         | 1         | 0         | 0         | 1         | 0         | 0   | 1   |
| YES | 0         | 0         | 1         | 0         | 1         | 0         | 0   | 1   |
| x   | 1         | 0         | 0         | 0         | 0         | 1         | 0   | 1   |
| x   | 0         | 1         | 0         | 0         | 0         | 1         | 0   | 1   |
| x   | 0         | 0         | 1         | 0         | 0         | 1         | 0   | 1   |
| YES | 1         | 0         | 0         | 1         | 0         | 0         | 1   | 0   |
| YES | 0         | 1         | 0         | 1         | 0         | 0         | 1   | 0   |
| x   | 0         | 0         | 1         | 1         | 0         | 0         | 1   | 0   |
| x   | 1         | 0         | 0         | 0         | 1         | 0         | 1   | 0   |
| x   | 0         | 1         | 0         | 0         | 1         | 0         | 1   | 0   |
| x   | 0         | 0         | 1         | 0         | 1         | 0         | 1   | 0   |
| x   | 1         | 0         | 0         | 0         | 0         | 1         | 1   | 0   |
| x   | 0         | 1         | 0         | 0         | 0         | 1         | 1   | 0   |
| x   | 0         | 0         | 1         | 0         | 0         | 1         | 1   | 0   |

In all valid combinations, UkraineTea(5) was false, so that can be eliminated

EnglishRed(3) AND (Ivory(4) AND GreenCoffee(5)) XOR (Ivory(3) AND GreenCoffee(4) AND EnglishRed(5))

UkraineTea(2) UkraineTea(4)

OldGoldSnail(3) XOR OldGoldSnail(4) XOR OldGoldSnail(5)

(Chester(2) AND Fox(1)) XOR (Chester(2) AND Fox(3)) XOR (Chester(3) AND Fox(2)) XOR (Chester(3) AND Fox(4)) XOR (Chester(4) AND Fox(3)) XOR Chester(4) AND Fox(5)) XOR (Chester(5) AND FOX(4))
LuckyJuice(2) XOR LuckyJuice(4) XOR LuckyJuice(5)

JapanParliament(2) XOR JapanParliament(3) XOR JapanParliament(4) XOR JapanParliament(5)

In the truth table, there was only one line where UkraineTea(2) is false. This tells us that:
NOT(UkraineTea(2))-> SpainDog(5) AND Ivory(4) AND GreenCoffee(5) AND UkranianTea(4) AND EnglishRed(3)

Assume UkraineTea(2) is false and try to fill in the table:
| | 1 | 2 | 3 | 4 | 5 |
|------------- |----------- |------- |--------- |---------- |-------- |
| Nationality | Norwegian | | English | Ukranian | Spain |
| House color | Yellow | Blue | Red | Ivory | Green |
| Animal | | Horse | | | Dog |
| Drink | | Juice | Milk | Tea | Coffee |
| Cigarette | Kools | Lucky | | | |

Ack! That would leave only House II open for the Japanese person and they can't smoke Lucky because they smoke Parliament!

That tells us that the assumption was wrong and therefore UkraineTea(2) has to be true
| | 1 | 2 | 3 | 4 | 5 |
|------------- |----------- |--------- |------ |--- |--- |
| Nationality | Norwegian | Ukraine | | | |
| House color | Yellow | Blue | | | |
| Animal | | Horse | | | |
| Drink | | Tea | Milk | | |
| Cigarette | Kools | | | | |

SpainDog(3) XOR SpainDog(4) XOR SpainDog(5)

EnglishRed(3) AND (Ivory(4) AND GreenCoffee(5)) XOR (Ivory(3) AND GreenCoffee(4) AND EnglishRed(5))

OldGoldSnail(3) XOR OldGoldSnail(4) XOR OldGoldSnail(5)

(Chester(2) AND Fox(1)) XOR (Chester(2) AND Fox(3)) XOR (Chester(3) AND Fox(2)) XOR (Chester(3) AND Fox(4)) XOR (Chester(4) AND Fox(3)) XOR Chester(4) AND Fox(5)) XOR (Chester(5) AND FOX(4))

LuckyJuice(4) XOR LuckyJuice(5)

- LuckyJuice can no longer be House II

JapanParliament(3) XOR JapanParliament(4) XOR JapanParliament(5)

- JapanParliament can no longer be House II

Both Cofee and Juice can only be 4 and 5 now. Milk and Tea are already spoken for. That means that House I must be the one drinking water!

Likewise, Parliament is only capable of being House III, IV or V, Lucky is only capable of being House IV or V, Old Gold is only able to be III, IV, or V, and Kools is already spoken for. That leaves House II being the Chesterfield smoker!

|             | 1         | 2            | 3    | 4   | 5   |
| ----------- | --------- | ------------ | ---- | --- | --- |
| Nationality | Norwegian | Ukraine      |      |     |     |
| House color | Yellow    | Blue         |      |     |     |
| Animal      |           | Horse        |      |     |     |
| Drink       | Water     | Tea          | Milk |     |     |
| Cigarette   | Kools     | Chesterfield |      |     |     |

SpainDog(3) XOR SpainDog(4) XOR SpainDog(5)

EnglishRed(3) AND (Ivory(4) AND GreenCoffee(5)) XOR (Ivory(3) AND GreenCoffee(4) AND EnglishRed(5))

OldGoldSnail(3) XOR OldGoldSnail(4) XOR OldGoldSnail(5)

Fox(1) XOR Fox(3)

LuckyJuice(4) XOR LuckyJuice(5)

JapanParliament(3) XOR JapanParliament(4) XOR JapanParliament(5)

| OK? | JpaPar<br/>(3) | JpaPar<br/>(4) | JpaPar<br/>(5) | OldSnail<br/>(3) | OldSnail<br/>(4) | OldSnail<br/>(5) | LuckyJuice<br/>(4) | LuckyJuice<br/>(5) |
| --- | -------------- | -------------- | -------------- | ---------------- | ---------------- | ---------------- | ------------------ | ------------------ |
| x   | 1              | 0              | 0              | 1                | 0                | 0                | 0                  | 1                  |
| YES | 1              | 0              | 0              | 0                | 1                | 0                | 0                  | 1                  |
| x   | 1              | 0              | 0              | 0                | 0                | 1                | 0                  | 1                  |
| YES | 0              | 1              | 0              | 1                | 0                | 0                | 0                  | 1                  |
| x   | 0              | 1              | 0              | 0                | 1                | 0                | 0                  | 1                  |
| x   | 0              | 1              | 0              | 0                | 1                | 0                | 0                  | 1                  |
| x   | 0              | 0              | 1              | 1                | 0                | 0                | 0                  | 1                  |
| x   | 0              | 0              | 1              | 0                | 1                | 0                | 0                  | 1                  |
| x   | 0              | 0              | 1              | 0                | 0                | 1                | 0                  | 1                  |
| x   | 1              | 0              | 0              | 1                | 0                | 0                | 1                  | 0                  |
| x   | 1              | 0              | 0              | 0                | 1                | 0                | 1                  | 0                  |
| YES | 1              | 0              | 0              | 0                | 0                | 1                | 1                  | 0                  |
| x   | 0              | 1              | 0              | 1                | 0                | 0                | 1                  | 0                  |
| x   | 0              | 1              | 0              | 0                | 1                | 0                | 1                  | 0                  |
| x   | 0              | 1              | 0              | 0                | 0                | 1                | 1                  | 0                  |
| YES | 0              | 0              | 1              | 1                | 0                | 0                | 1                  | 0                  |
| x   | 0              | 0              | 1              | 0                | 1                | 0                | 1                  | 0                  |
| x   | 0              | 0              | 1              | 0                | 0                | 1                | 1                  | 0                  |

JapanParliaments(4) is only valid on one line, so we can write:

JapanParliaments(4)->OldSnail(3) AND LuckyJuice(5)

Try to plug it into the table and see if it works!

|             | 1         | 2       | 3        | 4           | 5            |
| ----------- | --------- | ------- | -------- | ----------- | ------------ |
| Nationality | Norwegian | Ukraine |          | Japan       | English      |
| House color | Yellow    | Blue    | Ivory    | Green       | Red          |
| Animal      |           | Horse   | Snail    |             |              |
| Drink       | Water     | Tea     | Milk     | Coffee      | Juice        |
| Cigarette   | Kools     | Chester | Old Gold | Parliaments | Lucky Strike |

That would leave only Spain unaccounted for and restrict it to living in House II. But the Spaniard has a dog, so it can't have a snail!

So now we know JapanPar(4) is false.

SpainDog(3) XOR SpainDog(4) XOR SpainDog(5)

EnglishRed(3) AND (Ivory(4) AND GreenCoffee(5)) XOR (Ivory(3) AND GreenCoffee(4) AND EnglishRed(5))

OldGoldSnail(3) XOR OldGoldSnail(5)

Fox(1) XOR Fox(3)

LuckyJuice(4) XOR LuckyJuice(5)

JapanParliament(3) XOR JapanParliament(5)

The English and the Japanese individuals can only live in 3 or 5, so that leaves 4 for the Spaniard!

We also know that OldGold and Parliament can only be in houses 3 or 5, so that leaves House IV

|             | 1         | 2       | 3    | 4            | 5   |
| ----------- | --------- | ------- | ---- | ------------ | --- |
| Nationality | Norwegian | Ukraine |      | Spain        |     |
| House color | Yellow    | Blue    |      |              |     |
| Animal      |           | Horse   |      | Dog          |     |
| Drink       | Water     | Tea     | Milk | OJ           |     |
| Cigarette   | Kools     | Chester |      | Lucky Strike |     |

EnglishRed(3) AND (Ivory(4) AND GreenCoffee(5))

- House IV drinks coffee, so that rules out (Ivory(e) AND GreenCoffee(4) AND EnglishRed(5))

JapanParliament(3) XOR JapanParliament(5)

- Since House III is English, IV is Spain, I is Norwegian, and II is Ukraine, thagt leaves V for Japan

OldGoldSnail(3)

- Since Japan is V and Japanese smoke Parliament, that leaves III for OldGoldSnail

Fox(1) XOR Fox(3)

- Since OldGoldSnail is 3, that leaves I for fox

THAT MEANS THAT JAPAN HAS THE ZEBRA!

|             | 1         | 2       | 3        | 4            | 5          |
| ----------- | --------- | ------- | -------- | ------------ | ---------- |
| Nationality | Norwegian | Ukraine | English  | Spain        | Japan      |
| House color | Yellow    | Blue    | Red      | Ivory        | Green      |
| Animal      | Fox       | Horse   | Snail    | Dog          | Zebra      |
| Drink       | Water     | Tea     | Milk     | OJ           | Coffee     |
| Cigarette   | Kools     | Chester | Old Gold | Lucky Strike | Parliament |

So the answer is that the Norwegian drinks water and the Japanese owns the zebra
