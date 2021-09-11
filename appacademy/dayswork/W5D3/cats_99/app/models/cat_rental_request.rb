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
  STATUSES = %w( PENDING APPROVED DENIED )

  validates :status, 
  inclusion: { in: STATUSES }

  validates :cat_id, :start_date, :end_date, presence: true

  validate :does_not_overlap_approved_request

  belongs_to :cat,
    foreign_key: :cat_id,
    class_name: :Cat

  def overlapping_requests
    CatRentalRequest.where("cat_id = ? AND NOT (
      (end_date < ?) OR (start_date > ?)
    )", cat_id, start_date, end_date)
  end

  def overlapping_approved_requests
    self.overlapping_requests.where(status: 'APPROVED')
  end

  def does_not_overlap_approved_request
    if self.overlapping_approved_requests.exists?
        errors[:overlap] << "Those dates overlap with existing approvals"
    end
  end
  
end
