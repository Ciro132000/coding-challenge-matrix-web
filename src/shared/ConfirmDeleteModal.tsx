import type { Product } from "../services/products/types";


interface Props {
    isOpen: boolean;
    product?: Product;
    isDeleting?: boolean;
    onConfirm: () => void;
    onClose: () => void;
}

export function ConfirmDeleteModal({
    isOpen,
    product,
    isDeleting = false,
    onConfirm,
    onClose,
}: Props) {
    if (!isOpen) {
        return null;
    }

    return (
        <div className="modal modal-open">
            <div className="modal-box">
                <h3 className="font-bold text-lg">
                    Eliminar producto
                </h3>

                <p className="py-4">
                    ¿Estás seguro de que deseas eliminar el producto{" "}
                    <span className="font-semibold">
                        "{product?.name}"
                    </span>?
                </p>

                <p className="text-sm text-gray-500 mb-4">
                    Esta acción no se puede deshacer.
                </p>

                <div className="modal-action">
                    <button
                        type="button"
                        className="btn"
                        onClick={onClose}
                        disabled={isDeleting}
                    >
                        Cancelar
                    </button>

                    <button
                        type="button"
                        className="btn btn-error"
                        onClick={onConfirm}
                        disabled={isDeleting}
                    >
                        {isDeleting
                            ? "Eliminando..."
                            : "Eliminar"}
                    </button>
                </div>
            </div>

            <div
                className="modal-backdrop"
                onClick={isDeleting ? undefined : onClose}
            />
        </div>
    );
}