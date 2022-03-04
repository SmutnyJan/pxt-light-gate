
/**
 * Custom blocks
 */
//% weight=100 color=#a0a803 icon="\uf030"
namespace SvetelnaBrana {
    let toleration = 0
    let lightLevel = 0
    let lightLevelDrop = false


    /**
    * Spustí kalibraci
    */
    //% block="Zkalibruj a nastav toleranci %tol"

    export function spustitKalibraci(tol: number): void {
        let sumOfMeasures = 0;
        for (let i = 0; i < 10; i++) {
            sumOfMeasures += input.lightLevel()
        }
        lightLevel = Math.round(sumOfMeasures / 10)
        toleration = tol;
    }

    /**
    * Zkontroluje, jestli došlo k porušení hladiny světla
    */
    //% block="Při porušení hladiny světla"
    export function onLightDrop(action: () => void) {
        const myEventID = 111 + Math.randomRange(0, 100); // semi-unique

        control.onEvent(myEventID, 0, function () {
            control.inBackground(() => {
                action()
            })
        })

        control.inBackground(() => {
            while (true) {
                let measuredLight = input.lightLevel();
                if (measuredLight > lightLevel + toleration || measuredLight < lightLevel - toleration) {
                    lightLevelDrop = true
                    control.raiseEvent(myEventID, 1)
                }               
                basic.pause(20)
            }
        })
    }



}
