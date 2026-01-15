import MuiAvatar, { AvatarProps as MuiAvatarProps } from '@mui/material/Avatar';
import { styled, Theme } from '@mui/material/styles';

interface Props extends MuiAvatarProps {
    color?: 'primary' | 'secondary' | string;
    type?: 'filled' | 'outlined' | 'combined';
    size?: 'sm' | 'md' | 'lg' | 'badge';
}

const AvatarStyle = styled(MuiAvatar, {
    shouldForwardProp: (prop) => !['color', 'type', 'size'].includes(prop as string),
})<Props>(({ theme, type }: { theme: Theme } & Props) => ({
    width: 40,
    height: 40,
    borderRadius: 8,
    // Optional styles based on type/color
    backgroundColor: type === 'filled' ? theme.palette.primary.main : 'transparent',
    border: type === 'outlined' ? `2px solid ${theme.palette.primary.main}` : undefined,
    color: type === 'filled' ? theme.palette.common.white : theme.palette.primary.main,
}));

export default function Avatar({ children, color = 'primary', type = 'filled', size = 'md', ...others }: Props) {
    return (
        <AvatarStyle color={color} type={type} size={size} {...others}>
            {children}
        </AvatarStyle>
    );
}
