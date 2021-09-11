require_relative "questions_database"
require_relative "user"
require_relative "question"

class Reply
  attr_accessor :question_id, :id, :user_id, :parent_id, :body
  def self.find_by_id(id)
    data = QuestionsDatabase.instance.execute(<<-SQL, id)
            SELECT *
            FROM replies
            WHERE id = ?
        SQL
    Reply.new(data.first)
  end

  def self.find_by_user_id(id)
    data = QuestionsDatabase.instance.execute(<<-SQL, id)
            SELECT *
            FROM replies
            WHERE user_id = ?
        SQL
    data.map { |r| Reply.new(r) }
  end

  def self.find_by_question_id(id)
    data = QuestionsDatabase.instance.execute(<<-SQL, id)
            SELECT *
            FROM replies
            WHERE question_id = ?
        SQL
    data.map { |r| Reply.new(r) }
  end

  def initialize(options)
    @id = options["id"]
    @question_id = options["question_id"]
    @user_id = options["user_id"]
    @parent_id = options["parent_id"]
    @body = options["body"]
  end

  def author
    User.find_by_id(@user_id)
  end

  def question
    Question.find_by_id(@question_id)
  end

  def parent_reply
    return nil if @parent_id.nil?
    Reply.find_by_id(@parent_id)
  end

  def child_replies
    data = QuestionsDatabase.instance.execute(<<-SQL, @id)
        SELECT *
        FROM replies
        WHERE parent_id = ?
    SQL
    data.map { |r| Reply.new(r) }
  end
end
