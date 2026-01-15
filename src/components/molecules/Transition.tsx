import React from "react";

export type TransitionPosition =
    | 'top-right'
    | 'top'
    | 'top-left'
    | 'bottom-right'
    | 'bottom'
    | 'bottom-left';

export interface TransitionsProps extends React.HTMLAttributes<HTMLDivElement> {
    children?: React.ReactNode;
    type?: string; // kept for API compatibility
    position?: TransitionPosition;
    in?: boolean; // controls show/hide
}

export const Transitions = React.forwardRef<HTMLDivElement, TransitionsProps>(({
    children,
    position = 'top',
    in: inProp = false,
    ...other
}, ref) => {
    const [isMounted, setIsMounted] = React.useState(false);
    const [isVisible, setIsVisible] = React.useState(false);

    React.useEffect(() => {
        if (inProp) {
            setIsMounted(true);
            setTimeout(() => setIsVisible(true), 10);
        } else {
            setIsVisible(false);
            setTimeout(() => setIsMounted(false), 300);
        }
    }, [inProp]);

    const getTransform = () => {
        switch (position) {
            case 'top-right': return isVisible ? 'translate(0,0)' : 'translate(20px,-20px)';
            case 'top': return isVisible ? 'translate(0,0)' : 'translate(0,-20px)';
            case 'top-left': return isVisible ? 'translate(0,0)' : 'translate(-20px,-20px)';
            case 'bottom-right': return isVisible ? 'translate(0,0)' : 'translate(20px,20px)';
            case 'bottom': return isVisible ? 'translate(0,0)' : 'translate(0,20px)';
            case 'bottom-left': return isVisible ? 'translate(0,0)' : 'translate(-20px,20px)';
            default: return isVisible ? 'translate(0,0)' : 'translate(0,20px)';
        }
    };

    const getOpacity = () => (isVisible ? 1 : 0);

    if (!isMounted) return null;

    return (
        <div
            ref={ref}
            style={{
                opacity: getOpacity(),
                transform: getTransform(),
                transition: 'opacity 0.3s ease, transform 0.3s ease',
                ...other.style
            }}
            {...other}
        >
            {children}
        </div>
    );
});

Transitions.displayName = 'Transitions';
