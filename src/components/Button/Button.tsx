import { Button } from "antd"
import { forwardRef } from "react"

interface IButtonComponent {
    onClick: () => void
    text: string
}

const ButtonComponent = forwardRef<HTMLButtonElement | null, IButtonComponent>(({ onClick, text }, ref) => {

    return (
        <Button onClick={onClick} type="primary" ref={ref as React.Ref<any>}>{ text }</Button>
    )
})

export default ButtonComponent