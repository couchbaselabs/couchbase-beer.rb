class Beer < Couchbase::Model
  attribute :name
  attribute :abv, :default => 0
  attribute :ibu, :default => 0
  attribute :srm, :default => 0
  attribute :updated
  attribute :description

  belongs_to :brewery

  view :all, :include_docs => false, :limit => 31
  view :by_category, :include_docs => false, :group => true

  before_save do |doc|
    doc.abv = doc.abv.to_f
    doc.ibu = doc.ibu.to_f
    doc.srm = doc.srm.to_f
  end
end
