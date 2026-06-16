'use client'
import { Container, Grid } from '@mui/material';
import '../../../../public/sass/pages/home.scss';
import { getApi } from '@/helpers/General';
import { useEffect, useState } from 'react';
import { CallReceived } from '@mui/icons-material';

export default function HomeScreen() {

    const [info, setinfo] = useState({
        records: 1,
        recieved: 1,
        imported: 1,
    });

    const getRecords = async () => {
        let resp = await getApi('entry/count')
        console.log('----resp----', resp)
        if (resp && resp.status) {
            let { data } = resp;
            console.log('---data---',data);
            if (data) {
                console.log('---data---', data)
                setinfo({
                    records: data.records,
                    recieved: data.recieved,
                    imported: data.imported
                });
            }
        }
    }

    useEffect(() => {
        getRecords();
    }, [])

    useEffect(() => {
        console.log('----info---', info)
    }, [info])

    return (
        <div className="home_section">
            <Container>
                <Grid container>
                    <Grid size={{ xl: 12, lg: 12, md: 12, sm: 12, xs: 12 }} >
                        <div className="home">

                            <div className='records'>
                                <h2>TOTAL RECORDS</h2>
                                <p>{info.records}</p>
                            </div>

                            <div className='records'>
                                <h2>DATA RECEIVED</h2>
                                <p>{info.recieved}</p>
                            </div>

                            <div className='records'>
                                <h2>DATA IMPORTED</h2>
                                <p>{info.imported}</p>
                            </div>

                        </div>
                    </Grid>
                </Grid>
            </Container >
        </div >
    );
}
