# cyclic?
# Consider a linked list. Each link in the list holds a next reference to the next item in the list, except for the final link, which points to nil.

# It is possible to have a "list" without any end, which loops back on itself. Possibilities:

# A -> B -> C -> A -> ...
# A -> B -> C -> B -> ...
# Write a method cyclic?(first_link), which will return true if a list is cyclic. Your first version may use O(n) memory. Next, write a version which uses O(1) memory; you'll probably need a different approach.

# Solution
def cyclic1?(first_link)
  set = Set.new

  current_link = first_link
  until current_link.nil?
    # if list is cyclic, must loop back on itself eventually
    return true if set.include?(current_link)
    set << current_link

    current_link = current_link.next
  end

  false
end

# In our first edition of cyclic? we use a set. We iterate through the links and add each seen link to a set. If we encounter a link we've already seen, we return true because it means we've found a cycle. If we make it all the way to the end (current_link.nil?) we return false. This takes up O(n) space; we can do better.

def cyclic2?(first_link)
  slow_runner = first_link
  fast_runner = first_link

  while true
    2.times do
      fast_runner = fast_runner.next
      return false if fast_runner.nil?
      return true if fast_runner == slow_runner
    end

    slow_runner = slow_runner.next
  end
end

# In this solution, we use a classic "tortoise and hare" strategy. We keep track of a slow link and a fast link, incrementing the fast link by two steps each time we increment the slow link by one. Eventually, either the fast link reaches the end (fast_runner.nil?) or the slow link will equal the fast link, indicating that the fast link has looped back around and found a loop. This solution takes up O(1) space.



# converging_node
# Given two singly-linked lists of (possibly) differing lengths that converge at some point, find the node at which they converge.

# Solution
def converge?(a, b)
  difference = find_difference(a, b)

  a_runner = a
  b_runner = b

  if difference > 0
    difference.times do
      b_runner = b_runner.next
    end
  else
    (-difference).times do
      a_runner = a_runner.next
    end
  end

  until a_runner.nil?
    return true if a_runner == b_runner
    a_runner = a_runner.next
    b_runner = b_runner.next
  end

  false
end

def find_difference(a, b)
  difference = 0

  a_runner = a
  b_runner = b

  until a_runner.nil? && b_runner.nil?
    if a_runner.nil?
      difference += 1
      b_runner = b_runner.next
    elsif b_runner.nil?
      difference -= 1
      a_runner = a_runner.next
    else
      a_runner = a_runner.next
      b_runner = b_runner.next
    end
  end

  difference
end

# Imagine two runners, running at the same speed across the linked lists. If one list is longer than the other, the shorter list's runner will reach the end first. The difference between the two runners' times is the difference in length between the two lists. Knowing this, we can give one runner a head-start of a distance equivalent to the difference in length between the two lists. Then traversing both lists at equal speed will result in the two runners colliding at the intersection point.