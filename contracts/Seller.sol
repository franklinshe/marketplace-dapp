// SPDX-License-Identifier: MIT
pragma solidity >=0.4.21 <8.10.0;

contract Seller {
    // Events
    event ItemAdded(uint256 itemId, string itemName, uint256 price);
    event ItemRemoved(uint256 itemId);
    event ProcessOrder(uint256 idOfCustomer, uint256 idOrder, bool status);

    // Structs
    struct Item {
        uint256 itemId;
        string itemName;
        uint256 price;
    }

    struct Order {
        uint256 idOfCustomer;
        uint256 idOrder;
        bool status;
    }

    // State
    uint256 numberOfItems;

    // Mappings
    mapping(uint256 => Item) items;
    mapping(uint256 => Order) orders;

    // Transactions
    function addItem(string memory itemName, uint256 price) public {
        uint256 itemId = numberOfItems++;
        items[itemId] = Item(itemId, itemName, price);
        emit ItemAdded(itemId, itemName, price);
    }

    function removeItem(uint256 itemId) public {
        delete items[itemId];
        emit ItemRemoved(itemId);
    }

    function processOrder(uint256 idOrder, uint256 idCustomer) public {
        orders[idOrder] = Order(idCustomer, idOrder, true);
        emit ProcessOrder(idCustomer, idOrder, true);
    }
}
