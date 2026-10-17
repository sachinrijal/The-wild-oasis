import { useEffect, useRef } from "react"

function useOutsideClick(handler) {

    const ref = useRef(null)

    useEffect(function () {
        function handleEvent(evt) {
            if (ref.current && !ref.current.contains(evt.target)) {
                console.log("click")
                handler()
            }
        }
        document.addEventListener("click", handleEvent, true)

        return () => document.removeEventListener("click", handleEvent, true)
    }, [ref, handler])
    
    return ref
}

export default useOutsideClick
