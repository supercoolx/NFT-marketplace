import React, {useEffect, useState} from 'react';
import {useSelector} from 'react-redux';
import {Spinner} from 'reactstrap';
import restApi from '../../utils/restApi';
import similarImg from '../../assets/img/similar.svg';
import ItemCard from '../../components/Main/ItemCard';

const HotLists = ({collectionId}) => {
  const price = useSelector((state) => state.price);
  const [filteredNFTs, setFilteredNFT] = useState(null);
  const [tokenPrice, setTokenPrice] = useState({
    bnb: price.bnb,
    moonstar: price.moonstar,
  });
  useEffect(() => {
    setTokenPrice(price);
  }, [price]);

  useEffect(() => {
    restApi.get('item', {
      params: {
        status: true,
        collectionId: collectionId,
        sortDir: 'asc',
        sortBy: 'mintedAt',
        page: 0,
        limit: 4
      }
    }).then(res => {
      setFilteredNFT(res.data.items);
    }).catch(e => {
      console.log(e)
      setFilteredNFT([]);
    }) 
  }, []);
  const buyItem = (e, collection, nftId) => {
    e.preventDefault();
    window.location = `/buy-nft/${collection}/${nftId}`;
  };
  return (
    <section className="pt-2 pb-5" data-aos="fade-up" data-aos-delay="800">
      <div className="container">
        <div className="row">
          <div className="col-12 mt-5">
            <div className="section-title d-flex align-items-center">
              <div
                className="flex-shrink-0"
                data-aos="fade-right"
                data-aos-delay="100"
              >
                <img className="section-icon" src={similarImg} alt="" />
              </div>
              <div
                className="flex-grow-1 ms-3"
                data-aos="fade-up"
                data-aos-delay="100"
              >
                <h2 className="section-heading section-heading-after">
                  SIMILAR NFT'S
                </h2>
              </div>
            </div>
          </div>
        </div>
        <div className="">
          {filteredNFTs && filteredNFTs.length > 0 ? (
            <div className="row d-flex flex-wrap justify-content-around">
              {filteredNFTs.map((nft, key) => (
                <ItemCard nft={nft} key={key} />
              ))}
            </div>
          ) : (
            <div className="text-center">
              {filteredNFTs ? 'EMPTY' : <Spinner />}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default HotLists;
