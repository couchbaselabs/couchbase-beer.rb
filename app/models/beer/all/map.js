function(doc, meta) {
  if (doc.type == "beer" && doc.name) {
    emit(doc.name);
  }
}
