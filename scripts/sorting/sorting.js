let steps = null;
let pos = 0;
let playStatus = "paused";
let unsorted_colors = [];
let unsorted_sort = [];
let sorting_by = ['hue', 'saturation', 'lightness'];
let numCells = 30;

document.addEventListener('DOMContentLoaded', () => {
    createGrid(); // Ensure the grid is created before trying to interact with it
    updateSortOption();

    const bubble = document.getElementById('bubble');
    const insert = document.getElementById('insert');

    const totalCells = document.getElementById('numCells')
    totalCells.addEventListener('input', () => {
        let prevNum = numCells;
        numCells = totalCells.value
        if (numCells <= 75 && numCells > 2){
            createGrid();
        if (numCells > 30){
            bubble.style.backgroundColor = "#c71616"
            insert.style.backgroundColor = "#c71616"
        } else {
            bubble.style.backgroundColor = "#FFF"
            insert.style.backgroundColor = "#FFF"
        }

        if (numCells > 45){
            document.getElementById('tim').style.backgroundColor = "#c71616";
        } else {
            document.getElementById('tim').style.backgroundColor = "#FFF"
        }

        if (numCells > 60){
            document.getElementById('select').style.backgroundColor = "#c71616";
            document.getElementById('heap').style.backgroundColor = "#c71616";
            document.getElementById('quick').style.backgroundColor = "#c71616";
            document.getElementById('merge').style.backgroundColor = "#c71616";
        } else {
            document.getElementById('select').style.backgroundColor = "#FFF";
            document.getElementById('heap').style.backgroundColor = "#FFF";
            document.getElementById('quick').style.backgroundColor = "#FFF";
            document.getElementById('merge').style.backgroundColor = "#FFF";
        }
        } else {
            numCells = prevNum;
            totalCells.value = numCells;
        }
    })

    if (bubble) {
        bubble.addEventListener('click', () => {
            if (numCells <= 30) runAlgorithm(bubbleSort)
        });
    } else {
        console.error('Button element not found');
    }
    
    if (insert) {
        insert.addEventListener('click', () => {
            if (numCells <= 30) runAlgorithm(insertionSort)
        });
    } else {
        console.error('Button element not found');
    }

    const select = document.getElementById('select');
    if (select) {
        select.addEventListener('click', () => {
            if (numCells <= 60) runAlgorithm(selectionSort)
        });
    } else {
        console.error('Button element not found');
    }

    const heap = document.getElementById('heap');
    if (heap) {
        heap.addEventListener('click', () => {
            if (numCells <= 60) runAlgorithm(heapSort)
        });
    } else {
        console.error('Button element not found');
    }

    const quick = document.getElementById('quick');
    if (quick) {
        quick.addEventListener('click', () => {
            if (numCells <= 60) runAlgorithm(quickSort)
        });
    } else {
        console.error('Button element not found');
    }

    const merge = document.getElementById('merge');
    if (merge) {
        merge.addEventListener('click', () => {
            if (numCells <= 60) runAlgorithm(mergeSort)
        });
    } else {
        console.error('Button element not found');
    }
    const tim = document.getElementById('tim');
    if (tim) {
        tim.addEventListener('click', () => {
            if (numCells <= 45) runAlgorithm(timSort)
        });
    } else {
        console.error('Button element not found');
    }

    const radix = document.getElementById('radix');
    if (radix) {
        radix.addEventListener('click', () => {
            runAlgorithm(radixSort)
        });
    } else {
        console.error('Button element not found');
    }

    const sorting_options = ["hue", "saturation", "lightness", "red", "green", "blue"]

    sorting_options.forEach((option) => {
        document.getElementById(option).addEventListener("click", ()=>{
            sortOptionClick(option);
        })
    })

    const slider = document.getElementById('slider');
    let isDragging = false; // To track whether the slider is being dragged

    // When the slider is clicked (mousedown)
    slider.addEventListener('mousedown', () => {
        isDragging = true;
        if (playStatus === "playing") {
            playStatus = "paused";
            document.getElementById("playPauseBtn").textContent = "Play";
        }
    });

    // When the slider is moved (mousemove)
    slider.addEventListener('mousemove', () => {
        if (isDragging && steps) {
            pos = parseInt((slider.value / slider.max) * steps.length);
            updateGrid(steps[pos]); // Update the grid with the current step
        }
    });

    // When the slider is released (mouseup)
    slider.addEventListener('mouseup', () => {
        isDragging = false;
    });

    const play = document.getElementById('playPauseBtn')
    play.addEventListener('click', () => {
        if (playStatus == "playing") {
            playStatus = "paused"
            play.textContent = "Play"
        } else {
            playStatus = "playing"
            play.textContent = "Pause"
            runSteps(steps)
        }

    })

});

