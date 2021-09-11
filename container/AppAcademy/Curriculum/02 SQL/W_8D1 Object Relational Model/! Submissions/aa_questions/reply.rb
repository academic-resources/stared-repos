require_relative "master_require"

class Reply
  attr_accessor :id, :question_id, :parent_id, :author_id, :body
  
  def self.find_by_id(id)
    data = QuestionsDatabase.instance.execute(<<-SQL, id)
      SELECT
        *
      FROM
        replies
      WHERE
        id = ?;
    SQL

    Reply.new(data.first)
  end

  def self.find_by_user_id(author_id)
    data = QuestionsDatabase.instance.execute(<<-SQL, author_id)
      SELECT
        *
      FROM
        replies
      WHERE
        author_id = ?;
    SQL

    data.map { |datum| Reply.new(datum) }
  end

  def self.find_by_question_id(question_id)
    data = QuestionsDatabase.instance.execute(<<-SQL, question_id)
      SELECT
        *
      FROM
        replies
      WHERE
        question_id = ?;
    SQL

    data.map { |datum| Reply.new(datum) }
  end

  def initialize(options)
    @id = options['id']
    @question_id = options['question_id']
    @parent_id = options['parent_id']
    @author_id = options['author_id']
    @body = options['body']
  end

  def author
    User.find_by_id(@author_id)
  end

  def question
    Question.find_by_id(@question_id)
  end

  def parent_reply
    raise "This is the first reply in this thread" unless @parent_id
    Reply.find_by_id(@parent_id)
  end

  def child_replies
    data = QuestionsDatabase.instance.execute(<<-SQL, @id)
      SELECT
        *
      FROM
        replies
      WHERE
        parent_id = ?;
    SQL

    data.map { |datum| Reply.new(datum) }
  end
  
  def save
    unless @id
      QuestionsDatabase.instance.execute(<<-SQL, @question_id, @parent_id, @author_id, @body)
        INSERT INTO
          replies (question_id, parent_id, author_id, body)
        VALUES
          (?, ?, ?, ?);
      SQL
    else
      QuestionsDatabase.instance.execute(<<-SQL, @question_id, @parent_id, @author_id, @body, @id)
        UPDATE
          replies
        SET
          question_id = ?,
          parent_id = ?,
          author_id = ?,
          body = ?
        WHERE
          id = ?;
      SQL
    end
  end

end