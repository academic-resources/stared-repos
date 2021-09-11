# State Machine:

Collection of states
Collection of transitions between states

## Transitions:

Type of event that triggers the state to go from one state to another

All computable/calculable problems can be represented as a state machine.

# Human example:

## Hungry toddler:

### Current state:

Hungry

If you input donut, you may end up with transition to Hyperactive Toddler.

If you input fruit, you may end up with a Content Toddler.

# Computing Example:

## Receiving Boolean inputs:

Mouse click, button click, etc.

## Numerical/text input:

Via keyboard or other input device

# Simple states are on/off but there are other states a machine can enter.

State change usually conveyed to us through output device (screen changing color, etc.).

# Notation:

## Example: Light bulb

State1 (off) State2(on)

### Input type: light switch:

a) no action (don't necessarily have to put no action on state machine, but used to illustrate possible transition)
b) switch toggled

## If current state of light bulb is off:

a - does not change state
b - changes state

In a state diagram, you use arrows and label with what type of action performed and the arrow shows what state you started in and what state you end up in after the action is taken.

Often you'll see transitions labeled with a key.

## Oregon Trail

State 1(sick) State2(healthy) State3(dead)

### Transitions:

a) continue on the trail
b) increase the pace
c) decrease the pace
d) increase food ration
e) decrease food ration
f) stop to rest

Without looking at source code, just from experience:

If starting from State 1(sick):
Input of a || b || e transitions to State 3(dead)

If starting from State 1(sick):
Input of f || d || c, stay in State 1(sick)

If starting from State 1(sick):
Input of c && d && f, transition to State 2(healthy)

State machines are great to illustrate the logic of our program, how it will behave given states and inputs.

State machines can have no ambiguity
There must be clearly defined output for all possible state/input combinations.
