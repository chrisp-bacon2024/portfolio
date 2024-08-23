const generateGrid = (table, numCells, regionHeight, regionWidth, colors, sorting='') => {
    table.innerHTML = null;
    regionWidth -= 2 * numCells;
    regionHeight -= 2* numCells;
    const cellWidth = regionWidth / numCells;
    const cellHeight = regionHeight / numCells;
    let count = 0;
    for (let i = 0; i < numCells; i++) {
        const tr = document.createElement('tr');
        for (let j = 0; j < numCells; j++) {
          // Create a new cell
          const cell = document.createElement('td');
          cell.className = 'grid-cell';
          cell.style.width = `${cellWidth}px`;
          cell.style.height = `${cellHeight}px`;
          cell.style.left = `${i * cellWidth}px`;
          cell.style.top = `${j * cellHeight}px`;
          cell.style.backgroundColor = chroma(colors[count]).hex();
          count++;
          
          
          // Append cell to container
          tr.appendChild(cell);
        };
        table.appendChild(tr);
      };
};

