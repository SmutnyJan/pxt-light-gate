input.onButtonPressed(Button.A, function () {
    Svetelna_Brana.SpustitKalibraci(3)
})
Svetelna_Brana.NastavitToleranci(25)
basic.forever(function () {
    Svetelna_Brana.ProvedKontrolu()
})
