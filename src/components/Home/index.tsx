import { useMachine } from "@xstate/react"
import React from "react"
import { SignalMachine } from "../../machines/SignalMachine/index.tsx"
import "./index.css"

const Home = () => {
    const [state , send] = useMachine(SignalMachine)
    const redColor = state.matches("play.Red") || state.matches("play.Wait") ? "bg-[#ff0000]" : null
    const yellowColor = state.matches("play.Yellow") ? "bg-[#ffe600]" : null
    const greenColor = state.matches("play.Green") ? "bg-[#6aff00]" : null
    const flash = state.matches("play.Wait") ? "flashing" : null
    return (
        <div className="flex flex-col justify-center items-center w-[100vw] h-[100vh]">
                <div className="flex items-center justify-evenly w-[95%]">
                    <div className="flex flex-col justify-evenly items-center bg-yellow-400 border-[#ff5900] border w-[125px] h-[555px]">
                        <div className={`border-[#011c3d] border rounded-[51px] bg-[#a60000] w-[95px] h-[95px] ${redColor}`}></div>
                        <div className={`border-[#011c3d] border rounded-[51px] bg-[#a69500] w-[95px] h-[95px] ${yellowColor}`}></div>
                        <div className={`border-[#011c3d] border rounded-[51px] bg-[#45a600] w-[95px] h-[95px] ${greenColor}`}></div>
                    </div>
                    <div className="bg-[#06151c] flex justify-center items-center border-yellow-400 border-[5px] w-[225px] h-[225px]">
                        {state.matches("play.Red") ? (<span role="img" aria-label="walk" className="text-[75px]">🚶</span>) : (<span role="img" aria-label="wait" className={`text-[75px] ${flash}`}>✋</span>)}
                        <h1 className={`ont-[Arial, Helvetica, sans-serif] text-[75px] leading-[26.63px] text-yellow-400 p-[5px] m-[3px] ml-[3%] font-[600] ${state.context.count <1 ? "invisible" : "visible"} `}>
                            {state.context.count}
                        </h1>
                    </div>
                </div>
                <div className="flex justify-evenly items-center">
                <button type ="button" className="text-[#fc2a2a] bg-blue-700  text-[35px] rounded-sm w-[125px] h-[35px] hover:animate-pulse"  onClick={() => send("Prev")}>⏪</button>
            {state.matches("Pause") ? (<button className="bg-[#fc2a2a] text-[35px] w-[125px] h-[35px] hover:animate-pulse"  type = "button" onClick={() => send("Run")}>▶️</button>) : (<button className="bg-[#fc2a2a] w-[125px] text-[35px] h-[35px] hover:animate-pulse" type = "button" onClick={() => send("Stop")}>⏸</button>)}
            <button className="bg-[#fc2a2a] text-[35px] w-[125px] h-[35px] hover:animate-pulse"  type = "button" onClick={() => send("Go")}>⏩</button>
                </div>
            </div>
    )
}

export default Home