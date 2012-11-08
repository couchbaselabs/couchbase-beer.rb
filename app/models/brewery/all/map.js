function(doc, meta) {
  if (doc.type == "brewery" && doc.name) {
    emit(doc.name);
  }
}
