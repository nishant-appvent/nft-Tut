
// const axios = require('axios')
// const FormData = require('form-data')
// const fs = require('fs')
// const JWT = 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySW5mb3JtYXRpb24iOnsiaWQiOiJmMTU2YTdjNS03MmJlLTQzOTItOTU4OS0wYWQ3YzNjOTg4ZGIiLCJlbWFpbCI6Im5pc2hhbnQucmFqcHV0QGFwcHZlbnR1cmV6LmNvbSIsImVtYWlsX3ZlcmlmaWVkIjp0cnVlLCJwaW5fcG9saWN5Ijp7InJlZ2lvbnMiOlt7ImlkIjoiRlJBMSIsImRlc2lyZWRSZXBsaWNhdGlvbkNvdW50IjoxfSx7ImlkIjoiTllDMSIsImRlc2lyZWRSZXBsaWNhdGlvbkNvdW50IjoxfV0sInZlcnNpb24iOjF9LCJtZmFfZW5hYmxlZCI6ZmFsc2UsInN0YXR1cyI6IkFDVElWRSJ9LCJhdXRoZW50aWNhdGlvblR5cGUiOiJzY29wZWRLZXkiLCJzY29wZWRLZXlLZXkiOiJlMjUwNzM5NTdjMjZkZDkwZDNmNyIsInNjb3BlZEtleVNlY3JldCI6IjQwNGQxNDE2OTg1NjUxMTZiMTRjZTA5NWI3ZDlkYWFlMDRjMmJhYzA2ZjQ2MjAwYzQ2MzkwNDA4OWUxNWI5ZGUiLCJpYXQiOjE2NzIyOTc5NzB9.1v4xIDyS8FqBngCm5IkdtgKVv9k-Jvg7VTXO3xf46wU'
// const pinFileToIPFS = async () => {
//     const formData = new FormData();
//     const src = "./batman.jpeg";
    
//     const file = fs.createReadStream(src);
//     formData.append('file', file);
    
//     // const metadata = JSON.stringify({
//     //   name: 'Vengeance',
//     // });
//     // formData.append('pinataMetadata', metadata);
    
//     // const options = JSON.stringify({
//     //   cidVersion: 0,
//     // })
//     // formData.append('pinataOptions', options);
// ​
//     try{
//       const res = await axios.post("https://api.pinata.cloud/pinning/pinFileToIPFS", formData, {
//         maxBodyLength: "Infinity",
//         headers: {
//           'Content-Type': `multipart/form-data; boundary=${formData._boundary}`,
//           Authorization: JWT
//         }
//       });
//       console.log(res.data);
//     } catch (error) {
//       console.log(error);
//     }
// }


const axios = require('axios')
const FormData = require('form-data')
const fs = require('fs')
const JWT = 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySW5mb3JtYXRpb24iOnsiaWQiOiJmMTU2YTdjNS03MmJlLTQzOTItOTU4OS0wYWQ3YzNjOTg4ZGIiLCJlbWFpbCI6Im5pc2hhbnQucmFqcHV0QGFwcHZlbnR1cmV6LmNvbSIsImVtYWlsX3ZlcmlmaWVkIjp0cnVlLCJwaW5fcG9saWN5Ijp7InJlZ2lvbnMiOlt7ImlkIjoiRlJBMSIsImRlc2lyZWRSZXBsaWNhdGlvbkNvdW50IjoxfSx7ImlkIjoiTllDMSIsImRlc2lyZWRSZXBsaWNhdGlvbkNvdW50IjoxfV0sInZlcnNpb24iOjF9LCJtZmFfZW5hYmxlZCI6ZmFsc2UsInN0YXR1cyI6IkFDVElWRSJ9LCJhdXRoZW50aWNhdGlvblR5cGUiOiJzY29wZWRLZXkiLCJzY29wZWRLZXlLZXkiOiJlMjUwNzM5NTdjMjZkZDkwZDNmNyIsInNjb3BlZEtleVNlY3JldCI6IjQwNGQxNDE2OTg1NjUxMTZiMTRjZTA5NWI3ZDlkYWFlMDRjMmJhYzA2ZjQ2MjAwYzQ2MzkwNDA4OWUxNWI5ZGUiLCJpYXQiOjE2NzIyOTc5NzB9.1v4xIDyS8FqBngCm5IkdtgKVv9k-Jvg7VTXO3xf46wU'

async function pinFileToIPFS(){
    const formData = new FormData();
    const src = "./batman.jpeg";

    const file = fs.createReadStream(src)
    formData.append('file', file)

    // const metadata = JSON.stringify({
    //     "name": "Crypto Beetle 1",
    //     "description": "Crypto Beetle",
    //     "image": "https://ipfs.io/ipfs/QmbB8vrz117iixtkgNg4UxFqMuvHczNRgmrhXosCxyypJv",
    //     "attributes": [{
    //         "trait_type": "Generation",
    //         "value": 1
    //       },
    //       {
    //         "trait_type": "Dots",
    //         "value": 4
    //       },
    //       {
    //         "trait_type": "Antenna",
    //         "value": "regular"
    //       },
    //       {
    //         "trait_type": "Background",
    //         "value": "space"
    //       }
    //     ]

    // });
    // formData.append('pinataMetadata', metadata);

    // const options = JSON.stringify({
    //   cidVersion: 0,
    // })
    // formData.append('pinataOptions', options);
    // console.log(formData);

    try{
      const res = await axios.post("https://api.pinata.cloud/pinning/pinFileToIPFS", formData, {
        maxBodyLength: "Infinity",
        headers: {
          'Content-Type': `multipart/form-data; boundary=${formData._boundary}`,
          Authorization: JWT,
        }
      });
      console.log("========",res.data);
      return res.data.IpfsHash;
    } catch (error) {
      console.log(error);
    }
}
pinFileToIPFS();
console.log("something");