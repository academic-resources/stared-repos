class User < ApplicationRecord
  validates :username, presence: true, uniqueness: true

  # Remember, has_many is just a method where the first argument is
  # the name of the association, and the second argument is an options
  # hash.
  has_many :authored_polls,
    primary_key: :id,
    foreign_key: :author_id,
    class_name: 'Poll'

  has_many :responses,
    primary_key: :id,
    foreign_key: :respondent_id,
    class_name: 'Response'

  def completed_polls_sql
    # This is how the method would be written in raw SQL. If we just used
    # top-level joins with a WHERE clause, we would filter out any rows
    # without a response from the current user. In this scenario, the COUNT
    # of questions would always equal the COUNT of the current user's responses;
    # we would have no way of knowing which polls had actually been completed!
    # Thus, we move the WHERE into a subquery.

    Poll.find_by_sql(<<-SQL)
      SELECT
        polls.*
      FROM
        polls
      JOIN
        questions ON polls.id = questions.poll_id
      JOIN
        answer_choices ON questions.id = answer_choices.question_id
      LEFT OUTER JOIN (
        SELECT
          *
        FROM
          responses
        WHERE
          respondent_id = #{self.id}
      ) AS responses ON answer_choices.id = responses.answer_choice_id
      GROUP BY
        polls.id
      HAVING
        COUNT(DISTINCT questions.id) = COUNT(responses.*)
    SQL
  end

  # For the ActiveRecord version of the method, we'll use SQL fragments in
  # the subquery and the HAVING clause. Everything else can be done with
  # nice, clean AR syntax.

  def completed_polls
    polls_with_completion_counts
      .having('COUNT(DISTINCT questions.id) = COUNT(responses.id)')
  end

  def incomplete_polls
    polls_with_completion_counts
      .having('COUNT(DISTINCT questions.id) > COUNT(responses.id)')
      .having('COUNT(responses.id) > 0')
  end

  private

  def polls_with_completion_counts
    joins_sql = <<-SQL
      LEFT OUTER JOIN (
        SELECT
          *
        FROM
          responses
        WHERE
          respondent_id = #{self.id}
      ) AS responses ON answer_choices.id = responses.answer_choice_id
    SQL

    Poll.joins(questions: :answer_choices)
      .joins(joins_sql)
      .group('polls.id')
  end
end
