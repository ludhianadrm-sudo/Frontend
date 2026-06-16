'use client'

import { useEffect, useId, useState } from 'react';

import {
    Button,
    Container,
    FormControl,
    FormHelperText,
    Grid,
    MenuItem,
    Pagination,
    Select,
    Stack,
} from '@mui/material';

import '../../../../public/sass/pages/view.scss';

import EditDocumentIcon from '@mui/icons-material/EditDocument';
import DeleteIcon from '@mui/icons-material/Delete';
import { getApi, postApi } from '@/helpers/General';
import { useRouter } from 'next/navigation';

export default function View() {
    const route = useRouter();
    const id = useId();
    const noLabelId = `${id}-no-label`;

    const [info, setInfo] = useState({
        buy: [],
        page: 1,
        totalPages: 1,
        totalCount: 1
    });
    const depDrop = ['Imported List', 'Totally Submited', 'Partially submitted'];
    const [dropdown, setDropdown] = useState('');
    const handleChange = async (e) => {
        setDropdown(e.target.value)
        console.log(e.target.value, "dropdown value");
    }

    const getList = async () => {
        let resp;
        if (dropdown === 'Imported List') {
            resp = await getApi('entry/list', {
                page: info.page,
            })
        }
        else if (dropdown === 'Totally Submited') {
            resp = await getApi('entry/list', {
                page: info.page,
                IsDataImported: true
            })
        }
        else if (dropdown === 'Partially submitted') {
            resp = await getApi('entry/list', {
                page: info.page,
                IsDataImported: false
            })
        }
        console.log('---List---', resp);
        if (resp && resp.status) {
            let { data } = resp;
            if (data && data.data) {
                setInfo((prevData) => ({
                    ...prevData,
                    buy: data.data,
                    totalPages: data.totalPages,
                    totalCount: data.totalCount
                }))

            }
        }
    }
    const handlePageChange = (event, value) => {
        setInfo((prevData) => ({
            ...prevData,
            page: value
        }));
    };
    const handleEdit = async (value) => {
        route.push(`./Create?_id=${value}`)
    }
    const handleDelete = async (_id) => {

        let resp = await postApi('entry/removelist', { '_id': _id })
        console.log('---resp---', resp)
        if (resp) {
            getList();
        }
        else {
            console.log('---no response---')
        }
    }

    useEffect(() => {
        getList();
    }, [info.page, dropdown])
    console.log('---info.buy---', info.buy)
    return (

        <div className="view_section">

            <Container>

                <Grid container>

                    <Grid
                        size={{
                            xl: 12, lg: 12, md: 12, sm: 12, xs: 12
                        }}
                    >

                        <div className="view">
                            <div className="title">
                                ENTRY LIST
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

                            <table>

                                <thead>

                                    <tr>

                                        <th>Sr.No.</th>

                                        <th>Department</th>

                                        <th>Sub-Department</th>

                                        <th>Office</th>

                                        <th>Received</th>

                                        <th>Data Imported</th>

                                        <th>Actions</th>

                                    </tr>

                                </thead>

                                <tbody>

                                    {info.buy.map((item, index) => (

                                        <tr key={index}>

                                            <td>
                                                {index + 1}
                                            </td>

                                            <td>
                                                {/* {item.department.deptname ? item.department.deptname : "No Department"} */}
                                                {item.department?.deptname ? item.department.deptname : "No Department"}
                                            </td>

                                            <td>
                                                {/* {item.subDepartment.subdept ? item.subDepartment.subdept : "No Sub-Department"} */}
                                                {item.subDepartment?.subdept ? item.subDepartment.subdept : "No Sub-Department"}                                            </td>

                                            <td>
                                                {/* {item.office.office ? item.office.office : "No Office"} */}
                                                {item.office?.office ? item.office.office : "No Office"}
                                            </td>

                                            <td>
                                                {item.Recieved === true ? "Yes" : "No"}
                                            </td>

                                            <td>
                                                {item.IsDataImported === true ? "Yes" : "No"}
                                            </td>

                                            <td>

                                                <div className="action_buttons">

                                                    {/*  */}
                                                    <Button
                                                        className="edit_btn"
                                                        onClick={() => handleEdit(item._id)}
                                                    >

                                                        <EditDocumentIcon />

                                                        Edit

                                                    </Button>

                                                    <Button
                                                        className="delete_btn"
                                                        onClick={() => handleDelete(item._id)}
                                                    >

                                                        <DeleteIcon />

                                                        Delete

                                                    </Button>

                                                </div>

                                            </td>

                                        </tr>

                                    ))}

                                </tbody>

                            </table>

                            <div className="pagination">
                                <Stack spacing={2}>
                                    <Pagination
                                        count={info.totalPages} page={info.page} onChange={handlePageChange}
                                    />
                                </Stack>
                            </div>
                        </div>

                    </Grid>

                </Grid>

            </Container>

        </div>
    )
}
