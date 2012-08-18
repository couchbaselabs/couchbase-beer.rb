function(doc, meta) {
  if (doc.geo) {
    emit({type: "Point", coordinates: [doc.geo.lng, doc.geo.lat]},
         {name: doc.name, geo: doc.geo});
  }
}
