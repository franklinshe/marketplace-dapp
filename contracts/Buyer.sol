// SPDX-License-Identifier: MIT
pragma solidity >=0.4.21 <8.10.0;

contract Buyer {
    // Events
    event OrderRaisedOrUpdated(
        uint256 idOrder,
        string itemName,
        uint256 quantity,
        bool status
    );

    // Structs
    struct Orderlog {
        uint256 idOrder;
        uint256 idCustomer;
        string itemName;
        uint256 quantity;
        bool status;
    }

    // State
    uint256 numberOfItemsPurchased;
    uint256 numberOfItemsReceived;

    // Mappings
    mapping(uint256 => Orderlog) orderLogs;

    // Functions
    function purchaseItem(string memory itemName, uint256 quantity) public {
        uint256 idOrder = numberOfItemsPurchased++;
        orderLogs[idOrder] = Orderlog(idOrder, 0, itemName, quantity, false);
        emit OrderRaisedOrUpdated(idOrder, itemName, quantity, false);
    }
}
