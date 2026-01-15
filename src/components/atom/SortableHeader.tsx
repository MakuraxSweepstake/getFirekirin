import { ArrowDown, ArrowUp } from '@wandersonalwes/iconsax-react';

export default function SortableHeader({ column, label }: { column: any; label: string }) {
    const sortState = column.getIsSorted(); // asc | desc | false
    const arrow =
        sortState === "asc" ? <ArrowUp size={14} /> :
            sortState === "desc" ? <ArrowDown size={14} /> : null;

    return (
        <p
            onClick={() => column.toggleSorting()}
            className="flex items-center gap-1 cursor-pointer"
        >
            {label} {arrow}
        </p>
    );
};
