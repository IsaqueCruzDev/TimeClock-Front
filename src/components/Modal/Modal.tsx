import { Modal } from "antd";
import { forwardRef, ReactNode } from "react";

interface IModalComponent {
    isModalOpen: boolean
    handleOk: () => void
    handleCancel: () => void
    title: string
    children: ReactNode
}

const ModalComponent = forwardRef<HTMLDivElement, IModalComponent>(({ title, children, isModalOpen, handleOk, handleCancel }, ref) => {

    if (!isModalOpen) return null

    return (
        <Modal title={title} open={isModalOpen} onOk={handleOk} onCancel={handleCancel} panelRef={ref as any}>
            <div className="flex flex-col gap-3">
                { children }
            </div>
        </Modal>
    )
})

export default ModalComponent