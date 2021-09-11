## Problem: The Quarrasi Lock

A hostile alien race, the Quarrasi, has landed on Earth, and you've been captured. You've managed to overpower your guards, even though they are enormous and tentacled, but to escape the (still grounded) spaceship, you have to open the massive door. The instructions for opening the door are, oddly enough, written in English but it's still no piece of cake. To open the door, you have to slide the three bar-shaped Kratzz along tracks that lead from the right receptor to the left receptor, which lies at the end of the door, 10 feet away.

That's easy enough, but you have to avoid setting off the alarms, which work as follows. On each Kratzz are one or more star-shaped crystal power gems known as Quinicrys. Each receptor has four sensors that light up if the number of Quinicrys in the column above is even. An alarm goes off if the number of lit sensors is ever exactly one. Note that each receptor's alarm is separate: You can't ever have exactly one sensor lit for the left receptor or for the right receptor. The good news is that each alarm is equipped with a suppressor, which keeps the alarm from sounding as long as the button is pressed. If you could press both suppressors at once, the problem would be easy, but you can't since you have short human arms rather than long Quarrasi tentacles.

Given all of this, how would you slide the Kratzz to open the door without activating either alarm?

| L   | e   | f   | t   |     |     |     | R   | i   | g   | h   | t   |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| ‖   | ‖   | ‖   | ‖   |     |     |     |     | ‖   | ‖   | ‖   | ‖   |
|     |     |     |     |     |     |     |     |     |     |     |     |
| -   | -   | -   | -   | -   | -   | -   | -   | ★   |     | ★   | ★   |
|     |     |     |     |     |     |     |     |     |     |     |     |
| -   | -   | -   | -   | -   | -   | -   | -   | ★   | ★   |     |     |
|     |     |     |     |     |     |     |     |     |     |     |     |
| -   | -   | -   | -   | -   | -   | -   | -   |     | ★   |     |     |
|     |     |     |     |     |     |     |     |     |     |     |     |
| 0   | 0   | 0   | 0   |     |     |     |     | 1   | 1   | 0   | 0   |

## Restate Problem Constraints

1. Need to slide 3 bars from right to left
2. On each bar, there are one or more star-shaped gems
3. Each receptor (side) has one sensor per column and will light if the number of stars in a column is even
4. If exactly one sensor is lit on a receptor, the alarm will go off
5. Cannot allow an alarm to go off
6. Alarms can be suppressed, but only if you are on the same side as the alarm

## Operations

1. Move bars from one side to another
2. Make sure there is never just one even column on a side

### Bad combinations (will result in alarm)

1. Top bar + middle bar
2. Middle bar + bottom bar

## Good combination (will not result in alarm)

1. Top bar + bottom bar

| Left                        | Left<br/>Suppressor |     | ⇦   |     | In Transit |     | ⇨   |     | Right<br/>Suppressor | Right                       |
| --------------------------- | ------------------- | --- | --- | --- | ---------- | --- | --- | --- | -------------------- | --------------------------- |
|                             |                     |     |     |     |            |     |     |     |                      | Top,<br/>Middle,<br/>Bottom |
|                             |                     |     | ⇦   |     | Middle     |     |     |     |                      | Top,<br/>Bottom             |
| Middle                      |                     |     |     |     |            |     | ⇨   |     |                      | Top,<br/>Bottom             |
| Middle                      |                     |     | ⇦   |     | Top        |     |     |     |                      | Bottom                      |
| Top,<br/>Middle             | Yes                 |     |     |     |            |     |     |     |                      | Bottom                      |
| Top                         |                     |     |     |     | Middle     |     | ⇨   |     |                      | Bottom                      |
| Top                         |                     |     |     |     |            |     |     |     | Yes                  | Middle,<br/>Bottom          |
| Top                         |                     |     | ⇦   |     | Bottom     |     |     |     |                      | Middle                      |
| Top,<br/>Bottom             |                     |     |     |     |            |     | ⇨   |     |                      | Middle                      |
| Top,<br/>Bottom             |                     |     | ⇦   |     | Middle     |     |     |     |                      |                             |
| Top,<br/>Middle,<br/>Bottom |                     |     |     |     |            |     |     |     |                      |                             |

## Lesson Learned

Importance of recognizing analogies. Quarrasi Lock is analogous to fox, goose, and corn problem. If we can discover that analogy early enough, we can avoid most of the work of the problem by translating our solution for the first problem.
