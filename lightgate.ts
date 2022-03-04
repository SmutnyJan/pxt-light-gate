/**
 * Použijte tento soubor k definování personalizovaných funkcí a bloků.
 * Přečtěte si více na https://makecode.microbit.org/blocks/custom
 */


/**
 * Custom blocks
 */
//% weight=100 color=#a0a803 icon="\uf030"
namespace Svetelna_Brana {
    let toleration = 0
    let lightLevel = 0
    let lightLevelDrop = false


    /**
    * Spustí kalibraci
    */
    //% block="Zkalibruj a nastav toleranci %tol"

    export function SpustitKalibraci(tol: number): void {
        lightLevel = input.lightLevel()
        toleration = tol;

    }

    /**
    * Zkontroluje, jestli došlo k porušení hladiny světla
    */
    //% block="Při porušení hladiny světla"
    export function OnLightDrop(action: () => void) {
        const myEventID = 111 + Math.randomRange(0, 100); // semi-unique

        control.onEvent(myEventID, 0, function () {
            control.inBackground(() => {
                action()
            })
        })

        control.inBackground(() => {
            while (true) {
                if (input.lightLevel() > lightLevel + toleration || input.lightLevel() < lightLevel - toleration) {
                    lightLevelDrop = true
                    control.raiseEvent(myEventID, 1)
                }
            }
        })
    }

    /**
    * Zkontroluje hladinu světla
    */
    //% block="Při vrácení do normální polohy"
    export function OnLightBackInNormal(action: () => void) {
        const myEventID = 111 + Math.randomRange(0, 100); // semi-unique

        control.onEvent(myEventID, 0, function () {
            control.inBackground(() => {
                action()
            })
        })

        control.inBackground(() => {
            while (true) {
                if (lightLevelDrop && (!(input.lightLevel() > lightLevel + toleration) && !(input.lightLevel() < lightLevel - toleration))) {
                    lightLevelDrop = false
                    control.raiseEvent(myEventID, 1)
                }
            }
        })
    }

    




}