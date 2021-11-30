let vteriny = 0
let lightLevel = 0
let calibrated = false
function spustitKalibraci() {
    vteriny = 5
    while (vteriny > 0) {
        basic.showNumber(vteriny)
        basic.pause(1000)
        vteriny += -1
    }
    lightLevel = input.lightLevel()
    calibrated = true
}
basic.forever(function () {
    // basic.showString("Umistete zdroj svetla na pozici. Pote stisknete leve tlacitko a behem 10 sekund umistete microbit ke zdroji svetla. Pote probehne kalibrace a svetelna bude pripravena")
    if (input.buttonIsPressed(Button.A)) {
        spustitKalibraci()
    }
    if (calibrated == true && (input.lightLevel() > lightLevel + 20 || input.lightLevel() < lightLevel - 20)) {
        serial.writeLine("ulozeny: " + lightLevel.toString())
        serial.writeLine("aktualni: " + input.lightLevel().toString())

        basic.showIcon(IconNames.Sad)
        basic.pause(5000)
    }
})
