"use client"
import { Button, Container, FormControl, FormHelperText, Grid, InputLabel, MenuItem, Select, TextField, } from '@mui/material';
import '../../../../public/sass/pages/deptmasters.scss'
import { useId, useState } from 'react'
import { postApi } from '@/helpers/General';
import { toast } from 'react-toastify';

export default function DeptMaster() {
    const id = useId();
    const noLabelId = `${id}-no-label`;
    const defaultValue = {distcode: 0,
        deptcode: 0,
        officecode: 0,
        office: " ",
        address: " ",
        sno : 0,
        subdeptcode : 0,
        officecodekey: 0,
        subdeptcodekey : 0,
        distcode_from : 0}
    const [formData, setformdata] = useState(defaultValue);

     const handleSubmit = async (e) => {
        e.preventDefault();
        let resp = await postApi('office/add', formData)
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
                          OFFICE FORM
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
                                        label="officecode"
                                        required
                                        variant="outlined"
                                        fullWidth 
                                        value={formData.officecode ?? ''}
                                        onChange={(e) => setformdata((prevData) => ({
                                            ...prevData,
                                            officecode: e.target.value
                                        }))}
                                        helperText="Field Required"
                                    />
                                    <TextField
                                        label="office"
                                        required
                                        variant="outlined"
                                        fullWidth
                                        value={formData.office ?? ''}
                                        onChange={(e) => setformdata((prevData) => ({
                                            ...prevData,
                                            office: e.target.value
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
                                    <TextField
                                        label="sno"
                                        required
                                        variant="outlined"
                                        fullWidth
                                        value={formData.sno ?? ''}
                                        onChange={(e) => setformdata((prevData) => ({
                                            ...prevData,
                                            sno: e.target.value
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
                                    {/* <TextField
                                        label="officecodekey"
                                        required
                                        variant="outlined"
                                        fullWidth
                                        value={formData.officecodekey ?? ''}
                                        onChange={(e) => setformdata((prevData) => ({
                                            ...prevData,
                                            officecodekey: e.target.value
                                        }))}
                                        helperText="Field Required"
                                    /> */}
                                    {/* <TextField
                                        label="subdeptcodekey"
                                        required
                                        variant="outlined"
                                        fullWidth
                                        value={formData.subdeptcodekey ?? ''}
                                        onChange={(e) => setformdata((prevData) => ({
                                            ...prevData,
                                            subdeptcodekey: e.target.value
                                        }))}
                                        helperText="Field Required"
                                    /> */}
                                    <TextField
                                        label="distcode_from"
                                        required
                                        variant="outlined"
                                        fullWidth
                                        value={formData.distcode_from ?? ''}
                                        onChange={(e) => setformdata((prevData) => ({
                                            ...prevData,
                                            distcode_from: e.target.value
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