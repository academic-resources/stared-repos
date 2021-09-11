require_relative 'db_connection'
require_relative '01_sql_object'

module Searchable
  def where(params)
    table_name = self.table_name
    criteria = params.keys.map { |criterion| "#{criterion} = ?"}.join(" AND ")
    parameters = params.values
    results = DBConnection.execute(<<-SQL, *parameters)
      SELECT
        *
      FROM
        #{table_name}
      WHERE
        #{criteria}
      ;
    SQL
    self.parse_all(results)
  end
end

class SQLObject
  extend Searchable
end
