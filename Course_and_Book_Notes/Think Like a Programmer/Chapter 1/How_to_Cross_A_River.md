## Problem: How to Cross the River

A farmer with a fox, a goose, and a sack of corn needs to cross a river. The farmer has a rowboat, but there is room for only the farmer and one of his three items. Unfortunately, both the fox and the goose are hungry. The fox cannot be left alone with the goose, or the fox will eat the goose. Likewise, the goose cannot be left alone with the sack of corn or the goose will eat the sack of corn. How does the farmer get everything across the river?

## Solution Sketching

| **Point A**<br /> Items on shore | **Toward origin** | **Boat** | **Across River** | **Point B**<br /> Items on shore |
| -------------------------------- | ----------------- | -------- | ---------------- | -------------------------------- |
| corn, fox, goose                 |                   |          |                  |                                  |
| corn, fox                        |                   | goose    | =>               |                                  |
| corn, fox                        | <=                |          |                  | goose                            |
| fox                              |                   | corn     | =>               | goose                            |
| fox                              | <=                | goose    |                  | corn                             |
| goose                            |                   | fox      | =>               | corn                             |
| goose                            | <=                |          |                  | corn, fox                        |
|                                  |                   | goose    | =>               | corn, fox                        |
|                                  |                   |          |                  | corn, fox, goose                 |

#### By restating a problem in more formal terms, we can often uncover so9ltuions that would have otherwise eluded us

## Boat Cross - State Constraints

1 - The farmer can only take one item at a time on the boat<br/>
2 - The fox and goose cannot be left alone on the same shore<br/>
3 - The goose and corn cannot be left alone on the same shore

## List Operations

### Option 1: List actions needing to be taken:

1. Operation: Carry the fox across the river<br/>
2. Operation: Carry the goose across the river<br/>
3. Operation: Carry the corn across the river

### Option 2: Make operations generic or parametized

1. Operation: Row the boat from one side of the river to the other<br/>
2. Operation: If the boat is empty, load an item from the shore<br/>
3. Operation: If the boat is not empty, unload an item to the shore
