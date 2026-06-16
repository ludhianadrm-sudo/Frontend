'use client'

import Link from 'next/link';

import {
    Container,
    Grid,
    Button
} from '@mui/material';

import '../../../../public/sass/pages/master.scss';

export default function Master() {

    return (

        <div className="master_page">

            <Container>

                <Grid container spacing={4}>

                    {/* Department Master */}

                    <Grid size={{ xl: 4, lg: 4, md: 4, sm: 12, xs: 12 }}>

                        <div className="master_box">

                            <h2 className="title">
                                Department Master
                            </h2>

                            <Link href="/departmentmasters">

                                <Button
                                    variant="contained"
                                    className="master_btn"
                                    fullWidth
                                >
                                    Add
                                </Button>

                            </Link>

                        </div>

                    </Grid>

                    {/* SubDepartment Master */}

                    <Grid size={{ xl: 4, lg: 4, md: 4, sm: 12, xs: 12 }}>

                        <div className="master_box">

                            <h2 className="title">
                                SubDepartment Master
                            </h2>

                            <Link href="/subdepartmentmasters">

                                <Button
                                    variant="contained"
                                    className="master_btn"
                                    fullWidth
                                >
                                    Add
                                </Button>

                            </Link>

                        </div>

                    </Grid>

                    {/* Office Master */}

                    <Grid size={{ xl: 4, lg: 4, md: 4, sm: 12, xs: 12 }}>

                        <div className="master_box">

                            <h2 className="title">
                                Office Master
                            </h2>

                            <Link href="officemasters">

                                <Button
                                    variant="contained"
                                    className="master_btn"
                                    fullWidth
                                >
                                    Add
                                </Button>

                            </Link>

                        </div>

                    </Grid>

                </Grid>

            </Container>

        </div>
    );
}