require_relative "questions_database"
require_relative "user"

class QuestionFollow
  attr_accessor :question_id, :id, :user_id

  def self.find_by_id(id)
    data = QuestionsDatabase.instance.execute(<<-SQL, id)
            SELECT *
            FROM question_follows
            WHERE id = ?
        SQL
    QuestionFollow.new(data.first)
  end

  def self.followers_for_question_id(qid)
    data = QuestionsDatabase.instance.execute(<<-SQL, qid)
            SELECT users.*
            FROM users
            LEFT JOIN question_follows ON users.id = question_follows.user_id
            WHERE question_follows.question_id = ?
        SQL
    data.map { |hash| User.new(hash) }
  end

  def self.followed_questions_for_user_id(uid)
    data = QuestionsDatabase.instance.execute(<<-SQL, uid)
            SELECT questions.*
            FROM questions
            LEFT JOIN question_follows ON questions.id = question_follows.question_id
            WHERE question_follows.user_id = ?
        SQL
    data.map { |hash| Question.new(hash) }
  end

  def self.most_followed_questions(n)
    data = QuestionsDatabase.instance.execute(<<-SQL, n)
            SELECT questions.*
            FROM questions
            LEFT JOIN question_follows ON questions.id = question_follows.question_id
            GROUP BY questions.id
            ORDER BY COUNT(*) DESC
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
