let steps = null;
let pos = 0;
let playStatus = "paused";
let unsorted_colors = [];
let unsorted_sort = [];
let sorting_by = ['hue', 'saturation', 'lightness'];
let numCells = 30;

document.addEventListener('DOMContentLoaded', () => {
    createGrid();
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
    let isDragging = false;

    slider.addEventListener('mousedown', () => {
        isDragging = true;
        if (playStatus === "playing") {
            playStatus = "paused";
            document.getElementById("playPauseBtn").textContent = "Play";
        }
    });

    slider.addEventListener('mousemove', () => {
        if (isDragging && steps) {
            pos = parseInt((slider.value / slider.max) * steps.length);
            updateGrid(steps[pos]);
        }
    });

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
    const regionWidth = grid.offsetWidth;
    slider.value = 0;
    unsorted_colors = [];
    unsorted_sort = [];
    let color, sort;
    for (let x=0; x<numCells**2; x++){
        color = chroma.random()
        sort = getSortVal(color);
        unsorted_colors.push(color);
        unsorted_sort.push(sort);
    }
    generateGrid(grid, numCells, regionHeight, regionWidth, unsorted_colors, unsorted_sort);
}

const updateGrid = (data) => {
    const grid = document.getElementById('sorting-grid')
    const rows = grid.getElementsByTagName('tr');

    let count = 0;
    for (let i = 0; i < rows.length; i++) {
      const cells = rows[i].getElementsByTagName('td');
      
      for (let j = 0; j < cells.length; j++) {
        cells[j].style.backgroundColor = chroma(data.color[count]).hex()
        count++;
      }
    }
}

const runSteps = (steps, speed = 120) => {
    let index = 0;
    let indexMultiplier = parseFloat(document.getElementById('speedButton').textContent) || 1;

    function processStep() {
        if (playStatus === "paused") {
            clearInterval(intervalId);
            return;
        }
        if (index < steps.length) {
            slider.value = parseInt(index / steps.length * 100)
            updateGrid(steps[index]);
            index+=indexMultiplier;
        } else {
            clearInterval(intervalId);
            playStatus = "paused";
            return
        }
    }

    function updateInterval() {
        const intervalTime = 1000 / (speed );
        return intervalTime;
    }

    let intervalTime = updateInterval();
    const intervalId = setInterval(processStep, intervalTime);

    const speedButton = document.getElementById('speedButton');
    speedButton.addEventListener('click', () => {
        clearInterval(intervalId);
        indexMultiplier = parseFloat(document.getElementById('speedButton').textContent) || 1;
        setInterval(processStep, intervalTime);
    });
}
