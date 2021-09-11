class Card

    def initialize(value)
        @face_value = value
        @face_down = true
    end

    attr_reader :face_value, :face_down

    def display
        return ' ' if @face_down 
        @face_value
    end

    def hide
        @face_down = true
    end

    def reveal
        @face_down = false
    end

    def to_s
        @face_value.to_s
    end

    def ==(val)
        @face_value == val
    end

end