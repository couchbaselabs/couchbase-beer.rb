function(doc, meta) {
  switch(doc.type) {
  case "brewery":
    emit([meta.id]);
    break;
  case "beer":
    if (doc.brewery_id && doc.name) {
      emit([doc.brewery_id, doc.name]);
    }
    break;
  }
}
