require_relative "master_require"


class ModelBase
  def self.find_by_id(id)
    data = QuestionsDatabase.instance.execute(<<-SQL, self.class, id)
      SELECT
        *
      FROM
        ?
      WHERE
        id = ?;
    SQL

    Question.new(data.first)
  end


  
end