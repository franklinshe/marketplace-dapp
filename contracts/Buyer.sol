// SPDX-License-Identifier: MIT
pragma solidity >=0.4.21 <8.10.0;

contract Buyer {
    // Events
    event ItemPurchased(
        uint256 idOrder,
        string itemName,
        uint256 quantity,
        bool status
    );

    // Structs
    struct Order {
        uint256 idOrder;
        uint256 idCustomer;
        string itemName;
        uint256 quantity;
        bool status;
    }

    // State
    uint256 numberOfItemsPurchased;

    // Mappings
    mapping(uint256 => Order) orders;

    // Functions
    function purchaseItem(string memory itemName, uint256 quantity) public {
        uint256 idOrder = numberOfItemsPurchased++;
        orders[idOrder] = Order(idOrder, 0, itemName, quantity, false);
        emit ItemPurchased(idOrder, itemName, quantity, false);
    }
}
