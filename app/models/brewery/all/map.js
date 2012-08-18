function(doc, meta) {
  if (doc.type == "brewery") {
    emit(doc.name);
  }
}
