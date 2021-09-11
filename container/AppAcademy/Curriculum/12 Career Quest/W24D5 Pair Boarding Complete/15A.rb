# streaming_sample
# You know how to use rand to randomly sample an element from an array.

# Now, write a function that, given an input stream of objects, will sample a value. The stream has limited length.

# Use only O(1) memory.
# Every value in the stream should have an equal probability of being sampled.
# Solution
def streaming_sample(stream)
  sample = stream
  num_els = 1 #needs to set to the first stream because otherwise first one never gets picked

  while true
    next_value = stream.next_value
    break if next_value.nil?

    # keep sample with probability 1 / (num_els + 1)
    keep_prob = 1.fdiv(num_els + 1)
    sample = next_value if rand() < keep_prob

    num_els += 1
  end

  sample
end

# Let's prove this works by induction. First, note that for num_els = 1, this says we keep the previous sample (nil), with probability 0. So after 1 element, every element has an equal chance of being sampled (the only element is selected with probability 1).

# Next, assume that we've iterated through m elements, and that the streaming sample has selected an element (so far) with equal probability 1/m. Then the probability of keeping the current sampled element after considering the m + 1th element is 1 / m * m / (m + 1) == 1 / (m + 1). Likewise, the probability of selecting the m + 1th element is 1 / (m + 1).