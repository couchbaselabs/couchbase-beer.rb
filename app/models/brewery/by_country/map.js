function(doc, meta) {
  if (doc.type == "brewery" && doc.country) {
    emit(doc.country, 1);
  }
}
