function(doc, meta) {
  if (doc.type == "beer") {
    emit(doc.name);
  }
}
