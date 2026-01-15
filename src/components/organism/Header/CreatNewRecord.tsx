import { PATH } from '@/routes/PATH';
import { Box, ClickAwayListener, Fade, IconButton, List, ListItem, ListItemText, Paper, Popper } from '@mui/material';
import { Add } from '@wandersonalwes/iconsax-react';
import Link from 'next/link';
import React from 'react';

export default function CreatNewRecord() {
    const [open, setOpen] = React.useState(false);
    const anchorRef = React.useRef<HTMLButtonElement | null>(null);
    const id = open ? 'create-new-record' : ""

    const handleToggle = () => setOpen((prev) => !prev);

    const handleClose = (event: MouseEvent | TouchEvent) => {
        if (anchorRef.current?.contains(event.target as Node)) return;
        setOpen(false);
    };
    return (
        <Box>
            <IconButton
                color="inherit"
                sx={[
                    {
                        maxWidth: "fit-content",
                        marginRight: 0
                    },
                ]}
                className='!bg-light-gray'
                onClick={handleToggle}
                ref={anchorRef}
            >
                <Add className='!text-para-light' />
            </IconButton>
            <Popper
                id={id}
                open={open}
                anchorEl={anchorRef.current}
                placement="bottom-end"
                transition
                style={{ zIndex: 1300 }}
            >
                {({ TransitionProps }) => (
                    <Fade {...TransitionProps} timeout={300}>
                        <Paper
                            elevation={3}
                            sx={{
                                width: 215,
                                // p: 2,
                                borderRadius: 2,
                                mt: 1,
                            }}
                        >
                            <ClickAwayListener onClickAway={handleClose}>
                                <List>
                                    <ListItem>
                                        <ListItemText>
                                            <Link href={PATH.ADMIN.GAMES.ADD_GAME.ROOT} className='block py-3 px-4 hover:bg-[#FBF4FB]'>Add Games</Link>
                                        </ListItemText>
                                        <ListItemText>
                                            <Link href={PATH.ADMIN.PLAYERS.ADD_PLAYER.ROOT} className='block py-3 px-4 hover:bg-[#FBF4FB]'>Add Players</Link>
                                        </ListItemText>
                                        {/* <ListItemText>
                                            <Link href={PATH.ADMIN.GAMES.ADD_GAME.ROOT} className='block py-3 px-4 hover:bg-[#FBF4FB]'>Add Offers</Link>
                                        </ListItemText> */}
                                    </ListItem>
                                </List>
                            </ClickAwayListener>
                        </Paper>
                    </Fade>
                )}
            </Popper>
        </Box>
    )
}
