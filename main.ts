Svetelna_Brana.OnLightBackInNormal(function () {
    basic.showLeds(`
        . # . # .
        . # . # .
        . . . . .
        # . . . #
        . # # # .
        `)
})
Svetelna_Brana.OnLightDrop(function () {
    basic.showLeds(`
        . . . . .
        . # . # .
        . . . . .
        . # # # .
        . # . # .
        `)
})
Svetelna_Brana.SpustitKalibraci(50)
