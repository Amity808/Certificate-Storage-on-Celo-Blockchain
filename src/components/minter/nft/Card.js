import React from 'react'
import { Card, Col, Badge, Stack, Row } from 'react-bootstrap'
import PropTypes from 'prop-types'
import { truncateAddress } from '../../../utils'
import Identicon from '../../ui/Identicon'

const CertificatesCard = ({ certificate }) => {

    const { image, description, owner, name, index, attributes } = certificate;

  return (
    <Col key={index}>
        <Card className='h-100'>
            <Card.Header>
                <Stack direction='horizontal' gap={2}>
                    <Identicon address={owner} size={28} />
                    <span className='font-monospace text-secondary'>
                        {truncateAddress(owner)}
                    </span>
                    <Badge className='ms-auto' bg="secondary">
                        {index} ID
                    </Badge>
                </Stack>
            </Card.Header>
            <div className='ratio ratio-4x3'>
                <img src={image} alt={description} style={{ objectFit: "cover"}} />
            </div>

            <Card.Body className='d-flex flex-column text-center'>
                <Card.Title>
                    {name}
                </Card.Title>
                <Card.Text className='flex-grow-1'>
                    {description}
                </Card.Text>
                <div>
                    <Row className="mt-2">
                        {attributes.map((attribute, key) => (
                            <Col key={key}>
                                <div className='border rounded bg-light'>
                                    <div className='text-secondary fw-lighter small text-capitalize'>
                                        {attribute.trait_type}
                                    </div>
                                    <div className='text-seconday text-capitalize font-monospace'>
                                        {attribute.value}
                                    </div>
                                </div>
                            </Col>
                        ))}
                    </Row>
                </div>
            </Card.Body>
        </Card>
    </Col>
  )
}

CertificatesCard.prototype = {
    certificate: PropTypes.instanceOf(Object).isRequired,
}

export default CertificatesCard;