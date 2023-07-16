import React from 'react'
import { useState } from 'react'

import { Button, Modal, Form, FloatingLabel } from 'react-bootstrap'
import { uploadFileToWebStorage } from '../../../utils/minter';
import PropTypes from 'prop-types'




const AddCertificates = ({ save, address }) => {
    const [name, setName] = useState("")
    const [ipfsImage, setIpfsImage] = useState("")
    const [description, setDescription] = useState("")
    const [attributes, setAttribute] = useState([])
    const [show, setShow] = useState(false)

    // Check if all the fields are filled
    const isFormFilled = () => name && ipfsImage && description && attributes

    // Close pop up modal
    const handleClose = () => {
        setShow(false);
        setAttribute([])
    };

    
    // Pop up modal
    const handleShow = () => setShow(true)


    
    // Add an attribute to a certificate
    const setAttributeFunc = (e, trait_type) => {
        const { value } = e.target;
        const attributeObject = {
            trait_type,
            value
        }
        const arr = attributes;

        // check if the attribute already exists
        const index = arr.findIndex((el) => el.trait_type === trait_type)

        if (index >= 0) {
            // Update the existing attribute
            arr[index] = {
                trait_type,
                value,
            };
            setAttribute(arr)
            return;
        }
        // add a new attribute
        setAttribute((oldArray) => [...oldArray, attributeObject])
    };
  return (
    <>
      
      <Button onClick={handleShow} variant='dark' className='rounded-pill px-0' style={{ width: "38px"}}>
            <i className='bi bi-plus'></i>
      </Button>

      {/* modal */}
      <Modal show={show} onHide={handleClose} centered>
        <Modal.Header closeButton>
            <Modal.Title>Mint Certificate</Modal.Title>
        </Modal.Header>

        <Modal.Body>
            <Form>
                <FloatingLabel controlId='inputLocation' label="Name" className='MB-5' >
                    <Form.Control type='text' placeholder='Name of the Certificate' onChange={(e) => {
                        setName(e.target.value)
                    }}
                    />
                </FloatingLabel>
                <FloatingLabel controlId='inputDescription' label='Description' className='mb-3' >
                    <Form.Control as="textarea" placeholder='Description' style={{ height: "80px"}} onChange={(e) => {
                        setDescription(e.target.value)
                    }}
                    />
                </FloatingLabel>

                <Form.Control type='file' className='mb-3' onChange={async (e) => {
                    const imageURL = await uploadFileToWebStorage(e);
                    if (!imageURL) {
                        alert("Failed to upload Image");
                        return;
                    }
                    setIpfsImage(imageURL)
                }} placeholder='Product Name'>
                    
                </Form.Control>

                <Form.Label>
                    <h5>Properties</h5>
                </Form.Label>


                <FloatingLabel controlId='inputissuedBy' label="Issued By E.g Google" className='mb-5' >
                    <Form.Control type='text' placeholder='Issued By E.G Google' onChange={async (e) => {
                        setAttributeFunc(e, "issuedBy")
                    }
                    }
                    />
                </FloatingLabel>

                <FloatingLabel controlId='inputdateissued' label="Date Issue" className='mb-5' >
                    <Form.Control type='text' placeholder='Issued Date' onChange={async (e) => {
                        setAttributeFunc(e, "dateIssued")
                    }}
                    />
                </FloatingLabel>

                
            </Form>
        </Modal.Body>

        <Modal.Footer>
            <Button variant="outline-secondary" onClick={handleClose}>CLose</Button>
            <Button variant='dark' disabled={!isFormFilled()} onClick={() => {
                save({
                    name, ipfsImage, description, ownerAddress: address,
                    attributes,
                })
                handleClose()
            }}>Mint Certificate</Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}

AddCertificates.propTypes = {
    save: PropTypes.func.isRequired,
    address: PropTypes.string.isRequired,
}

export default AddCertificates;
