namespace SpriteKind {
    export const cursor = SpriteKind.create()
    export const newCursor = SpriteKind.create()
}
controller.up.onEvent(ControllerButtonEvent.Pressed, function () {
    if (cursorGridRow == 0) {
        cursorGridRow += -1
        cursorY += -10
    }
    cursorGridRow += 1
    cursorY += 1
    drawGrid()
})
controller.B.onEvent(ControllerButtonEvent.Pressed, function () {
    updategrid()
    drawGrid()
})
function countNeighborsBottomLeft () {
    neighborCount = 0
    neighborCount += grid[11 - 0][0 + 1]
    neighborCount += grid[11 - 1][0 + 0]
    neighborCount += grid[11 - 1][0 + 1]
    neighborCount += copyRight(10)
    neighborCount += copyRight(0)
    neighborCount += copyRight(11)
    neighborCount += copyTop()[0]
    neighborCount += copyTop()[1]
    return neighborCount
}
function autooff () {
    textSprite = 0
}
controller.A.onEvent(ControllerButtonEvent.Pressed, function () {
    grid[cursorGridRow][cursorGridCol] = grid[cursorGridRow][cursorGridCol] * -1 + 1
    drawGrid()
})
controller.left.onEvent(ControllerButtonEvent.Pressed, function () {
    if (cursorGridCol == 0) {
        cursorGridCol += -1
        cursorX += -10
    }
    cursorGridCol += 1
    cursorX += 1
    drawGrid()
})
function copyBottom () {
    return grid[11]
}
function countneighborswrapright (currentRow: number, currentCol: number) {
    neighborCount = 0
    neighborCount += copyRight(currentRow - 1)
    neighborCount += grid[currentRow - 1][currentCol - 0]
    neighborCount += grid[currentRow - 1][currentCol - 1]
    neighborCount += grid[currentRow - 0][currentCol - 1]
    neighborCount += grid[currentRow + 1][currentCol - 1]
    neighborCount += grid[currentRow + 1][currentCol + 0]
    neighborCount += copyRight(currentRow + 1)
    neighborCount += copyRight(currentRow + 0)
    return neighborCount
}
function copyRight (whichRow: number) {
    return grid[whichRow][15]
}
function updategrid () {
    nextgrid = []
    for (let row = 0; row <= 11; row++) {
        nextgrid.push([])
        for (let column = 0; column <= 15; column++) {
            currentcellaliveordead = grid[row][column]
            currentcellneighbors = countNeighbors(row, column)
            if (currentcellaliveordead == 1 && currentcellneighbors < 2) {
                grid[row].push(0)
            } else if (currentcellaliveordead == 1 && currentcellneighbors > 3) {
                grid[row].push(0)
            } else if (currentcellaliveordead == 0 && currentcellneighbors == 3) {
                nextgrid[row].push(1)
            } else {
                nextgrid[row].push(currentcellaliveordead)
            }
        }
        grid = nextgrid
    }
}
controller.right.onEvent(ControllerButtonEvent.Pressed, function () {
    if (cursorGridCol == 15) {
        cursorGridCol += 1
        cursorX += 10
    }
    cursorGridCol += 1
    cursorX += 1
    drawGrid()
})
function drawGrid () {
    sprites.destroyAllSpritesOfKind(SpriteKind.Player)
    gridSprites = []
    currentY = 0
    for (let row of grid) {
        currentX = 0
        for (let gridSpace of row) {
            if (gridSpace == 1) {
                gridSprite = sprites.create(img`
                    f f f f f f f f f f 
                    f 7 7 7 7 7 7 7 7 f 
                    f 7 7 7 7 7 7 7 7 f 
                    f 7 7 7 7 7 7 7 7 f 
                    f 7 7 7 7 7 7 7 7 f 
                    f 7 7 7 7 7 7 7 7 f 
                    f 7 7 7 7 7 7 7 7 f 
                    f 7 7 7 7 7 7 7 7 f 
                    f 7 7 7 7 7 7 7 7 f 
                    f f f f f f f f f f 
                    `, SpriteKind.Player)
                gridSprite.left = currentX
                gridSprite.top = currentY
                gridSprites.push(gridSprite)
            }
            currentX += 10
        }
        currentY += 10
    }
    cursor.left = cursorX
    cursor.top = cursorY
    neighborCountSprite.left = cursorX
    neighborCountSprite.top = cursorY
    neighborCountSprite.setText(convertToText(countNeighbors(cursorGridRow, cursorGridCol)))
}
function countNeighborsWrapTop (currentRow: number, currentCol: number) {
    neighborCount = 0
    if (currentCol == 0) {
        return countNeighborsTopLeft()
    } else if (currentCol == 15) {
        return countNeighborsTopRight()
    } else {
        neighborCount += copyBottom()[currentCol - 1]
        neighborCount += copyBottom()[currentCol - 0]
        neighborCount += copyBottom()[currentCol + 1]
    }
    neighborCount += grid[currentRow - 0][currentCol + 1]
    neighborCount += grid[currentRow + 1][currentCol + 1]
    neighborCount += grid[currentRow + 1][currentCol + 0]
    neighborCount += grid[currentRow + 1][currentCol - 1]
    neighborCount += grid[currentRow + 0][currentCol - 1]
    return neighborCount
}
function countNeighborsTopLeft () {
    neighborCount = 0
    neighborCount += grid[0 - 0][0 + 1]
    neighborCount += grid[0 + 1][0 + 0]
    neighborCount += grid[0 + 1][0 + 1]
    neighborCount += copyRight(1)
    neighborCount += copyRight(0)
    neighborCount += copyRight(11)
    neighborCount += copyBottom()[0]
    neighborCount += copyBottom()[1]
    return neighborCount
}
function countNeighborsBottomRight () {
    neighborCount = 0
    neighborCount += grid[11 - 0][15 - 1]
    neighborCount += grid[11 - 1][15 - 1]
    neighborCount += grid[11 - 1][15 + 0]
    neighborCount += copyLeft(10)
    neighborCount += copyLeft(0)
    neighborCount += copyLeft(11)
    neighborCount += copyTop()[15]
    neighborCount += copyTop()[14]
    return neighborCount
}
function countNeighbors (currentRow: number, currentCol: number) {
    neighborCount = 0
    if (currentRow == 0) {
        return countNeighborsWrapTop(currentRow, currentCol)
    } else if (currentRow == 11) {
        return countNeighborsWrapBottom(currentRow, currentCol)
    } else if (currentCol == 0) {
        return countneighborswrapleft(currentRow, currentCol)
    } else if (currentCol == 15) {
        return countneighborswrapright(currentRow, currentCol)
    } else {
        neighborCount += grid[currentRow - 1][currentCol - 1]
        neighborCount += grid[currentRow - 1][currentCol - 0]
        neighborCount += grid[currentRow - 1][currentCol + 1]
        neighborCount += grid[currentRow - 0][currentCol + 1]
        neighborCount += grid[currentRow + 1][currentCol + 1]
        neighborCount += grid[currentRow + 1][currentCol + 0]
        neighborCount += grid[currentRow + 1][currentCol - 1]
        neighborCount += grid[currentRow + 0][currentCol - 1]
        return neighborCount
    }
}
controller.down.onEvent(ControllerButtonEvent.Pressed, function () {
    if (cursorGridRow == 11) {
        cursorGridRow += 1
        cursorY += 10
    }
    cursorGridRow += 1
    cursorY += 1
    drawGrid()
})
function countNeighborsTopRight () {
    neighborCount = 0
    neighborCount += grid[0 - 0][15 - 1]
    neighborCount += grid[0 + 1][15 - 1]
    neighborCount += grid[0 + 1][15 + 0]
    neighborCount += copyLeft(1)
    neighborCount += copyLeft(0)
    neighborCount += copyLeft(11)
    neighborCount += copyBottom()[15]
    neighborCount += copyBottom()[14]
    return neighborCount
}
controller.menu.onEvent(ControllerButtonEvent.Pressed, function () {
    if (game.ask("Auto Update? (A)", "No Auto Update (B)")) {
        autoon()
    } else {
        autooff()
    }
})
function copyLeft (whichRow: number) {
    return grid[whichRow][0]
}
function autoon () {
    textSprite = 0
}
function countNeighborsWrapBottom (currentRow: number, currentCol: number) {
    neighborCount = 0
    if (currentCol == 0) {
        return countNeighborsBottomLeft()
    } else if (currentCol == 15) {
        return countNeighborsBottomRight()
    } else {
        neighborCount += copyTop()[currentCol - 1]
        neighborCount += copyTop()[currentCol - 0]
        neighborCount += copyTop()[currentCol + 1]
    }
    neighborCount += grid[currentRow - 0][currentCol + 1]
    neighborCount += grid[currentRow - 1][currentCol + 1]
    neighborCount += grid[currentRow - 1][currentCol + 0]
    neighborCount += grid[currentRow - 1][currentCol - 1]
    neighborCount += grid[currentRow + 0][currentCol - 1]
    return neighborCount
}
function countneighborswrapleft (currentRow: number, currentCol: number) {
    neighborCount = 0
    neighborCount += copyRight(currentRow - 1)
    neighborCount += grid[currentRow - 1][currentCol + 0]
    neighborCount += grid[currentRow - 1][currentCol + 1]
    neighborCount += grid[currentRow - 0][currentCol + 1]
    neighborCount += grid[currentRow + 1][currentCol + 1]
    neighborCount += grid[currentRow + 1][currentCol + 0]
    neighborCount += copyRight(currentRow + 1)
    neighborCount += copyRight(currentRow + 0)
    return neighborCount
}
function copyTop () {
    return grid[0]
}
let gridSprite: Sprite = null
let currentX = 0
let currentY = 0
let gridSprites: Sprite[] = []
let currentcellneighbors = 0
let currentcellaliveordead = 0
let nextgrid: number[][] = []
let textSprite = 0
let neighborCount = 0
let neighborCountSprite: TextSprite = null
let cursorY = 0
let cursorX = 0
let cursorGridRow = 0
let cursorGridCol = 0
let cursor: Sprite = null
let grid: number[][] = []
grid = []
for (let row = 0; row <= 11; row++) {
    grid.push([])
    for (let column = 0; column <= 15; column++) {
        grid[row].push(0)
    }
}
cursor = sprites.create(img`
    3 3 3 3 . . 3 3 3 3 
    3 . . . . . . . . 3 
    3 . . . . . . . . 3 
    3 . . . . . . . . 3 
    . . . . . . . . . . 
    . . . . . . . . . . 
    3 . . . . . . . . 3 
    3 . . . . . . . . 3 
    3 . . . . . . . . 3 
    3 3 3 3 . . 3 3 3 3 
    `, SpriteKind.newCursor)
cursorGridCol = 7
cursorGridRow = 5
cursorX = 70
cursorY = 50
cursor.z = 10
neighborCountSprite = textsprite.create("")
neighborCountSprite.z = 10
drawGrid()
autooff()
game.onUpdateInterval(500, function () {
    let autoflag = 0
    if (autoflag == 1) {
        updategrid()
        drawGrid()
    }
})
