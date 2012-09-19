function(doc, meta) {
  switch(doc.type) {
  case "brewery":
    emit([meta.id]);
    break;
  case "beer":
    emit([doc.brewery_id, doc.name]);
    break;
  }
}
