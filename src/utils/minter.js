// Import axios library for making HTTP requests
import axios from 'axios'

// Import Web3Storage from bundle.esm.min.js
import { Web3Storage } from 'web3.storage/dist/bundle.esm.min.js';

import { NotificationSuccess } from '../components/ui/Notifications';
import { toast } from 'react-toastify';

// Create a new Web3Storage client instance
const client = new Web3Storage({
    token: process.env.REACT_APP_STORAGE_API_KEY
});


// Format a name by replacing spaces with %20
const formatName = (name) => {
    // replace all spaces with %20
    return encodeURI(name)

}


// Convert an object to a file for uploading
const converObjectToFile = (data) => {
    const blob = new Blob([JSON.stringify(data)], {type: "application/json"})
    const files = [new File([blob], `${data.name}.json`)];
    return files;
}


// Function to create certificates
export const createCertificates = async (
    minterContract, 
    performActions,
    {name, description, ipfsImage, ownerAddress, attributes}
) => {
    await performActions(async (kit) => {
        if (!name || !description || !ipfsImage) return;
        const { defaultAccount } = kit

        const data = {
            name,
            description,
            image: ipfsImage,
            owner: defaultAccount,
            attributes,
        }

        try {
            // trim any extra whitespace from the name and
            // replace the whitespace btwn the name with %20
            const fileName = formatName(name)

            // bundle certificate metadata into a file
            const files = converObjectToFile(data)

            // save certificate metadata into a file
            const cid = await client.put(files);

            // IPFS url for upload metadata
            const url = `https://${cid}.ipfs.w3s.link/${fileName}.json`;

            // mint certificate and save th url to the blockchain
            return await minterContract.methods.safeMint(ownerAddress, url).send({from: defaultAccount});

        } catch (error) {
            console.log("Error uploading file: ", error)
        }
    })
}


// Function to upload a file to Web3Storage
export const uploadFileToWebStorage = async (e) => {

    // Initialize the Web3Storage client with an API key
    const client = new Web3Storage({token: process.env.REACT_APP_STORAGE_API_KEY})
    const files = e.target.files;
    const file = files[0];

    const fileName = file.name;
    const imageName = formatName(fileName)

    const cid = await client.put(files);
    return `https://${cid}.ipfs.w3s.link/${imageName}`

}

// function to listed completed cerficates progress

export const listCompletedCertificate = async ( minterContract, performActions, { tokenId, serialnumber}) => {
    await performActions(async (kit) => {
        const { defaultAccount } = kit;

        try {
            await minterContract.methods.listCompletedCertificate(tokenId, serialnumber).send({ from: defaultAccount});
            toast(<NotificationSuccess text="Listing Completed Certificate" />)
        } catch (error) {
            console.log(error);
        }
    })
}



// Function to fetch all certificates
export const getCertificates = async (minterContract) => {
    try {
        const certificates = []

        const certificatesLength = await minterContract.methods.totalSupply().call();
        for (let i = 0; i < Number(certificatesLength); i++) {
            const certificate = new Promise(async (resolve) => {
                const res = await minterContract.methods.tokenURI(i).call();
                const meta = await fetchCertificateMeta(res);
                const owner = await fetchCertificateOwner(minterContract, i);
                resolve({
                    index: i,
                    owner,
                    name: meta.data.name,
                    image: meta.data.image,
                    description: meta.data.description,
                    attributes: meta.data.attributes,
                })
            });
            certificates.push(certificate)
        }
        return Promise.all(certificates)
    } catch (e) {
        console.log({ e })
    }

}

// function get all completed certificates
export const getCompleteCertificates = async(minterContract) => {
    const completeCert = [];
    const certLength = await minterContract.methods.totalSupply().call();
    
    for (let i = 0; i < Number(certLength); i++) {
        const cert = new Promise(async (resolve, reject) => {
            try {
                const res = await minterContract.methods.getCompleteCertificate(i).call();
                const meta = await fetchCertificateMeta(res.url)
                if(meta != null) {
                    resolve({
                        index: i,
                        owner: res.owner,
                        serialnumber: res.serialnumber,
                        image: meta.data.image,
                        name: meta.data.name,
                        description: meta.data.description,
                        attributes: meta.data.attributes,
                    })
                } else {
                    resolve({
                        index: i,
                        owner: "0x0000000000000000000000000000000000000000",
                        serialnumber: "",
                        image: "",
                        name: "",
                        description: "",
                        attributes: [{}, {}, {}],
                    })
                }
            } catch (e) {
                reject(e);
            }
        })

        try {
            const resolveCert = await cert;
            completeCert.push(resolveCert);
        } catch (e) {
            console.log({ e })
        }
    }
    return completeCert;
}





// Function to fetch certificate metadata from an IPFS URL
export const fetchCertificateMeta = async (ipfsUrl) => {
    try {
        if (!ipfsUrl) return null;
        const meta = await axios.get(ipfsUrl)
        return meta
    } catch (e) {
        console.log({ e })
    }
}

// the function to fetch the owner and the owner certyificate contract
export const fetchCertificateOwner = async (minterContract, index) => {
    try {
        return await minterContract.methods.ownerOf(index).call();
    } catch (e) {
        console.log({ e })
    }
}

// Function to fetch the owner of the certificate contract
export const fetchCertificateContractOwner = async (minterContract) => {
    try {
        let owner = await minterContract.methods.owner().call();
        return owner;
    } catch (e) {
        console.log({ e })
    }
}