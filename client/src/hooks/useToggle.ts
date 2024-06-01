import { useCallback, useEffect, useRef, useState } from "react"


const useToggle = (initialValue = false) => {
    const [open, setOpen] = useState(initialValue)
    const toggleRef = useRef<HTMLDivElement | HTMLButtonElement | null>(null)

    const onToggle = useCallback(() => setOpen(prevState => !prevState), []);
    const onOpen = useCallback(() => setOpen(true), []);
    const onClose = useCallback(() => setOpen(false), []);

    useEffect(() => {
        const closeToClickOutside = (event: MouseEvent) => {
            if (toggleRef.current && !toggleRef.current.contains(event.target as Node)) {
                setOpen(false)
            }
        }

        document.addEventListener('mousedown', closeToClickOutside);

        return () => {
            document.removeEventListener('mousedown', closeToClickOutside);
        }
    }, [])

    return {
        open,
        onToggle,
        onOpen,
        onClose,
        toggleRef
    }
}

export default useToggle