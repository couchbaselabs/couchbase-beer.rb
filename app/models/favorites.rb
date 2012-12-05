class Favourites < Couchbase::Model
  attribute :items, :default => lambda{ Hash.new }

  def self.find_or_create_by_user_id(user_id)
    fav_id = "fav:#{user_id}"
    find_by_id(fav_id) || create(:id => fav_id)
  end

  def add(beer_or_brewery_id)
    self.items[beer_or_brewery_id] = Time.now.utc
    save
  end

  def each
    items.each do |id, time|
      doc, flags, cas = model.bucket.get(id, :quiet => false, :extended => true)
      doc.update(:id => id, :meta => {'flags' => flags, 'cas' => cas})
      case doc["type"]
      when "beer"
        yield Beer.new(doc), Time.zone.parse(time)
      when "brewery"
        yield Brewery.new(doc), Time.zone.parse(time)
      end
    end
  end

  def include?(beer_or_brewery_id)
    items.include?(beer_or_brewery_id)
  end
end
