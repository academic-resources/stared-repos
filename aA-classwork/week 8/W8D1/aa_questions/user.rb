require_relative "questions_database"
require_relative "question"
require_relative "reply"
require_relative "question_follow"

class User
  attr_accessor :fname, :id, :lname
  def self.find_by_id(id)
    data = QuestionsDatabase.instance.execute(<<-SQL, id)
            SELECT *
            FROM users
            WHERE id = ?
        SQL
    User.new(data.first)
  end

  def self.find_by_name(fname, lname)
    data = QuestionsDatabase.instance.execute(<<-SQL, fname, lname)
            SELECT *
            FROM users
            WHERE fname = ?
            AND lname = ?
        SQL
    User.new(data.first)
  end

  def initialize(options)
    @id = options["id"]
    @fname = options["fname"]
    @lname = options["lname"]
  end

  def authored_questions
    Question.find_by_author_id(self.id)
  end

  def authored_replies
    Reply.find_by_user_id(self.id)
  end

  def followed_questions
    QuestionFollow.followed_questions_for_user_id(@id)
  end

  def liked_questions
    QuestionLike.liked_questions_for_user_id(@id)
  end

  def average_karma
    data = QuestionsDatabase.instance.execute(<<-SQL)
            
            SELECT (CAST(l.count AS FLOAT) / q.count) as val
            FROM 
            (SELECT COUNT(*) AS count
            FROM questions
            WHERE questions.author_id = 1) AS q,

            (SELECT COUNT(*) AS count
            FROM question_likes
            LEFT JOIN questions ON questions.id = question_likes.question_id
            WHERE questions.author_id = 1) AS l
    
        SQL

    data["val"]
  end
end
