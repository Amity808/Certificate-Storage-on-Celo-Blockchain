import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { getCompleteCertificates, listCompletedCertificate } from '../../utils/minter';
import { toast } from 'react-toastify';
import { NotificationError } from '../ui/Notifications';
import { useContractKit } from '@celo-tools/use-contractkit';
import AddCompleteCertificate from './nft/CompleteCertificate';

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
          if (certificates[data.tokenId] === undefined) {
              toast(<NotificationError text="Your Certificat does not exist, Try add your certificate" />)
          }else if (certificates[data.tokenId].serialNumber !== undefined) {
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


  return (
    <div>
      <Link to="/">Home</Link>
    </div>
  )
}

export default UpdateCertificates
