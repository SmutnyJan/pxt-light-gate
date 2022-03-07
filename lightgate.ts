//% weight=100 color=#a0a803 icon="\uf030" block="Světelná brána"
namespace SvetelnaBrana {
    let tolerance = 0
    let hladinaSvetla = 0
    let zamekMetody = false

    /**
    * Spustí kalibraci a nastaví toleranci
    * @tol Směr, do kterého se má kurzor pohnout
    */
    //% block="Zkalibruj a nastav toleranci %tol"

    export function spustitKalibraci(tol: number): void {
        let sumaMereni = 0;
        for (let i = 0; i < 10; i++) {
            sumaMereni += input.lightLevel()
        }
        hladinaSvetla = Math.round(sumaMereni / 10)
        tolerance = tol;
    }

    /**
    * Zkontroluje, jestli došlo k porušení hladiny světla
    * @akce Různé příkazy které se provedou, pokud dojde k porušení hladiny světla
    */
    //% block="Při porušení hladiny světla"
    export function kdyzPoruseniHladiny(akce: () => void) {
        const eventID = 111 + Math.randomRange(0, 100);

        control.onEvent(eventID, 0, function () {
            control.inBackground(() => {
                zamekMetody = true
                akce()
                zamekMetody = false

            })
        })

        control.inBackground(() => {
            while (true) {
                let namerenaHladinaSvetla = input.lightLevel();
                if (!zamekMetody && (namerenaHladinaSvetla > hladinaSvetla + tolerance || namerenaHladinaSvetla < hladinaSvetla - tolerance)) {
                    control.raiseEvent(eventID, 1)
                }               
                basic.pause(20)
            }
        })
    }



}
