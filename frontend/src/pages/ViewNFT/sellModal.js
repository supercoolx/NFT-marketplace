import React, {useState, useEffect} from 'react';
import {Box, Flex, Modal, Button, Card, Heading} from 'rimble-ui';
import {toast} from 'react-toastify';
import {Col, FormGroup, Label, Spinner} from 'reactstrap';
import restApi from '../../utils/restApi.js';

import {
  getAuctionContractInstance,
  getDefaultAddres,
} from '../../utils/web3';
import { AuctionAddress } from '../../constants';

const CollectionModal = ({isOpen, closeModal, myNft}) => {
  const [price, setPrice] = useState('');
  const [isAuction, setIsAution] = useState(false);
  const [day, setDay] = useState(0);
  const [time, setTime] = useState(0);
  const [isProcessing, setIsProcessing] = useState(false);

  useEffect(() => {

  }, []);

  const createSellOrder = async () => {
    setIsProcessing(true);
    if (!isAuction) {
      try {
        const nftContract = getAuctionContractInstance(AuctionAddress);
        const userAddress = await getDefaultAddres();
        
        const tx = await nftContract.methods
        .createOrder(
          myNft.collectionId,
          myNft.tokenId,
          price
        )
        .send({from: userAddress});
        restApi.post('/setNftSelling', {id: myNft._id, sellingStatus: 1})
        .then(result => {
          toast.success('Successfully Done');
          setIsProcessing(false);
          closeModal()
        })
        .catch(err => {
          toast.error(
            'Somethings are wrong!'
          );
        })
      } catch(err) {
        console.log(err)
      }
    }
  }
  return (
    <>
      <Modal isOpen={isOpen}>
        <Card p={0} bg={'#08091A'} borderColor={'#7f81a2'} color={'#f5f5f5'} className="overflow-auto">
          <Button.Text
            icononly
            icon={'Close'}
            color={'moon-gray'}
            position={'absolute'}
            top={0}
            right={0}
            mt={3}
            mr={3}
            onClick={e => closeModal()}
          />

          <Box px={4}>
            <Heading.h3 p={4}>Edit Sell</Heading.h3>
            
            <FormGroup row className="my-2">
              <Label for="exampleEmail" sm={12} size="lg">
                Price *
              </Label>
              <Col sm={12}>
                <div className="group-input">
                  <input
                    type="text"
                    placeholder="price"
                    className="form-air"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                  />
                </div>
              </Col>
            </FormGroup>
            <div className="d-flex justify-content-between align-items-center mt-4">
              <h6>Add To Markeplace</h6>
              <label className="ms-switch">
                <input
                  name="checkbox"
                  type="checkbox"
                  checked={isAuction}
                  onChange={(e) => setIsAution(e.target.checked)}
                />
                <span className="ms-switch__control"></span>
              </label>
            </div>

            {isAuction ? (
              <>
                <FormGroup row className="my-2">
                  <Label for="exampleEmail" sm={5} size="lg">
                    days *
                  </Label>
                  <Col sm={7}>
                    <div className="group-input">
                      <input
                        type="number"
                        placeholder="days"
                        className="form-air"
                        value={day}
                        onChange={(e) => setDay(e.target.value)}
                      />
                    </div>
                  </Col>
                </FormGroup>
                <FormGroup row className="my-2">
                <Label for="exampleEmail" sm={5} size="lg">
                  time *
                </Label>
                <Col sm={7}>
                  <div className="group-input">
                    <input
                      type="time"
                      placeholder="time"
                      className="form-air"
                      value={time}
                      onChange={(e) => setTime(e.target.value)}
                    />
                  </div>
                </Col>
              </FormGroup>
            </>
            ) : ''}
          </Box>

          <Flex
            px={4}
            py={3}
            borderTop={1}
            borderColor={'#4e3fce'}
            justifyContent={'flex-end'}
          >
            <Button.Outline onClick={createSellOrder} borderColor={'#4e3fce'}>
              {isProcessing ? <Spinner size="sm" /> : 'Create SellOrder'}
            </Button.Outline>
          </Flex>
        </Card>
      </Modal>
    </>
  );
};

export default CollectionModal;
