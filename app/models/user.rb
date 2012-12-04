class User < Couchbase::Model
  attribute :name

  def self.find_or_create_from_auth_hash(hash)
    user = User.find_by_id(hash[:uid])
    unless user
      user = User.create!(:id => hash[:uid],
                          :name => hash[:info][:name])
    end
    user
  end
end
