const Category = require("../models/categoryModel");
const collectionModel = require("../models/collectionModel");
const itemModel = require("../models/itemModel");
const User = require("../models/usersModel");
const ItemBuy = require("../models/itemBuyModel");


const saveCollection = (req, res) => {
    let collection = new collectionModel({
        ...req.body
    });
    collection.save();
    res.json("success");
}

const collections = async ( req, res ) => {
    const address = req.body.account;
    let query = {};
    if (address != undefined) {
        query = { owner : address.toLowerCase() };
    } 
    collectionModel.find(query)
    .then(result => {
        res.json({collections: result});
    })
    .catch(err => {
        console.log(err)
    });
}

const items = async (req, res) => {
    let query = {};
    let condition = {};
    let mysort = {};
    let sort = "";
    if (req.query.owner != undefined && req.query.owner != '') {
        query.owner = req.query.owner;
    }
    console.log(query)
    condition.length = req.query.limit * 1;
    condition.start = req.query.page * req.query.limit * 1;
    if (req.query.sortBy == 'mintedAt') {
        sort = 'createdAt';
    } else if (req.query.sortBy == 'views') {
        sort = 'views';
    } else if (req.query.sortBy == 'price') {
        sort = 'price';
    } 
    if (req.query.sortDir == 'asc') {
        mysort[sort] = 1;
    } else {
        mysort[sort] = -1;
    }
    itemModel.find(query).limit(condition.length).skip(condition.start).sort(mysort)
    .then(result => {
        res.json({items: result});
    })
    .catch(err => {
        console.log(err);

    })
}

const saveItem = (req, res) => {
    let item = new itemModel({
        ...req.body
    });
    item.save();
    res.json("success");
}

const viewItem = (req, res) => {
    itemModel.findOne({collectionId: req.query.collection_id, tokenId: req.query.id})
    .then(async result => {
        let creatorObj = await User.findOne({ address: result.creator.toLowerCase() });
        let ownerObj = await User.findOne({ address: result.owner.toLowerCase() });
        console.log(creatorObj)
        let data = {
            _id: result._id,
            category: result.category,
            tokenId: result.tokenId,
            pairKey: result.pairKey,
            collectionId: result.collectionId,
            name: result.name,
            price: result.price,
            assetType: result.assetType,
            auction: result.auction,
            metadata: result.metadata,
            image: result.image,
            creator: result.creator,
            owner: result.owner,
            currency: result.currency,
            royalties: result.royalties,
            description: result.description,
            txHash: result.txHash,
            status: result.status,
            createdAt: result.createdAt,
            updatedAt: result.updatedAt,
            creatorObj: creatorObj,
            ownerObj: ownerObj,
            sellingStatus: result.sellingStatus,
        };
        console.log(data)
        res.json({item: data});
    })
    .catch(err => {
        console.log(err)
    })
}

const getCategories = (req, res) => {
    Category.find()
    .then(result => {
        res.json({categories: result})
    })
    .catch(err => {
        res.json("fail")
    })
}

const setNftSelling = async (req, res) => {
    let item = await itemModel.findById(req.body.id);
    item.sellingStatus = req.body.sellingStatus;
    item.save();
    res.json("success");
}

const setNftBuy = async (req, res) => {
    let itemBuy = await new ItemBuy();
    itemBuy.itemId = req.body.id;
    itemBuy.buyer = req.body.buyer;
    itemBuy.status = req.body.status;
    itemBuy.save();
    res.json("success");
}

module.exports = {
    saveCollection,
    collections,
    saveItem,
    viewItem,
    items,
    getCategories,
    setNftSelling,
    setNftBuy
};