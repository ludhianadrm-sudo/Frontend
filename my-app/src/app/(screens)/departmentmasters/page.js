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
        deptname: '',
        address: '',
        CentreState:0,
        included: '',
        catcode: 0,
        IncludedMo: '',
        IncludedCP: '',
        IncludedContractual:''
    }

    const [formData, setformdata] = useState(defaultValue);

    const handleChangeincluded = (e) => {
        setformdata((prevData) => ({
            ...prevData,
            included: e.target.value
        }))
    };

    const handlechangeIncludedMo = (e) => {
        setformdata((prevData) => ({
            ...prevData,
            IncludedMo: e.target.value
        }))
    };

    const handleChangeIncludedCP = (e) => {
        setformdata((prevData) => ({
            ...prevData,
            IncludedCP: e.target.value
        }))
    };

    const handleChangeIncludedContractual = (e) => {
        setformdata((prevData) => ({
            ...prevData,
            IncludedContractual: e.target.value
        }))
    };

    const handleChangeCentreState = (e) => {
        setformdata((prevData) => ({
            ...prevData,
            CentreState: e.target.value
        }))
    };

    const handleChange = async (e) => {
        e.preventDefault();
        let resp = await postApi('department/add', formData)
        console.log("resp",resp);
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
                            DEPARTMENT FORM
                        </div>
                        <form onSubmit={handleChange}>
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
                                    label="deptname"
                                    required
                                    variant="outlined"
                                    fullWidth
                                    value={formData.deptname ?? ''}
                                    onChange={(e) => setformdata((prevData) => ({
                                        ...prevData,
                                        deptname: e.target.value
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
                                <FormControl sx={{ m: 1, minWidth: 120 }} fullWidth>
                                    <InputLabel id={`${id}-label`}>CenterState</InputLabel>
                                    <Select
                                        label="CenterState"
                                        aria-describedby={`${noLabelId}-helper-text`}
                                        value={formData.CentreState ?? ''}
                                        required
                                        onChange={handleChangeCentreState}
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
                                        <MenuItem value={1}>Yes</MenuItem>
                                        <MenuItem value={0}>No</MenuItem>
                                    </Select>
                                    <FormHelperText id={`${noLabelId}-helper-text`}>
                                        Field Required
                                    </FormHelperText>
                                </FormControl>


                                <FormControl sx={{ m: 1, minWidth: 120 }} fullWidth>
                                    <InputLabel id={`${id}-label`}>Included</InputLabel>
                                    <Select
                                        label="included"
                                        aria-describedby={`${noLabelId}-helper-text`}
                                        value={formData.included ?? ''}
                                        required
                                        onChange={handleChangeincluded}
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
                                        <MenuItem value={1}>Yes</MenuItem>
                                        <MenuItem value={0}>No</MenuItem>
                                    </Select>
                                    <FormHelperText id={`${noLabelId}-helper-text`}>
                                        Field Required
                                    </FormHelperText>
                                </FormControl>

                                <TextField
                                    label="catcode"
                                    required
                                    variant="outlined"
                                    fullWidth
                                    value={formData.catcode ?? ''}
                                    onChange={(e) => setformdata((prevData) => ({
                                        ...prevData,
                                        catcode: e.target.value
                                    }))}
                                    helperText="Field Required"
                                />

                                <FormControl sx={{ m: 1, minWidth: 120 }} fullWidth>
                                    <InputLabel id={`${id}-label`}>IncludedMo</InputLabel>
                                    <Select
                                        label="IncludedMo"
                                        aria-describedby={`${noLabelId}-helper-text`}
                                        value={formData.IncludedMo ?? ''}
                                        required
                                        onChange={handlechangeIncludedMo}
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
                                        <MenuItem value={1}>Yes</MenuItem>
                                        <MenuItem value={0}>No</MenuItem>
                                    </Select>
                                    <FormHelperText id={`${noLabelId}-helper-text`}>
                                        Field Required
                                    </FormHelperText>
                                </FormControl>

                                <FormControl sx={{ m: 1, minWidth: 120 }} fullWidth>
                                    <InputLabel id={`${id}-label`}>IncludedCP</InputLabel>
                                    <Select
                                        label="IncludedCP"
                                        aria-describedby={`${noLabelId}-helper-text`}
                                        value={formData.IncludedCP ?? ''}
                                        required
                                        onChange={handleChangeIncludedCP}
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
                                        <MenuItem value={1}>Yes</MenuItem>
                                        <MenuItem value={0}>No</MenuItem>
                                    </Select>
                                    <FormHelperText id={`${noLabelId}-helper-text`}>
                                        Field Required
                                    </FormHelperText>
                                </FormControl>

                                {/* <TextField
                                    label="deptcodekey"
                                    variant="outlined"
                                    fullWidth
                                    value={formData.deptcodekey ?? ''}
                                    onChange={(e) => setformdata((prevData) => ({
                                        ...prevData,
                                        deptcodekey: e.target.value
                                    }))}
                                /> */}

                                <FormControl sx={{ m: 1, minWidth: 120 }} fullWidth>
                                    <InputLabel id={`${id}-label`}>IncludedContractual</InputLabel>
                                    <Select
                                        label="IncludedContractual"
                                        aria-describedby={`${noLabelId}-helper-text`}
                                        value={formData.IncludedContractual ?? ''}
                                        required
                                        onChange={handleChangeIncludedContractual}
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
                                        <MenuItem value={1}>Yes</MenuItem>
                                        <MenuItem value={0}>No</MenuItem>
                                    </Select>
                                    <FormHelperText id={`${noLabelId}-helper-text`}>
                                        Field Required
                                    </FormHelperText>
                                </FormControl>

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