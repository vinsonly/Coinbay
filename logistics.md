### Transactions

1. User clicks ```Buy Now``` on an item
2. A Smart Contract (SC) is created by the user
3. The user deposits the cost of the item into the smart contract as escrow
4. The user is able to cancel this contract and get their money back until the seller has started fulfilment of the order
    - The seller needs to click a button on the application to start fulfillment process
    - OPTIONAL - make the seller deposit 50% of the item value into the smart contract that makes their guarantee that they will be shipping the item out after X amount of time
5. The seller ships the item
6. The user receives the item
7. The user now has 3 days to accept or decline the shipment 
    1. The user accepts the shipment
        - Money is released from the smart contract to the seller
    2. The user declines the shipment
        - The user has 3 days to ship the item back to the seller
        - If the user doesn't ship the item, the money is released from the smart contract to the seller
        - The seller examines the item
            - The seller accepts the return
                - The money is released from the smart contract, back to the seller
            - The seller declines the return
                - The item is shipped back to the buyer at the buyer's expense 
                - Once the item arrives, the smart contract releases funds to the seller
8. Feedback is left for buyers and sellers and stored in an Ethereum smart contract

### Notes:
- shipping tracking is done by interfacing with an API of a 3rd party
    - Canada Post
    - DHL
    - UPS
    - etc, etc