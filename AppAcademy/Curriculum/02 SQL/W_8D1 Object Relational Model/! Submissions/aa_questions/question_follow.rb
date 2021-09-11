require_relative "master_require"

class QuestionFollow
  attr_accessor :user_id, :question_id
  
  def self.followers_for_question_id(question_id)
    data = QuestionsDatabase.instance.execute(<<-SQL, question_id)
      SELECT
        users.*
      FROM
        question_follows
      JOIN
        users
        ON users.id = question_follows.user_id
      WHERE
        question_follows.question_id = ?;
    SQL

    data.map { |datum| User.new(datum) }
  end

  def self.followed_questions_for_user_id(user_id)
    data = QuestionsDatabase.instance.execute(<<-SQL, user_id)
      SELECT
        questions.*
      FROM
        questions
      JOIN
        question_follows
        ON question_follows.question_id = questions.id
      JOIN
        users
        ON users.id = question_follows.user_id
      WHERE
        users.id = ?;
    SQL

    data.map { |datum| Question.new(datum) }
  end

  def self.most_followed_questions(n)
    data = QuestionsDatabase.instance.execute(<<-SQL, n)
    SELECT
      questions.*
    FROM
      questions
    JOIN
      question_follows
      ON question_follows.question_id = questions.id
    GROUP BY
      questions.id
    HAVING
      COUNT(question_follows.user_id)
    ORDER BY
      COUNT(question_follows.user_id) DESC
    LIMIT
      ?;
    SQL

    data.map { |datum| Question.new(datum) }
  end

  def initialize(options)
    @user_id = options['user_id']
    @question_id = options['question_id']
  end

end