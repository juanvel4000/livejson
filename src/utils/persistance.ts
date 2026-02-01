export function setDocument(document: string) {
  localStorage.setItem("livejson.document", document);
}

export function getDocument() {
  return localStorage.getItem("livejson.document") ?? "{}";
}
