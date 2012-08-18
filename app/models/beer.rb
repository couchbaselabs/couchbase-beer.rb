class Beer < Couchbase::Model
  attribute :name
  attribute :abv, :default => 0
  attribute :ibu, :default => 0
  attribute :srm, :default => 0
  attribute :brewery_id
  attribute :updated
  attribute :description

  view :all, :include_docs => false, :limit => 31
  view :by_category, :include_docs => false, :group => true

  def to_param
    id || key
  end
end
