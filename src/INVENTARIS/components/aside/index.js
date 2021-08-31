import React, { useState } from 'react'
import {
    ProSidebar,
    Menu,
    MenuItem,
    SubMenu,
    SidebarHeader,
    SidebarContent,
    SidebarFooter
} from 'react-pro-sidebar'
import {
    Link, useHistory, BrowserRouter as Router, Route
} from 'react-router-dom'
import './style.scss'
import Switch from 'react-switch'
import SidebarImg from '../../assets/bg1.jpg'
import Menu1 from '../../assets/menu.png'
import Menu2 from '../../assets/menu1.png'
import { FaTv, FaFileArchive, FaUserPlus } from 'react-icons/fa'
import { MdDashboard } from "react-icons/md";
import { IoIosArchive } from "react-icons/io";
import { CgNotes } from "react-icons/cg";
import { HiOfficeBuilding, HiOutlineSwitchHorizontal } from "react-icons/hi";
import { ImOffice } from "react-icons/im";
import { AiOutlineShop } from "react-icons/ai";
import { } from "react-icons/gr";
import { RiSettings2Line, RiFireFill, RiPrinterCloudFill, RiBuilding2Fill } from "react-icons/ri";
import { GiBandageRoll, GiUpgrade, } from "react-icons/gi";
import { connect } from 'react-redux'
import { props } from 'bluebird'
import { setAside } from '../../redux'
// Screen Import
import Dashboard from '../../screens/Dashboard'
import Inventaris from '../../screens/Inventaris'
import Cabang_List from '../../screens/Cabang_List'
import Cabang_Form from '../../screens/Cabang_Form'
import Department_List from '../../screens/Department_List'
import Department_Form from '../../screens/Department_Form'
import User_List from '../../screens/User_List'
import User_Form from '../../screens/User_Form'
import Vendor_List from '../../screens/Vendor_List'
import Vendor_Form from '../../screens/Vendor_Form'
const Aside = (props) => {
    const { visiblesidebar } = props //kalau tidak mau deklarasi, pakai props.visiblesidebar

    console.log(visiblesidebar)
    const visibleAside = () => {
        props.setAside({ visible: visiblesidebar ? false : true })

    }
    return (
        <Router>
            <ProSidebar image={SidebarImg} collapsed={!visiblesidebar}>
                {!visiblesidebar ? null :
                    <SidebarHeader>
                        <div className="navigation-action">
                            <div >
                                <img className="navigasi" src={!visiblesidebar ? Menu1 : Menu2} width={25} onClick={visibleAside}></img>
                            </div>
                            <div className="logo">
                                <span className="textmenu">INVENTARIS</span>
                            </div>
                        </div>
                    </SidebarHeader>
                }

                <SidebarContent>
                    <Menu iconShape="round">
                        <MenuItem icon={<MdDashboard />} suffix={<span className="badge red"></span>}>
                            <Link to="/dashboard"> Dashboard </Link>
                        </MenuItem>
                        <SubMenu
                            icon={<FaFileArchive />}
                            suffix={<span className="badge yellow"></span>}
                            title={'Master'}>


                            <MenuItem>
                                <ImOffice className="iconSubMenu" />
                                <Link to="/cabang-list">
                                    Cabang
                                </Link>
                            </MenuItem>

                            <MenuItem>
                                <RiBuilding2Fill className="iconSubMenu" />

                                <Link to="/department-list">
                                    Departemen
                                </Link>
                            </MenuItem>
                            <MenuItem>
                                <FaUserPlus className="iconSubMenu" />
                                <Link to="/user-list">
                                    User
                                </Link>
                            </MenuItem>
                            <MenuItem>
                                <FaUserPlus className="iconSubMenu" />
                                <Link to="/vendor-list/">
                                    Vendor
                                </Link>
                            </MenuItem>
                        </SubMenu>



                        <SubMenu
                            icon={<IoIosArchive />}
                            suffix={<span className="badge yellow"></span>}
                            title={'Aset'}>


                            <MenuItem>
                                <ImOffice className="iconSubMenu" />
                                <Link to="">
                                    CPU
                                </Link>
                            </MenuItem>

                            <MenuItem>
                                <RiBuilding2Fill className="iconSubMenu" />

                                <Link to="">
                                    Monitor
                                </Link>
                            </MenuItem>
                            <MenuItem>
                                <FaUserPlus className="iconSubMenu" />
                                <Link to="">
                                    UPS
                                </Link>
                            </MenuItem>
                            <MenuItem>
                                <FaUserPlus className="iconSubMenu" />
                                <Link to="">
                                    Printer
                                </Link>
                            </MenuItem>
                            <MenuItem>
                                <FaUserPlus className="iconSubMenu" />
                                <Link to="">
                                    Laptop
                                </Link>
                            </MenuItem>
                            <MenuItem>
                                <FaUserPlus className="iconSubMenu" />
                                <Link to="">
                                    Mesin NVR (CCTV)
                                </Link>
                            </MenuItem>
                        </SubMenu>


                        <SubMenu
                            icon={<CgNotes />}
                            suffix={<span className="badge yellow"></span>}
                            title={'Transaksi'}>


                            <MenuItem>
                                <AiOutlineShop className="iconSubMenu" />
                                <Link to="">
                                    Pembelian
                                </Link>
                            </MenuItem>

                            <MenuItem>
                                <RiSettings2Line className="iconSubMenu" />
                                <Link to="">
                                    Service
                                </Link>
                            </MenuItem>
                            <MenuItem>
                                <RiFireFill className="iconSubMenu" />
                                <Link to="">
                                    Refill Ink
                                </Link>
                            </MenuItem>
                            <MenuItem>
                                <RiPrinterCloudFill className="iconSubMenu" />
                                <Link to="">
                                    Refill Toner
                                </Link>
                            </MenuItem>
                            <MenuItem>
                                <GiBandageRoll className="iconSubMenu" />
                                <Link to="">
                                    Ganti Pita
                                </Link>
                            </MenuItem>
                            <MenuItem>
                                <GiUpgrade className="iconSubMenu" />
                                <Link to="">
                                    Upgrade
                                </Link>
                            </MenuItem>
                            <MenuItem>
                                <HiOutlineSwitchHorizontal className="iconSubMenu" />
                                <Link to="">
                                    Pertukaran
                                </Link>
                            </MenuItem>
                        </SubMenu>

                    </Menu>
                </SidebarContent>
            </ProSidebar>

            <div className="content-container">
                <Route exact path={'/'} component={Dashboard} />
                <Route path={'/dashboard'} component={Dashboard} />
                <Route path={'/inventaris'} component={Inventaris} />
                <Route path={'/cabang-list'} component={Cabang_List} />
                <Route path={'/cabang-create/:types'} component={Cabang_Form} />
                <Route path={'/cabang-edit/:types/:id'} component={Cabang_Form} />

                <Route path={'/department-list'} component={Department_List} />
                <Route path={'/department-create/:types'} component={Department_Form} />
                <Route path={'/department-edit/:types/:id'} component={Department_Form} />

                <Route path={'/user-list'} component={User_List} />
                <Route path={'/user-create/:types'} component={User_Form} />
                <Route path={'/user-edit/:types/:id'} component={User_Form} />

                <Route path={'/vendor-list'} component={Vendor_List} />
                <Route path={'/vendor-create/:types'} component={Vendor_Form} />
                <Route path={'/vendor-edit/:types/:unique'} component={Vendor_Form} />
            </div>


        </Router>
    )
}

const mapStateToProps = (state) => {
    return {
        visiblesidebar: state.generalReducer.sidebar.visible,

    }
}


export default connect(mapStateToProps, { setAside })(Aside);