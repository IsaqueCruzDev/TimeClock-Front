import { Button } from "antd"
import { forwardRef } from "react"

interface IButtonComponent {
    onClick: () => void
    text: string
}

const ButtonComponent = forwardRef(({ onClick, text }: IButtonComponent, ref) => {

    return (
        <Button onClick={onClick} type="primary" ref={ref as any}>{ text }</Button>
    )
})

export default ButtonComponent