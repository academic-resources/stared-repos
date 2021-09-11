class Hanoi

    attr_reader :num_disks, :peg1, :peg2, :peg3
    def initialize(num_disks)
        @num_disks = num_disks
        @peg1 = (1..num_disks).to_a.reverse
        @peg2 = []
        @peg3 = []
    end

    def move(pair)
        raise "That's not a valid peg" if pair.any? { |peg| peg > 3}
        moving_from, moving_to = pair
        from_peg = peg_converter(moving_from)
        to_peg = peg_converter(moving_to)
        if valid_move?(from_peg, to_peg)
            disk = from_peg.pop
            to_peg.push(disk)
            return true
        else
            return false
        end
    end

    def won?
        return false unless peg1.empty?
        if peg2.empty? 
            return in_order?(peg3)
        else
            return in_order?(peg2)
        end
    end

    private

    def peg_converter(num)
        return @peg1 if num == 1
        return @peg2 if num == 2
        @peg3
    end

    def valid_move?(from, to)
        return false if from.empty?
        return true if to.empty?
        return false if to.last < from.last
        true
    end

    def in_order?(peg)
        peg == (1..num_disks).to_a.reverse
    end
end