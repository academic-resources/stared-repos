# == Schema Information
#
# Table name: courses
#
#  id            :integer          not null, primary key
#  name          :string(255)
#  prereq_id     :integer
#  instructor_id :integer
#  created_at    :datetime
#  updated_at    :datetime


class Course < ApplicationRecord
  # Remember, has_many is just a method where the first argument is
  # the name of the association, and the second argument is an options
  # hash.
  has_many :enrollments,
    class_name: 'Enrollment',
    foreign_key: :course_id,
    primary_key: :id

  has_many :enrolled_students,
    through: :enrollments,
    source: :user

  # Remember, belongs_to is just a method where the first argument is
  # the name of the association, and the second argument is an options
  # hash.
  # In rails 5 we must specify this association to be optional, because some
  # courses will not have a prerequisite.
  belongs_to :prerequisite,
    class_name: 'Course',
    foreign_key: :prereq_id,
    primary_key: :id,
    optional: true

  belongs_to :instructor,
    class_name: 'User',
    foreign_key: :instructor_id,
    primary_key: :id
end
