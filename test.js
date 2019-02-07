function readSingleFile(e) {
  var file = e.target.files[0];
  if (!file) {
    return;
  }
  var reader = new FileReader();
  reader.onload = function(e) {
    var contents = e.target.result;
    // Display file content
    displayContents(contents);
  };
  reader.readAsText(file);
}
 
function displayContents(contents) {
  // Reduce the attributes to important ones
  var entries = JSON.parse(contents)
  var reduced = _.map(entries, e => _.pick(e, ['id', 'desc', 'due', 'name', 'idMembers']))

  var withTimestamps = _.map(reduced, r => {
    var id = r.id.substr(0,8)
    var date = new Date(1000 * parseInt(id, 16))
    r.created_at = date

    return r
  })

  var element = document.getElementById('file-content');
  element.innerHTML = JSON.stringify(withTimestamps);
}
 
document.getElementById('file-input').addEventListener('change', readSingleFile, false);
