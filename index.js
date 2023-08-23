var sortOrder = 0; // 0: Orden alfabético ascendente, 1: Orden alfabético descendente

function sortTable(columnIndex) {
    var table, rows, switching, i, x, y, shouldSwitch;
    table = document.getElementById("tier-list-table");
    switching = true;

    while (switching) {
        switching = false;
        rows = table.getElementsByTagName("tr");

        for (i = 1; i < (rows.length - 1); i++) {
            shouldSwitch = false;

            x = rows[i].getElementsByTagName("td")[columnIndex];
            y = rows[i + 1].getElementsByTagName("td")[columnIndex];

            if (sortOrder === 0) {
                if (x.innerHTML.toLowerCase() > y.innerHTML.toLowerCase()) {
                    shouldSwitch = true;
                    break;
                }
            } else {
                if (x.innerHTML.toLowerCase() < y.innerHTML.toLowerCase()) {
                    shouldSwitch = true;
                    break;
                }
            }
        }

        if (shouldSwitch) {
            rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
            switching = true;
        }
    }

    // Actualiza el estado de ordenamiento después de cada clic
    sortOrder = (sortOrder + 1) % 3;
}

// Llama a la función de ordenamiento al hacer clic en el encabezado de la columna "Campeón"
var championHeader = document.querySelector(".champion-header");
championHeader.addEventListener("click", function() {
    sortTable(0); // Llama a la función de ordenamiento con el índice de columna correcto
});

// Cursor

document.addEventListener("DOMContentLoaded", function () {
    var body = document.body;
    body.style.cursor = "url('img/cursor.cur'), auto";
});

// Función para filtrar la tabla
function filterTable() {
    const input = document.getElementById("searchInput").value.toLowerCase();
    const table = document.getElementById("tier-list-table");
    const rows = table.getElementsByTagName("tr");

    for (let i = 1; i < rows.length; i++) {
        const championCell = rows[i].querySelector(".champion-cell");
        const championName = championCell.textContent.toLowerCase();

        if (championName.includes(input)) {
            rows[i].style.display = "";
        } else {
            rows[i].style.display = "none";
        }
    }
}

// Asignar la función de filtrado al evento de cambio en el campo de entrada
document.getElementById("searchInput").addEventListener("input", filterTable);
