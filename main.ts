let calibrated = false
let calibrationBegan = false
let vteriny = 0
let lightLevel = 0
input.onButtonPressed(Button.A, function () {
    spustitKalibraci()
})
function spustitKalibraci () {
    calibrated = false
    led.stopAnimation()
    music.stopAllSounds()
    calibrationBegan = true
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
    if (calibrated == true && (input.lightLevel() > lightLevel + 20 || input.lightLevel() < lightLevel - 20)) {
        basic.showIcon(IconNames.Angry)
        music.playMelody("F G F G F G F G ", 200)
    } else if (calibrationBegan == false) {
        basic.showString("Zkalibrujte senzor!")
    } else if (calibrated == true) {
        basic.showIcon(IconNames.Happy)
    }
})
