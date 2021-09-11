require_relative "master_require"

class Question
  attr_accessor :id, :title, :author_id, :body
  
  def self.find_by_id(id)
    data = QuestionsDatabase.instance.execute(<<-SQL, id)
      SELECT
        *
      FROM
        questions
      WHERE
        id = ?;
    SQL

    Question.new(data.first)
  end

  def self.find_by_author_id(author_id)
    data = QuestionsDatabase.instance.execute(<<-SQL, author_id)
      SELECT
        *
      FROM
        questions
      WHERE
        author_id = ?;
    SQL

    data.map { |datum| Question.new(datum) }
  end

  def self.most_followed(n)
    QuestionFollow.most_followed_questions(n)
  end

  def self.most_liked(n)
    QuestionLike.most_liked_questions(n)
  end

  def initialize(options)
    @id = options['id']
    @title = options['title']
    @author_id = options['author_id']
    @body = options['body']
  end

  def author
    User.find_by_id(@author_id)
  end

  def replies
    Reply.find_by_question_id(@id)
  end

  def followers
    QuestionFollow.followers_for_question_id(@id)
  end

  def likers
    QuestionLike.likers_for_question_id(@id)
  end

  def num_likes
    QuestionLike.num_likes_for_question_id(@id)
  end

  def save
    unless @id
      QuestionsDatabase.instance.execute(<<-SQL, @title, @author_id, @body)
        INSERT INTO
          questions (title, author_id, body)
        VALUES
          (?, ?, ?);
      SQL
    else
      QuestionsDatabase.instance.execute(<<-SQL, @title, @author_id, @body, @id)
        UPDATE
          questions
        SET
          title = ?,
          author_id = ?,
          body = ?
        WHERE
          id = ?;
      SQL
    end
  end

end
