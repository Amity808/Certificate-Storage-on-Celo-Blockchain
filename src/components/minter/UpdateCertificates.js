import React, { useState, useCallback, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { getCompleteCertificates, listCompletedCertificate } from '../../utils/minter';
import { toast } from 'react-toastify';
import { NotificationError } from '../ui/Notifications';
import { useContractKit } from '@celo-tools/use-contractkit';
import AddCompleteCertificate from './nft/CompleteCertificate';
import Loader from '../ui/Loader';
import CertificatesCard from './nft/Card';
import  { Row } from 'react-bootstrap'


const UpdateCertificates = ({minterContract}) => {
  const [loading, setLoading] = useState(false)
    const [completeCert, setCompleteCert] = useState([])
    const { performActions, address} = useContractKit()
    const getAssets  = useCallback(async () => {
        try {
            setLoading(true);
            const allCertificates = await getCompleteCertificates(minterContract);
            if (!allCertificates) return;
            setCompleteCert(allCertificates)
        } catch (error) {
            console.log({ error })
        } finally {
            setLoading(false);
        }
    }, [minterContract])

    const addCompleteCert = async (data) => {
      try {
        if(completeCert[data.tokenId] === undefined) {
          toast(<NotificationError text="Certificate Does Not Exist" />)
        } else if(completeCert[data.tokenId].serialNumber !== undefined) {
          toast(<NotificationError text="Ceritficate already exist" />)
        }else {
          setLoading(true)

          await listCompletedCertificate(minterContract, performActions, data)
          getAssets()
        }
      } catch (error) {
        console.log({error})
        toast(<NotificationError text="Failed to upload complete cerficate"/>)
      } finally {
        setLoading(false)
      }
    }

    // function to post the completed certificated

    const listCompletedCertificateData = async (data) => {
      try {
          if (completeCert[data.tokenId] === undefined) {
              toast(<NotificationError text="Your Certificat does not exist, Try add your completeCert" />)
          }else if (completeCert[data.tokenId].serialNumber !== undefined) {
              toast(<NotificationError text="Certificate already exist" />)
          } else {
              setLoading(true);
              await listCompletedCertificate(minterContract, performActions, data);
              getAssets()
          }

      } catch (error) {
          console.log(error)
          toast (<NotificationError text="Failed to mint your certificate of progress" />)
      } finally {
          setLoading(false);
      }
  }


    useEffect(() => {
      try {
          if (address && minterContract) {
              getAssets();
  
          }
      } catch (error) {
          console.log({ error })
      }
  }, [minterContract, address, getAssets])


  if (address) {
    return (
      <>
        <Link to="/">Home</Link>
        <div>
          {!loading ? (
            <>
              <div>
                <h1>Completed Certificate</h1>
                <AddCompleteCertificate save={addCompleteCert} />
              </div>
              <Row xs={1} sm={2} lg={3} className="g-3 mb-5 g-xl-4">
                {completeCert.map((_completeCert) => (
                  <CertificatesCard key={_completeCert.index}  certificate={{
                    ..._completeCert
                  }} />
                ))}
              </Row>
            </>
          ) : (<Loader />)}
        </div>
      </>
    )
  }
  return null;
}

export default UpdateCertificates
