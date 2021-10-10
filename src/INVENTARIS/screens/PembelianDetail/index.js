import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { useHistory } from 'react-router'
import BreadCrumb from '../../components/BreadCrumb'
import Dropdown from '../../components/Dropdown'
import { Link } from 'react-router-dom'
import firebase from '../../../firebaseAPI'
import { setBarang, fetchBarangFromBackEndToRedux } from '../../redux'
import { getCabang } from '../../helpers/requestFirebase'
import { Container as Containers, ButtonDirects } from '../../components/components'
import { getPembelianDetail } from '../../helpers/request_pembelian'
import { paginationConverter } from '../../helpers/general'
import moment from 'moment'
import ButtonCreate from '../../components/ButtonCreate'
// import { Container, Row, Col, Card, CardText, CardBody, CardTitle } from 'reactstrap';

function Pembelian_List(props) {
    const { id } = props.match.params
    const [cabang, setCabang] = useState('')
    const [namaEmployee, setNamaEmployee] = useState('')
    const [department, setDepartment] = useState('')
    const [namaVendor, setNamaVendor] = useState('')
    const [tanggalPembelian, setTanggalPembelian] = useState('')
    const [status, setStatus] = useState('')
    useEffect(() => {
        getPembelianDetail({}, id).then((res) => {
            console.log(res.data)
            setCabang(res.data.cabang)
            setNamaEmployee(res.data.nama_user)
            setDepartment(res.data.department)
            setNamaVendor(res.data.nama_vendor)
            setTanggalPembelian(res.data.tgl_pembelian)
            setStatus(res.data.status)
        })
    }, [])
    return (
        <Containers>
            <BreadCrumb link={
                [
                    { name: 'Transaksi' },
                    { name: 'Pembelian' },
                    { name: 'Detail' },
                ]
            } />

            {/* <Row className="m-3">
                <Col className="mb-3" lg="3" md="6" sm="12">
                    <Card>
                        <CardBody>
                            <CardTitle>
                                Nama Vendor
                            </CardTitle>
                            <CardText className="text-muted rounded-20">{namaVendor}
                            </CardText>
                        </CardBody>
                    </Card>
                </Col>

                <Col className="mb-3" lg="3" md="6" sm="12">
                    <Card>
                        <CardBody>
                            <CardTitle>
                                Nama Employee
                            </CardTitle>
                            <CardText className="text-muted rounded-20">{namaEmployee}
                            </CardText>
                        </CardBody>
                    </Card>
                </Col>

                <Col className="mb-3" lg="3" md="6" sm="12">
                    <Card>
                        <CardBody>
                            <CardTitle>
                                Nama Cabang
                            </CardTitle>
                            <CardText className="text-muted rounded-20">{cabang}
                            </CardText>
                        </CardBody>
                    </Card>
                </Col>

                <Col className="mb-3" lg="3" md="6" sm="12">
                    <Card>
                        <CardBody>
                            <CardTitle>
                                Nama Department
                            </CardTitle>
                            <CardText className="text-muted rounded-20">{department}
                            </CardText>
                        </CardBody>
                    </Card>
                </Col>

                <Col className="mb-3" lg="3" md="6" sm="12">
                    <Card>
                        <CardBody>
                            <CardTitle>
                                Tanggal Pembelian
                            </CardTitle>
                            <CardText className="text-muted rounded-20">{tanggalPembelian}
                            </CardText>
                        </CardBody>
                    </Card>
                </Col>

                <Col className="mb-3" lg="3" md="6" sm="12">
                    <Card>
                        <CardBody>
                            <CardTitle>
                                Status
                            </CardTitle>
                            <CardText className="text-muted rounded-20">{status}
                            </CardText>
                        </CardBody>
                    </Card>
                </Col>
            </Row> */}


        </Containers>

    )
}



export default Pembelian_List