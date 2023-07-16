import { Button } from "react-bootstrap";
import PropTypes from 'prop-types'

const Cover = ({ name, connect }) => {
  if (name) {
    return (
      <div>
          <div className="d-flex justify-content-center flex-column text-center" style={{ background: '#000', minHeight: "100vh"}}>
            {/* <div className="mt-auto text-light mb-5" style={{ maxWidth: "320px" }}>
              <img src={coverImg} alt="" />
            </div> */}
            <h1>{name}</h1>
            <p>Please connect your wallet to continue</p>
            <Button className="rounded-pill px-3 mt-3" onClick={() => connect().catch((e) => console.log(e))} variant="outline-light">Connect Wallet</Button>
        </div>
        <p className="mt-auto text-secondary">Powered By Celo</p>
      </div>
    )
  }
  return null;
};

Cover.prototype = {
  name: PropTypes.string,
};

Cover.defaultProps = {
  name: "",
}


export default Cover;
