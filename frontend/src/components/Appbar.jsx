import { useState } from "react"
import Logout from "./Logout"


export const Appbar = ({ name }) => {
    let [isClick, setIsclick] = useState(false);

    return <div className="shadow h-14 flex justify-between">
        <div className="flex flex-col justify-center h-full ml-4">
            Wallet App
        </div>
        <div className="flex">
            <div className="flex flex-col justify-center h-full mr-4">
                {name}
            </div>
            <div className="rounded-full h-12 w-12 bg-slate-200 flex justify-center mt-1 mr-2 cursor-pointer hover:bg-slate-500" onClick={e => { setIsclick(x => !x) }}>
                <div className="flex flex-col justify-center h-full text-xl">
                    {name[0]}
                </div>
            </div>
            {isClick ? (
                <div className="absolute top-16 right-2 shadow-lg p-4 bg-slate-400 border rounded-lg  hover:bg-slate-500">
                    <Logout />
                </div>
            ) : null}

        </div>
    </div>
}