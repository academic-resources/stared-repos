class Card

    attr_reader :value, :face_down

    def initialize(value, face_down = true)
        @value, @face_down = value, face_down
    end

    def hide
        @face_down = true
    end

    def reveal
        @face_down = false
    end

    def to_s
        @value.to_s
    end

    def ==(new_value)
        @value == new_value
    end

end