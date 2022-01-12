// SPDX-License-Identifier: MIT
pragma solidity >=0.4.21 <8.10.0;

contract Seller {
    /* Events */
    event ItemAdded(uint256 idItem, string itemName, uint256 price);
    event ProcessAnOrder(uint256 idOfCustomer, uint256 idOrder, bool status);

    struct Item {
        uint256 idItem;
        string itemName;
        uint256 price;
    }

    struct Orderlog {
        uint256 idOfCustomer;
        uint256 idOrder;
        bool status;
    }

    // STATE Variables.
    uint256 numberOfItemsAvailableForSale;
    uint256 numberOfOrdersProcessed;

    // Mappings
    mapping(uint256 => Item) items;
    mapping(uint256 => Orderlog) orderLogs;

    /* TRANSACTIONS */
    function addItem(string memory itemName, uint256 price) public {
        uint256 idItem = numberOfItemsAvailableForSale++;
        items[idItem] = Item(idItem, itemName, price);
        emit ItemAdded(idItem, itemName, price);
    }

    function processOrder(uint256 idOrder, uint256 idCustomer) public {
        orderLogs[idOrder] = Orderlog(idCustomer, idOrder, true);
        numberOfOrdersProcessed++;
        emit ProcessAnOrder(idCustomer, idOrder, true);
    }

    /* GETTERS */
    function getItem(uint256 idItem)
        public
        view
        returns (string memory, uint256)
    {
        /*returns itemName and its price*/
        return (items[idItem].itemName, items[idItem].price);
    }

    function getStatus(uint256 idOrder) public view returns (bool) {
        /*returns completion status*/
        return (orderLogs[idOrder].status);
    }

    function getTotalNumberOfAvailableItems() public view returns (uint256) {
        return numberOfItemsAvailableForSale;
    }

    function getTotalNumberOfOrdersProcessed() public view returns (uint256) {
        return numberOfOrdersProcessed;
    }
}
