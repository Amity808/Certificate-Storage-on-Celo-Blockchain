import { useContractKit } from '@celo-tools/use-contractkit';
import React, {useState, useEffect, useCallback} from 'react'
import { toast } from 'react-toastify';
import PropTypes from 'prop-types'
import AddCertificates from './Add';
import Certificate from './Card'
import Loader from '../../ui/Loader';
import { NotificationSuccess, NotificationError } from '../../ui/Notifications'
import { getCertificates, createCertificates, fetchCertificateContractOwner } from '../../../utils/minter'
import { Row } from 'react-bootstrap'; 
 
const CertificatesList = ({ minterContract, name}) => {
    const { performActions, address } = useContractKit();
    const [certificates, setCertificates] = useState([]);
    const [loading, setLoading] = useState(false);
    const [certificateOwner, setcertificateOwner] = useState(null);

    // we need callback function to fetche the Certificate from the minterContract 

    const getAssets  = useCallback(async () => {
        try {
            setLoading(true);
            const allCertificates = await getCertificates(minterContract);
            if (!allCertificates) return;
            setCertificates(allCertificates)
        } catch (error) {
            console.log({ error })
        } finally {
            setLoading(false);
        }
    }, [minterContract])

    // function to create the Certificate
    const addCertificate = async (data) => {
        try {
            setLoading(true);
            await createCertificates(minterContract, performActions, data);
            toast(<NotificationSuccess text="Uploading Certificates List...." />)
            getAssets();
        } catch (error) {
            console.log({ error })
            toast(<NotificationError text="Failed to create an Certificate." />)
        } finally {
            setLoading(false)
        }
    }

    // function to fetch the owner of the Certificate contract and use getAsset

    const fetchContractOwner = useCallback(async (minterContract) => {
        // get te person that deploy the Certificate
        const _address = await fetchCertificateContractOwner(minterContract);
        setcertificateOwner(_address);

    }, []);

    useEffect(() => {
        try {
            if (address && minterContract) {
                getAssets();
                fetchContractOwner(minterContract);
            }
        } catch (error) {
            console.log({ error })
        }
    }, [minterContract, address, getAssets, fetchContractOwner])

    if(address) {
        return (
            <>
                {!loading ? (
                    <>
                        <div className='d-flex justify-content-between align-items-center mb-4'>
                            <h1 className=' fs-4 fw-bold mb-0'>{name}</h1>
                            {certificateOwner === address ? (
                                <AddCertificates save={addCertificate} address={address} />
                            ) : null}
                        </div>
                        <Row xs={1} sm={2} lg={3} className='g-3 mb-5 g-xl-4'>
                                {certificates.map((_certificate) => (
                                    <Certificate key={_certificate.index}
                                    certificate={{
                                        ..._certificate
                                    }} />
                                ))}
                        </Row>
                    </>
                ) : (
                    <Loader />
                )}
            </>
        )
    }
    return null;
}

CertificatesList.prototype = {
    minterContract: PropTypes.instanceOf(Object),
    updataBalance: PropTypes.func.isRequired,
}

CertificatesList.defaultProps = {
    minterContract: null,
  };
  
export default CertificatesList;