require_relative "master_require"

class QuestionLike
  attr_accessor :user_id, :question_id
  
  def self.likers_for_question_id(question_id)
    data = QuestionsDatabase.instance.execute(<<-SQL, question_id)
      SELECT
        users.*
      FROM
        users
      JOIN
        question_likes
        ON question_likes.user_id = users.id
      WHERE
        question_likes.question_id = ?;
    SQL
    data.map { |datum| User.new(datum) }
  end

  def self.num_likes_for_question_id(question_id)
    data = QuestionsDatabase.instance.execute(<<-SQL, question_id)
      SELECT
        COUNT(user_id)
      FROM
        question_likes
      WHERE
        question_id = ?
    SQL
    data.first.values.first
  end

  def self.liked_questions_for_user_id(user_id)
    data = QuestionsDatabase.instance.execute(<<-SQL, user_id)
      SELECT
        questions.*
      FROM
        questions
      JOIN
        question_likes
        ON question_likes.question_id = questions.id
      WHERE
        question_likes.user_id = ?;
    SQL
    data.map { |datum| Question.new(datum) }
  end

  def self.most_liked_questions(n)
    data = QuestionsDatabase.instance.execute(<<-SQL, n)
    SELECT
      questions.*
    FROM
      questions
    JOIN
      question_likes
      ON question_likes.question_id = questions.id
    GROUP BY
      questions.id
    HAVING
      COUNT(question_likes.user_id)
    ORDER BY
      COUNT(question_likes.user_id) DESC
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