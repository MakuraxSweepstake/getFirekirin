// "use client";
import { Box, FormControl, InputAdornment, OutlinedInput } from "@mui/material";
import { SearchNormal1 } from "@wandersonalwes/iconsax-react";

export default function AdminSearchBar() {

    return (
        // <Box>
        //     <div className="inpute__field relative">
        //         <OutlinedInput
        //             type="search"
        //             placeholder="Search game"
        //             startAdornment={
        //                 <InputAdornment position="start">
        //                     <IconButton edge="start">
        //                         <SearchNormal size={32} />
        //                     </IconButton>
        //                 </InputAdornment>
        //             }
        //         />
        //     </div>
        // </Box>
        <Box >
            <FormControl >
                <OutlinedInput
                    id="header-search"
                    startAdornment={
                        <InputAdornment position="start" sx={{ mr: -0.5 }}>
                            <SearchNormal1 size={16} />
                        </InputAdornment>
                    }
                    aria-describedby="header-search-text"
                    slotProps={{ input: { 'aria-label': 'weight' } }}
                    placeholder="Search Keyword"
                    sx={{ '& .MuiOutlinedInput-input': { pl: 1.5 } }}
                />
            </FormControl>
        </Box>
    )
}
