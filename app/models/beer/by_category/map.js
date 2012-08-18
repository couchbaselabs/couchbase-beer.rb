function(doc, meta) {
  if (doc.type == "beer") {
    emit(doc.category || "Unknown");
  }
}
