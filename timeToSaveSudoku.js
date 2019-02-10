/*
	this function return true is any val in row is repeated
	which voilets the sudoku rules
*/

const isValInRow = (sudoku, rowIndex) => {
	const isSeenBefore = {}

	for (let i = 0; i < 9; i += 1) {
		const val = sudoku[rowIndex][i]
		// console.log({ valInrow: val })

		if (isSeenBefore[val]) {
			return true
		}

		if (val !== 0) {
			isSeenBefore[val] = true
		}
	}

	return false
}

/*
	this function return true is any val in column is repeated
	which voilets the sudoku rules
*/

const isValInCol = (sudoku, colIndex) => {
	const isSeenBefore = {}

	for (let i = 0; i < 9; i += 1) {
		const val = sudoku[i][colIndex]
		// console.log({ valInCol: val })

		if (isSeenBefore[val]) {
			return true
		}

		if (val !== 0) {
			isSeenBefore[val] = true
		}
	}

	return false
}

/*
	this function return true is any value in a Grid of
	size 3x3 is repeated
	which voilets the sudoku rules
*/

const isValInBox = (sudoku, rowStart, colStart) => {
	const isSeenBefore = {}

	for (let i = 0; i < 3; i += 1) {
		for (let j = 0; j < 3; j += 1) {
			const val = sudoku[i + rowStart][j + colStart]

			if (isSeenBefore[val]) {
				return true
			}

			if (val !== 0) {
				isSeenBefore[val] = true
			}
		}
	}

	return false
}

/*
	if all 3 conditions are satisfied then it means that
	sudoku board configuration is valid so far till sudoku -> (i, j)
*/

const isGridConfigValid = (sudoku, rowIndex, colIndex) => {
	const isInRow = isValInRow(sudoku, rowIndex)
	const isInCol = isValInCol(sudoku, colIndex)
	const isInBox = isValInBox(
								sudoku,
								rowIndex - rowIndex % 3,
								colIndex - colIndex % 3 )

	// console.log(sudoku[rowIndex][colIndex], { isInRow }, { isInCol }, { isInBox })

	return ( !isInRow && !isInCol && !isInBox )
}

/*
	if at any point isGridConfigValid return false means
	there is atleast 1 value which is repeating either 
	in a row or column or in a grid and hence sudoku
	board configuration is invalid
*/

const isSudokuValid = (sudoku, size) => {
	console.log({ sudoku }, { size })

	for (let i = 0; i < size; i += 1) { 
        for (let j = 0; j < size; j += 1) {

            if (!isGridConfigValid(sudoku, i, j)) 
                return false
        } 
    }

	return true
}

const sudoku = [[0,0,0,0,0,0,0,6,0],
				[0,0,7,3,0,0,9,0,0],
				[0,0,8,9,0,0,0,0,0],
				[0,7,1,0,0,0,0,0,0],
				[0,0,0,0,0,0,0,0,8],
				[8,0,0,0,5,0,6,0,4],
				[0,1,0,2,0,0,0,9,0],
				[2,0,0,0,0,4,0,0,0],
				[0,6,9,0,0,0,0,7,0]]


const SIZE_OF_GRID = sudoku.length

const result = isSudokuValid(sudoku, SIZE_OF_GRID)

if (result) {
	console.log('Sudoku is valid')
} else {
	console.log('Sudoku is not valid')
}