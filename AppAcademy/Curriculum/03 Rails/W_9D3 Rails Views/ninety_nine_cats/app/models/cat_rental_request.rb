# == Schema Information
#
# Table name: cat_rental_requests
#
#  id         :bigint(8)        not null, primary key
#  cat_id     :integer          not null
#  start_date :date             not null
#  end_date   :date             not null
#  status     :string           default("PENDING"), not null
#

class CatRentalRequest < ApplicationRecord
  validates :start_date, :end_date, :status, presence: true
  validates :status, inclusion: { in: %w(PENDING APPROVED DENIED),
                                  message: "Must be PENDING, APPROVED, or DENIED" }
  validate :does_not_overlap_approved_request

  def overlapping_requests
    CatRentalRequest.where("
      ((:sd BETWEEN cat_rental_requests.start_date AND cat_rental_requests.end_date)
      OR
      (cat_rental_requests.start_date BETWEEN :sd AND :ed)
      OR
      (:ed BETWEEN cat_rental_requests.start_date AND cat_rental_requests.end_date)
      OR
      (cat_rental_requests.end_date BETWEEN :sd AND :ed))
      AND
      cat_rental_requests.id != :id
      AND
      cat_rental_requests.cat_id = :cat_id
      ", sd: start_date, ed: end_date, id: id, cat_id: cat_id)
  end

  def overlapping_approved_requests
    overlapping_requests.where(status: "APPROVED")
  end

  def does_not_overlap_approved_request
    if overlapping_approved_requests.exists?(statu)
      p "HEY!"
      errors[:status] << "Overlaps with Approved Request"
    end
  end

  belongs_to :cat #,
  # primary_key: :id,
  # foreign_key: :cat_id,
  # class_name: :Cat
end
