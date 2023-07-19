import React, { useState } from 'react'
import { getCertificates } from '../../utils/minter';
const UpdateCertificates = () => {
    const [completeCert, setCompleteCert] = useState([])
    const getAssets  = useCallback(async () => {
        try {
            setLoading(true);
            const allCertificates = await getCertificates(minterContract);
            if (!allCertificates) return;
            setCompleteCert(allCertificates)
        } catch (error) {
            console.log({ error })
        } finally {
            setLoading(false);
        }
    }, [minterContract])
  return (
    <div>
      Ess
    </div>
  )
}

export default UpdateCertificates
