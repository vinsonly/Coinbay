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

### Contract Specifications
- Server functions:
    - setPasscode
        - sets Passcode, if successful, returns a 200 and the client will use the callback to submit their deposit to the contract
    - checkIn()
        - gets the user's public IP address, and if matching the location, returns the opposing user's passcode
- Variables (public)
    - itemCost
    - depositAmount
    - creationTime
    - transactionTime
    - buyerAddress
    - sellerAddress
    - amountDepositedBySeller
    - amountDepositedByBuyer
    - buyerHash
    - sellerHash
    - state: "pending", "active", "fulfilled", "cancelled"
    - sellerState: "pending", "confirmed", "declined"
    - buyerState: "pending", "confirmed", "declined"
- Functions
    - public
        - constructor(itemCost, transactionTime, buyerAddress, sellerAddress)
            - sets itemCost, transactionTime, buyerAddress, sellerAddress, state to "pending", buyer and seller state to "pending", creationTime

        - deposit()
            - params
                - msg.value, msg,sender
            - description
                - checks if state is not "cancelled"
                - declines the deposit if the amount is not met
                - checks the address (buyer or seller) then increments amountDeposited for the appropriate user
                - If both users have deposited, state is set to "active"
                - emit event deposited

        - cancel() 
            - checks if transaction is not cancelled or fulfilled
            - check that 2 hours since contract creation time has elapsed
            - checks that the msg.sender is a buyer or sender
            - checks that the user has deposited into the contract and that other user has not
            - changes the state of the contract to "cancelled"
            - returns the deposited amount to the msg.sender
            - emit event cancelled
        
        - confirmTransaction(otherUsersPasscode)
            - checks the passcode
            - checks if the transaction is "active"
            - if msg.sender is a buyer or seller, they can confirm the transaction on their end
            - if both users confirmed the transaction
                - deposit for both users is returned
                - itemCost is sent to the seller
                - state of the transaction is changed to "fulfilled"
                - emit event confirmed
            - if other user has declined transaction
                - deposit for both users is returned
                - state of the transaction is changed to "cancelled"
                - emit event cancelled

        - declineTransaction(otherUsersPasscode)
            - checks the passcode
            - checks if transaction is "active"
            - if msg.sender is a buyer or seller, they can decline the transaction on their end
            - if other user declined the transaction
                - deposit for both users is returned
                - itemCost is returned to the buyer
                - state of the msg.sender is set to "declined"
                - state of the transaction is changed to "cancelled"
                - emit event cancelled
            - else
                - state of the msg.sender is set to "declined"

        - withdraw(passcode)
            - checks if 2 hours past transaction time has passed
            - checks if the transaction is fulfilled
            - if msg.sender is seller
                - check if passcode is buyer's
                - if 1 day has passed    
                    - withdraw seller deposit, buyer deposit
                - else
                    - withdraw seller deposit
                - decrement amountDeposited appropriately 
            - else if msg.sender is buyer
                - check if passcode is seller's
                - if 1 day has passed    
                    - withdraw seller deposit, buyer deposit
                - else
                    - withdraw seller deposit
                - decrement amountDeposited appropriately
                - if the transaction is not "confirmed"
                    - withdraw the itemCost
            - else if msg.sender is contract owner
                - if 1 week has passed
                    - withdraw the deposits from both the buyers and sellers