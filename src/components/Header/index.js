import React, {useState} from 'react';
import {observer} from "mobx-react-lite";
import {AppBar, Box, FormControl, Grid, MenuItem, Select, Toolbar, Typography} from "@mui/material";
import useStore from "../../hooks/useStore";
import {User} from "../common/User";

const Header = () => {
    const {boards, users} = useStore()

    const onChangeBoard = (e) => {
        const {value} = e.target
        boards.selectBoard(value)
    }

    return (
        <AppBar position={'static'}>
            <Toolbar variant={"dense"}>
                <Grid container justifyContent={'space-between'} alignItems={'center'}>
                    <Grid item>
                        <Box display="flex" alignItems={'center'}>
                            <Typography variant={'h6'}>
                                Dashboard:
                            </Typography>
                            <FormControl variant={"outlined"}>
                                <Select style={{backgroundColor: '#ffffff', marginLeft: 10}}
                                        value={boards.activeBoard?.id || ''}
                                        native
                                        onChange={(e) => onChangeBoard(e)}>
                                    <option value={''} disabled>
                                        ---
                                    </option>
                                    {boards.list.map((t) => (
                                        <option key={t.id} value={t.id}>
                                            {t.title}
                                        </option>
                                    ))}
                                </Select>
                            </FormControl>
                        </Box>
                    </Grid>
                    <Grid item>
                        <User user={users?.me}/>
                    </Grid>
                </Grid>
            </Toolbar>
        </AppBar>
    );
};

export default observer(Header);