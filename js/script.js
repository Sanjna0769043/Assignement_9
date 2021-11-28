/*
    Assignment 9
    {}
*/

$(document).ready(function(){
    $.getJSON("js/data.json", 
        function (data) {
            var hero = '';
            // ITERATING THROUGH OBJECTS
            // hero += '<tbody>';
            $.each(data, function (key, value) {

                //CONSTRUCTION OF ROWS HAVING
                // DATA FROM JSON OBJECT
                
                hero += '<tr>';
                hero += '<td>' + 
                    value.name + '</td>';

                hero += '<td>' + 
                    value.weapons + '</td>';

                hero += '<td>' + 
                    value.power + '</td>';

                hero += '<td>' + 
                    value.created + '</td>';

                hero += '</tr>';
                
            });
            // hero += '</tbody>';
            //INSERTING ROWS INTO TABLE 
            $('#marvel-hero').append(hero);
        });

});


$('table.table-sortable th').on('click', function(e) {
  sortTable(this)
})

function stringComparer(index, direction) {
  return (x, y) => -1 * direction * x.children[index].textContent.localeCompare(y.children[index].textContent)
}

function dateCompare(index, direction) {
  return (x, y) => direction * (new Date(x.children[index].textContent).getYear() - new Date(y.children[index].textContent).getYear())
}

function sorting(sortType, index, sortDirection) {
  let dir = sortDirection == 'asc' ? -1 : 1
  switch (sortType) {
    case 'text': return stringComparer(index, dir);
    case 'date': return dateCompare(index, dir);
    default: return stringRowComparer(index, dir);
  }
}


function sortTable(theader) {
  let table = theader.closest('table')
  let index = theader.cellIndex
  let sortType = theader.dataset.sortType
  let sortDirection = theader.dataset.sortDir || 'asc' // default sort to ascending

  let items = Array.prototype.slice.call(table.rows);
  items.shift()

  let sortFunction = sorting(sortType, index, sortDirection)
  let sorted = items.sort(sortFunction)

  for (let row of sorted) {
    let parent = row.parentNode
    let detatchedItem = parent.removeChild(row)
    parent.appendChild(row)
  }

  for (let header of theader.parentNode.children) {
    header.classList.remove('currently-sorted')
    delete header.dataset.sortDir
  }

  theader.dataset.sortDir = sortDirection == 'asc' ? 'desc' : 'asc'
  theader.classList.add('currently-sorted')
}





