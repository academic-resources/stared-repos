class Card
  attr_reader :face_value, :face_down

  def initialize(face_value)
      @face_value = face_value
      @face_down = true
  end

  def hide
    @face_down = true
  end

  def reveal
    @face_down = false
  end

  def to_s
    @face_value
  end

  def ==(other_card)
    self.face_value == other_card.face_value
  end

end