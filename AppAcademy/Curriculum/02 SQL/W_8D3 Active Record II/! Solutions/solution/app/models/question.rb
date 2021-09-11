class Question < ApplicationRecord
  validates :text, presence: true

  # N.B. Remember, Rails 5 automatically validates the presence of
  # belongs_to associations, so we can leave the validation of :poll out here.

  # Remember, has_many is just a method where the first argument is
  # the name of the association, and the second argument is an options
  # hash.
  has_many :answer_choices,
    primary_key: :id,
    foreign_key: :question_id,
    class_name: 'AnswerChoice'

  belongs_to :poll,
    primary_key: :id,
    foreign_key: :poll_id,
    class_name: 'Poll'

  has_many :responses,
    through: :answer_choices,
    source: :responses

  def results_n_plus_1
    # N+1 way:
    results = {}
    self.answer_choices.each do |ac|
      results[ac.text] = ac.responses.count
    end
    results
  end

  def results_2_queries
    # 2-queries; all responses transferred:
    results = {}
    self.answer_choices.includes(:responses).each do |ac|
      results[ac.text] = ac.responses.length
    end
    results
  end

  def results_1_query_SQL
    # 1-query way all SQL
    acs = AnswerChoice.find_by_sql([<<-SQL, id])
      SELECT
        answer_choices.text, COUNT(responses.id) AS num_responses
      FROM
        answer_choices
        LEFT OUTER JOIN responses
          ON answer_choices.id = responses.answer_choice_id
      WHERE
        answer_choices.question_id = ?
      GROUP BY
        answer_choices.id
    SQL

    acs.inject({}) do |results, ac|
      results[ac.text] = ac.num_responses; results
    end
  end

  def results
    # 1-query way w/ ActiveRecord
    # less efficient solutions are given above ^
    acs = self.answer_choices
      .select("answer_choices.text, COUNT(responses.id) AS num_responses")
      .left_outer_joins(:responses).group("answer_choices.id")
    
# In rails 4, there is no left_outer_joins method so this is how it would look
#     acs = self.answer_choices
#       .select("answer_choices.text, COUNT(responses.id) AS num_responses")
#       .joins(<<-SQL).group("answer_choices.id")
#         LEFT OUTER JOIN responses
#           ON answer_choices.id = responses.answer_choice_id
#       SQL

    acs.inject({}) do |results, ac|
      results[ac.text] = ac.num_responses; results
    end
  end
end
