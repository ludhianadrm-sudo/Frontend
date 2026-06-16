'use client'
import { Container, Grid, } from "@mui/material";
import Logo from '../../../public/images/Logo.jpeg';
import "../../../public/sass/pages/header.scss";
import Image from "next/image";
import Nic from '../../../public/images/NIC.jpeg';
import Link from "next/link";

export default function Header() {

    return (
        <div className="header_section">
            <Container>
                <Grid container>
                    <Grid size={{ xl: 12, lg: 12, md: 12, sm: 12, xs: 12 }}>
                        <div className="header_top">
                            <div className="header_top_left">
                                <div className="indian_logo">
                                    <Image src={Logo} alt="Indian Logo" />
                                </div>
                            </div>

                            <div className="title">
                                <h1>EDMS</h1>
                                <h2>(ELECTION DATA MANAGEMENT SYSTEM)</h2>
                            </div>

                            <div className="header_top_right">
                                <Image src={Nic} alt="NIC" />
                            </div>
                        </div>

                        <div className="header_bottom">
                            <ul className="title_item">
                                <li className="nav_item">
                                    <Link href="/Home">DASHBOARD</Link>
                                </li>

                                <li className="nav_item">
                                    <Link href="/masters">MASTERS</Link>
                                </li>

                                <li className="nav_item">
                                    <Link href="/Create">UPDATE STATUS</Link>
                                </li>

                                {/* Reports Dropdown */}
                                <li className="nav_item dropdown">
                                    <span>REPORTS ▾</span>

                                    <ul className="dropdown_menu">
                                        <li>
                                            <Link href="/AllList">
                                                DATA LIST
                                            </Link>
                                        </li>

                                        <li>
                                            <Link href="/View">
                                                ENTRY LIST
                                            </Link>
                                        </li>
                                    </ul>
                                </li>
                            </ul>
                        </div>
                    </Grid>
                </Grid>
            </Container>
        </div>
    );

}
