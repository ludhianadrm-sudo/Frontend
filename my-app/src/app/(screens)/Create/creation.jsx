'use client'
import { Button, Container, FormControl, FormHelperText, Grid, InputLabel, MenuItem, Select, TextField, } from '@mui/material';
import '../../../../public/sass/pages/create.scss';
import { useEffect, useId, useState } from 'react';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs';
import { getApi, postApi, validatorMake, foreach } from '@/helpers/General';
import { toast } from 'react-toastify';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';

export default function Entry() {

    const id = useId();
    const noLabelId = `${id}-no-label`;
    let defaultValue = {
        department: {} || null,
        subDepartment: {} || null,
        receiptDate: dayjs(),
        submittedby: '',
        Designation: '',
        otherDesignation: '',
        office: {} || null,
        Recieved: '',
        IsDataImported: '',
        IP: ''
    }
    const [formData, setformData] = useState(defaultValue);

    const searchParams = useSearchParams();
    const _id = searchParams.get('_id') || null;

    const [errors, setErrors] = useState(defaultValue);
    const [depDrop, setdepDrop] = useState([]);
    const [subDept, setSubDept] = useState([]);
    const [officelist, setofficeList] = useState([]);
    const handleChange = (e) => {
        setformData((prevData) => ({
            ...prevData,
            department: e.target.value
        }))
    };

    const handlechangeSubDepartment = (e) => {
        setformData((prevData) => ({
            ...prevData,
            subDepartment: e.target.value
        }))
    };

    const handlechangeOffice = (e) => {
        setformData((prevData) => ({
            ...prevData,
            office: e.target.value
        }))
    };

    const handlechangeRecieved = (e) => {
        setformData((prevData) => ({
            ...prevData,
            Recieved: e.target.value
        }))
    };

    const handlechangeIsDataImported = (e) => {
        setformData((prevData) => ({
            ...prevData,
            IsDataImported: e.target.value
        }))
    };

    const handlechangeDesignation = (e) => {
        setformData((prevData) => ({
            ...prevData,
            Designation: e.target.value
        }))
    };

    let handleErrors = (errors) => {
        foreach(errors, (item, index) => {
            setErrors((prevData) => ({
                ...prevData,
                [index]: item[0]
            }))
        })
    }

    useEffect(() => {
        fetch('https://api.ipify.org?format=json')
            .then(res => res.json())
            .then(data => {
                setformData(prev => ({
                    ...prev,
                    IP: data.ip
                }));
            })
            .catch(err => console.log(err));
    }, []);

    const getDepartment = async () => {
        if (!_id) {
            let resp = await getApi('department/list');
            if (resp && resp.status) {
                let { data } = resp;
                if (data && data.data) {
                    setdepDrop(data.data);
                }
            }
        }
        else {
            getDetails();
        }
    }
    const getSubdepartment = async () => {
        let { deptcode } = formData.department;
        if (deptcode) {
            let resp = await getApi('subdepartment/list', { "deptcode": deptcode });
            if (resp && resp.status) {
                let { data } = resp;
                if (data && data.data) {
                    setSubDept(data.data);
                }
            }
        }
    }

    const getoffice = async () => {
        let { subdeptcode } = formData.subDepartment;
        let { deptcode } = formData.department;
        if (subdeptcode && deptcode) {
            let resp = await getApi('office/list', { "subdeptcode": subdeptcode, "deptcode": deptcode });
            if (resp && resp.status) {
                let { data } = resp;
                if (data && data.data) {
                    setofficeList(data.data);
                }
            }
        }
    }

    const getDetails = async () => {
        if (_id) {
            let resp = await getApi('entry/view', { "_id": _id })
            console.log("RESOP-----", resp)
            if (resp && resp.status) {
                let { data } = resp;
                console.log('-----DATA-----', data.data);
                if (data && data.data) {
                    setformData({
                        ...defaultValue,
                        ...data.data,
                        receiptDate: data.data.receiptDate
                            ? dayjs(data.data.receiptDate)
                            : null
                    })

                }
            }
        }
        else {
            console.log('New Entry');
        }
    }
    // const resetForm = () => {
    //     setformData(defaultValue);
    //     setIsEdit(false);
    //     setEditId(null);
    //     setErrors(defaultValue);
    // };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!_id) {
            let resp = await postApi('entry/add', formData);
            if (resp.status) {
                toast.success(resp.message)
                setformData(defaultValue)
            }
            else {
                if (typeof resp.message == 'object') {
                    handleErrors(resp.message.errors)
                }
                else {
                    toast.error(resp.message)
                }
            }
        }
        else {
            let resp = await postApi('entry/update', { ...formData, "_id": _id })
            if (resp.status) {
                toast.success(resp.message)
                setformData(defaultValue)
            }
            else {
                if (typeof resp.message == 'object') {
                    handleErrors(resp.message.errors)
                }
                else {
                    toast.error(resp.message)
                }
            }
        }
    }

    // const handleEdit = (item) => {
    //     setIsEdit(true);
    //     setEditId(item._id);
    //     setformData({
    //         department: item.department,
    //         subDepartment: item.subDepartment,
    //         office: item.office,
    //         Recieved: item.Recieved,
    //         receiptDate: item.receiptDate,
    //         submittedby: item.submittedby,
    //         Designation: item.Designation,
    //         otherDesignation: item.otherDesignation,
    //         IsDataImported: item.IsDataImported
    //     });

    //     window.scrollTo({
    //         top: 0,
    //         behavior: "smooth"
    //     });
    // };

    useEffect(() => {
        getDepartment();
        // getDetails()
    }, []);
    useEffect(() => {
        getSubdepartment();
    }, [formData.department]);
    useEffect(() => {
        getoffice();
    }, [formData.subDepartment, formData.department])
    useEffect(() => {
        console.log('----------FormData----------', formData)
    }, [formData])
    return (
        <div className="create_section">
            <Container>
                <Grid container >
                    <Grid size={{ xl: 12, lg: 12, md: 12, sm: 12, xs: 12 }} >
                        <div className="create_form">
                            <form onSubmit={handleSubmit}>
                                <Grid container spacing={2} >
                                    {!_id && (
                                        <>
                                            <Grid size={{ xl: 12, lg: 12, md: 6, sm: 12, xs: 12 }}>
                                                <FormControl sx={{ m: 1, minWidth: 120 }} fullWidth>

                                                    <InputLabel id={`${id}-label`}>
                                                        Department
                                                    </InputLabel>

                                                    <Select
                                                        label="Department"
                                                        aria-describedby={`${noLabelId}-helper-text`}
                                                        value={formData.department ?? ''}
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
                                                                {item.deptname || ''}
                                                            </MenuItem>
                                                        ))}

                                                    </Select>

                                                    <FormHelperText id={`${noLabelId}-helper-text`}>
                                                        Field Required
                                                    </FormHelperText>

                                                </FormControl>
                                            </Grid>

                                            <Grid size={{ xl: 12, lg: 12, md: 6, sm: 12, xs: 12 }}>

                                                <FormControl sx={{ m: 1, minWidth: 120 }} fullWidth>

                                                    <InputLabel id={`${id}-label`}>
                                                        Sub-Department
                                                    </InputLabel>

                                                    <Select
                                                        label="Sub-Department"
                                                        aria-describedby={`${noLabelId}-helper-text`}
                                                        value={formData.subDepartment ?? ''}
                                                        onChange={handlechangeSubDepartment}
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

                                                        {subDept?.length > 0 ? (
                                                            subDept.map((item, index) => (
                                                                <MenuItem value={item} key={index}>
                                                                    {item.subdept || ''}
                                                                </MenuItem>
                                                            ))
                                                        ) : (
                                                            <MenuItem >
                                                                No subdepartment available . Add Sub department in {<Link href="/subdepartmentmasters">MASTERS TAB</Link>}
                                                            </MenuItem>
                                                        )}

                                                    </Select>

                                                    <FormHelperText id={`${noLabelId}-helper-text`}>
                                                        Field Required
                                                    </FormHelperText>

                                                </FormControl>

                                            </Grid>

                                            <Grid size={{ xl: 12, lg: 12, md: 6, sm: 12, xs: 12 }}>

                                                <FormControl sx={{ m: 1, minWidth: 120 }} fullWidth>

                                                    <InputLabel id={`${id}-label`}>
                                                        Office
                                                    </InputLabel>

                                                    <Select
                                                        label="Office"
                                                        aria-describedby={`${noLabelId}-helper-text`}
                                                        value={formData.office ?? ''}
                                                        onChange={handlechangeOffice}
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

                                                        {officelist?.length > 0 ? (
                                                            officelist.map((item, index) => (
                                                                <MenuItem value={item} key={index}>
                                                                    {item.office || ''}
                                                                </MenuItem>
                                                            ))
                                                        ) : (
                                                            <MenuItem >
                                                                No office available . Add Office in{<Link href="/officemasters" >MASTERS TAB</Link>}
                                                            </MenuItem>
                                                        )}

                                                    </Select>

                                                    <FormHelperText id={`${noLabelId}-helper-text`}>
                                                        Field Required
                                                    </FormHelperText>

                                                </FormControl>

                                            </Grid>
                                        </>
                                    )}

                                    <Grid size={{ xl: 12, lg: 12, md: 6, sm: 12, xs: 12 }}>
                                        <FormControl sx={{ m: 1, minWidth: 120 }} fullWidth>
                                            <InputLabel id={`${id}-label`}>Recieved</InputLabel>
                                            <Select
                                                label="Recieved"
                                                aria-describedby={`${noLabelId}-helper-text`}
                                                value={formData.Recieved ?? ''}
                                                required
                                                onChange={handlechangeRecieved}
                                                inputProps={{ 'aria-label': 'Age' }}
                                                fullWidth
                                                // MenuProps={{
                                                //     disableScrollLock: true,
                                                //     disablePortal: false,
                                                //     anchorOrigin: {
                                                //         vertical: "bottom",
                                                //         horizontal: "left",
                                                //     },
                                                //     transformOrigin: {
                                                //         vertical: "top",
                                                //         horizontal: "left",
                                                //     },
                                                //     PaperProps: {
                                                //         sx: {
                                                //             maxHeight: 250,
                                                //             position: "fixed",
                                                //         },
                                                //     },
                                                // }}
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
                                    </Grid>

                                    <Grid size={{ xl: 12, lg: 12, md: 6, sm: 12, xs: 12 }}>

                                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                                            <DatePicker
                                                label="Receipt Date"
                                                // value={formData.receiptDate}
                                                value={formData.receiptDate ? dayjs(formData.receiptDate) : null}
                                                onChange={(newValue) => setformData((prevData) => ({
                                                    ...prevData,
                                                    receiptDate: newValue
                                                }))}
                                                slotProps={{
                                                    textField: {
                                                        fullWidth: true,
                                                        helperText: "Field Required",
                                                    },
                                                }}
                                            />
                                        </LocalizationProvider>

                                    </Grid>

                                    <Grid size={{ xl: 12, lg: 12, md: 6, sm: 12, xs: 12 }}>

                                        <TextField
                                            label="Submitted By"
                                            required
                                            variant="outlined"
                                            fullWidth
                                            value={formData.submittedby ?? ''}
                                            onChange={(e) => setformData((prevData) => ({
                                                ...prevData,
                                                submittedby: e.target.value
                                            }))}
                                            helperText="Field Required"
                                        />
                                    </Grid>

                                    <Grid size={{ xl: 12, lg: 12, md: 6, sm: 12, xs: 12 }}>

                                        <FormControl sx={{ m: 1, minWidth: 120 }} fullWidth>
                                            <InputLabel id="designation-label">
                                                Designation
                                            </InputLabel>

                                            <Select
                                                labelId="designation-label"
                                                label="Designation"
                                                required
                                                value={formData.Designation ?? ''}
                                                onChange={handlechangeDesignation}
                                                fullWidth
                                                // MenuProps={{
                                                //     disableScrollLock: true,
                                                //     disablePortal: false,
                                                //     anchorOrigin: {
                                                //         vertical: "bottom",
                                                //         horizontal: "left",
                                                //     },
                                                //     transformOrigin: {
                                                //         vertical: "top",
                                                //         horizontal: "left",
                                                //     },
                                                //     PaperProps: {
                                                //         sx: {
                                                //             maxHeight: 250,
                                                //             position: "fixed",
                                                //         },
                                                //     },
                                                // }}
                                                MenuProps={{
                                                    disableScrollLock: true,
                                                    PaperProps: {
                                                        sx: {
                                                            maxHeight: 250,
                                                        },
                                                    },
                                                }}
                                            >
                                                <MenuItem value="Network Engineer">
                                                    Network Engineer
                                                </MenuItem>

                                                <MenuItem value="Others">
                                                    Others
                                                </MenuItem>

                                            </Select>
                                            <FormHelperText>
                                                Field Required
                                            </FormHelperText>

                                        </FormControl>

                                    </Grid>

                                    {/* SHOW TEXTFIELD ONLY WHEN "Others" IS SELECTED */}

                                    {formData.Designation === "Others" && (
                                        <Grid size={{ xl: 12, lg: 12, md: 6, sm: 12, xs: 12 }}>
                                            <TextField
                                                label="Enter Designation"
                                                variant="outlined"
                                                fullWidth
                                                value={formData.otherDesignation}
                                                onChange={(e) => setformData((prevData) => ({
                                                    ...prevData,
                                                    otherDesignation: e.target.value
                                                }))}
                                                helperText="Please enter your Designation"
                                                sx={{ m: 1 }}
                                            />

                                        </Grid>

                                    )}

                                    <Grid size={{ xl: 12, lg: 12, md: 6, sm: 12, xs: 12 }}>
                                        <FormControl sx={{ m: 1, minWidth: 120 }} fullWidth>
                                            <InputLabel id={`${id}-label`}>Data Imported</InputLabel>
                                            <Select
                                                label="Data Imported"
                                                aria-describedby={`${noLabelId}-helper-text`}
                                                value={formData.IsDataImported ?? ''}
                                                required
                                                onChange={handlechangeIsDataImported}
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
                                    </Grid>

                                </Grid>
                                <Button className='sub' variant="contained" color="primary" sx={{ m: 1 }} type='submit'>
                                    Submit
                                </Button>
                            </form>
                        </div>
                    </Grid>
                </Grid>
            </Container>
        </div >
    )
}
