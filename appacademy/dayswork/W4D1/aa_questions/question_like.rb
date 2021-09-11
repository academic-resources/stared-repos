require_relative "questions_database"
require_relative "question"

class QuestionLike
  attr_accessor :question_id, :id, :user_id

  def self.find_by_id(id)
    data = QuestionsDatabase.instance.execute(<<-SQL, id)
            SELECT *
            FROM question_likes
            WHERE id = ?
        SQL
    QuestionLike.new(data.first)
  end

  def self.likers_for_question_id(id)
    data = QuestionsDatabase.instance.execute(<<-SQL, id)
            SELECT users.*
            FROM users
            LEFT JOIN question_likes ON users.id = question_likes.user_id
            WHERE question_likes.question_id = ?
        SQL
    data.map { |hash| User.new(hash) }
  end

  def self.num_likes_for_question_id(id)
    data = QuestionsDatabase.instance.execute(<<-SQL, id)
            SELECT COUNT(*) AS c
            FROM question_likes
            WHERE question_likes.question_id = ?
        SQL
    data["c"]
  end

  def self.liked_questions_for_user_id(id)
    data = QuestionsDatabase.instance.execute(<<-SQL, id)
            SELECT questions.*
            FROM questions
            LEFT JOIN question_likes ON questions.id = question_likes.question_id
            WHERE questions.user_id = ?
        SQL
    data.map { |hash| Question.new(hash) }
  end

  def self.most_liked_questions(n)
    data = QuestionsDatabase.instance.execute(<<-SQL, n)
            SELECT questions.*
            FROM questions
            LEFT JOIN question_likes ON questions.id = question_likes.question_id
            GROUP BY questions.id
            ORDER BY COUNT(question_likes.question_id) DESC
            LIMIT ?
        SQL
    data.map { |hash| Question.new(hash) }
  end

  def initialize(options)
    @id = options["id"]
    @question_id = options["question_id"]
    @user_id = options["user_id"]
  end
end
