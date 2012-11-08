function(doc, meta) {
  if (doc.geo && doc.geo.lng && doc.geo.lat && doc.name) {
    emit({type: "Point", coordinates: [doc.geo.lng, doc.geo.lat]},
         {name: doc.name, geo: doc.geo});
  }
}
