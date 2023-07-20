import React, { useState } from 'react'
import PropTyes from 'prop-types'
import { Button, Modal, Form, FloatingLabel } from 'react-bootstrap'

const AddCompleteCertificate = ({ save }) => {
    const [tokenId, setTokenId] = useState('')
    const [serialnumber, setSerialnumber] = useState('')
    const [show, setShow] = useState(false)

    // Check if all the fields are filled
    const isFormFilled = () => tokenId && serialnumber;

    // Close pop up modal
    const handleClose = () => {
        setShow(false)
    }

    // show pop up modal
    const handleShow = () => setShow(true)

  return (
    <>
         
      <Button onClick={handleShow} variant='dark' className='rounded-pill px-0' style={{ width: "38px"}}>
            <i className='bi bi-plus'></i>
      </Button>

      {/* modal */}
      <Modal show={show} onHide={handleClose} centered>
        <Modal.Header closeButton>
            <Modal.Title>Mint Completed Certificates</Modal.Title>
        </Modal.Header>

        <Modal.Body>
            <Form>
                <FloatingLabel controlId='tokenId' label="Tokenid" className='mb-5' >
                    <Form.Control type='text' placeholder='Token ID' onChange={(e) => {
                        setTokenId(e.target.value)
                    }}
                    />
                </FloatingLabel>
                <FloatingLabel controlId='serialNumber' label='Serial Number' className='mb-3' >
                    <Form.Control as="text" placeholder='Serial Number' style={{ height: "80px"}} onChange={(e) => {
                        setSerialnumber(e.target.value)
                    }}
                    />
                </FloatingLabel>
            </Form>
        </Modal.Body>

        <Modal.Footer>
            <Button variant="outline-secondary" onClick={handleClose}>CLose</Button>
            <Button variant='dark' disabled={!isFormFilled()} onClick={() => {
                save({
                  tokenId, serialnumber
                })
                handleClose()
            }}>Mint Completed Certificate</Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}

AddCompleteCertificate.propTypes = {
    save: PropTyes.func.isRequired,
};

export default AddCompleteCertificate;