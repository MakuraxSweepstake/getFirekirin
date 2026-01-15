import { Box, Button, ClickAwayListener, Dialog, DialogActions, DialogContent, DialogTitle, Fade, IconButton, List, ListItem, Paper, Popper } from '@mui/material';
import { More } from '@wandersonalwes/iconsax-react';
import Link from 'next/link';
import { useRef, useState } from 'react';

export default function AnalyticsAction({
    onView, onEdit, onDelete
}: { onView?: string; onEdit?: string; onDelete?: () => void }) {
    const anchorRef = useRef<HTMLButtonElement | null>(null)
    const [open, setOpen] = useState(false);
    const [confirmOpen, setConfirmOpen] = useState(false);

    const handleToggle = () => setOpen((prev) => !prev);

    const handleClose = (event: MouseEvent | TouchEvent) => {
        if (anchorRef.current?.contains(event.target as Node)) return;
        setOpen(false);
    };

    const handleConfirmDelete = async () => {
        setConfirmOpen(false);
        if (onDelete) await onDelete();
    };

    const id = open ? 'action' : undefined;
    return (
        <Box>
            <IconButton
                aria-describedby={id}
                ref={anchorRef}
                onClick={handleToggle}
            >
                <More className='rotate-90' variant="TwoTone" />
            </IconButton>
            <Popper
                open={open}
                anchorEl={anchorRef.current}
                placement="bottom-end"
                transition
                style={{ zIndex: 1300 }}
                id={id}
            >
                {({ TransitionProps }) => (
                    <Fade {...TransitionProps} timeout={300}>
                        <Paper
                            elevation={3}
                            sx={{
                                width: 215,
                                borderRadius: 2,
                                mt: 1,
                            }}
                        >
                            <ClickAwayListener onClickAway={handleClose}>
                                <List>
                                    {onView ? <ListItem>
                                        <Link href={onView || ""} className='block py-3 px-4 hover:bg-[#FBF4FB]'>View Profile</Link>
                                    </ListItem> : ""}
                                    {onEdit ? <ListItem>
                                        <Link href={onEdit || ""} className='block py-3 px-4 hover:bg-[#FBF4FB]'>Edit</Link>
                                    </ListItem> : ""}
                                    {onDelete ? <ListItem>
                                        <Link href={"#"} className='block py-3 px-4 hover:bg-[#FBF4FB]'
                                            onClick={(e) => {
                                                e.preventDefault();
                                                setConfirmOpen(true);
                                            }}
                                        >Delete</Link>
                                    </ListItem> : ""}
                                </List>
                            </ClickAwayListener>
                        </Paper>
                    </Fade>
                )}
            </Popper>
            <Dialog
                open={confirmOpen}
                onClose={() => setConfirmOpen(false)}
            >
                <DialogTitle>Confirm Delete</DialogTitle>
                <DialogContent>
                    <p className='text-para-light'>
                        Are you sure you want to delete this record? This action cannot be undone.
                    </p>
                </DialogContent>
                <DialogActions>
                    <Button color="error"
                        variant="contained" onClick={() => setConfirmOpen(false)}>Cancel</Button>
                    <Button
                        onClick={handleConfirmDelete}
                        color="success"
                        variant="contained"
                    >
                        Delete
                    </Button>
                </DialogActions>
            </Dialog>
        </Box>
    )
}
