import { Switch } from '@mui/material';

export default function CustomSwitch({ isSuspended, onClick }: { isSuspended?: boolean; onClick?: () => void }) {
    return (
        <div className="flex items-center gap-2">
            <Switch
                checked={isSuspended}
                sx={{
                    "& .MuiSwitch-switchBase.Mui-checked": {
                        color: "var(--primary)",
                    },
                    "& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track": {
                        backgroundColor: "var(--primary)",
                    },
                    "& .MuiSwitch-track": {
                        backgroundColor: "var(--gray)",
                    },
                }}
                onClick={onClick}
            />
            <span
                className={`text-[12px] font-[500] ${isSuspended ? "text-[var(--para-light)]" : "text-[var(--primary)]"
                    }`}
            >
                {isSuspended ? "Activate" : "Suspend"}
            </span>
        </div>
    )
}