const sortOptionClick = (option) => {
    if (sorting_by.length == 3){
        sorting_by.forEach((o)=>{
            document.getElementById(o).style.backgroundColor = "#fff";
        });
        sorting_by = [option];
    } else {
        sorting_by.push(option);
    };
    updateSortOption();
    unsorted_sort = []
    unsorted_colors.forEach((col) => {
        unsorted_sort.push(getSortVal(col));
    });
};

const updateSortOption = () => {
    let box_color;
    for (let i=0; i<sorting_by.length; i++){
        if (i==0){
            box_color = "#ff0000";
        } else if (i==1){
            box_color = "#ff4242";
        } else if (i==2) {
            box_color = "#ff6e6e"
        }
        document.getElementById(sorting_by[i]).style.backgroundColor = box_color
    }
}

const runAlgorithm = (alg) => {
    const grid = document.getElementById('sorting-grid');
            if (grid) {
                let data = {colors: [...unsorted_colors], sorting: [...unsorted_sort]};
                steps = alg(data);
                playStatus = "playing";
                document.getElementById("playPauseBtn").textContent = "Pause"
                runSteps(steps);
            } else {
                console.error('Grid element not found');
            }
}

const getSortVal = (col) => {
    const hsl = chroma(col).hsl()
    const rgb = chroma(col).rgb()
    let degree = 10 ** sorting_by.length;
    let mult = 2
    let number = 0;
    sorting_by.forEach((option) => {
        if (option == "hue") number += hsl[0] * degree ** mult
        else if (option == "saturation") number += hsl[1] * degree ** mult 
        else if (option == "lightness") number += hsl[2] * degree ** mult
        else if (option == "red") number += rgb[0] * degree ** mult
        else if (option == "green") number += rgb[1] * degree ** mult
        else if (option == "blue") number += rgb[2] * degree ** mult
        else console.log(`${option} not a valid option!`)
        mult--;
    })
    return number
}

const createGrid = () => {
    const grid = document.getElementById('sorting-grid');
    const regionHeight = grid.offsetHeight;
    const regionWidth = grid.offsetWidth; // Width of the grid container in pixels
    unsorted_colors = [];
    unsorted_sort = [];
    let color, sort;
    for (let x=0; x<numCells**2; x++){
        color = chroma.random()//getRandomSingleColor()
        sort = getSortVal(color);
        unsorted_colors.push(color);
        unsorted_sort.push(sort);
    }
    generateGrid(grid, numCells, regionHeight, regionWidth, unsorted_colors, unsorted_sort);
}

const updateGrid = (data) => {
    const grid = document.getElementById('sorting-grid')
    const rows = grid.getElementsByTagName('tr');

    // Iterate through each row
    let count = 0;
    for (let i = 0; i < rows.length; i++) {
      const cells = rows[i].getElementsByTagName('td');
      
      // Iterate through each cell in the row
      for (let j = 0; j < cells.length; j++) {
        cells[j].style.backgroundColor = chroma(data.color[count]).hex()
        //cells[j].textContent = data.sorting[count];
        count++;
      }
    }
}

const getValues = (grid) => {
    let colors = [];
    let values = [];
    const rows = grid.getElementsByTagName('tr');

    // Iterate through each row
    let count = 0
    for (let i = 0; i < rows.length; i++) {
      const cells = rows[i].getElementsByTagName('td');
      
      // Iterate through each cell in the row
      for (let j = 0; j < cells.length; j++) {
        let color = rgbStringToObject(cells[j].style.backgroundColor);
        let hsl = chroma(color).hsl()
        let sort = hsl[0]**3 + hsl[2]**2 + hsl[1]
        colors[count] = color;
        let sorting = parseInt(cells[j].textContent);
        cells[j].textContent = '';
        values.push(sorting);
        count++;
      }
    }
    return {colors:colors, sorting:values}
}

const runSteps = (steps, speed = 120) => {
    let index = 0; // To keep track of the current step
    let indexMultiplier = parseFloat(document.getElementById('speedButton').textContent) || 1;

    // Function to process the current step
    function processStep() {
        if (playStatus === "paused") {
            clearInterval(intervalId); // Stop the interval if paused
            return;
        }
        if (index < steps.length) {
            slider.value = parseInt(index / steps.length * 100)
            updateGrid(steps[parseInt(index)]); // Call the updateGrid function with the current step
            index+=indexMultiplier; // Move to the next step
        } else {
            clearInterval(intervalId); // Stop the interval when all steps are processed
        }
    }

    // Function to update the interval time based on the speed button's value
    function updateInterval() {
        const intervalTime = 1000 / (speed );
        return intervalTime;
    }

    // Start the interval to process steps
    let intervalTime = updateInterval();
    const intervalId = setInterval(processStep, intervalTime);

    // Optional: Update the interval time dynamically if speed can change
    const speedButton = document.getElementById('speedButton');
    speedButton.addEventListener('click', () => {
        clearInterval(intervalId); // Stop the current interval
        indexMultiplier = parseFloat(document.getElementById('speedButton').textContent) || 1;
        setInterval(processStep, intervalTime); // Restart the interval with the new time
    });
}
