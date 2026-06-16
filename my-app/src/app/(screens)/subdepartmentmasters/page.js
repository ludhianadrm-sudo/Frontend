"use client"
import { Button, Container, FormControl, FormHelperText, Grid, InputLabel, MenuItem, Select, TextField, } from '@mui/material';
import '../../../../public/sass/pages/deptmasters.scss'
import { useId, useState } from 'react'
import { postApi } from '@/helpers/General';
import { toast } from 'react-toastify';


export default function DeptMaster() {
    const id = useId();
    const noLabelId = `${id}-no-label`;
    const defaultValue = {
        distcode: 0,
        deptcode: 0,
        subdeptcode: 0,
        subdept: " ",
        address: " ",
        subdeptcodekey: null,
        distcode_from: null
    }
    const [formData, setformdata] = useState(defaultValue);

    const handleSubmit = async (e) => {
        e.preventDefault();
        let resp = await postApi('subdepartment/add', formData)
        if (resp.status) {
            toast.success(resp.message)
            setformdata(defaultValue)
        }
        else {
            if (typeof resp.message == 'object') {
                toast.error(resp.message.errors)
            }
            else {
                toast.error(resp.message)
            }
        }
    }

    return (
        <div className='_section'>
            <Container>
                <Grid container>
                    <Grid size={{ xl: 12, lg: 12, md: 12, sm: 12, xs: 12 }}>
                         <div className='header_top'>
                          SUB-DEPARTMENT FORM
                        </div>
                        <form onSubmit={handleSubmit} >
                            <div className="Add">
                                <TextField
                                    label="distcode"
                                    required
                                    variant="outlined"
                                    fullWidth
                                    value={formData.distcode ?? ''}
                                    onChange={(e) => setformdata((prevData) => ({
                                        ...prevData,
                                        distcode: e.target.value
                                    }))}
                                    helperText="Field Required"
                                />
                                <TextField
                                        label="deptcode"
                                        required
                                        variant="outlined"
                                        fullWidth
                                        value={formData.deptcode ?? ''}
                                        onChange={(e) => setformdata((prevData) => ({
                                            ...prevData,
                                            deptcode: e.target.value
                                        }))}
                                        helperText="Field Required"
                                    />
                                    <TextField
                                        label="subdeptcode"
                                        required
                                        variant="outlined"
                                        fullWidth
                                        value={formData.subdeptcode ?? ''}
                                        onChange={(e) => setformdata((prevData) => ({
                                            ...prevData,
                                            subdeptcode: e.target.value
                                        }))}
                                        helperText="Field Required"
                                    />
                                    <TextField
                                        label="subdept"
                                        required
                                        variant="outlined"
                                        fullWidth
                                        value={formData.subdept ?? ''}
                                        onChange={(e) => setformdata((prevData) => ({
                                            ...prevData,
                                            subdept: e.target.value
                                        }))}
                                        helperText="Field Required"
                                    />
                                    <TextField
                                        label="address"
                                        required
                                        variant="outlined"
                                        fullWidth
                                        value={formData.address ?? ''}
                                        onChange={(e) => setformdata((prevData) => ({
                                            ...prevData,
                                            address: e.target.value
                                        }))}
                                        helperText="Field Required"
                                    />

                                    <Button className='sub' variant="contained" color="primary" sx={{ m: 1 }} type='submit'>
                                    Submit
                                </Button>

                            </div>
                        </form>
                    </Grid>
                </Grid>
            </Container>

        </div >
    )
}