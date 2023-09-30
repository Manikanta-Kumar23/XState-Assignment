import { assign, createMachine } from "xstate";

const count = 8

export const SignalMachine = createMachine({
    /** @xstate-layout N4IgpgJg5mDOIC5QBUBOBDAZpglgYwAIBlASSgDt0AbAOgAcr0BPAYiIBcB7OgbQAYAuolB1OsHOxydywkAA9EAFgCsimnwCMATgBMAdgAcAZj2Kdy1QBoQTJTrVHFeo8tNa9GgGwHFAX1-WaFi4hKQU1PSMTDQASpAsAOKc-EJIIKLiktKyCggAtBqqNMqenib2ynwWZTrWtgheesV6Wp56fFqujp58Ov6BGNj4xGSUtAzMsfEACqhgAG4pshkSUjJpueZNiloGfEYaRvue9lqKdYhGOkY05opmvYdaGlv9IEFDoaMRE9FxECxJABbMCoJZpFZZdagXIaRSeW6tEpGE5Ve5mC75TxaGgaAxwryKTRaPiKFFvD4hEbhcZRKYAuSwdjodhgGhYVmoAAUlT4fAAlCxKcMwmNIpN-uCRGJVtkNog8tcaJ19KSSi0PKTMdobu0XB49D1HIYKYMqaKfnSEnMwOREslBMsZVCcgqmi1PPDDMokQa9JjlCYaHt3C4jAZPCVdKbgiLvrTJtawLaWLMFlL0s61q78voHG0dJGrodtJirgYaDsLG4DLWzsoY59qWLfjQkynGczWezMJyeXyBUKzXGaeLou3yBnIdn5Q0vDQWkdqnDHIdPJiVDjXModBoqqTdPDG+b42OaABNMBUKicADu9qnWblMMu+2DzlXikOfK0Wg3eMrexDBqXoDD6AJ3mHL5R1bS9rzvVM5kWR0ISfaF5AVIwrluRxlDhPR7EUCNzA3dxjxHFs6Tgm97zwTgAFdyHYAA1ah6LAR9MhnF8EHsHQaE8LxCkjQwDDw84bEQHcESIgiIyuUDwIGWNoMoyZqIQzsWTZDlQS5a4+UFYVVMtdSrxozjZXQ3ITBxL0yjwkpiPcMsVGDPEST3IjSgMPQGwg4zm1M6IAHV0AkB8UOlLjnww-Id0A441T4UwVHhVyKzMZ4xIsDRnD88iTITULwvYRD0yizMYusxANHnFo+REoksoI7VdFufYSh2I4SUDQqguKmgwoi4FQUsl1ZzyIwtBuT1PXuA5vB3WpJN4vgKw8bxCmUMSiTKAx+otQbhrKrTu107kjkMocVIGs8TvG7i4sKCtOhSg4CLhVRA0xHRjAEkw8u6jpDUOQ7T2mdB6NgMAWBiRjHti3JFSDZ4yXy3ZTF6TF2vMHRd3xHRf1JLxwdHSHodhpJEZqhBXARKNNCcB4dgk+pFSaFE-t83YwL0FpwIg8hOAgOBZECo6nWqnM8h6LcfBSskqlKInMUVe5cXxL8US8XdCjJtT6miqyZZKDRigV0wlxVv9VoKEoBK1v6HKc6MAqgu7W3+KWTdnPcbiJsTDTJCwDF-TFvAXZbCMqM4XC0A3grbG10OnJGFR0PhinWnxHD17yNA3Hb1D8vFXGMQMST8d3bqOs8NNvH2Jp4xUs8qWsyTMOqC4jixK06bcw7MFEDprps69bAALHAmSbp7kbwm4dqJK3lZOW36ncW5DVUP6jk1JxE+O0q5-T3NlAXVp4U6q4dycAxfrA3FAa2zRA3JMeT3JqGYdP2m5cRD+MSgciYrXqIDXE1ZAx7i+h-fwQA */
    initial: "play",
    context:{
        count
    } ,

    states: {
        play: {
            initial: "Red",

            states: {
                Red: { 
                    invoke:{
                        src: (context , event) => (callback , onReceive) => {
                            const id = setInterval(() => callback("timer") , 1000);
                            return () => clearInterval(id)
                        }
                    } ,
                    after: {
                        "5000": "Wait" ,
                    },

                    on: {
                        Go: {
                            target: "Wait" ,
                            actions: assign({
                                count: 3
                            })
                        },
                        Prev: {
                            target: "Yellow" ,
                            actions: assign({
                                count: 0
                            })
                        } ,
                        timer: {
                            actions: assign({
                                count: (context) => context.count -1
                            })
                        }
                    } 
                },

                Green: {
                    on: {
                        Go: "Yellow",
                        Prev: {
                            target: "Wait" ,
                            actions: assign({
                                count: 3
                            })
                        }
                    },

                    after: {
                        "5000": "Yellow"
                    }
                },

                Yellow: {
                    invoke: {
                        src: (context , event) => (callback , onReceive) => {
                            setInterval(() => callback("countValue") , 2300)
                        }
                    } ,
                    on: {
                        Go: {
                            target: "Red" ,
                            actions: assign({
                                count:  8
                            })
                        },
                        Prev: {
                            target: "Green" ,
                            actions: assign({
                                count: 0
                            })
                        } ,
                        countValue: {
                            actions: assign({
                                count: 8
                            })
                        }
                    },

                    after: {
                        "2300": "Red"
                    }
                },

                hist: {
                    type: "history"
                },

                Wait: {
                    invoke:{
                        src: (context , event) => (callback , onReceive) => {
                            const id = setInterval(() => callback("timer") , 1000);
                            return () => clearInterval(id)
                        },
                    } ,
                    after: {
                        "3000": "Green" ,
                    },

                    on: {
                        Go: {
                            target: "Green" , 
                            actions: assign({
                                count: 0
                            })
                        },
                        Prev: {
                            target: "Red" ,
                            actions: assign({
                                count: 8
                            })
                        } ,
                        timer: {
                            actions: assign({
                                count: (context) => context.count -1
                            })
                        }
                    }
                }
            },

            on: {
                Stop: "Pause"
            }
        },

        Pause: {
            on: {
                Run: "play.hist",
                Go: "play.hist"
            }
        }
    },

    id: "Traffic SIgnal"
} 
)