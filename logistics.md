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

### Intended Implementation
1. Buyer and seller agree to a price, time, location
2. A new contract is created by the buyer
    - This contract can not be destroyed by the owner of the contract
3. The buyer and seller has 2 hours to deposit into the contract for it to be effective
    - When each party deposits, they will be required to enter in a hash and passcode into the server
    - If both parties do not deposit into the contract by the time, the contract is automatically terminated
    - The system will cancel the transaction on the server
4. The buyer and seller meet at the coffeeshop
5. They will need to check into the coffeeshop by connecting to their WiFi and clicking a button on the app
    - This button will send a request to the server, the server will check the public IP that the request is from, if the request matches that of the starbucks, then mark the user as checked in in the database and return a 200 with the other user's passcode for their deposit
6. If both parties are still happy with the transaction, they will both send a transaction to the contract indicating they are happy with the purchase
7. If both users confirm the transaction, ETH for the item that was deposited by the buyer is sent to the seller, and both parties are able to withdraw their deposit

#### SAD PATH
8. A user can cancel a transaction, but they must have the other user's passcode
    - As a result, they must meet up
9. If any user does not show up or shows up past 10 mins of the set meeting time, they will be unable to get the other user's passcode 
    - As a result, they will be penalized and will not be able to withdraw their deposit
10. An hour after the meetup time, if the transaction has not yet been set to 'sold'
    - Users are able to withdraw all the funds if they have a passcode.
11. One day after the meetup, any left over funds are send to the Cryptobay Wallet. 
