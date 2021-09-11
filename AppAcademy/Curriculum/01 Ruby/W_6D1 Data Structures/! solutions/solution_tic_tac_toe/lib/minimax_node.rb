class MinimaxNode
  attr_reader :minimax_value, :action

  #####################################
  # Class Methods

  def self.set_successor_function(prc)
    @@successor_function = prc
  end

  def self.set_evaluation_function(prc)
    @@evaluation_function = prc
  end

  def self.set_termination_test(prc)
    @@termination_test = prc
  end

  #####################################
  # Instance Methods

  def initialize(state, action = nil)
    @state, @action = state, action
  end

  def minimax(take_maximum = true)
    if leaf_node?
      @minimax_value = get_score
      @action #game is already over
    else
      choose_best_action(take_maximum)
    end
  end

  #####################################
  private

  def choose_best_action(take_maximum)
    best_value, best_action = set_best_value(take_maximum), nil

    generate_child_nodes.each do |child_node|
      child_node.minimax(!take_maximum)

      if child_action_is_better?(child_node, best_value, take_maximum)
        best_value = child_node.minimax_value
        best_action = child_node.action
      end

      break if child_action_is_best?(child_node, take_maximum)
    end

    @minimax_value = best_value
    best_action
  end

  def leaf_node?
    @@termination_test.call(@state)
  end

  def generate_child_nodes
    @@successor_function.call(@state)
  end

  def get_score
    @@evaluation_function.call(@state)
  end

  def child_action_is_better?(node, best_value, take_maximum)
    take_maximum ? node.minimax_value > best_value : node.minimax_value < best_value
  end

  def child_action_is_best?(node, take_maximum)
    take_maximum && node.minimax_value == 1 || !take_maximum && node.minimax_value == -1
  end

  def set_best_value(take_maximum)
    take_maximum ? Float::INFINITY * - 1 : Float::INFINITY
  end
end
