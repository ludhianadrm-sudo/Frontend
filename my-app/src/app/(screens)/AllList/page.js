'use client'

import { Container, Grid, FormControl, Select, MenuItem, FormHelperText } from '@mui/material';
import "../../../../public/sass/pages/alllist.scss";
import { useEffect, useId, useState } from 'react';
import { getApi } from '@/helpers/General';
export default function AllList() {
    const id = useId();
    const noLabelId = `${id}-no-label`;

    const depDrop = ["All Department", "All Sub Department", "All Office", "Department without Sub-department"];
    const [dropdown, setDropdown] = useState('');
    const handleChange = async (e) => {
        setDropdown(e.target.value)
        console.log(e.target.value, "dropdown value");
    }
    const [info, setInfo] = useState([]);
    const getInfo = async () => {

        if (dropdown) {
            if (dropdown === 'All Department') {
                let resp = await getApi('department/list')
                if (resp && resp.status) {
                    let { data } = resp;
                    if (data && data.data) {
                        setInfo(data.data);
                    }
                }
            }
            else if (dropdown === 'All Sub Department') {
                let resp = await getApi('subdepartment/list')
                if (resp && resp.status) {
                    let { data } = resp;
                    if (data && data.data) {
                        setInfo(data.data);
                    }
                }
            }
            else if (dropdown === 'All Office') {
                let resp = await getApi('office/list')
                if (resp && resp.status) {
                    let { data } = resp;
                    if (data && data.data) {
                        setInfo(data.data);
                    }
                }
            }
            else if (dropdown === 'Department without Sub-department') {
                let resp = await getApi('department/list', { "filter": true })
                if (resp && resp.status) {
                    let { data } = resp;
                    if (data && data.data) {
                        setInfo(data.data);
                    }
                }
            }
        }
    }

    useEffect(() => {
        getInfo();
    }, [dropdown])

    return (
        <div className='list_section'>
            <Container>
                <Grid container>
                    <Grid size={{ xl: 12, lg: 12, md: 12, sm: 12, xs: 12 }}>
                        <div className="names">
                            <div className="title">
                                DATA LIST
                            </div>
                            <FormControl sx={{ m: 1, minWidth: 120 }} fullWidth>
                                <Select
                                    label="select"
                                    aria-describedby={`${noLabelId}-helper-text`}
                                    value={dropdown ?? ''}
                                    aria-required
                                    onChange={handleChange}
                                    inputProps={{ 'aria-label': 'Age' }}
                                    fullWidth
                                    MenuProps={{
                                        disableScrollLock: true,
                                        PaperProps: {
                                            sx: {
                                                maxHeight: 250,
                                            },
                                        },
                                    }}
                                >

                                    {depDrop.map((item, index) => (
                                        <MenuItem value={item} key={index}>
                                            {item || ''}
                                        </MenuItem>
                                    ))}

                                </Select>

                                <FormHelperText id={`${noLabelId}-helper-text`}>
                                    Field Required
                                </FormHelperText>

                            </FormControl>

                            <div className="list">
                                <table>
                                    <thead>
                                        <tr>
                                            <th>Sr.No.</th>
                                            <th>Name</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {info.map((item, index) => (
                                            <tr key={index}>
                                                <td>{index + 1}</td>
                                                <td>{dropdown === 'All Office' ? item.office :
                                                    dropdown === 'Department without Sub-department' ? item.deptname :
                                                        dropdown === 'All Sub Department' ? item.subdept :
                                                            dropdown === 'All Department' ? item.deptname : ''}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </Grid>
                </Grid>
            </Container>
        </div>
    )
}
